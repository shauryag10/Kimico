"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  BRANDS,
  CATEGORY_META,
  FORMATS,
  type PublicProduct,
} from "@/lib/catalog";

type Filters = {
  category: string; // category slug or ""
  brand: string;
  format: string;
  q: string;
};

function Pill({
  active,
  onClick,
  children,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-cocoa bg-cocoa text-cream"
          : "border-cocoa/20 bg-white/70 text-cocoa hover:border-cocoa/50"
      }`}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dot }}
        />
      )}
      {children}
    </button>
  );
}

export default function CatalogueExplorer({
  products,
  initial,
}: {
  products: PublicProduct[];
  initial: Filters;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>(initial);

  const apply = useCallback(
    (next: Partial<Filters>) => {
      const merged = { ...filters, ...next };
      setFilters(merged);
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(merged)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      router.replace(`/products${params.size ? `?${params}` : ""}`, {
        scroll: false,
      });
    },
    [filters, router, searchParams],
  );

  const visible = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const cat = CATEGORY_META.find((c) => c.slug === filters.category)?.name;
    return products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      if (filters.format && p.format !== filters.format) return false;
      if (q && !`${p.name} ${p.code}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, filters]);

  return (
    <div>
      {/* Filter rail */}
      <div className="sticky top-[57px] z-30 -mx-5 border-b border-cocoa/10 bg-cream/90 px-5 py-4 backdrop-blur-md sm:-mx-10 sm:px-10">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <label className="relative min-w-56 flex-1 sm:max-w-xs">
              <span className="sr-only">Search by product name or item code</span>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
              >
                <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.6" />
                <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={filters.q}
                onChange={(e) => apply({ q: e.target.value })}
                placeholder="Search name or item code…"
                className="w-full rounded-full border border-cocoa/20 bg-white py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-cocoa focus:outline-none"
              />
            </label>
            <p className="text-sm font-medium text-ink-soft" aria-live="polite">
              {visible.length} of {products.length} products
            </p>
            {(filters.category || filters.brand || filters.format || filters.q) && (
              <button
                type="button"
                onClick={() => apply({ category: "", brand: "", format: "", q: "" })}
                className="text-sm font-semibold text-brand-red underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            <Pill active={!filters.category} onClick={() => apply({ category: "" })}>
              All ranges
            </Pill>
            {CATEGORY_META.map((c) => (
              <Pill
                key={c.slug}
                active={filters.category === c.slug}
                onClick={() =>
                  apply({ category: filters.category === c.slug ? "" : c.slug })
                }
                dot={c.accent}
              >
                {c.name}
              </Pill>
            ))}
          </div>

          <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
            <span className="mr-1 self-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
              Brand
            </span>
            {BRANDS.map((b) => (
              <Pill
                key={b}
                active={filters.brand === b}
                onClick={() => apply({ brand: filters.brand === b ? "" : b })}
              >
                {b}
              </Pill>
            ))}
            <span className="ml-4 mr-1 self-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
              Format
            </span>
            {FORMATS.map((f) => (
              <Pill
                key={f}
                active={filters.format === f}
                onClick={() => apply({ format: filters.format === f ? "" : f })}
              >
                {f}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[90rem] pb-24 pt-10">
        {visible.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-cocoa/20 px-8 py-24 text-center">
            <p className="font-display text-3xl font-semibold text-cocoa">
              Nothing in the jar
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              No products match that combination. Try clearing a filter or two —
              the full range is only a click away.
            </p>
            <button
              type="button"
              onClick={() => apply({ category: "", brand: "", format: "", q: "" })}
              className="mt-8 rounded-full bg-cocoa px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-red"
            >
              Show all {products.length} products
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <li key={p.code}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
