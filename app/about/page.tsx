import Link from "next/link";
import type { Metadata } from "next";
import AnimatedParagraphs from "./AnimatedParagraphs";
import AnimatedPrinciples from "./AnimatedPrinciples";
import IndustriesSection from "./IndustriesSection";
import CertificatesSection from "./CertificatesSection";
import RealCertificatesSection from "./RealCertificatesSection";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About Us - Logifex Freight Services",
  description:
    "Learn about Logifex Freight Services: our mission, values, global logistics network, and commitment to precision in motion across the UAE, India, and UK.",
};

export default async function AboutPage() {
  const supabase = createClient();
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "about");
    
  const { data: industries } = await supabase
    .from("industries")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  const getVal = (key: string, fallback: string) => 
    content?.find(c => c.content_key === key)?.content_value || fallback;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section
        className="relative w-full min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-112px)] flex items-start pt-12 md:pt-20 bg-inverse-surface bg-cover bg-center text-white py-20 overflow-hidden"
        style={{ backgroundImage: `url('${getVal("hero_image", "/images/about_hero_logistics.jpg")}')` }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 opacity-15 chevron-pattern pointer-events-none"></div>
 
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-3xl">
            <h1 className="font-headline-display text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-none text-white uppercase tracking-tight">
              {getVal("hero_title", "About Us")}
            </h1>
            <div className="text-surface-variant font-body-lg text-base sm:text-lg md:text-xl leading-relaxed space-y-6">
              <p>
                {getVal("hero_tagline", "Connecting Businesses. Moving Possibilities.")}
              </p>
              <p>
                {getVal("hero_p1", "Logifex Freight Services is a growing global logistics and freight forwarding company providing reliable, flexible, and end-to-end logistics solutions worldwide. With strategic locations across India, the UK, and the UAE, we connect businesses across major international trade lanes through a trusted global network.")}
              </p>
              <p>
                {getVal("hero_p2", "From Air Freight, Sea Freight, and Road Freight to Customs Clearance, Courier Services, Project Cargo, RORO, Break Bulk, Warehousing, Packing & Labelling, we handle every shipment with care, precision, and clear communication.")}
              </p>
              <p>
                {getVal("hero_p3", "Whether it’s a single shipment or a long-term supply chain requirement, Logifex delivers practical, cost-effective, and dependable logistics solutions from origin to destination.")}
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
        <IndustriesSection industries={industries || []} />

        {/* Certificates & Accreditations (Now Memberships) */}
        <CertificatesSection />

        {/* Real Certificates */}
        <RealCertificatesSection />

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
