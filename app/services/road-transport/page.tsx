import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Road & Overland Transport - Logifex Freight Services",
  description:
    "Flexible cross-border and door-to-door road transportation solutions, GCC linehauls, UK/Europe linehauls, and regional shipping.",
};

export default function RoadTransportPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Banner */}
      <section
        className="relative w-full min-h-[40vh] flex items-center bg-inverse-surface bg-cover bg-center text-white py-16 overflow-hidden"
        style={{ backgroundImage: "url('/images/road-transport.png')" }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 opacity-15 chevron-pattern pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-3xl space-y-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary-fixed hover:text-white transition-colors text-xs font-label-bold uppercase"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to All Services
            </Link>
            <h1 className="font-headline-display text-[clamp(28px,6vw,48px)] font-bold leading-tight text-white uppercase tracking-tight">
              Road Transportation & GCC Linehaul
            </h1>
            <p className="text-surface-variant font-body-lg text-sm sm:text-base leading-relaxed max-w-2xl">
              GPS-monitored fleet delivery, refrigerated trailers, and heavy haulage networks across major cross-border corridors.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="bg-background w-full py-12 md:py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
                Service Overview
              </h2>
              <div className="text-secondary font-body-md text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Our road transport service is designed to provide reliable and timely delivery across regions. In road transport, we handle FTL and LTL shipments efficiently to suit different load sizes and delivery needs.
                </p>
                <p>
                  We offer door-to-door solutions, ensuring goods are picked up and delivered safely without hassle. By planning efficient routes, we help reduce delays and improve delivery timelines.
                </p>
                <p>
                  Our team pays close attention to handling and safety, so your cargo stays protected throughout the journey. Whether it’s short-distance delivery or long routes, we make sure everything runs smoothly, giving you a dependable transportation solution you can trust.
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-secondary-container">
              <div className="p-4 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-1">
                  GCC Cross-Border Linehaul
                </span>
                <span className="text-secondary">
                  Daily bonded trucking connecting UAE, KSA, Oman, Qatar, and other regional commerce hubs.
                </span>
              </div>
              <div className="p-4 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-1">
                  Last-Mile Distribution
                </span>
                <span className="text-secondary">
                  Timed appointment delivery with liftgate-equipped local trucks, tail lifts, and professional handling.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              
              {/* Quick Specs Card */}
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-secondary-container shadow-sm space-y-4">
                <h3 className="font-headline-md text-base font-bold text-on-background border-b border-secondary-container pb-2 uppercase tracking-wide">
                  Service Specifications
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-secondary-container/50">
                    <span className="text-secondary">Modality</span>
                    <span className="font-bold text-on-surface">Overland Road Freight (FTL/LTL)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-secondary-container/50">
                    <span className="text-secondary">Global Reach</span>
                    <span className="font-bold text-on-surface">GCC, India, UK & Europe</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-secondary-container/50">
                    <span className="text-secondary">Transit Time</span>
                    <span className="font-bold text-on-surface">2 - 7 Days</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-secondary">Compliance Level</span>
                    <span className="font-bold text-on-surface">GPS Monitored & Bonded</span>
                  </div>
                </div>
              </div>

              {/* Book Service CTA Widget */}
              <div className="bg-primary p-6 rounded-xl text-white text-center space-y-4 shadow-md">
                <h3 className="font-headline-md text-lg font-bold">
                  Need a Rate Quote?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Request custom rate indications, transit time tables, and routing schedules for this service.
                </p>
                <Link
                  href="/quote?service=Road"
                  className="w-full inline-block bg-lime-400 text-black px-6 py-3 rounded-lg font-label-bold text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
                >
                  Request Road Rate
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
