import { CandyTwist } from "@/components/ChocolateBits";

const NAMES = [
  "Wonderbar",
  "Truffles",
  "Temptations",
  "Luxury Selection",
  "Savor",
  "Royale Eclairs",
  "Cacao Ertugrul",
  "My-Chew",
  "Milky Magic",
  "Eldöre",
  "Eclair’OH",
  "Imli Ji",
];

/** Slow-scrolling ribbon of sub-brand names — gold serif on cocoa. */
export default function BrandRibbon() {
  const row = (hidden: boolean) => (
    <span
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {NAMES.map((n) => (
        <span key={n} className="flex items-center">
          <span className="mx-8 font-display text-2xl italic text-brand-gold/90 sm:text-3xl">
            {n}
          </span>
          <CandyTwist className="h-3.5 w-auto text-brand-gold/70" />
        </span>
      ))}
    </span>
  );

  return (
    <aside
      aria-label="Kimico and Kimmy sub-brands"
      className="overflow-hidden border-y border-brand-gold/25 bg-cocoa py-5"
    >
      <div className="ribbon-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </aside>
  );
}
