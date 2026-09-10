import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { COMPANY } from "@/lib/site";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Kimmy Group of Companies was established in 1988 by the late Shri Jhamandas Mehtani and continued by Shri Nareshkumar Jhamandas Mehtani. Quality ingredients, exquisite flavours, meticulous craftsmanship — from Ahmedabad to everywhere.",
};

const VALUES = [
  {
    title: "Quality ingredients",
    body: "Premium chocolates and carefully selected inputs — because a good centre deserves a better shell.",
  },
  {
    title: "Exquisite flavours",
    body: "From goa kaju to green apple, our confectioners chase flavours people remember, not just recognise.",
  },
  {
    title: "Meticulous craftsmanship",
    body: "Every truffle twist-wrapped, every jar packed to count — care you can see before you taste anything.",
  },
];

// Journey entries render in order — add { year, text } as milestones are confirmed.
const TIMELINE: { year: string; text: string }[] = [
  {
    year: "1988",
    text: "The late Shri Jhamandas Mehtani establishes the Kimmy Group of Companies in Ahmedabad, with a promise of a refreshing experience in every wrapper.",
  },
  {
    year: "Today",
    text: `Under Shri Nareshkumar Jhamandas Mehtani, the house spans ${products.length} products across chocolates, truffles, toffees, jellies and novelty candy — sold under the KIMICO and KIMMY marks.`,
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Cocoa hero */}
      <section className="on-dark plate relative overflow-hidden bg-cocoa text-cream">
        <Image
          src="/brand/texture-cocoa.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-60 mix-blend-screen"
        />
        <span
          aria-hidden="true"
          className="text-outline-cream pointer-events-none absolute -right-8 bottom-[-4rem] hidden select-none font-display text-[26rem] font-semibold leading-none opacity-60 lg:block"
        >
          ’88
        </span>
        <div className="relative mx-auto max-w-[90rem] px-5 py-24 sm:px-10 lg:py-32">
          <h1 className="display-soft max-w-4xl font-display text-5xl font-semibold leading-[1.0] sm:text-7xl">
            Thirty-eight years of{" "}
            <em className="text-foil display-wonk italic">sweet moments</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/75">
            The {COMPANY.group} was established in {COMPANY.founded} by our
            late Shri Jhamandas Mehtani and followed by his son Shri
            Nareshkumar Jhamandas Mehtani, with an aim to give customers a
            refreshing experience with every confectionery product. Since its
            foundation in India, the house has built a renowned name for
            quality confectionery.
          </p>
        </div>
      </section>

      {/* Craft narrative + values */}
      <section aria-labelledby="craft-heading" className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <h2
              id="craft-heading"
              className="display-soft font-display text-4xl font-semibold text-cocoa sm:text-5xl"
            >
              The art of confectionery, taken personally
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              We believe the art of confectionery lies in the perfect balance
              of quality ingredients, exquisite flavours and meticulous
              craftsmanship. Our dedicated team of confectioners and pastry
              chefs combines expertise with a dash of creativity to deliver a
              diverse range of mouth-watering delights — classic favourites
              beside innovative creations, chocolates beside luscious
              truffles, velvety caramels, jellies and much more.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Every treat is made with the utmost care at our Odhav, Ahmedabad
              facility and meticulously packaged so it arrives in pristine
              condition — ready to be savoured and shared. Because life, we
              find, is made sweeter one scrumptious treat at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="press rounded-full bg-cocoa px-7 py-3.5 text-sm font-semibold text-cream transition-[transform,background-color] hover:bg-brand-red"
              >
                Browse the range
              </Link>
              <Link
                href="/contact"
                className="press rounded-full border-2 border-cocoa/25 px-7 py-[0.8rem] text-sm font-semibold text-cocoa transition-[transform,border-color,color] hover:border-brand-red hover:text-brand-red"
              >
                Talk distribution
              </Link>
            </div>
          </Reveal>
          <dl className="content-start self-center border-t border-brand-gold/40">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="border-b border-brand-gold/40 py-7">
                  <dt className="font-display text-2xl font-semibold text-cocoa">
                    {v.title}
                  </dt>
                  <dd className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                    {v.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="bg-cream-deep/60 py-24">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
          <Reveal>
            <h2
              id="timeline-heading"
              className="display-soft font-display text-4xl font-semibold text-cocoa sm:text-5xl"
            >
              Journey, {COMPANY.founded} → today
            </h2>
          </Reveal>
          <ol className="mt-14 space-y-0">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.05}>
                <div className="relative grid gap-3 border-l-2 border-brand-gold/50 pb-12 pl-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-brand-gold bg-cream"
                  />
                  <p
                    className="font-display text-3xl font-semibold text-cocoa"
                  >
                    {t.year}
                  </p>
                  <p
                    className="max-w-2xl leading-relaxed text-ink-soft"
                  >
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Location band */}
      <section aria-labelledby="visit-heading" className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10">
        <Reveal>
          <div className="on-dark plate relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(150deg,#46281a,#2a1810)] px-8 py-14 text-cream sm:px-14">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[12rem] font-semibold italic leading-none text-brand-gold opacity-15"
            >
              K
            </span>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <h2
                  id="visit-heading"
                  className="display-soft font-display text-3xl font-semibold sm:text-4xl"
                >
                  Made in Ahmedabad. Wrapped for everywhere.
                </h2>
                <address className="mt-5 max-w-md text-pretty text-base not-italic leading-relaxed text-cream/75">
                  {COMPANY.name} · {COMPANY.address}
                </address>
                <p className="mt-3 text-sm text-cream/75">
                  Customer care{" "}
                  <a href={COMPANY.phoneHref} className="font-semibold text-brand-gold hover:underline">
                    {COMPANY.phone}
                  </a>
                </p>
              </div>
              <Link
                href="/contact"
                className="press justify-self-start rounded-full bg-brand-gold px-8 py-4 text-sm font-bold text-cocoa transition-[transform,background-color] hover:bg-brand-gold-soft lg:justify-self-end"
              >
                Plan a conversation
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
