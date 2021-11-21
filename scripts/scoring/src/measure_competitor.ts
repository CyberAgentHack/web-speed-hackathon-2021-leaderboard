import { URL } from 'url';
// @ts-expect-error
import lighthouse from 'lighthouse';
import fetch from 'node-fetch';
import { createErr, createOk, Result } from 'option-t/cjs/PlainResult';
import * as chromeLauncher from 'chrome-launcher';
import floor from 'lodash.floor';

import type { Competitor, HackathonScore, LighthouseScore, LighthouseScoreList } from './types';
import { logger } from './logger';

async function measurePage(url: string): Promise<LighthouseScore> {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--hide-scrollbars'],
  });

  const settings = {
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance'],
    onlyAudits: [
      'first-contentful-paint',
      'speed-index',
      'largest-contentful-paint',
      'time-to-interactive',
      'total-blocking-time',
      'cumulative-layout-shift',
    ],
    port: chrome.port,
  };
  const config = {
    extends: 'lighthouse:default',
  };

  try {
    const runnerResult = await lighthouse(url, settings, config);
    const lhr = runnerResult.lhr;
    const result: LighthouseScore = {
      score: (lhr.categories.performance?.score ?? 0) * 100,
      firstContentfulPaint: lhr.audits['first-contentful-paint']?.score ?? 0,
      speedIndex: lhr.audits['speed-index']?.score ?? 0,
      largestContentfulPaint: lhr.audits['largest-contentful-paint']?.score ?? 0,
      timeToInteractive: lhr.audits['time-to-interactive']?.score ?? 0,
      totalBlockingTime: lhr.audits['total-blocking-time']?.score ?? 0,
      cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.score ?? 0,
    };

    return result;
  } finally {
    await chrome.kill();
  }
}

async function measurePages(entrypoint: string, paths: string[]): Promise<LighthouseScoreList> {
  const result: LighthouseScoreList = {};

  for (const path of paths) {
    const url = new URL(path, entrypoint);

    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('target url is invalid.');
    }

    logger.debug('Target URL: %s', url.href);

    // Check HTTP status before actually running Lighthouse
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      throw new Error(`target url returns ${res.status}: ${res.statusText}`);
    }

    const lighthouseScore = await measurePage(url.href);

    logger.debug('Lighthouse: %o', lighthouseScore);

    result[path] = lighthouseScore;
  }

  return result;
}

function calculateHackathonScore(lighthouseScores: LighthouseScoreList): HackathonScore {
  const score = Object.values(lighthouseScores).reduce((sum, lh) => {
    return (
      sum +
      lh.score +
      lh.firstContentfulPaint * 2 +
      lh.speedIndex * 2 +
      lh.largestContentfulPaint * 5 +
      lh.timeToInteractive * 2 +
      lh.totalBlockingTime * 6 +
      lh.cumulativeLayoutShift * 3
    );
  }, 0);
  const roundedScore = floor(score, 2);

  return {
    score: roundedScore,
    lighthouseScores,
  };
}

export async function measureCompetitor(
  competitor: Competitor,
  targetPaths: string[],
): Promise<Result<HackathonScore, Error>> {
  logger.info('Competitor: %s', competitor.id);

  try {
    const lighthouseScores = await measurePages(competitor.url, targetPaths);
    const hackathonScore = calculateHackathonScore(lighthouseScores);

    logger.info('Score: %d', hackathonScore.score);

    return createOk(hackathonScore);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return createErr(e);
    } else {
      return createErr(new Error('unexpected error.'));
    }
  }
}
