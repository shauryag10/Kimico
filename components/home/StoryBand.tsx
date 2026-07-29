import Image from "next/image";
import Link from "next/link";
import { Reveal, Parallax } from "@/components/motion";
import { COMPANY } from "@/lib/site";

/** Dark cocoa editorial band — founder story with a giant outlined 1988. */
export default function StoryBand() {
  return (
    <section
      aria-labelledby="story-heading"
      className="grain relative overflow-hidden bg-cocoa text-cream"
    >
      <Image
        src="/brand/texture-cocoa.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-60 mix-blend-screen"
      />
      <span
        aria-hidden="true"
        className="text-outline-cream pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[24rem] font-semibold leading-none opacity-70 xl:block"
      >
        ’88
      </span>

      <div className="relative mx-auto max-w-[90rem] px-5 py-28 sm:px-10 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-brand-gold sm:text-xs">
                <span aria-hidden="true" className="h-px w-10 bg-brand-gold" />
                Since {COMPANY.founded}
              </p>
              <h2
                id="story-heading"
                className="display-soft mt-5 font-display text-4xl font-semibold leading-[1.02] sm:text-6xl"
              >
                A sweet shop that grew into{" "}
                <em className="text-foil italic">a house of brands</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-cream/70">
                The {COMPANY.group} was established in {COMPANY.founded} by the
                late Shri Jhamandas Mehtani and carried forward by his son,
                Shri Nareshkumar Jhamandas Mehtani. What began as a promise —
                a refreshing experience in every wrapper — is today a
                confectionery house whose truffles, toffees and jellies travel
                far beyond Ahmedabad.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-cream/70">
                The belief has never changed: quality ingredients, exquisite
                flavours and meticulous craftsmanship — in every single piece.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-3 rounded-full border-2 border-brand-gold/70 px-7 py-3.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-cocoa"
              >
                Read our story
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative hidden lg:block">
            <div className="relative mx-auto w-[86%] overflow-hidden rounded-t-[14rem] rounded-b-3xl border border-brand-gold/30 bg-[linear-gradient(170deg,#46281a,#241209)] p-10 pt-20">
              <Parallax distance={26}>
                <Image
                  src="/products/km-20.webp"
                  alt="Kimico Luxury Selection truffle pouches"
                  width={1200}
                  height={640}
                  sizes="420px"
                  className="h-auto w-full drop-shadow-[0_30px_34px_rgba(0,0,0,0.5)]"
                />
              </Parallax>
              <div className="float-bob absolute left-6 top-8 w-24" style={{ "--bob-rot": "-8deg" } as React.CSSProperties}>
                <Image
                  src="/brand/extra-ertugrul.webp"
                  alt=""
                  width={551}
                  height={382}
                  sizes="96px"
                  className="h-auto w-full drop-shadow-[0_16px_18px_rgba(0,0,0,0.5)]"
                />
              </div>
              <p className="mt-8 text-center font-display text-lg italic text-brand-gold/90">
                “{COMPANY.tagline}”
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
