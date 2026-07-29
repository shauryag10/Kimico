import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { COMPANY } from "@/lib/site";

/** Full-bleed brand-red statement band — the distributor call to action. */
export default function EnquiryBand() {
  return (
    <section
      aria-labelledby="stock-heading"
      className="grain relative overflow-hidden bg-[linear-gradient(140deg,#b31218,#e01b22_55%,#9c0f15)] text-white"
  >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="float-bob absolute right-[6%] top-10 hidden w-40 opacity-90 lg:block"
        style={{ "--bob-rot": "10deg" } as React.CSSProperties}
      >
        <Image
          src="/brand/extra-jelly.webp"
          alt=""
          width={496}
          height={355}
          sizes="160px"
          className="h-auto w-full drop-shadow-[0_20px_24px_rgba(0,0,0,0.35)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="float-bob absolute bottom-8 right-[24%] hidden w-32 opacity-90 lg:block"
        style={{ "--bob-rot": "-8deg", animationDelay: "1.6s" } as React.CSSProperties}
      >
        <Image
          src="/brand/extra-ertugrul.webp"
          alt=""
          width={551}
          height={382}
          sizes="130px"
          className="h-auto w-full drop-shadow-[0_20px_24px_rgba(0,0,0,0.35)]"
        />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-32">
        <Reveal>
          <p className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/80 sm:text-xs">
            <span aria-hidden="true" className="h-px w-10 bg-white/60" />
            Stocking Kimico
          </p>
          <h2
            id="stock-heading"
            className="display-soft mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] sm:text-6xl"
          >
            Put <em className="italic">happiness</em> on your shelves
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Retailer, wholesaler or distributor — tell us about your market and
            we’ll come back with pack specifications, carton details and trade
            pricing for the ranges you care about.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-red shadow-lift transition-all hover:-translate-y-0.5 hover:bg-cream"
            >
              Start a distributor enquiry
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              or call customer care {COMPANY.phone}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium text-white/90">
            {["49-product range", "Carton-wise pack specs", "Pricing on request"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
