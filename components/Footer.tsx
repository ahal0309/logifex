import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-inverse-surface w-full mt-auto text-surface-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-14 max-w-container-max mx-auto">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img
              alt="Logifex Logo"
              className="h-8 w-auto brightness-0 invert"
              src="/images/logo.png"
            />
          </div>
          <p className="font-body-md text-sm text-surface-variant mb-4 leading-relaxed">
            Precision in Motion. Comprehensive air, ocean, road, and multimodal freight solutions with global compliance.
          </p>
          <p className="text-xs text-neutral-400">
            Licensed Global Freight Forwarder & Customs Broker.
          </p>
        </div>

        <div>
          <h4 className="font-label-bold text-sm text-surface-bright mb-4 uppercase tracking-wider">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services#air"
              >
                Air Freight & Express
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services#sea"
              >
                Ocean & Sea Freight (FCL/LCL)
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services#road"
              >
                Road & Overland Transport
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services#road"
              >
                Multimodal & Rail Logistics
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/services#warehousing"
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
                UAE HQ: +971 45752307
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/contact#india"
              >
                India Hub: +91 484 277 8899
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-fixed-dim transition-colors"
                href="/contact#uk"
              >
                UK Hub: London
              </Link>
            </li>
            <li>
              <a
                className="hover:text-primary-fixed-dim transition-colors"
                href="mailto:info@logifexgroup.com"
              >
                info@logifexgroup.com
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
