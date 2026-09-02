"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderClient({ content }: { content: any[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getVal = (key: string, fallback: string) => 
    content?.find(c => c.content_key === key)?.content_value || fallback;

  const navLinks = [
    { name: getVal("nav_home", "Home"), href: "/" },
    { name: getVal("nav_about", "About Us"), href: "/about" },
    { name: getVal("nav_services", "Services"), href: "/services" },
    { name: getVal("nav_insights", "Insights"), href: "/insights" },
    { name: getVal("nav_careers", "Careers"), href: "/careers" },
    { name: getVal("nav_contact", "Contact"), href: "/contact" },
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
                alt={getVal("logo_text", "Logifex Freight Services Logo")}
                className="h-8 sm:h-10 w-auto max-w-[180px] xs:max-w-[220px] sm:max-w-none object-contain"
                src={getVal("logo_image", "/images/logo.webp")}
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
              href="/admin/login"
              className="hidden lg:flex items-center gap-2 border border-secondary text-secondary px-4 py-2 rounded font-label-bold hover:bg-surface-container transition-all duration-200 shadow-sm text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                admin_panel_settings
              </span>
              Admin
            </Link>
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
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-secondary text-secondary py-2.5 rounded font-label-bold text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  admin_panel_settings
                </span>
                Admin Login
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-primary-container text-white py-2.5 rounded font-label-bold text-sm"
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
