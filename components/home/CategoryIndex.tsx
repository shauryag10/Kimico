import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { CATEGORY_META } from "@/lib/catalog";
import { products } from "@/data/products";

/**
 * Editorial index of the six ranges — oversized serif rows that flood with
 * their category colour on hover while the hero product swings in.
 */
export default function CategoryIndex() {
  return (
    <section aria-labelledby="range-heading" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-brand-gold sm:text-xs">
              <span aria-hidden="true" className="h-px w-10 bg-brand-gold" />
              The range
            </p>
            <h2
              id="range-heading"
              className="display-soft mt-4 font-display text-4xl font-semibold text-cocoa sm:text-6xl"
            >
              Six families of sweetness
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Every one of our {products.length} products lives in one of these
            six ranges — press into any of them to browse the catalogue.
          </p>
        </Reveal>

        <ul className="mt-14 border-t-2 border-cocoa/15">
          {CATEGORY_META.map((c, i) => {
            const count = products.filter((p) => p.category === c.name).length;
            return (
              <Reveal as="li" key={c.slug} delay={i * 0.04}>
                <Link
                  href={`/products?category=${c.slug}`}
                  style={{ "--acc": c.accent } as React.CSSProperties}
                  className="group relative flex items-center gap-5 overflow-hidden border-b-2 border-cocoa/15 py-7 pl-2 pr-3 transition-colors duration-300 hover:border-transparent sm:gap-8 sm:py-9 sm:pl-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-(--acc) transition-transform duration-300 ease-out group-hover:scale-y-100"
                  />
                  <span className="relative font-display text-sm italic text-ink-soft transition-colors duration-300 group-hover:text-cream/80 sm:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-soft relative flex-1 font-display text-[clamp(1.7rem,4.6vw,4rem)] font-semibold leading-none text-cocoa transition-colors duration-300 group-hover:text-cream">
                    {c.name}
                  </span>
                  <span className="relative hidden max-w-[15rem] text-sm leading-snug text-ink-soft transition-colors duration-300 group-hover:text-cream/85 lg:block">
                    {c.blurb}
                  </span>
                  <span className="relative rounded-full border border-cocoa/25 px-3.5 py-1.5 text-xs font-semibold text-cocoa transition-colors duration-300 group-hover:border-cream/40 group-hover:text-cream">
                    {count}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cocoa/25 text-cocoa transition-all duration-300 group-hover:rotate-45 group-hover:border-cream/40 group-hover:text-cream"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 13 13 3M5.5 3H13v7.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[38%] top-1/2 z-10 hidden h-[5.5rem] w-40 -translate-y-1/2 rotate-6 scale-50 opacity-0 drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 lg:block"
                  >
                    <Image
                      src={c.image}
                      alt=""
                      width={480}
                      height={360}
                      sizes="160px"
                      className="h-full w-full object-contain"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
