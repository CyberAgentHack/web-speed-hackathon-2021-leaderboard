import fs from 'fs/promises';
import yargs from 'yargs';
import { parse as parseCSV } from 'csv-parse/sync';
import { stringify as stringifyCSV } from 'csv-stringify/sync';

import { logger } from './logger';

import type { CSVRow } from './types';

async function main() {
  const argv = await yargs
    .option('score-csv', {
      type: 'string',
      demandOption: true,
    })
    .option('markdown', {
      type: 'string',
      demandOption: true,
    })
    .option('id', {
      type: 'string',
      demandOption: true,
    })
    .option('url', {
      type: 'string',
      demandOption: true,
    })
    .option('score', {
      type: 'number',
      demandOption: true,
    })
    .help().argv;

  const result: CSVRow = {
    rank: 0,
    score: argv.score,
    competitorId: argv.id,
    url: argv.url,
  };

  const scoreList = parseCSV(await fs.readFile(argv['score-csv'], 'utf-8'), {
    columns: true,
    cast: (value, context) => {
      if (context.header) {
        return value;
      }
      if (['rank', 'score'].includes(context.column as string)) {
        return Number(value);
      }
      return String(value);
    },
  }) as CSVRow[];

  const scoreMap = new Map(scoreList.map((s) => [s.competitorId, s]));
  scoreMap.set(result.competitorId, result);

  const sortedScoreList = Array.from(scoreMap.values()).sort((a, b) => b.score - a.score);

  for (let idx = 0; idx < sortedScoreList.length; idx++) {
    const item = sortedScoreList[idx]!;
    const prevItem = sortedScoreList[idx - 1];

    if (prevItem && item.score === prevItem.score) {
      item.rank = prevItem.rank;
    } else {
      item.rank = idx + 1;
    }
  }

  console.log(`::set-output name=export::${JSON.stringify(result)}`);

  const leaderBoardMarkdown = [
    '<!-- leaderboard:start -->',
    '',
    '|Rank|Score||CompetitorId|URL|',
    '|:--:|:--:|:--:|:--|:--:|',
    ...sortedScoreList
      .filter((s) => s.rank <= 10)
      .map((item) => {
        const inner = [
          `${item.rank}`,
          `**${item.score}**`,
          `<img alt="" width="50" height="50" src="https://github.com/${item.competitorId}.png?size=100"/>`,
          `[@${item.competitorId}](https://github.com/${item.competitorId})`,
          `[:link:](${item.url})`,
        ].join('|');
        return `|${inner}|`;
      }),
    '',
    '<!-- leaderboard:end -->',
  ].join('\n');

  const markdown = await fs.readFile(argv.markdown, 'utf-8');
  await fs.writeFile(
    argv.markdown,
    markdown.replace(/<!-- leaderboard:start -->.*<!-- leaderboard:end -->/ms, leaderBoardMarkdown),
    'utf-8',
  );

  const csv = stringifyCSV(sortedScoreList, {
    columns: ['rank', 'score', 'competitorId', 'url'],
    header: true,
  });
  await fs.writeFile(argv['score-csv'], csv, 'utf-8');
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
