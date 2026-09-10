import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/motion";
import { products } from "@/data/products";
import {
  categoryMeta,
  productBySlug,
  relatedProducts,
  toPublic,
} from "@/lib/catalog";
import { COMPANY, SITE_URL } from "@/lib/site";

type Params = Promise<{ slug: string }>;

// Every product is prerendered from data/products.ts. Refusing unknown slugs
// here makes a retired or mistyped SKU a router-level 404 with a real 404
// status; with on-demand rendering, notFound() fires inside the root
// loading.tsx Suspense boundary after a 200 shell has already streamed.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.code})`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const meta = categoryMeta(product.category);
  const related = relatedProducts(product, 4).map(toPublic);

  const specs: [string, string][] = [
    ["Item code", product.code],
    ["Brand", product.brand],
    ["Range", product.category],
    ["Pack format", product.format],
    ...(product.piecesPerPack
      ? ([["Pieces per pack", `${product.piecesPerPack} pcs`]] as [string, string][])
      : []),
    ...(product.weight ? ([["Pack weight", product.weight]] as [string, string][]) : []),
    ...(product.unitsPerCarton
      ? ([["Units per carton", product.unitsPerCarton]] as [string, string][])
      : []),
  ];

  // Product schema. MRP is the printed consumer price, so it is published as
  // an Offer; availability is not tracked, so none is claimed.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    ...(product.image ? { image: `${SITE_URL}${product.image}` } : {}),
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    manufacturer: { "@type": "Organization", name: COMPANY.name },
    ...(product.priceInr !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: product.priceInr,
            priceCurrency: "INR",
          },
        }
      : {}),
  };

  return (
    <div className="px-5 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[90rem] pb-24 pt-10 lg:pt-14">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/products" className="hover:text-brand-red">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/products?category=${meta.slug}`}
                className="hover:text-brand-red"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-cocoa">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Image plate */}
          <Reveal>
          <div
            className="plate relative flex h-full min-h-[22rem] items-center justify-center overflow-hidden rounded-[2.5rem] p-10 sm:min-h-[28rem]"
            style={{
              background: `linear-gradient(150deg, ${meta.tint} 0%, #ffffff 100%)`,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-1.5 w-full"
              style={{ backgroundColor: meta.accent }}
            />
            <ProductArt product={product} variant="plate" priority />
          </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.1}>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: meta.accent }}
              >
                {product.brand}
              </span>
              <span className="rounded-full border border-cocoa/20 px-3 py-1 font-mono text-xs font-semibold text-cocoa">
                {product.code}
              </span>
              {product.palmOilFree && (
                <span className="rounded-full bg-[#1f7a3f] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white">
                  Palm oil free
                </span>
              )}
            </div>
            <h1 className="display-soft mt-5 font-display text-4xl font-semibold leading-[1.05] text-cocoa sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {product.description}
            </p>
            {product.priceInr !== undefined && (
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ink-soft">
                  MRP
                </span>
                <span className="font-display text-4xl font-semibold text-cocoa">
                  ₹{product.priceInr}
                </span>
                <span className="text-xs text-ink-soft">incl. of all taxes</span>
              </p>
            )}

            {(
              [
                ["Flavours", product.flavours],
                ["Inside the pack", product.contents],
              ] as [string, string[] | undefined][]
            )
              .filter(([, items]) => items && items.length > 0)
              .map(([label, items]) => (
                <div key={label} className="mt-7">
                  <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ink-soft">
                    {label}
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {items!.map((f) => (
                      <li
                        key={f}
                        className="rounded-full px-3.5 py-1.5 text-sm font-medium text-cocoa"
                        style={{ backgroundColor: meta.tint }}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            <div className="mt-8 overflow-hidden rounded-2xl border border-cocoa/15">
              <h2 className="sr-only">Pack specification</h2>
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([label, value], i) => (
                    <tr key={label} className={i % 2 ? "bg-white" : "bg-cream-deep/60"}>
                      <th
                        scope="row"
                        className="w-1/2 px-5 py-3 text-left font-medium text-ink-soft"
                      >
                        {label}
                      </th>
                      <td className="px-5 py-3 font-semibold text-cocoa">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?sku=${product.code}`}
                className="press rounded-full bg-brand-red px-8 py-4 text-sm font-semibold text-white shadow-lift transition-[transform,background-color] hover:bg-brand-red-deep"
              >
                Enquire about this product
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="text-sm font-semibold text-cocoa underline-offset-4 hover:underline"
              >
                {COMPANY.phone}
              </a>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              Trade pricing, samples and carton quantities are shared on
              request — mention item code {product.code} in your enquiry.
            </p>
          </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="related-heading"
                className="display-soft font-display text-3xl font-semibold text-cocoa sm:text-4xl"
              >
                More from {product.category}
              </h2>
              <Link
                href={`/products?category=${meta.slug}`}
                className="text-sm font-semibold text-brand-red underline-offset-4 hover:underline"
              >
                View the whole range
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.code}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
