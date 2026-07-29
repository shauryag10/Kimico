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

Before go-live, set the production domain in [`lib/site.ts`](lib/site.ts)
(`SITE_URL`) — it feeds canonical URLs, OpenGraph tags, JSON-LD and the
sitemap.

## Editing products

All 49 SKUs live in one typed file: [`data/products.ts`](data/products.ts).
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
  priceInr: 350,              // INTERNAL ONLY — never rendered, see below
  image: "/products/km-18.webp",
}
```

**About `priceInr`:** prices exist in the data file for the team's reference
only. They are stripped on the server (`toPublic` in
[`lib/catalog.ts`](lib/catalog.ts)) before products reach the browser, and no
component renders them. Keep it that way — pricing is shared per enquiry.

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
- `scripts/shoot.mjs` is a dev utility that captures full-page screenshots at
  375/768/1440 px using the local Chrome install:
  `node scripts/shoot.mjs http://localhost:3000 ./shots home`
