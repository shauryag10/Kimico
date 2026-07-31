import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogueExplorer from "@/components/catalogue/CatalogueExplorer";
import { Reveal } from "@/components/motion";
import { publicProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the full Kimico Foods range — 49 products across chocolates, truffles, toffees, eclairs, jellies, jars and novelty candy. Filter by range, brand and pack format.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const initial = {
    category: first(sp.category),
    brand: first(sp.brand),
    format: first(sp.format),
    q: first(sp.q),
  };

  return (
    <div className="px-5 sm:px-10">
      <header className="mx-auto max-w-[90rem] pb-8 pt-14 lg:pt-20">
        <Reveal>
          <h1 className="display-soft font-display text-5xl font-semibold text-cocoa sm:text-7xl">
            Every sweet thing<span className="text-brand-red">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            All {publicProducts.length} products under the Kimico, Kimmy and JK
            Toys marks. Filter by range, brand or pack format — pricing is
            shared on request for every item.
          </p>
        </Reveal>
      </header>

      <Suspense>
        <CatalogueExplorer products={publicProducts} initial={initial} />
      </Suspense>
    </div>
  );
}
