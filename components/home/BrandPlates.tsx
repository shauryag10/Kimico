import Link from "next/link";
import { Reveal } from "@/components/motion";

/** Two arched brand plates — KIMICO and KIMMY — side by side. */
export default function BrandPlates() {
  return (
    <section aria-label="Our brands" className="mx-auto max-w-[90rem] px-5 pb-24 pt-20 sm:px-10 lg:pb-32">
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal>
          <Link
            href="/products?brand=Kimico"
            className="group plate relative flex h-full flex-col items-center overflow-hidden rounded-t-[9rem] rounded-b-[2rem] bg-[linear-gradient(175deg,#b31218,#e01b22_55%,#8f0d13)] px-8 pb-10 pt-16 text-center shadow-card transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 left-1/2 h-64 w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.22),transparent_65%)]"
            />
            <span className="rounded-full border border-white/40 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/90">
              The house brand
            </span>
            <span className="display-soft mt-6 font-display text-6xl font-semibold text-white sm:text-7xl">
              KIMICO
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
              Chocolates, truffles and modern counter classics — the mark on
              our most-loved wrappers.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-red transition-transform duration-300 group-hover:scale-105">
              Shop Kimico
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/products?brand=Kimmy"
            className="group plate relative flex h-full flex-col items-center overflow-hidden rounded-t-[9rem] rounded-b-[2rem] border border-brand-gold/40 bg-[linear-gradient(175deg,#f4e9cf,#e9d29a_60%,#d9b968)] px-8 pb-10 pt-16 text-center shadow-card transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span className="rounded-full border border-cocoa/30 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cocoa/80">
              The heritage mark
            </span>
            <span className="mt-6 flex items-end justify-center gap-3">
              <span className="display-soft font-display text-6xl font-semibold text-cocoa sm:text-7xl">
                KIMMY
              </span>
            </span>
            <p className="font-display text-base italic text-cocoa/70">since 1988</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cocoa/80">
              Toffees, counter jars and trade favourites — carrying the family
              year on every oval.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream transition-transform duration-300 group-hover:scale-105">
              Shop Kimmy
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
