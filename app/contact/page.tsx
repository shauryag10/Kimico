import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { CATALOGUE_PDF, COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Distribution",
  description:
    "Distributor, wholesale and general enquiries for Kimico Foods, Ahmedabad. Request trade pricing, pack specifications and the full retail catalogue.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.sku) ? sp.sku[0] : sp.sku;
  const initialSku = (raw ?? "").toUpperCase().slice(0, 10);

  return (
    <div>
      <header className="mx-auto max-w-[90rem] px-5 pb-12 pt-14 sm:px-10 lg:pt-20">
        <h1 className="display-soft max-w-4xl font-display text-5xl font-semibold leading-[1.0] text-cocoa sm:text-7xl">
          Let’s talk <em className="display-wonk italic text-brand-red">sweet business</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Two ways in: a distributor & wholesale enquiry for trade pricing and
          carton specs, or a general enquiry for everything else. Either way, a
          human reads it.
        </p>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 pb-20 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Info panel */}
        <aside className="on-dark plate relative overflow-hidden rounded-[2.5rem] bg-cocoa p-9 text-cream lg:sticky lg:top-24 lg:self-start">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-12 select-none font-display text-[11rem] font-semibold italic leading-none text-brand-gold opacity-15"
          >
            K
          </span>
          <h2 className="font-display text-2xl font-semibold">Kimico Foods</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-cream/75">
            {COMPANY.address}
          </address>
          <div className="mt-6 space-y-3 text-sm">
            <p>
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Customer care
              </span>
              <a href={COMPANY.phoneHref} className="mt-1 inline-block text-lg font-semibold text-cream hover:text-brand-gold">
                {COMPANY.phone}
              </a>
            </p>
            <p className="text-cream/70">
              {COMPANY.group} · Since {COMPANY.founded}
            </p>
          </div>
          <a
            href={CATALOGUE_PDF}
            download
            className="press mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand-gold/70 px-6 py-3 text-sm font-semibold text-brand-gold transition-[transform,background-color,color] hover:bg-brand-gold hover:text-cocoa"
          >
            Download the catalogue
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5v9m0 0 3.2-3.2M8 10.5 4.8 7.3M2.5 13.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="mt-8 border-t border-cream/15 pt-6 text-xs leading-relaxed text-cream/60">
            Prices are shared per enquiry — mention item codes (like KM-18)
            wherever you can and we’ll reply with exact pack and carton
            details.
          </p>
        </aside>

        {/* Form */}
        <div>
          <ContactForm initialSku={initialSku} />
        </div>
      </div>

      {/* Map — the iframe sits over a fallback so a blocked embed still gives
          the address and a way through to Maps. */}
      <section aria-label="Find us" className="mx-auto max-w-[90rem] px-5 pb-24 sm:px-10">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-cocoa/15 bg-cream-deep shadow-card">
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div>
              <p className="font-display text-2xl font-semibold text-cocoa">
                {COMPANY.name}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{COMPANY.address}</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=510+GIDC+Odhav+Ahmedabad+Gujarat+382415"
                target="_blank"
                rel="noreferrer"
                className="press mt-5 inline-block rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream transition-[transform,background-color] hover:bg-brand-red"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
          <iframe
            title={`${COMPANY.name} — ${COMPANY.address} on Google Maps`}
            src="https://www.google.com/maps?q=510%20GIDC%20Odhav%20Ahmedabad%20Gujarat%20382415&output=embed"
            className="relative block h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
