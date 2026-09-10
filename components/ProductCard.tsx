import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import { categoryMeta, type PublicProduct } from "@/lib/catalog";

export default function ProductCard({ product }: { product: PublicProduct }) {
  const meta = categoryMeta(product.category);
  const packBits = [
    product.piecesPerPack ? `${product.piecesPerPack} pcs` : undefined,
    product.weight,
    product.unitsPerCarton,
  ].filter(Boolean);
  const variantNote = product.contents
    ? `${product.contents.length} packs inside`
    : product.flavours && product.flavours.length > 1
      ? `${product.flavours.length} flavours`
      : undefined;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-card transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:shadow-lift">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col rounded-[1.25rem]"
        aria-label={`${product.name} — view details`}
      >
        <div
          className="relative aspect-[5/4] overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${meta.tint} 0%, #ffffff 95%)`,
          }}
        >
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[0.65rem] font-semibold tracking-wide text-cocoa shadow-sm backdrop-blur">
            {product.code}
          </span>
          <span
            className="absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: meta.accent }}
          >
            {product.brand}
          </span>
          {product.palmOilFree && (
            <span className="absolute bottom-4 left-4 z-10 rounded-full bg-[#1f7a3f] px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
              Palm oil free
            </span>
          )}
          <ProductArt product={product} variant="card" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-cocoa">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
            {product.format}
            {variantNote ? ` · ${variantNote}` : ""}
          </p>
          {packBits.length > 0 && (
            <p className="mt-3 text-sm text-ink-soft">{packBits.join(" · ")}</p>
          )}
          {product.priceInr !== undefined && (
            <p className="mt-auto flex items-baseline gap-1.5 pt-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink-soft">
                MRP
              </span>
              <span className="font-display text-xl font-semibold text-cocoa">
                ₹{product.priceInr}
              </span>
            </p>
          )}
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link
          href={`/contact?sku=${product.code}`}
          className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-deep"
        >
          Enquire to stock
          <span className="sr-only"> {product.name}</span>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
