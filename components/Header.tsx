"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-primary text-white py-2 px-margin-mobile md:px-margin-desktop text-xs font-medium tracking-wide">
        <div className="max-w-container-max mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">phone</span>
              UAE: +971 45752307 | India: +91 484 277 8899 | UK: +44 20 7946 0912
            </span>
            <span className="hidden lg:inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">mail</span>
              info@logifexgroup.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-white/15 px-2.5 py-0.5 rounded text-[11px]">
              24/7 Global Dispatch & Customer Care
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="bg-surface-container-lowest w-full top-0 sticky z-50 border-b border-secondary-container shadow-sm">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3.5 max-w-container-max mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                alt="Logifex Freight Services Logo"
                className="h-8 sm:h-10 w-auto max-w-[180px] xs:max-w-[220px] sm:max-w-none object-contain"
                src="/images/logo.png"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.includes("#")
                  ? false
                  : pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-label-bold text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-primary-container font-bold"
                      : "text-secondary hover:text-primary-container"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/quote"
              className="bg-primary-container text-white px-5 py-2.5 rounded font-label-bold hover:bg-primary transition-all duration-200 shadow-sm hover:shadow text-sm"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-secondary w-11 h-11 flex items-center justify-center hover:bg-surface-container rounded-lg"
            aria-label="Toggle navigation"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-b border-secondary-container px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-label-bold text-secondary hover:text-primary-container py-1 text-sm"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-secondary-container flex flex-col gap-2">
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary-container text-white text-center py-2.5 rounded font-label-bold text-sm"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
