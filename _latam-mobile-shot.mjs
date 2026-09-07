import puppeteer from "puppeteer";
import path from "node:path";

const file = path.resolve("d:/GITHUB_2/連續兩年得獎 南美航空/官網貼上版/完整頁面.html");
const out = path.resolve("d:/GITHUB_2/連續兩年得獎 南美航空/assets");
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto(`file:///${file.replace(/\\/g, "/")}`, { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-revealed", ""));
});
await page.screenshot({ path: path.join(out, "mobile-top.png"), clip: { x: 0, y: 0, width: 390, height: 844 } });
const height = await page.evaluate(() => document.documentElement.scrollHeight);
await page.screenshot({ path: path.join(out, "mobile-mid.png"), clip: { x: 0, y: Math.min(900, height - 844), width: 390, height: 844 } });
await page.screenshot({ path: path.join(out, "mobile-bottom.png"), clip: { x: 0, y: Math.max(0, height - 844), width: 390, height: 844 } });
const overflow = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  bodyOverflow: document.body.scrollWidth,
}));
console.log(JSON.stringify({ height, overflow }));
await browser.close();
