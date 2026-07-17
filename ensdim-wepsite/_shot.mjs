import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1100 } });
await page.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 20000 });
await page.waitForTimeout(1000);
const link = page.locator('a[href="/solutions/build"]').first();
await link.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: 'shot-maturity-desktop.png', fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 390, height: 1400 } });
await mobile.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 20000 });
await mobile.waitForTimeout(1000);
const link2 = mobile.locator('a[href="/solutions/build"]').first();
await link2.scrollIntoViewIfNeeded();
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: 'shot-maturity-mobile.png', fullPage: false });

await browser.close();
