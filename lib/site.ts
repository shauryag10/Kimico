/** Site-wide constants. */

// Canonical origin — feeds canonical URLs, OpenGraph tags and the sitemap.
// When a custom domain is added, set NEXT_PUBLIC_SITE_URL in the Vercel
// project settings (Settings -> Environment Variables) and redeploy; no code
// change needed. Falls back to the live domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimicoglobal.com";

export const COMPANY = {
  name: "Kimico Foods",
  group: "Kimmy Group of Companies",
  founded: 1988,
  tagline: "Where happiness is wrapped",
  subTagline: "Crafted for sweet moments.",
  address: "510, GIDC, Odhav, Ahmedabad, Gujarat, India – 382415",
  phone: "+91 73830 06024",
  phoneHref: "tel:+917383006024",
  city: "Ahmedabad",
  region: "Gujarat",
  country: "IN",
  postalCode: "382415",
} as const;

export const CATALOGUE_PDF = "/catalogue/kimico-retail-catalogue.pdf";
