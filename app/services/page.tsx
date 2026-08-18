import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Solutions - Logifex Freight Services",
  description:
    "Comprehensive Air, Ocean, Overland, Multimodal, Warehousing and Customs Brokerage services with global transit coverage.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section
        className="relative w-full min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-112px)] flex items-center bg-inverse-surface bg-cover bg-center text-white py-20 overflow-hidden"
        style={{ backgroundImage: "url('/images/sea-freight.png')" }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 opacity-15 chevron-pattern pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-3xl">
            <h1 className="font-headline-display text-[clamp(32px,10vw,56px)] sm:text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Precision Freight & <br />
              <span className="text-primary-fixed">Supply Chain Solutions.</span>
            </h1>
            <p className="text-surface-variant font-body-lg text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              From chartered cargo flights and global container vessels to
              temperature-controlled road linehauls and bonded warehousing,
              Logifex synchronizes world commerce.
            </p>
          </div>
        </div>
      </section>

      {/* Service Modalities Detail Container */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 space-y-20">
        {/* Air Freight Section */}
        <section
          id="air"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24"
        >
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded text-xs font-label-bold text-primary">
              <span className="material-symbols-outlined text-sm">flight</span>{" "}
              Modality: Air Transport
            </div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
              Air Freight & Aircraft Charters
            </h2>
            <p className="text-secondary font-body-md text-sm leading-relaxed">
              When timing is non-negotiable, Logifex Air Freight offers global
              express, standard consolidation, and dedicated air charters across
              major international airports. We secure guaranteed space with
              tier-1 airline alliances.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-0.5">
                  Express Next-Flight-Out
                </span>
                <span className="text-secondary">
                  24-48 hr transit for critical spares & pharmaceuticals.
                </span>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-0.5">
                  Consolidated Air Cargo
                </span>
                <span className="text-secondary">
                  Scheduled weekly departures for cost-effective freight.
                </span>
              </div>
            </div>
            <div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-primary-container text-white px-5 py-2.5 rounded font-label-bold text-sm hover:bg-primary transition-colors"
              >
                Book Air Freight{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-secondary-container shadow-md">
            <img
              alt="Air Cargo"
              className="w-full h-80 object-cover"
              src="/images/air-cargo.png"
            />
          </div>
        </section>

        {/* Ocean / Sea Freight Section */}
        <section
          id="sea"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24"
        >
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl overflow-hidden border border-secondary-container shadow-md">
            <img
              alt="Sea Freight"
              className="w-full h-80 object-cover"
              src="/images/sea-freight.png"
            />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded text-xs font-label-bold text-tertiary">
              <span className="material-symbols-outlined text-sm">
                directions_boat
              </span>{" "}
              Modality: Ocean Transport
            </div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
              Ocean Freight (FCL & LCL)
            </h2>
            <p className="text-secondary font-body-md text-sm leading-relaxed">
              Cost-efficient, high-capacity global ocean transit. We manage Full
              Container Loads (FCL), Less-than-Container Loads (LCL), flat
              racks, open tops, and breakbulk across major maritime trading
              routes.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-0.5">
                  FCL (Full Container)
                </span>
                <span className="text-secondary">
                  20ft, 40ft & High-Cube dedicated container allocations.
                </span>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-0.5">
                  LCL Consolidation
                </span>
                <span className="text-secondary">
                  Direct buyer consolidation reducing port handling costs.
                </span>
              </div>
            </div>
            <div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-tertiary text-white px-5 py-2.5 rounded font-label-bold text-sm hover:bg-black transition-colors"
              >
                Book Ocean Freight{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Road & Multimodal Section */}
        <section
          id="road"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24"
        >
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded text-xs font-label-bold text-primary">
              <span className="material-symbols-outlined text-sm">
                local_shipping
              </span>{" "}
              Modality: Overland & Intermodal
            </div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
              Road Transportation & Rail Intermodal
            </h2>
            <p className="text-secondary font-body-md text-sm leading-relaxed">
              Seamless land connectivity across the GCC corridor, Indian
              sub-continent, and UK/European networks. Equipped with
              GPS-monitored fleet vehicles, refrigerated trailers, and heavy
              haulage equipment.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-0.5">
                  GCC Cross-Border Linehaul
                </span>
                <span className="text-secondary">
                  Daily bonded trucking connecting UAE, KSA, Oman & Qatar.
                </span>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-secondary-container text-xs">
                <span className="font-bold text-on-surface block mb-0.5">
                  Last-Mile Distribution
                </span>
                <span className="text-secondary">
                  Timed appointment delivery with liftgate & offload equipment.
                </span>
              </div>
            </div>
            <div>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-primary-container text-white px-5 py-2.5 rounded font-label-bold text-sm hover:bg-primary transition-colors"
              >
                Book Overland Transport{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-secondary-container shadow-md">
            <img
              alt="Logistics Process"
              className="w-full h-80 object-cover"
              src="/images/cargo-process.png"
            />
          </div>
        </section>

        {/* Value-Added Services */}
        <section
          id="warehousing"
          className="pt-8 border-t border-secondary-container"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
              End-to-End Value Add
            </span>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
              Specialized 3PL & Customs Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-container-lowest rounded-xl border border-secondary-container shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                Customs Clearance & Brokerage
              </h3>
              <p className="text-secondary text-xs leading-relaxed">
                In-house customs brokers navigating tariff classifications, HS
                code determination, duty exemptions, and port customs audits.
              </p>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl border border-secondary-container shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-tertiary text-white flex items-center justify-center">
                <span className="material-symbols-outlined">warehouse</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                Warehousing & Fulfillment
              </h3>
              <p className="text-secondary text-xs leading-relaxed">
                Secure, bonded ambient and climate-controlled storage facilities
                in Dubai, Cochin, and London featuring modern WMS inventory
                synchronization.
              </p>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl border border-secondary-container shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined">ac_unit</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                Cold Chain & Perishables
              </h3>
              <p className="text-secondary text-xs leading-relaxed">
                Strict temperature data logging for pharmaceuticals, fresh
                produce, and chemicals with calibrated thermal packaging and
                active reefers.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
