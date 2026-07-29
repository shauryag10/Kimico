/* Dev utility: capture full-page screenshots of the local site at three
   breakpoints using the system Edge browser (no bundled Chromium needed).
   Usage: node scripts/shoot.mjs <url> <outDir> [name] */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";
import { join } from "path";

const [url = "http://localhost:52388", outDir = "./shots", name = "home"] =
  process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const VIEWPORTS = [
  { label: "1440", width: 1440, height: 900 },
  { label: "768", width: 768, height: 1024 },
  { label: "375", width: 375, height: 812 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--no-proxy-server",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
  ],
});

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  // Headless frames are produced on demand, so entrance animations may never
  // advance — force animated elements to their final state for the capture.
  await page.addStyleTag({
    content:
      '[style*="opacity: 0"], [style*="opacity:0"] { opacity: 1 !important; transform: none !important; }',
  });
  const waitImages = () =>
    page.evaluate(() =>
      Promise.all(
        Array.from(document.images)
          .filter((i) => !i.complete)
          .map(
            (i) =>
              new Promise((res) => {
                i.onload = i.onerror = res;
                setTimeout(res, 8000);
              }),
          ),
      ),
    );
  await waitImages();
  // scroll through the page so whileInView animations complete
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 500;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 90);
        else resolve();
      };
      step();
    });
  });
  await waitImages();
  await new Promise((r) => setTimeout(r, 700));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  // The splash preloader's exit animation needs rAF frames that headless
  // rendering doesn't produce — drop it from the DOM before capturing.
  await page.evaluate(() => document.querySelector("[data-preloader]")?.remove());
  const file = join(outDir, `${name}-${vp.label}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("saved", file);
  await page.close();
}
await browser.close();
