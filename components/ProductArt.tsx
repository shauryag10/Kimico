import Image from "next/image";
import { categoryMeta, type PublicProduct } from "@/lib/catalog";

/**
 * Product imagery with a typographic fallback: a SKU that has no photo yet
 * renders its name on its range colour instead of a broken image or grey box.
 * Drop the file at /public/products/<code>.webp and set `image` in
 * data/products.ts to replace it.
 */
export default function ProductArt({
  product,
  variant,
  priority = false,
}: {
  product: PublicProduct;
  variant: "card" | "plate";
  priority?: boolean;
}) {
  const meta = categoryMeta(product.category);

  if (product.image) {
    return variant === "card" ? (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw"
        className="object-contain p-7 drop-shadow-[0_16px_18px_rgba(42,24,16,0.22)] transition-transform duration-500 group-hover:scale-[1.06]"
      />
    ) : (
      <Image
        src={product.image}
        alt={product.name}
        width={1200}
        height={900}
        priority={priority}
        sizes="(min-width: 1024px) 45vw, 92vw"
        className="max-h-[26rem] w-auto max-w-full object-contain drop-shadow-[0_34px_38px_rgba(42,24,16,0.3)]"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={product.name}
      className={`flex items-center justify-center text-center ${
        variant === "card" ? "absolute inset-0 p-8" : "min-h-[22rem] w-full p-12 sm:min-h-[26rem]"
      }`}
      style={{
        background: `linear-gradient(150deg, ${meta.accent} 0%, ${meta.tint} 135%)`,
      }}
    >
      <p
        className={`display-soft font-display font-semibold leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)] ${
          variant === "card" ? "text-2xl" : "text-4xl sm:text-5xl"
        }`}
      >
        {product.name}
      </p>
    </div>
  );
}
