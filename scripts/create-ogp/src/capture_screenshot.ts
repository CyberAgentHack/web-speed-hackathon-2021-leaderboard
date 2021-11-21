import fetch from 'node-fetch';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

type Params = {
  html: string;
  width: number;
  height: number;
};

export async function captureScreenshot({ html, width, height }: Params): Promise<Buffer | null> {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--hide-scrollbars'],
  });

  try {
    const res = await fetch(`http://localhost:${chrome.port}/json/version`);
    const json = await res.json();
    const browser = await puppeteer.connect({
      browserWSEndpoint: json.webSocketDebuggerUrl,
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.setViewport({ width, height });
    await page.setContent(html, {
      timeout: 60 * 1000,
      waitUntil: 'networkidle0',
    });

    const screenshot = (await page.screenshot({
      captureBeyondViewport: false,
    })) as Buffer;

    return screenshot;
  } finally {
    await chrome.kill();
  }
}
