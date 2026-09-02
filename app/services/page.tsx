import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Services & Solutions - Logifex Freight Services",
  description:
    "Comprehensive Air, Ocean, Overland, Multimodal, Warehousing and Customs Brokerage services with global transit coverage.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = createClient();
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "services");

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  const getVal = (key: string, fallback: string) => 
    content?.find(c => c.content_key === key)?.content_value || fallback;

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Banner */}
      <section
        className="relative w-full min-h-screen flex items-center bg-inverse-surface bg-cover bg-center text-white py-20 overflow-hidden"
        style={{ backgroundImage: `url('${getVal("hero_image", "/images/sea-freight.webp")}')` }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 opacity-15 chevron-pattern pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-3xl">
            <h1 className="font-headline-display text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-none text-white uppercase tracking-tight">
              {getVal("title", "Our Services & Supply Chain Solutions.")}
            </h1>
            <p className="text-surface-variant font-body-lg text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              {getVal("subtitle", "From chartered cargo flights and global container vessels to temperature-controlled road linehauls and bonded warehousing, Logifex synchronizes world commerce.")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Container */}
      <section className="bg-background w-full py-16 md:py-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block">
              Global logistics solutions
            </span>
            <h2 className="font-headline-md text-3xl md:text-5xl font-bold text-on-background uppercase tracking-tight">
              What We Do
            </h2>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              Explore our core transport and compliance capabilities designed to move your cargo across borders efficiently.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(services || []).map((svc, i) => (
              <div
                key={i}
                className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden border border-secondary-container shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden bg-neutral-200">
                  <img
                    src={svc.image_url || svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-lime-400 text-black font-headline-display text-lg font-black px-3 py-1 rounded-md">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-label-bold text-primary block">
                      {svc.supporting_text || svc.supporting}
                    </span>
                    <h3 className="font-headline-md text-xl font-bold text-on-background group-hover:text-primary-container transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-secondary text-xs leading-relaxed font-body-md">
                      {svc.description || svc.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-2 text-primary-container font-label-bold text-xs hover:text-primary transition-colors group/link"
                    >
                      Learn More & Book{" "}
                      <span className="material-symbols-outlined text-sm transition-transform group-hover/link:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Value Add section */}
      <section className="bg-surface-container/30 w-full py-16 border-t border-secondary-container">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
              End-to-End Value Add
            </span>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background uppercase tracking-tight">
              Specialized Supply Chain Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-container-lowest rounded-xl border border-secondary-container shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined">ac_unit</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                Cold Chain & Perishables
              </h3>
              <p className="text-secondary text-xs leading-relaxed">
                Strict temperature data logging for pharmaceuticals, fresh produce, and chemicals with calibrated thermal packaging and active reefers.
              </p>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl border border-secondary-container shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-tertiary text-white flex items-center justify-center">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                Dangerous Goods (DGR) Cargo
              </h3>
              <p className="text-secondary text-xs leading-relaxed">
                Licensed handling and transport of hazardous chemicals, lithium batteries, and classified cargo under strict IATA & IMDG regulations.
              </p>
            </div>

            <div className="p-6 bg-surface-container-lowest rounded-xl border border-secondary-container shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined">workspace_premium</span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                Trade Compliance Certifications
              </h3>
              <p className="text-secondary text-xs leading-relaxed">
                Expert trade specialists assisting with SASO, Saber, CE certificates, certificates of origin, and dual-use regional export permits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
