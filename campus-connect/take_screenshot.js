import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));
  
  await page.screenshot({ path: 'screenshot_v2.png', fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_v2_scroll.png', fullPage: false });

  await browser.close();
  console.log('Screenshots saved');
})();
