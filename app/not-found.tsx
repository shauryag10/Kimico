import Link from "next/link";

export default function NotFound() {
  return (
    <div className="plate relative overflow-hidden bg-[linear-gradient(168deg,#f6f1ea_0%,#f0e2c6_100%)]">
      <span
        aria-hidden="true"
        className="text-outline-gold pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[24rem] leading-none opacity-50 lg:block"
      >
        404
      </span>
      <div className="relative mx-auto flex min-h-[70vh] max-w-[90rem] flex-col items-start justify-center px-5 py-24 sm:px-10">
        <h1 className="display-soft max-w-3xl font-display text-5xl font-semibold leading-[1.0] text-cocoa sm:text-7xl">
          This wrapper is <em className="display-wonk italic text-brand-red">empty</em>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
          Whatever was here has been eaten, moved or never existed. The good
          stuff is one click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/"
            className="press rounded-full bg-cocoa px-7 py-3.5 text-sm font-semibold text-cream transition-[transform,background-color] hover:bg-brand-red"
          >
            Back to home
          </Link>
          <Link
            href="/products"
            className="press rounded-full border-2 border-cocoa/25 px-7 py-[0.8rem] text-sm font-semibold text-cocoa transition-[transform,border-color,color] hover:border-brand-red hover:text-brand-red"
          >
            Browse the catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
