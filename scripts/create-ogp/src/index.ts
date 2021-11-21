import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import yargs from 'yargs';
import litdate from 'lit-date';

import { logger } from './logger';
import { captureScreenshot } from './capture_screenshot';

async function main() {
  const argv = await yargs
    .option('id', {
      type: 'string',
      demandOption: true,
    })
    .option('score', {
      type: 'number',
      demandOption: true,
    })
    .option('rank', {
      type: 'number',
      demandOption: true,
    })
    .help().argv;

  const exportPath = path.resolve(__dirname, `../public/scores/${argv.id}`);
  await fs.ensureDir(exportPath);

  const buffer = await captureScreenshot({
    html: ejs.render(fs.readFileSync(path.resolve(__dirname, '../template/ogp.ejs'), 'utf-8'), {
      competitor: {
        id: argv.id,
        score: argv.score,
        rank: argv.rank,
      },
      date: litdate`${'YYYY'}/${'MM'}/${'DD'} ${'HH'}:${'MM'} JST`(new Date()),
    }),
    width: 1200,
    height: 630,
  });

  await fs.writeFile(path.resolve(exportPath, `./ogp.png`), buffer);

  await fs.writeFile(
    path.resolve(exportPath, `./index.html`),
    ejs.render(fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'), 'utf-8'), {
      competitor: {
        id: argv.id,
      },
      date: Date.now(),
    }),
    'utf-8',
  );
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
