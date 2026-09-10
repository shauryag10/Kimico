import { products, type Category, type Product } from "@/data/products";

/**
 * Every product field is public. `priceInr` is the pack MRP — the printed
 * consumer price — and is shown on cards and detail pages.
 */
export type PublicProduct = Product;

export function toPublic(p: Product): PublicProduct {
  return p;
}

export const publicProducts: PublicProduct[] = products.map(toPublic);

export type CategoryMeta = {
  name: Category;
  slug: string;
  short: string;
  blurb: string;
  /** Card / hero image representing the category */
  image: string;
  /** Tailwind classes — literal strings so the compiler can see them */
  accentText: string;
  accentBg: string;
  tintBg: string;
  /** CSS color values for gradients + JSON-LD-free inline styling */
  accent: string;
  tint: string;
};

export const CATEGORY_META: CategoryMeta[] = [
  {
    name: "Chocolates & Bars",
    slug: "chocolates-bars",
    short: "Chocolates",
    blurb: "Centre-filled bars and compound chocolate, from Wonderbar to Cacao Ertugrul.",
    image: "/products/km-04.webp",
    accentText: "text-cat-chocolates",
    accentBg: "bg-cat-chocolates",
    tintBg: "bg-cat-chocolates-tint",
    accent: "#2b3990",
    tint: "#e7eaf7",
  },
  {
    name: "Truffles & Gifting",
    slug: "truffles-gifting",
    short: "Truffles",
    blurb: "Creme-filled cacao truffles, keepsake tins and festival gift packs.",
    image: "/products/km-22.webp",
    accentText: "text-cat-truffles",
    accentBg: "bg-cat-truffles",
    tintBg: "bg-cat-truffles-tint",
    accent: "#6b3f1d",
    tint: "#f0e5d3",
  },
  {
    name: "Toffees & Eclairs",
    slug: "toffees-eclairs",
    short: "Toffees",
    blurb: "Royale eclairs, dry-fruit toffees and chewy classics by the pouch.",
    image: "/products/km-32.webp",
    accentText: "text-cat-toffees",
    accentBg: "bg-cat-toffees",
    tintBg: "bg-cat-toffees-tint",
    accent: "#4a2c63",
    tint: "#ece5f2",
  },
  {
    name: "Jellies & Fun",
    slug: "jellies-fun",
    short: "Jellies",
    blurb: "Cake-shaped jellies, tube jellies and tangy imli — pure play.",
    image: "/products/km-10.webp",
    accentText: "text-cat-jellies",
    accentBg: "bg-cat-jellies",
    tintBg: "bg-cat-jellies-tint",
    accent: "#d9352c",
    tint: "#fbe7e0",
  },
  {
    name: "Jars & Bulk Packs",
    slug: "jars-bulk",
    short: "Jars",
    blurb: "Counter jars and trade packs that keep shelves stocked and moving.",
    image: "/products/km-43.webp",
    accentText: "text-cat-jars",
    accentBg: "bg-cat-jars",
    tintBg: "bg-cat-jars-tint",
    accent: "#4c5b76",
    tint: "#e7eaee",
  },
  {
    name: "Kids & Novelty",
    slug: "kids-novelty",
    short: "Kids",
    blurb: "Toy-candy crossovers — blooming pops, toothbrush candy and more.",
    image: "/products/km-26.webp",
    accentText: "text-cat-kids",
    accentBg: "bg-cat-kids",
    tintBg: "bg-cat-kids-tint",
    accent: "#1f8fce",
    tint: "#e2f1fa",
  },
];

// Brands with products in the range today. JK Toys stays in the Product
// type for when its lines return.
export const BRANDS = ["Kimico", "Kimmy"] as const;
export const FORMATS = [
  "Pouch",
  "Jar",
  "Box",
  "Display Box",
  "Container",
  "Tin",
  "Bucket",
  "Pack",
] as const;

export function categoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORY_META.find((c) => c.slug === slug);
}

export function categoryMeta(name: Category): CategoryMeta {
  return CATEGORY_META.find((c) => c.name === name)!;
}

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(p: Product, count = 4): Product[] {
  return products
    .filter((x) => x.category === p.category && x.code !== p.code)
    .slice(0, count);
}
