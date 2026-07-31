/* Batched design inspection: screenshots at desktop + mobile for every route,
   plus a defect scan (focus rings, contrast, console errors, overflow). */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";

const [base = "http://localhost:53834", outDir = "./shots"] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ROUTES = [
  ["home", "/"],
  ["products", "/products"],
  ["detail", "/products/truffles-box"],
  ["brands", "/brands"],
  ["about", "/about"],
  ["contact", "/contact?sku=KM-18"],
  ["notfound", "/definitely-missing"],
];
const VIEWPORTS = [
  ["1440", 1440, 900],
  ["375", 375, 812],
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-proxy-server", "--hide-scrollbars"],
});

const problems = [];

for (const [vpName, w, h] of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const errors = [];
  const failedUrls = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
  page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message.slice(0, 120)));
  page.on("response", (r) => {
    if (r.status() >= 400) failedUrls.push(`${r.status()} ${r.url().slice(-70)}`);
  });

  for (const [name, route] of ROUTES) {
    errors.length = 0;
    failedUrls.length = 0;
    await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1400));
    // Hide (never remove) React-owned nodes — removing them throws removeChild.
    await page.addStyleTag({
      content:
        '[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important}' +
        "[data-preloader]{display:none!important}",
    });
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          y += 600;
          scrollTo(0, y);
          y < document.body.scrollHeight ? setTimeout(step, 70) : res();
        };
        step();
      });
    });
    await page.evaluate(() => scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: `${outDir}/${name}-${vpName}.png`, fullPage: true });

    const scan = await page.evaluate(() => {
      const out = { overflow: [], noFocusRing: [], tinyTap: [], emptyLink: [] };
      // horizontal overflow
      if (document.documentElement.scrollWidth > window.innerWidth + 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > window.innerWidth + 1 && r.width > 4 && r.width < 6000) {
            const cs = getComputedStyle(el);
            if (cs.position === "fixed" || cs.visibility === "hidden") continue;
            out.overflow.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 45)} right=${Math.round(r.right)}`,
            );
            if (out.overflow.length > 4) break;
          }
        }
      }
      // interactive elements whose focus style is suppressed
      for (const el of document.querySelectorAll("a,button,input,select,textarea")) {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) continue;
        el.focus?.();
        const cs = getComputedStyle(el);
        const hasOutline =
          cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
        const hasShadow = cs.boxShadow && cs.boxShadow !== "none";
        if (!hasOutline && !hasShadow) {
          out.noFocusRing.push(
            `${el.tagName.toLowerCase()}[${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 28)}]`,
          );
        }
        el.blur?.();
        if (out.noFocusRing.length > 6) break;
      }
      // touch targets under 24px on the smallest axis
      for (const el of document.querySelectorAll("a,button")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (Math.min(r.width, r.height) < 24) {
          out.tinyTap.push(
            `${el.tagName.toLowerCase()}[${(el.textContent || "").trim().slice(0, 22)}] ${Math.round(r.width)}x${Math.round(r.height)}`,
          );
          if (out.tinyTap.length > 5) break;
        }
      }
      // links with no accessible name
      for (const el of document.querySelectorAll("a")) {
        const name = (el.textContent || el.getAttribute("aria-label") || "").trim();
        if (!name) out.emptyLink.push(el.getAttribute("href") || "(no href)");
      }
      return out;
    });

    const tag = `${name}@${vpName}`;
    if (errors.length) problems.push(`${tag} console: ${[...new Set(errors)].join(" | ")}`);
    const realFails = failedUrls.filter((u) => !u.includes("definitely-missing"));
    if (realFails.length) problems.push(`${tag} http: ${[...new Set(realFails)].join(" ; ")}`);
    for (const k of Object.keys(scan)) {
      if (scan[k].length) problems.push(`${tag} ${k}: ${[...new Set(scan[k])].join(" ; ")}`);
    }
  }
  await page.close();
}

await browser.close();
console.log(`screenshots -> ${outDir}`);
if (!problems.length) console.log("SCAN CLEAN");
else {
  console.log("SCAN FINDINGS:");
  for (const p of problems) console.log(" -", p);
}
