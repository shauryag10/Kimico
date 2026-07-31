"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "@/components/motion";

type Slide = {
  name: string;
  line: string;
  image: string;
  alt: string;
  href: string;
  panel: string;
  text: string;
  kicker: string;
  initial: string;
};

const SLIDES: Slide[] = [
  {
    name: "Savor",
    line: "Almond, hazelnut & raisin sealed in silky chocolate — the keepsake gold tin.",
    image: "/products/km-03.webp",
    alt: "Savor Assortments gold tins",
    href: "/products/savor-assortments-tin",
    panel: "bg-[linear-gradient(160deg,#f0e2bd,#ddbe72_70%,#c9a04a)]",
    text: "text-cocoa",
    kicker: "text-[#7c5d0e]",
    initial: "S",
  },
  {
    name: "Luxury Selection",
    line: "Creamy chocolate truffles in six flavours, 750 grams at a time.",
    image: "/products/km-20.webp",
    alt: "Kimico Luxury Selection truffle pouches in six colours",
    href: "/products/luxury-selection-truffles",
    panel: "bg-[linear-gradient(160deg,#4a2a18,#241209)]",
    text: "text-cream",
    kicker: "text-brand-gold",
    initial: "L",
  },
  {
    name: "Truffles",
    line: "Creme-filled cacao truffles, twist-wrapped like little gifts.",
    image: "/products/km-19.webp",
    alt: "Kimico Truffles handled boxes in six flavours",
    href: "/products/truffles-box",
    panel: "bg-[linear-gradient(160deg,#7a4a22,#3e2311)]",
    text: "text-cream",
    kicker: "text-brand-gold-soft",
    initial: "T",
  },
  {
    name: "Wonderbar",
    line: "Centre-filled bars with creamy vanilla and strawberry hearts.",
    image: "/products/km-05.webp",
    alt: "Wonderbar white chocolate display box",
    href: "/products/wonderbar-milk-chocolate",
    panel: "bg-[linear-gradient(160deg,#333f9e,#1a2158)]",
    text: "text-white",
    kicker: "text-[#ffd84d]",
    initial: "W",
  },
];

export default function FeaturedRanges() {
  const track = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    el.scrollBy({ left: dir * ((slide?.offsetWidth ?? 480) + 24), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="featured-heading" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="featured-heading"
            className="display-soft font-display text-4xl font-semibold text-cocoa sm:text-6xl"
          >
            The house favourites
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous range"
              className="press grid h-12 w-12 place-items-center rounded-full bg-cocoa text-cream transition-[transform,background-color] hover:bg-brand-red"
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next range"
              className="press grid h-12 w-12 place-items-center rounded-full bg-cocoa text-cream transition-[transform,background-color] hover:bg-brand-red"
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-10 sm:px-10 lg:scroll-px-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] lg:px-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]"
      >
        {SLIDES.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            data-slide
            className={`group plate relative flex w-[86vw] max-w-[540px] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] ${s.panel} px-9 pb-9 pt-9 shadow-card transition-transform duration-300 hover:-translate-y-2 sm:w-[62vw] lg:w-[31vw]`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-2 right-4 select-none font-display text-[11rem] font-semibold leading-none opacity-[0.09] ${s.text}`}
            >
              {s.initial}
            </span>
            <div className="flex h-60 items-center justify-center">
              <Image
                src={s.image}
                alt={s.alt}
                width={860}
                height={620}
                sizes="(min-width: 1024px) 29vw, 80vw"
                className="max-h-56 w-auto max-w-[94%] object-contain drop-shadow-[0_26px_28px_rgba(0,0,0,0.38)] transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <p className={`mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${s.kicker}`}>
              Premium range
            </p>
            <h3 className={`display-soft mt-2 font-display text-4xl font-semibold ${s.text}`}>
              {s.name}
            </h3>
            <p className={`mt-3 max-w-sm text-sm leading-relaxed ${s.text} opacity-80`}>
              {s.line}
            </p>
            <span className={`mt-7 inline-flex items-center gap-2 text-sm font-semibold ${s.text}`}>
              Discover
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
