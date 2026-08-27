import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const supabase = createClient();
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "global")
    .eq("section", "footer");

  const getVal = (key: string, fallback: string) => 
    content?.find(c => c.content_key === key)?.content_value || fallback;

  return (
    <footer className="bg-inverse-surface w-full mt-auto text-surface-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-14 max-w-container-max mx-auto">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img
              alt={getVal("logo_text", "Logifex Logo")}
              className="h-8 w-auto brightness-0 invert"
              src={getVal("logo_image", "/images/logo.png")}
            />
          </div>
          <p className="font-body-md text-sm text-surface-variant mb-4 leading-relaxed">
            {getVal("about_text", "Precision in Motion. Comprehensive air, ocean, road, and multimodal freight solutions with global compliance.")}
          </p>
          <p className="text-xs text-neutral-400 mb-6">
            {getVal("licensed_text", "Licensed Global Freight Forwarder & Customs Broker.")}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/logifexfreight?igsi=MTU2bWs3c2V1aXBxMQ==" target="_blank" rel="noopener noreferrer" className="text-surface-variant hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Logifexfreight" target="_blank" rel="noopener noreferrer" className="text-surface-variant hover:text-white transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://x.com/LogifexFreight" target="_blank" rel="noopener noreferrer" className="text-surface-variant hover:text-white transition-colors" aria-label="X">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1BKGLhdoaV/" target="_blank" rel="noopener noreferrer" className="text-surface-variant hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-label-bold text-sm text-surface-bright mb-4 uppercase tracking-wider">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services/air-freight"
              >
                Air Freight & Express
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services/sea-freight"
              >
                Ocean & Sea Freight (FCL/LCL)
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services/road-transport"
              >
                Road & Overland Transport
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services/intermodal"
              >
                Multimodal & Rail Logistics
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services/warehousing"
              >
                Warehousing & 3PL
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-sm text-surface-bright mb-4 uppercase tracking-wider">
            Offices
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/contact#uae"
              >
                {getVal("uae_address", "UAE HQ: +971 45752307")}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/contact#india"
              >
                {getVal("india_address", "India Hub: +91 484 277 8899")}
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/contact#uk"
              >
                {getVal("uk_address", "UK Hub: +44 20 7946 0912")}
              </Link>
            </li>
            <li>
              <a
                className="hover:text-primary-fixed-dim transition-colors"
                href={`mailto:${getVal("email", "info@logifexgroup.com")}`}
              >
                {getVal("email", "info@logifexgroup.com")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-bold text-sm text-surface-bright mb-4 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/about"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/quote"
              >
                Request a Quote
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services"
              >
                Explore Services
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services#compliance"
              >
                Compliance & Terms
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/contact"
              >
                Customer Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-tertiary-container/30 px-margin-mobile md:px-margin-desktop py-6">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-tertiary-fixed-dim">
          <p>© {new Date().getFullYear()} Logifex Freight Services. Precision in Motion. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/services#compliance" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/services#compliance" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/services#compliance" className="hover:underline">
              Standard Trading Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
