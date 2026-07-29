import Image from "next/image";
import Link from "next/link";
import { CATEGORY_META } from "@/lib/catalog";
import { CATALOGUE_PDF, COMPANY } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream/80">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-5">
              <Image
                src="/brand/logo-kimico.webp"
                alt="Kimico"
                width={735}
                height={308}
                sizes="110px"
                className="h-9 w-auto"
              />
              <Image
                src="/brand/logo-kimmy.webp"
                alt="Kimmy — Since 1988"
                width={610}
                height={344}
                sizes="90px"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 max-w-xs font-display text-xl text-cream">
              {COMPANY.tagline}.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
              Chocolates, truffles, caramels, toffees, jellies and candies —
              crafted in Ahmedabad since {COMPANY.founded}.
            </p>
          </div>

          <nav aria-label="Footer — explore">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/products", label: "All products" },
                { href: "/brands", label: "Our brands" },
                { href: "/about", label: "About us" },
                { href: "/contact", label: "Contact & distribution" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={CATALOGUE_PDF}
                  download
                  className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                >
                  Download catalogue
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 1.5v9m0 0 3.2-3.2M8 10.5 4.8 7.3M2.5 13.5h11"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Footer — ranges">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Ranges
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORY_META.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products?category=${c.slug}`}
                    className="transition-colors hover:text-cream"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Visit us
            </h3>
            <address className="mt-4 text-sm not-italic leading-relaxed text-cream/70">
              {COMPANY.name}
              <br />
              {COMPANY.address}
            </address>
            <p className="mt-4 text-sm">
              Customer care{" "}
              <a
                href={COMPANY.phoneHref}
                className="font-semibold text-cream transition-colors hover:text-brand-gold"
              >
                {COMPANY.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-6 text-xs text-cream/50">
          <p>
            © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.group} · Since{" "}
            {COMPANY.founded}. All product names and marks belong to their
            respective brands.
          </p>
        </div>
      </div>
    </footer>
  );
}
