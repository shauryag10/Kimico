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
        <p className="flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-brand-gold sm:text-xs">
          <span aria-hidden="true" className="h-px w-10 bg-brand-gold" />
          Contact & distribution
        </p>
        <h1 className="display-soft mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.0] text-cocoa sm:text-7xl">
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
        <aside className="grain relative h-fit overflow-hidden rounded-[2.5rem] bg-cocoa p-9 text-cream lg:sticky lg:top-24">
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
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand-gold/70 px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-cocoa"
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

      {/* Map */}
      <section aria-label="Map to Kimico Foods" className="mx-auto max-w-[90rem] px-5 pb-24 sm:px-10">
        <div className="overflow-hidden rounded-[2.5rem] border border-cocoa/15 shadow-card">
          <iframe
            title="Kimico Foods — 510 GIDC Odhav, Ahmedabad on Google Maps"
            src="https://www.google.com/maps?q=510%20GIDC%20Odhav%20Ahmedabad%20Gujarat%20382415&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
