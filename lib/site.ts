/** Site-wide constants. */

// TODO: replace with the production domain before go-live (used for
// canonical URLs, OpenGraph tags and the sitemap).
export const SITE_URL = "https://kimicofoods.example.com";

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
