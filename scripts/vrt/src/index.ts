import path from 'path';
import fs from 'fs-extra';
import config from 'config';
import yargs from 'yargs';
import axios from 'axios';
import { URL } from 'url';

import type { Page, ViewPort } from './types';
import { logger } from './logger';
import { captureScreenshot } from './capture_screenshot';

async function main() {
  const argv = await yargs
    .option('url', {
      type: 'string',
      demandOption: true,
    })
    .help().argv;

  const baseUrl = argv.url;

  // Initialize
  await axios.post(new URL('/api/v1/initialize', baseUrl).href);
  logger.info('Initialized: %s', baseUrl);

  const viewportList = config.get<ViewPort[]>('viewports');
  const pageList = config.get<Page[]>('pages');

  const exportPath = path.resolve(process.cwd(), './tmp/actual/');
  await fs.remove(exportPath);
  await fs.ensureDir(exportPath);

  for (const viewport of viewportList) {
    for (const page of pageList) {
      const url = new URL(page.path, baseUrl).href;
      const buffer = await captureScreenshot({
        url,
        width: viewport.width,
        height: viewport.height,
      });
      await fs.writeFile(path.resolve(exportPath, `./${page.name} - ${viewport.name}.png`), buffer);

      logger.info('Captured: %s, %s', page.name, viewport.name);
    }
  }
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
