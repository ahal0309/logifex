import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Logifex Freight Services",
  description:
    "Learn about Logifex Freight Services: our mission, values, global logistics network, and commitment to precision in motion across the UAE, India, and UK.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section
        className="relative w-full min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-112px)] flex items-start pt-12 md:pt-20 bg-inverse-surface bg-cover bg-center text-white py-20 overflow-hidden"
        style={{ backgroundImage: "url('/images/warehouse.png')" }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 opacity-15 chevron-pattern pointer-events-none"></div>
 
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-3xl">
            <h1 className="font-headline-display text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-none text-white uppercase tracking-tight">
              About Us
            </h1>
            <p className="text-surface-variant font-body-lg text-lg sm:text-xl md:text-2xl leading-relaxed">
              Logifex was established with a clear intent —
              to bring structure, reliability, and clarity into
              logistics operations that are often complex and
              time-sensitive. Every shipment is approached
              with careful planning, ensuring that each stage,
              from pickup to final delivery, is managed with
              consistency and control.
            </p>
          </div>
        </div>
      </section>



      {/* Main Content Area */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 space-y-24">
        {/* Company Story & Overview */}
        <section className="flex flex-col gap-12 items-center text-center">
          <div className="max-w-4xl space-y-6">
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-secondary font-body-md text-base md:text-lg lg:text-xl leading-relaxed">
                Founded with the vision to modernize freight forwarding, Logifex
                combines decades of industry expertise with cutting-edge telemetry,
                regulatory compliance, and dedicated client service.
              </p>
              <p className="text-secondary font-body-md text-base md:text-lg lg:text-xl leading-relaxed">
                Whether orchestrating full aircraft charters for urgent industrial
                machinery, deep-sea container lines, or overland cross-border trucking,
                we ensure that your cargo moves with uninterrupted precision from origin to
                final destination.
              </p>
            </div>
          </div>

          <div className="w-full max-w-5xl">
            <div className="rounded-2xl overflow-hidden border border-secondary-container shadow-lg">
              <img
                alt="Logifex Logistics Facilities"
                className="w-full h-[300px] md:h-[500px] object-cover"
                src="/images/cargo-process.png"
              />
            </div>
          </div>
        </section>

        {/* Mission, Vision & Core Values */}
        <section className="bg-surface-container-lowest p-8 md:p-14 rounded-2xl border border-secondary-container shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
              Our Mission, Vision & Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface rounded-xl border border-secondary-container space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-2xl">flag</span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-background">
                Our Mission
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                To deliver cost-effective, dependable, and swift freight forwarding
                services that eliminate supply chain bottlenecks and accelerate client
                growth across international borders.
              </p>
            </div>

            <div className="p-8 bg-surface rounded-xl border border-secondary-container space-y-4">
              <div className="w-12 h-12 rounded-lg bg-tertiary text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-background">
                Our Vision
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                To be the most reliable and technologically integrated freight partner in
                the Middle East and South Asian trade corridor, recognized globally for
                operational integrity and excellence.
              </p>
            </div>

            <div className="p-8 bg-surface rounded-xl border border-secondary-container space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-background">
                Our Values
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Precision in planning, relentless compliance standards, transparent
                communication, and unwavering accountability for every kilogram of cargo
                under our care.
              </p>
            </div>
          </div>
        </section>

        {/* Global Hub Network */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
              Infrastructure
            </span>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
              Strategic Regional Hubs
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Our direct presence in primary global trade gateways guarantees local
              regulatory compliance and rapid customs turnaround.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface rounded-2xl border border-secondary-container space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-primary">Dubai, UAE</span>
                <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded font-bold">
                  Global HQ
                </span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Al Qusais 2, Dubai. Central air cargo consolidation, cross-docking, and
                bonded GCC overland road linehaul hub.
              </p>
              <div className="text-xs font-medium text-on-surface pt-2 border-t border-secondary-container/50">
                Direct: +971 45752307
              </div>
            </div>

            <div className="p-6 bg-surface rounded-2xl border border-secondary-container space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-primary">Cochin, India</span>
                <span className="text-xs bg-surface-container text-secondary px-2.5 py-0.5 rounded font-bold">
                  South Asia Hub
                </span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Tripunithura, Kerala. Port container logistics, sea-air transit
                consolidation, and export clearance processing.
              </p>
              <div className="text-xs font-medium text-on-surface pt-2 border-t border-secondary-container/50">
                Direct: +91 484 277 8899
              </div>
            </div>

            <div className="p-6 bg-surface rounded-2xl border border-secondary-container space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-primary">London, UK</span>
                <span className="text-xs bg-surface-container text-secondary px-2.5 py-0.5 rounded font-bold">
                  European Gateway
                </span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                London Logistics Corridor. European distribution, air cargo charters,
                and bonded warehousing solutions.
              </p>
              <div className="text-xs font-medium text-on-surface pt-2 border-t border-secondary-container/50">
                Direct: +44 20 7946 0912
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-primary text-white text-center rounded-2xl shadow-xl">
          <div className="max-w-2xl mx-auto px-margin-mobile">
            <h2 className="font-headline-display text-2xl md:text-4xl font-bold mb-4">
              Partner With Logifex Today
            </h2>
            <p className="text-surface-variant font-body-lg mb-8 text-sm md:text-base">
              Discover how our tailored multimodal freight solutions can streamline your
              global shipping requirements and reduce freight transit times.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/quote"
                className="bg-white text-primary px-8 py-3.5 rounded font-label-bold hover:bg-surface-container-high transition-colors shadow text-sm md:text-base"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact"
                className="border border-white/50 text-white px-8 py-3.5 rounded font-label-bold hover:bg-white/10 transition-colors text-sm md:text-base"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
