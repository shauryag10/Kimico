import Image from "next/image";
import Link from "next/link";
import { categoryMeta, type PublicProduct } from "@/lib/catalog";

export default function ProductCard({ product }: { product: PublicProduct }) {
  const meta = categoryMeta(product.category);
  const packBits = [
    product.piecesPerPack ? `${product.piecesPerPack} pcs` : undefined,
    product.weight,
    product.unitsPerCarton,
  ].filter(Boolean);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none"
        aria-label={`${product.name} — view details`}
      >
        <div
          className="relative aspect-[5/4] overflow-hidden"
          style={{
            background: `linear-gradient(155deg, ${meta.tint} 0%, #ffffff 95%)`,
          }}
        >
          <span
            className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[0.65rem] font-semibold tracking-wide text-cocoa shadow-sm backdrop-blur"
          >
            {product.code}
          </span>
          <span
            className="absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white"
            style={{ backgroundColor: meta.accent }}
          >
            {product.brand}
          </span>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw"
            className="object-contain p-7 drop-shadow-[0_16px_18px_rgba(42,24,16,0.22)] transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-cocoa">
            {product.name}
          </h3>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
            {product.format}
            {product.flavours && product.flavours.length > 1
              ? ` · ${product.flavours.length} flavours`
              : ""}
          </p>
          {packBits.length > 0 && (
            <p className="mt-3 text-sm text-ink-soft">{packBits.join(" · ")}</p>
          )}
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link
          href={`/contact?sku=${product.code}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-deep"
        >
          Request pricing
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
