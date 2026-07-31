import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Meet the names on the wrapper — Wonderbar, Truffles, Temptations, Luxury Selection, Savor, the Eclairs family, My-Chew, Milky Malai Mithai and Cacao Ertugrul.",
};

type BrandSection = {
  name: string;
  kicker: string;
  story: [string, string];
  meta: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
  plate: string; // bg classes
  text: string;
  sub: string;
  kickerColor: string;
  initial: string;
};

const SECTIONS: BrandSection[] = [
  {
    name: "Wonderbar",
    kicker: "The bar with a secret centre",
    story: [
      "Snap one open and you’ll find the surprise — a milk chocolate shell hiding a creamy vanilla heart, or its pink twin: white chocolate wrapped around soft strawberry cream.",
      "Sized for small hands and school bags, Wonderbar is the range that turns a five-minute break into the best part of the day.",
    ],
    meta: "Milk & white chocolate · Vanilla and strawberry centres · Display boxes and counter tubs",
    image: "/products/km-04.webp",
    alt: "Wonderbar milk chocolate display box",
    href: "/products?q=wonderbar",
    cta: "See Wonderbar in the catalogue",
    plate: "bg-[linear-gradient(155deg,#333f9e,#1a2158)]",
    text: "text-white",
    sub: "text-white/75",
    kickerColor: "text-[#ffd84d]",
    initial: "W",
  },
  {
    name: "Truffles",
    kicker: "Little gifts, twist-wrapped",
    story: [
      "Six flavours — raspberry, mint, strawberry, coconut, peanut butter and orange — each one a creme-filled cacao truffle dressed in its own bright foil.",
      "Boxed for the counter or carried home by the handle, Truffles is proof that the smallest presents are opened fastest.",
    ],
    meta: "Creme-filled cacao truffles · Six flavours · Boxes and handled packs",
    image: "/products/km-19.webp",
    alt: "Kimico Truffles handled boxes in six flavours",
    href: "/products?q=truffles",
    cta: "Unwrap the Truffles range",
    plate: "bg-[linear-gradient(155deg,#6b3f1d,#341c0c)]",
    text: "text-cream",
    sub: "text-cream/70",
    kickerColor: "text-brand-gold",
    initial: "T",
  },
  {
    name: "Temptations",
    kicker: "Kimmy’s rich creme heart",
    story: [
      "Temptations takes the truffle somewhere silkier — milk chocolate with a rich creme centre, boxed by flavour from strawberry to almond.",
      "For pantries that plan ahead, the seventy-piece bucket pack keeps temptation within arm’s reach, resealable lid and all.",
    ],
    meta: "Milk chocolate truffles · Six flavours · Boxes and bucket packs",
    image: "/products/km-22.webp",
    alt: "Temptations bucket packs stacked in six flavours",
    href: "/products?q=temptations",
    cta: "Browse Temptations",
    plate: "bg-[linear-gradient(155deg,#4a5b74,#2b3646)]",
    text: "text-white",
    sub: "text-white/75",
    kickerColor: "text-[#ffd84d]",
    initial: "T",
  },
  {
    name: "Luxury Selection",
    kicker: "Our most indulgent pouch",
    story: [
      "Seven hundred and fifty grams of soft-smooth chocolate truffles, in six finishes from orange to peanut butter — this is the range we reach for when the occasion deserves a little ceremony.",
      "Each pouch pours out a small mountain of individually wrapped pieces. Make moments more memorable, as the pack says.",
    ],
    meta: "Creamy chocolate truffles · 750-gram pouches · Six variants",
    image: "/products/km-20.webp",
    alt: "Kimico Luxury Selection pouches in six colours",
    href: "/products?q=luxury",
    cta: "Enter the Luxury Selection",
    plate: "bg-[linear-gradient(155deg,#46281a,#1f0f07)]",
    text: "text-cream",
    sub: "text-cream/70",
    kickerColor: "text-brand-gold",
    initial: "L",
  },
  {
    name: "Savor",
    kicker: "Dry fruits in silky chocolate",
    story: [
      "Whole almonds, hazelnuts and raisins, rolled slowly in silky chocolate and sealed inside a gold keepsake tin that outlives the last piece.",
      "Savor is our quiet luxury — the tin that appears at Diwali, at weddings, and on desks that deserve better biscuits.",
    ],
    meta: "Chocolate-coated almond, hazelnut & raisin · 180-gram keepsake tins",
    image: "/products/km-03.webp",
    alt: "Savor Assortments gold tins",
    href: "/products?q=savor",
    cta: "Open the Savor tin",
    plate: "bg-[linear-gradient(155deg,#f0e2bd,#d9b968)]",
    text: "text-cocoa",
    sub: "text-cocoa/75",
    kickerColor: "text-[#7c5d0e]",
    initial: "S",
  },
  {
    name: "The Eclairs Family",
    kicker: "Royale Eclairs · Eclair’OH · Choco Eclairs",
    story: [
      "Caramel outside, molten centre inside — our eclairs come in more moods than any other range. Royale Eclairs alone fills a jar with twelve flavours, from goa kaju to double dip.",
      "Eclair’OH dresses the family up for gifting, and Kimmy’s Choco Eclairs still hides a free tattoo in every wrapper. Some traditions are non-negotiable.",
    ],
    meta: "Centre-filled eclairs · Pouches, jars, boxes and gift packs",
    image: "/products/km-39.webp",
    alt: "Royale Eclairs jars in twelve flavours",
    href: "/products?q=eclair",
    cta: "Meet the whole eclair family",
    plate: "bg-[linear-gradient(155deg,#4a2c63,#2a1738)]",
    text: "text-white",
    sub: "text-white/75",
    kickerColor: "text-[#e8b45a]",
    initial: "E",
  },
  {
    name: "My-Chew",
    kicker: "Fruit you can hear",
    story: [
      "Mango, strawberry, orange and green apple — chewy fruit candy sticks with flavours loud enough to trade in the playground.",
      "Stick packs, display trays or the hundred-piece pouch: however it arrives, My-Chew rarely survives the week.",
    ],
    meta: "Chewy fruity candy · Four flavours · Sticks, trays and pouches",
    image: "/products/km-12.webp",
    alt: "My-Chew display boxes in four fruit flavours",
    href: "/products?q=my-chew",
    cta: "Chew through the range",
    plate: "bg-[linear-gradient(155deg,#e8722a,#b23c10)]",
    text: "text-white",
    sub: "text-white/80",
    kickerColor: "text-[#ffe08a]",
    initial: "M",
  },
  {
    name: "Milky Malai Mithai",
    kicker: "Mithai, reimagined as a bar",
    story: [
      "Milky, Rosey, Pista and Kesar — four moods of Indian mithai folded into a creamy centre-filled bar that needs no plate and no occasion.",
      "It’s the flavour of a sweet shop counter, wrapped for the school canteen.",
    ],
    meta: "Creamy centre-filled bars · Four mithai flavours · Counter tubs",
    image: "/products/km-07.webp",
    alt: "Milky Malai Mithai tubs in four flavours",
    href: "/products?q=malai",
    cta: "Taste the mithai bars",
    plate: "bg-[linear-gradient(155deg,#7fc4e8,#3a86b8)]",
    text: "text-cocoa",
    sub: "text-cocoa/80",
    kickerColor: "text-white",
    initial: "M",
  },
  {
    name: "Cacao Ertugrul",
    kicker: "A Turkish accent",
    story: [
      "Cream-filled compound chocolate in the Turkish style — cool, milky cubes under a cocoa shell, wrapped in colours that stack beautifully in a bowl.",
      "By the handled box or the 700-gram family pouch, Ertugrul is the range for households that host.",
    ],
    meta: "Cream-filled compound chocolate · Handled boxes and family pouches",
    image: "/products/km-09.webp",
    alt: "Cacao Ertugrul family pouch",
    href: "/products?q=ertugrul",
    cta: "Discover Cacao Ertugrul",
    plate: "bg-[linear-gradient(155deg,#f4e9cf,#dcc48e)]",
    text: "text-cocoa",
    sub: "text-cocoa/75",
    kickerColor: "text-[#7c5d0e]",
    initial: "C",
  },
];

export default function BrandsPage() {
  return (
    <div>
      <header className="mx-auto max-w-[90rem] px-5 pb-16 pt-14 sm:px-10 lg:pt-20">
        <h1 className="display-soft max-w-4xl font-display text-5xl font-semibold leading-[1.0] text-cocoa sm:text-7xl">
          Nine names on the <em className="display-wonk italic text-brand-red">wrapper</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Under KIMICO and KIMMY live the ranges people actually ask for by
          name. This is who they are — and where to find them in the
          catalogue.
        </p>
      </header>

      <div className="space-y-8 px-5 pb-24 sm:px-10">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.name}>
            <section
              aria-labelledby={`brand-${i}`}
              className={`plate relative mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] ${s.plate} shadow-card ${
                s.text === "text-cocoa" ? "" : "on-dark"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -bottom-10 right-2 select-none font-display text-[16rem] font-semibold leading-none opacity-[0.08] sm:text-[22rem] ${s.text}`}
              >
                {s.initial}
              </span>
              <div
                className={`relative grid items-center gap-10 px-7 py-14 sm:px-12 lg:gap-16 lg:py-20 ${
                  i % 2 ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"
                }`}
              >
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <p className={`text-[0.7rem] font-bold uppercase tracking-[0.3em] ${s.kickerColor}`}>
                    {s.kicker}
                  </p>
                  <h2
                    id={`brand-${i}`}
                    className={`display-soft mt-3 font-display text-4xl font-semibold sm:text-6xl ${s.text}`}
                  >
                    {s.name}
                  </h2>
                  <p className={`mt-6 text-base leading-relaxed sm:text-lg ${s.sub}`}>
                    {s.story[0]}
                  </p>
                  <p className={`mt-4 text-base leading-relaxed sm:text-lg ${s.sub}`}>
                    {s.story[1]}
                  </p>
                  <p className={`mt-6 text-xs font-semibold uppercase tracking-[0.18em] ${s.kickerColor}`}>
                    {s.meta}
                  </p>
                  <Link
                    href={s.href}
                    className={`press group mt-8 inline-flex items-center gap-3 rounded-full border-2 px-6 py-3 text-sm font-semibold transition-[transform,background-color,color,border-color] ${
                      s.text === "text-cocoa"
                        ? "border-cocoa/40 text-cocoa hover:bg-cocoa hover:text-cream"
                        : "border-white/40 text-white hover:bg-white hover:text-cocoa"
                    }`}
                  >
                    {s.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
                <div className={`flex items-center justify-center ${i % 2 ? "lg:order-1" : ""}`}>
                  <Image
                    src={s.image}
                    alt={s.alt}
                    width={1000}
                    height={760}
                    sizes="(min-width: 1024px) 40vw, 88vw"
                    className="max-h-[20rem] w-auto max-w-full object-contain drop-shadow-[0_34px_38px_rgba(0,0,0,0.4)] sm:max-h-[24rem]"
                  />
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
