"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import { CATALOGUE_PDF } from "@/lib/site";

const NAV = [
  { href: "/products", label: "Products" },
  { href: "/brands", label: "Brands" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu; the body lock stops the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-cocoa/10 bg-cream/90 shadow-[0_8px_30px_-18px_rgb(42_24_16/0.35)] backdrop-blur-md"
          : "border-transparent bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className={`flex shrink-0 items-center rounded-md transition-[padding] duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
          aria-label="Kimico Foods — home"
        >
          <Image
            src="/brand/logo-kimico.webp"
            alt="Kimico"
            width={735}
            height={308}
            priority
            sizes="120px"
            className={`w-auto transition-[height] duration-300 ${scrolled ? "h-8" : "h-10"}`}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link text-[0.95rem] tracking-wide transition-colors hover:text-brand-red ${
                  active ? "font-semibold text-brand-red" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={CATALOGUE_PDF}
            download
            className="press inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-4 py-2 text-sm font-medium text-cocoa transition-[transform,border-color,background-color] hover:border-brand-gold hover:bg-brand-gold/10"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.5v9m0 0 3.2-3.2M8 10.5 4.8 7.3M2.5 13.5h11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Catalogue
          </a>
          <Link
            href="/contact"
            className="press rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white shadow-sm transition-[transform,background-color] hover:bg-brand-red-deep"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="press -mr-2 rounded-md p-2 text-cocoa md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="menu-open border-t border-cocoa/10 bg-cream px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`block border-b border-cocoa/5 py-3.5 text-lg ${
                    pathname.startsWith(item.href)
                      ? "font-semibold text-brand-red"
                      : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-full bg-brand-red px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Become a distributor
            </Link>
            <a
              href={CATALOGUE_PDF}
              download
              className="rounded-full border border-cocoa/20 px-5 py-3 text-center text-sm font-medium text-cocoa"
            >
              Download catalogue (PDF)
            </a>
          </div>
        </nav>
      )}
      <ScrollProgress />
    </header>
  );
}
