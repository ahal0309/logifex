import Link from "next/link";
import type { Metadata } from "next";
import AnimatedParagraphs from "./AnimatedParagraphs";
import AnimatedPrinciples from "./AnimatedPrinciples";
import IndustriesSection from "./IndustriesSection";
import CertificatesSection from "./CertificatesSection";

export const metadata: Metadata = {
  title: "About Us - Logifex Freight Services",
  description:
    "Learn about Logifex Freight Services: our mission, values, global logistics network, and commitment to precision in motion across the UAE, India, and UK.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
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
            <div className="text-surface-variant font-body-lg text-base sm:text-lg md:text-xl leading-relaxed space-y-6">
              <p>
                Connecting Businesses. Moving Possibilities.
              </p>
              <p>
                Logifex Freight Services is a growing global logistics and freight forwarding company providing reliable, flexible, and end-to-end logistics solutions worldwide. With strategic locations across India, the UK, and the UAE, we connect businesses across major international trade lanes through a trusted global network.
              </p>
              <p>
                From Air Freight, Sea Freight, and Road Freight to Customs Clearance, Courier Services, Project Cargo, RORO, Break Bulk, Warehousing, Packing &amp; Labelling, we handle every shipment with care, precision, and clear communication.
              </p>
              <p>
                Whether it’s a single shipment or a long-term supply chain requirement, Logifex delivers practical, cost-effective, and dependable logistics solutions from origin to destination.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Main Content Area */}
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 space-y-24">
        {/* Company Story & Overview */}
        <section className="w-full flex flex-col gap-12 items-center text-center">
          <AnimatedParagraphs />

          <div className="w-full max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-secondary-container shadow-lg aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/gRne-B2lse8"
                title="Logifex Logistics Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Core Values */}
        <AnimatedPrinciples />

        {/* Industries We Serve */}
        <IndustriesSection />

        {/* Certificates & Accreditations */}
        <CertificatesSection />

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
