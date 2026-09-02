"use client";

import { useRef, useState } from "react";

interface Certificate {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Membership",
    subtitle: "Company Membership",
    image: "/images/certificates/membership-1.jpeg",
  },
  {
    id: 2,
    title: "Membership",
    subtitle: "Company Membership",
    image: "/images/certificates/membership-2.jpeg",
  },
  {
    id: 3,
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety System",
    image: "/images/certificates/cert-5.webp",
  },
  {
    id: 4,
    title: "Logifex Accreditation",
    subtitle: "Global Freight Forwarding Standards",
    image: "/images/certificates/cert-6.webp",
  },
  {
    id: 5,
    title: "Multimodal Compliance",
    subtitle: "International Transit Certification",
    image: "/images/certificates/cert-1.webp",
  },
  {
    id: 6,
    title: "Operation Excellence",
    subtitle: "Supply Chain Security & Logistics Services",
    image: "/images/certificates/cert-3.webp",
  },
];

export default function CertificatesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollToValue =
        direction === "left"
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({
        left: scrollToValue,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-background pt-4 md:pt-6 pb-8 md:pb-12 overflow-hidden border-t border-secondary-container">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-2xl text-left">
            <h2 className="font-headline-display text-3xl sm:text-5xl md:text-7xl text-on-background font-black uppercase tracking-tight leading-none">
              Memberships
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Controls */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-2xl border border-secondary-container bg-white text-on-surface flex items-center justify-center shadow-lg hover:bg-surface-container-low transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-2xl border border-secondary-container bg-white text-on-surface flex items-center justify-center shadow-lg hover:bg-surface-container-low transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Sliding Carousel Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveImage(cert.image)}
              className="flex-shrink-0 w-[220px] sm:w-[260px] snap-start group cursor-zoom-in"
            >
              {/* Image Box */}
              <div className="relative rounded-2xl overflow-hidden border border-secondary-container bg-white aspect-[3/4] shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center p-4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <span className="material-symbols-outlined text-2xl font-bold">zoom_in</span>
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300"
          onClick={() => setActiveImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors z-[1010]"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          
          {/* Certificate Image */}
          <div 
            className="relative max-w-4xl max-h-[85vh] rounded-xl overflow-hidden bg-white p-4 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Certificate Preview"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
