"use client";

interface Industry {
  number: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

const industries: Industry[] = [
  {
    number: "01",
    tag: "Industrial Logistics",
    title: "Manufacturing",
    description: "High-volume assembly logistics, industrial raw materials, and finished goods distribution.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_of_a_modern_manufacturing.png",
  },
  {
    number: "02",
    tag: "Omnichannel Retail",
    title: "Retail & E-commerce",
    description: "End-to-end warehousing, order fulfillment, and swift last-mile delivery networks.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_retail_e_commerce._a_person.png",
  },
  {
    number: "03",
    tag: "Healthcare Logistics",
    title: "Pharmaceuticals",
    description: "Strict temperature-controlled cold chains, GDP compliance, and medical equipment transport.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_pharmaceuticals.png",
  },
  {
    number: "04",
    tag: "Fast-Moving Goods",
    title: "FMCG",
    description: "Rapid inventory turnaround, grocery distribution, and high-frequency supply chains.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_fmcg_fast_moving.png",
  },
  {
    number: "05",
    tag: "Energy & Resources",
    title: "Oil And Gas",
    description: "Heavy machinery linehaul, hazardous material compliance, and remote site supply support.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_oil_and_gas_industry..png",
  },
  {
    number: "06",
    tag: "Advanced Tech",
    title: "Automation",
    description: "Precision electronics transport, high-tech robotics component supply, and cleanroom handling.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_automation_industry..png",
  },
  {
    number: "07",
    tag: "Cold Chain",
    title: "Food Stuff",
    description: "Perishable grocery logistics, food safety standards compliance, and temperature-monitored shipping.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_food_industry._a.png",
  },
  {
    number: "08",
    tag: "Automotive Logistics",
    title: "Automobile",
    description: "Just-in-time auto parts sequencing, finished vehicle shipping, and spare parts distribution.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_automobile_industry._a.png",
  },
  {
    number: "09",
    tag: "Aerospace",
    title: "Aviation",
    description: "Critical AOG (Aircraft on Ground) logistics support, engine transport, and custom chartering.",
    image: "/images/industries/professional_high_quality_full_frame_photograph_for_the_aviation_industry._a.png",
  },
];

export default function IndustriesSection() {
  return (
    <section className="relative w-full bg-background py-16 md:py-32 overflow-hidden border-t border-secondary-container">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
          <span className="text-primary-container font-label-bold uppercase tracking-wider mb-2 block text-xs">
            What We Serve
          </span>
          <h2 className="font-headline-display text-3xl sm:text-5xl md:text-7xl text-on-background font-black uppercase tracking-tight leading-none mb-6">
            Industries We Serve
          </h2>
          <p className="font-body-md text-sm md:text-base text-secondary max-w-xl mx-auto">
            Tailored logistics ecosystems delivering precision, compliance, and velocity across global markets.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div
              key={ind.number}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-secondary-container bg-surface-container flex flex-col justify-end min-h-[350px] md:min-h-[380px] p-6 md:p-8"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${ind.image}')` }}
              ></div>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/60 z-10 transition-opacity duration-500 group-hover:opacity-95"></div>

              {/* Large Card Number */}
              <span className="absolute top-4 left-6 text-5xl md:text-7xl font-headline-display font-black text-white/10 select-none z-20 transition-colors duration-500 group-hover:text-lime-400/20">
                {ind.number}
              </span>

              {/* Content Box */}
              <div className="relative z-20 flex flex-col items-start text-white">
                {/* Category Tag */}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">
                  {ind.tag}
                </span>

                {/* Title */}
                <h3 className="font-headline-md text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 leading-none">
                  {ind.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-white mb-6">
                  {ind.description}
                </p>

                {/* Arrow Action Button */}
                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                  <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
