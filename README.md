# Kimico Foods — Marketing Website

Brand showcase and B2B enquiry site for **Kimico Foods** (Kimmy Group of
Companies, Ahmedabad — since 1988). Built with Next.js (App Router),
TypeScript, Tailwind CSS v4 and Framer Motion. There is no cart or checkout —
every product leads to a **"Request pricing"** enquiry instead.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (must pass before deploying)
npm run lint       # eslint
```

Deploys to Vercel with zero configuration — import the repo and press deploy.

Live at **https://kimicoglobal.com**. The Vercel project is connected to
this GitHub repo, so every push to `main` deploys automatically.

The canonical origin (`SITE_URL` in [`lib/site.ts`](lib/site.ts)) feeds
canonical URLs, OpenGraph tags, JSON-LD and the sitemap. It defaults to the
Vercel URL; when a custom domain is added, set `NEXT_PUBLIC_SITE_URL` in the
Vercel project's environment variables and redeploy — no code change needed.

Note `.vercelignore` keeps the 115MB source catalogue out of deployments (it
exceeds Vercel's 100MB per-file limit); the 6MB web copy the site serves from
`public/catalogue/` is deployed normally.

## Editing products

Every SKU lives in one typed file: [`data/products.ts`](data/products.ts).
Each entry looks like:

```ts
{
  code: "KM-18",              // item code shown on cards and used in ?sku= links
  slug: "truffles-box",       // URL: /products/truffles-box — keep kebab-case
  name: "Truffles — Creme Filled Cacao Truffles",
  brand: "Kimico",            // "Kimico" | "Kimmy" | "JK Toys"
  category: "Truffles & Gifting",
  format: "Box",              // drives the Format filter
  description: "…",           // 1–2 warm sentences shown on card + detail page
  flavours: ["Raspberry", …], // optional — rendered as chips
  piecesPerPack: 70,          // optional
  weight: "750 gms",          // optional — used when pieces don't apply
  unitsPerCarton: "15 boxes/carton", // optional
  priceInr: 350,              // MRP in rupees — shown on the site
  image: "/products/km-18.webp", // omit until the photo exists (see below)
  palmOilFree: true,          // optional — only where the pack states it
  contents: ["…"],            // optional — for assortments, the packs inside
}
```

**About `priceInr`:** this is the pack MRP, the consumer price printed on the
pack. It renders as "MRP ₹…" on every card and detail page and goes into the
Product JSON-LD as an Offer. Trade pricing is still handled by enquiry.

**Products without a photo yet:** leave `image` out and the site renders a
typographic placeholder (product name on its range colour). To add the photo,
save it as `public/products/<code>.webp` and set `image: "/products/<code>.webp"`.

Category names, accent colours and blurbs live in `CATEGORY_META` in
[`lib/catalog.ts`](lib/catalog.ts).

## Product images

Images live in [`public/products/`](public/products) as
`km-01.webp … km-49.webp` (max 1400px, WebP). They were extracted from the
retail catalogue PDF; isolated pack shots sit on transparency so they float on
the coloured plates. To replace one, export a cutout PNG/WebP with a
transparent background, name it after the item code, and drop it in.

Brand marks and garnish imagery are in [`public/brand/`](public/brand).
The downloadable catalogue is served from
`public/catalogue/kimico-retail-catalogue.pdf` — replace that file to update
the download everywhere (header, footer, contact page).

## Contact form → email

The form posts to [`app/api/contact/route.ts`](app/api/contact/route.ts),
which currently validates the payload (zod) and logs it to the server
console. To deliver enquiries by email:

1. `npm install resend`
2. Create an API key at <https://resend.com> and add it to `.env.local`:
   `RESEND_API_KEY=re_…` (never commit this file)
3. Follow the `TODO(client)` comment in the route — it contains the exact
   `resend.emails.send({...})` snippet to paste in, including the
   `replyTo: enquiry.email` wiring.

Field validation rules are shared between client and server in
[`lib/contact-schema.ts`](lib/contact-schema.ts).

## Content marked TODO for the client

- `lib/site.ts` — production `SITE_URL`
- `app/about/page.tsx` — two timeline milestones are dashed placeholder
  cards marked *TODO*
- `app/api/contact/route.ts` — email provider wiring (above)

## Odds and ends

- Fonts: Fraunces (display, with SOFT/WONK axes) + Inter, self-hosted via
  `next/font` — no external font requests at runtime.
- Motion respects `prefers-reduced-motion` everywhere (entrance reveals,
  parallax, marquee, splash preloader).
- SEO: per-page metadata, JSON-LD `Organization` (layout) and `Product`
  (detail pages, deliberately without offers/prices), `app/sitemap.ts`,
  `app/robots.ts`, `app/opengraph-image.png`.
### Dev utilities (`scripts/`)

All three drive the local Chrome install against a running dev server:

```bash
node scripts/shoot.mjs    http://localhost:3000 ./shots home   # full-page shots at 375/768/1440
node scripts/inspect.mjs  http://localhost:3000 ./shots        # every route x desktop+mobile, plus a defect scan
node scripts/qa-crawl.mjs http://localhost:3000                # asserts MRP renders, no broken images/alts, filter counts
```

`inspect.mjs` flags console errors, failed requests, horizontal overflow,
interactive elements with no focus indicator, sub-24px tap targets and links
with no accessible name. Inline text links inside prose legitimately report as
small targets — WCAG 2.5.8 exempts them.
