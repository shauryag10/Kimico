/* QA crawl of the production build:
   - every route returns 200 and renders
   - the rupee sign never appears in the DOM (prices are internal-only)
   - no broken images, no product image without alt text
   - URL-driven catalogue filters return the expected counts */
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3105";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const { products } = await import("../data/products.ts").catch(() => ({ products: null }));
let slugs = products?.map((p) => p.slug);
if (!slugs) {
  // fall back to reading slugs from the sitemap
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  slugs = [...xml.matchAll(/\/products\/([a-z0-9-]+)</g)].map((m) => m[1]);
}

const routes = [
  "/",
  "/products",
  "/brands",
  "/about",
  "/contact?sku=KM-07",
  "/definitely-missing-page",
  ...slugs.map((s) => `/products/${s}`),
];

const FILTER_CASES = [
  { url: "/products?category=jars-bulk", expected: 12 },
  { url: "/products?brand=JK+Toys", expected: 1 },
  { url: "/products?format=Jar", expected: 10 },
  { url: "/products?q=eclairs", expected: 6 },
  { url: "/products?category=truffles-gifting&brand=Kimmy", expected: 3 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-proxy-server"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 900, deviceScaleFactor: 1 });

const failures = [];
let checked = 0;

for (const route of routes) {
  const resp = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, route === "/" ? 1500 : 600));
  const status = resp?.status() ?? 0;
  const expected404 = route === "/definitely-missing-page";
  if (expected404 ? status !== 404 : status !== 200) {
    failures.push(`${route}: HTTP ${status}`);
    continue;
  }
  const audit = await page.evaluate(() => {
    const rupee = document.documentElement.outerHTML.includes("\u20B9");
    const imgs = Array.from(document.images);
    const broken = imgs
      .filter((i) => i.complete && i.naturalWidth === 0 && i.src)
      .map((i) => i.src.slice(-60));
    const missingAlt = imgs
      .filter((i) => {
        if (i.alt.trim()) return false;
        if (i.closest("[aria-hidden='true']")) return false; // decorative
        return i.currentSrc.includes("/products/") || i.currentSrc.includes("%2Fproducts%2F");
      })
      .map((i) => i.currentSrc.slice(-60));
    return { rupee, broken, missingAlt };
  });
  if (audit.rupee) failures.push(`${route}: rupee sign rendered`);
  for (const b of audit.broken) failures.push(`${route}: broken image ${b}`);
  for (const m of audit.missingAlt) failures.push(`${route}: product image missing alt ${m}`);
  checked++;
}

for (const c of FILTER_CASES) {
  await page.goto(BASE + c.url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 800));
  const count = await page.$$eval("ul li article", (els) => els.length);
  if (count !== c.expected) {
    failures.push(`${c.url}: expected ${c.expected} products, got ${count}`);
  } else {
    checked++;
  }
}

await browser.close();
console.log(`checked ${checked} pages/cases`);
if (failures.length) {
  console.log("FAILURES:");
  for (const f of failures) console.log(" -", f);
  process.exit(1);
}
console.log("ALL CLEAN: no rupee signs, no broken images, no missing alts, filters correct");
