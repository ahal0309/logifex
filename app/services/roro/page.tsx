import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roll-on / Roll-off (RORO) Shipping - Logifex Freight Services",
  description:
    "Specialized roll-on/roll-off shipping for wheeled cargo, drivable vehicles, trucks, trailers, and heavy machinery.",
};

export default function RoroPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Banner */}
      <section
        className="relative w-full min-h-[40vh] flex items-center bg-inverse-surface bg-cover bg-center text-white py-16 overflow-hidden"
        style={{ backgroundImage: "url('/images/roro.webp')" }}
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
              Roll-on / Roll-off (RORO) Shipping
            </h1>
            <p className="text-surface-variant font-body-lg text-sm sm:text-base leading-relaxed max-w-2xl">
              Specialized vehicle logistics and deck-lashed roll-on/roll-off transport for wheeled machinery.
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
                  Specialized shipping solutions for wheeled cargo, including cars, trucks, heavy construction vehicles, and trailers. Our RORO services offer a safe and cost-effective method for shipping drivable cargo globally.
                </p>
                <p>
                  Vehicles are secured directly onto specialized vessel decks, protecting them from sea conditions and ensuring straightforward loading and unloading processes.
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-secondary-container">
              <div className="p-4 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-1">
                  Wheeled Cargo Specialists
                </span>
                <span className="text-secondary">
                  Dedicated handling for personal cars, commercial fleets, and heavy machinery.
                </span>
              </div>
              <div className="p-4 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-1">
                  Safe Vessel Securing
                </span>
                <span className="text-secondary">
                  Specialized lashings and deck fastening under strict maritime safety standards.
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
                    <span className="font-bold text-on-surface">Roll-on/Roll-off (RORO)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-secondary-container/50">
                    <span className="text-secondary">Global Reach</span>
                    <span className="font-bold text-on-surface">Major Global Ports</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-secondary-container/50">
                    <span className="text-secondary">Cargo Type</span>
                    <span className="font-bold text-on-surface">Wheeled & Drivable Machinery</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-secondary">Safety Standard</span>
                    <span className="font-bold text-on-surface">Deck fastening, lashings</span>
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
                  href="/quote?service=Roro"
                  className="w-full inline-block bg-lime-400 text-black px-6 py-3 rounded-lg font-label-bold text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
                >
                  Request RORO Rate
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
