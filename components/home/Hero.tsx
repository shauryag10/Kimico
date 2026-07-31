"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChocoPiece } from "@/components/ChocolateBits";
import { Parallax } from "@/components/motion";
import { COMPANY } from "@/lib/site";

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] as const },
  });

  return (
    <section className="plate relative overflow-hidden bg-[linear-gradient(168deg,#f6f1ea_0%,#f5ecdb_52%,#eeddba_100%)]">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.2),transparent_62%)]"
      />
      <span
        aria-hidden="true"
        className="text-outline-gold pointer-events-none absolute -left-12 -top-10 hidden select-none font-display text-[26rem] leading-none opacity-50 lg:block"
      >
        K
      </span>

      <div className="relative mx-auto max-w-[90rem] px-5 pt-12 sm:px-10 lg:pt-16">
        <motion.p
          {...rise(0)}
          className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-cocoa-soft sm:text-xs"
        >
          <span aria-hidden="true" className="h-px w-10 bg-brand-gold" />
          {COMPANY.group} · Est. {COMPANY.founded} · Ahmedabad
        </motion.p>

        <h1 className="relative z-10 mt-5 font-display font-semibold leading-[0.93] text-cocoa">
          <motion.span
            {...rise(0.08)}
            className="display-soft block text-[clamp(3.2rem,9.6vw,8.75rem)]"
          >
            Where happiness
          </motion.span>
          <motion.span
            {...rise(0.18)}
            className="display-wonk block text-[clamp(3.2rem,9.6vw,8.75rem)]"
          >
            is{" "}
            <em className="relative inline-block pr-2 italic text-brand-red">
              wrapped
              <svg
                aria-hidden="true"
                viewBox="0 0 320 26"
                fill="none"
                className="absolute -bottom-3 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 20 C 80 6, 150 4, 316 12"
                  stroke="#c9a227"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </em>
          </motion.span>
        </h1>

        <div className="grid items-start gap-x-8 gap-y-10 pb-4 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:pb-24 lg:pt-14">
          <div className="max-w-md">
            <motion.p {...rise(0.28)} className="text-base leading-relaxed text-ink-soft sm:text-lg">
              {COMPANY.subTagline} Chocolates, truffles, caramels, toffees and
              jellies for every age — crafted with quality ingredients and
              meticulous care since {COMPANY.founded}.
            </motion.p>
            <motion.div {...rise(0.36)} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="press group inline-flex items-center gap-3 rounded-full bg-cocoa px-7 py-4 text-sm font-semibold text-cream shadow-lift transition-[transform,background-color] hover:bg-brand-red"
              >
                Explore the range
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="press rounded-full border-2 border-cocoa/25 px-7 py-[0.9rem] text-sm font-semibold text-cocoa transition-[transform,border-color,color] hover:border-brand-red hover:text-brand-red"
              >
                Become a distributor
              </Link>
            </motion.div>
          </div>

          {/* layered still-life, tucked up against the headline */}
          <div className="relative mx-auto aspect-[10/7] w-full max-w-[400px] sm:max-w-[560px] lg:-mt-36 lg:max-w-[680px] xl:-mt-44">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 60, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute left-0 top-[16%] w-[44%]"
            >
              <Parallax distance={24}>
                <Image
                  src="/products/km-04.webp"
                  alt="Wonderbar centre-filled milk chocolate display box"
                  width={760}
                  height={860}
                  priority
                  sizes="(min-width: 1024px) 300px, 44vw"
                  className="h-auto w-full drop-shadow-[0_34px_36px_rgba(42,24,16,0.34)]"
                />
              </Parallax>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 60, rotate: 12 }}
              animate={{ opacity: 1, y: 0, rotate: 9 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute right-[2%] top-0 w-[32%]"
            >
              <Parallax distance={38}>
                <Image
                  src="/products/km-32.webp"
                  alt="Kimmy Choco Eclairs pouch"
                  width={500}
                  height={640}
                  priority
                  sizes="(min-width: 1024px) 220px, 32vw"
                  className="h-auto w-full drop-shadow-[0_28px_32px_rgba(42,24,16,0.32)]"
                />
              </Parallax>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute bottom-0 left-[14%] w-[72%]"
            >
              <Parallax distance={50}>
                <Image
                  src="/products/km-03.webp"
                  alt="Savor Assortments gold tin with chocolate-coated dry fruits"
                  width={1540}
                  height={1120}
                  priority
                  sizes="(min-width: 1024px) 500px, 72vw"
                  className="h-auto w-full drop-shadow-[0_42px_46px_rgba(42,24,16,0.4)]"
                />
              </Parallax>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.66 }}
              className="float-bob absolute -bottom-4 right-0 w-[24%]"
              style={{ "--bob-rot": "6deg" } as React.CSSProperties}
            >
              <Image
                src="/brand/extra-savor-nuts.webp"
                alt="Chocolate-coated almonds, hazelnuts and raisins"
                width={598}
                height={377}
                sizes="(min-width: 1024px) 170px, 24vw"
                className="h-auto w-full drop-shadow-[0_20px_22px_rgba(42,24,16,0.35)]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* scroll-down cue */}
      <motion.a
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        href="#range-heading"
        aria-label="Scroll down to explore the ranges"
        className="group absolute bottom-4 left-5 hidden flex-col items-center gap-2.5 sm:left-10 lg:flex"
      >
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-cocoa-soft transition-colors group-hover:text-brand-red">
          Scroll
        </span>
        <span className="relative h-14 w-4">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cocoa/20"
          />
          <span className="scroll-cue-dot absolute left-1/2 top-0">
            <ChocoPiece className="h-3 w-3" />
          </span>
        </span>
      </motion.a>
    </section>
  );
}
