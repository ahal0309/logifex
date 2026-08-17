"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function CoreValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const values = [
    {
      num: "01.",
      title: "Reliability",
      desc: "Consistency in every shipment and operation",
    },
    {
      num: "02.",
      title: "Transparency",
      desc: "Clear communication and process visibility",
    },
    {
      num: "03.",
      title: "Efficiency",
      desc: "Optimized logistics for time and cost control",
    },
    {
      num: "04.",
      title: "Accountability",
      desc: "Ownership at every stage of execution",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobileViewport = window.innerWidth < 768;
    const startY = isMobileViewport ? 40 : 80;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: startY,
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        }
      );
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-primary z-30 py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="w-full flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left Column: Title */}
          <div className="w-full md:w-5/12">
            <h2
              ref={headingRef}
              className="font-headline-display text-4xl sm:text-5xl md:text-8xl text-white font-black uppercase tracking-tight leading-none"
              style={{ willChange: "transform, opacity, clip-path" }}
            >
              Core <br className="hidden md:inline" /> Values
            </h2>
          </div>

          {/* Right Column: 4 Values Grid */}
          <div className="w-full md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {values.map((val, idx) => (
              <div key={idx}>
                <span className="font-headline-display text-5xl md:text-8xl font-black text-lime-400 block mb-3">
                  {val.num}
                </span>
                <h3 className="font-headline-md text-2xl md:text-3xl text-white font-bold mb-3 uppercase tracking-tight">
                  {val.title}
                </h3>
                <p className="font-body-md text-sm md:text-base text-white/80 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const services = [
    {
      num: "01",
      title: "Air Freight",
      desc: "Fast, reliable, and secure air freight solutions for time-sensitive shipments.",
      supporting: "Global Air Transit • Priority Cargo",
      href: "/services#air",
    },
    {
      num: "02",
      title: "Sea Freight",
      desc: "Reliable and economical ocean freight solutions for global cargo transportation.",
      supporting: "Ocean Carrier • FCL & LCL Consolidation",
      href: "/services#sea",
    },
    {
      num: "03",
      title: "Road Transport",
      desc: "Flexible cross-border and door-to-door road transportation solutions.",
      supporting: "GCC Linehaul • Overland Transport",
      href: "/services#road",
    },
    {
      num: "04",
      title: "Intermodal Logistics",
      desc: "Seamless coordination across multiple transportation modes for efficient cargo movement.",
      supporting: "Rail & Multimodal Connectivity",
      href: "/services#road",
    },
    {
      num: "05",
      title: "Customs Clearance",
      desc: "Efficient customs documentation and clearance support for smooth international shipments.",
      supporting: "Licensed Brokerage • HS Code Compliance",
      href: "/services#warehousing",
    },
    {
      num: "06",
      title: "Warehousing",
      desc: "Secure and organized warehousing solutions for efficient inventory management.",
      supporting: "Bonded Facilities • WMS Inventory",
      href: "/services#warehousing",
    },
    {
      num: "07",
      title: "Packing and Labelling",
      desc: "Professional packing and labelling solutions to ensure cargo protection and compliance.",
      supporting: "Cargo Protection • Industrial Compliance",
      href: "/services#warehousing",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobileViewport = window.innerWidth < 768;
    const startY = isMobileViewport ? 40 : 80;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: startY,
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        }
      );
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="services-container"
      className="relative w-full bg-background z-30 py-20 md:py-32 overflow-hidden border-t border-secondary-container"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-primary-container font-label-bold uppercase tracking-wider mb-2 block text-xs">Our Expertise</span>
          <h2
            ref={headingRef}
            className="font-headline-display text-4xl sm:text-5xl md:text-7xl text-on-background font-black uppercase tracking-tight leading-none mb-6"
            style={{ willChange: "transform, opacity, clip-path" }}
          >
            Our Services
          </h2>
          <p className="font-body-md text-sm md:text-base text-secondary max-w-xl mx-auto">
            Precision in motion. Integrated global logistics solutions tailored for your cargo.
          </p>
        </div>

        {/* Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const cardBgClass = isEven
              ? "bg-white border border-secondary-container/40 text-primary-container"
              : "bg-primary-container text-white";
            const numColorClass = isEven
              ? "text-black/10 group-hover:text-primary-container/10"
              : "text-lime-400/30 group-hover:text-lime-400/40";
            const titleColorClass = isEven ? "text-primary-container" : "text-white";
            const descColorClass = isEven ? "text-neutral-600" : "text-white/95";
            const suppColorClass = isEven ? "text-neutral-400" : "text-white/60";
            const btnBgClass = isEven
              ? "bg-primary-container text-white hover:bg-neutral-900"
              : "bg-white text-primary-container hover:bg-neutral-100";
            const spanColClass = idx === 6 ? "md:col-span-2 lg:col-span-1" : "";

            return (
              <div
                key={idx}
                className={`service-card rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-lg relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cardBgClass} ${spanColClass}`}
              >
                <div>
                  <div
                    className={`font-headline-display text-6xl md:text-7xl font-black tracking-tighter select-none leading-none mb-4 transition-all duration-300 ${numColorClass}`}
                  >
                    {service.num}
                  </div>

                  <div className="space-y-3">
                    <span
                      className={`text-[10px] md:text-xs font-label-bold uppercase tracking-wider block ${suppColorClass}`}
                    >
                      {service.supporting}
                    </span>
                    <h3
                      className={`font-headline-md text-xl md:text-2xl font-bold uppercase tracking-tight leading-none ${titleColorClass}`}
                    >
                      {service.title}
                    </h3>
                    <p className={`font-body-md text-sm leading-relaxed ${descColorClass}`}>
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Link
                    href={service.href}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:rotate-90 ${btnBgClass}`}
                  >
                    <span className="material-symbols-outlined text-xl font-black">
                      add
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Video Background Container (covers Hero and About card) */}
      <div className="relative w-full bg-inverse-surface overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay z-10"></div>

        {/* Hero Section */}
        <section className="relative z-20 w-full min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-112px)] flex items-center py-20">
          <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="max-w-4xl">
              <h1 className="font-headline-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight font-black tracking-tight">
                Seamless Freight, <br />
                <span className="text-primary-fixed">Seamless Solutions.</span>
              </h1>
              <p className="font-body-lg text-body-lg text-surface-variant mb-10 max-w-xl leading-relaxed">
                Trusted Freight. Tailored Solutions. We offer world-class Air,
                Rail, Road, Sea, and specialized multimodal logistics – ensuring
                fast, compliant, and reliable global transport.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/quote"
                  className="bg-primary-container text-white px-8 py-4 rounded font-label-bold hover:bg-primary transition-all shadow-xl flex items-center gap-2 text-base"
                >
                  Request Instant Quote
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/services"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded font-label-bold hover:bg-white/20 transition-colors text-base"
                >
                  Explore Modalities
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="relative z-20 w-full px-margin-mobile md:px-margin-desktop pb-24 mt-12">
          <div className="max-w-container-max mx-auto">
            {/* Enlarged About Us Card with Integrated Statistics Marquee */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl p-8 md:p-20 min-h-[660px] md:min-h-[740px] flex flex-col justify-between"
              style={{ backgroundImage: "url('/images/warehouse.png')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Brand Red Overlay Tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/95 via-primary-container/80 to-primary/65 mix-blend-multiply z-0"></div>
              {/* Subtle dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 z-0"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col space-y-8">
                <div>
                  <h2 className="font-headline-display text-3xl md:text-5xl text-white mb-6 font-bold uppercase tracking-tight">
                    About Us
                  </h2>
                  <p className="font-body-md text-white/95 text-sm md:text-base max-w-2xl leading-relaxed">
                    Logifex was established with a clear intent — to bring structure,
                    reliability, and clarity into logistics operations that are often
                    complex and time-sensitive. Every shipment is approached with
                    careful planning, ensuring that each stage, from pickup to final
                    delivery, is managed with consistency and control.
                  </p>
                </div>
                
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 bg-white text-primary-container px-8 py-3.5 rounded font-label-bold hover:bg-surface-container-high transition-colors shadow-lg text-sm w-fit"
                  >
                    Learn More About Us
                    <span className="material-symbols-outlined text-sm font-bold">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* High-visibility horizontal scrolling statistics ticker at the bottom */}
              <div className="relative z-10 stats-marquee-wrapper w-full overflow-hidden select-none border-t border-white/10 pt-10 mt-16 pb-2">
                <div className="stats-marquee-track flex">
                  {/* Group 1 */}
                  <div className="flex-shrink-0 flex items-center gap-16 md:gap-32 px-8 md:px-16 whitespace-nowrap">
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">120+</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">Global Destinations</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">99.4%</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">On-Time Dispatches</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">3 Hubs</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">UAE • India • UK</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">24 / 7</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">Dedicated Support</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                  </div>

                  {/* Group 2 (identical copy for seamless infinite looping) */}
                  <div className="flex-shrink-0 flex items-center gap-16 md:gap-32 px-8 md:px-16 whitespace-nowrap">
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">120+</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">Global Destinations</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">99.4%</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">On-Time Dispatches</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">3 Hubs</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">UAE • India • UK</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">24 / 7</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">Dedicated Support</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CoreValuesSection />

      <ServicesSection />


      {/* Global Reach Map Section */}
      <section className="py-24 bg-surface-container-lowest border-t border-secondary-container">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-container font-label-bold uppercase tracking-wider mb-2 block text-xs">
                Global Network
              </span>
              <h2 className="font-headline-md text-headline-lg-mobile md:text-headline-lg text-on-background mb-6 font-bold">
                Strategic Locations. Global Reach.
              </h2>
              <p className="font-body-md text-body-md text-secondary mb-8">
                We operate key regional hubs in the UAE, India, and the United
                Kingdom, ensuring localized customs knowledge backed by a
                worldwide partner grid.
              </p>

              <div className="space-y-4">
                <Link
                  href="/contact#uae"
                  className="flex gap-4 items-start p-4 rounded-lg bg-surface hover:bg-surface-container-low transition-colors border border-secondary-container block"
                >
                  <div className="text-primary-container mt-1 bg-white p-2 rounded shadow-sm">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-base font-bold text-on-background mb-0.5">
                      UAE Headquarters - Dubai
                    </h4>
                    <p className="font-body-md text-xs text-secondary">
                      Al Qusais 2, Dubai, United Arab Emirates • Phone: +971
                      45752307
                    </p>
                  </div>
                </Link>

                <Link
                  href="/contact#india"
                  className="flex gap-4 items-start p-4 rounded-lg bg-surface hover:bg-surface-container-low transition-colors border border-secondary-container block"
                >
                  <div className="text-tertiary mt-1 bg-white p-2 rounded shadow-sm">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-base font-bold text-on-background mb-0.5">
                      India Regional Operations - Kerala
                    </h4>
                    <p className="font-body-md text-xs text-secondary">
                      Tripunithura, Cochin, Kerala, India • Phone: +91 484 277
                      8899
                    </p>
                  </div>
                </Link>

                <Link
                  href="/contact#uk"
                  className="flex gap-4 items-start p-4 rounded-lg bg-surface hover:bg-surface-container-low transition-colors border border-secondary-container block"
                >
                  <div className="text-tertiary mt-1 bg-white p-2 rounded shadow-sm">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-base font-bold text-on-background mb-0.5">
                      United Kingdom Operations - London
                    </h4>
                    <p className="font-body-md text-xs text-secondary">
                      London Logistics Hub, United Kingdom • Phone: +44 20 7946
                      0912
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative bg-surface rounded-2xl border border-secondary-container p-6 overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-secondary-container">
                <span className="font-label-bold text-xs uppercase tracking-wider text-secondary">
                  Active Corridor Activity
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ports & Air Terminals Active
                </span>
              </div>
              <div className="py-8 text-center my-auto">
                <img
                  alt="Logistics Warehouse Operations"
                  className="w-full max-h-64 object-cover rounded-lg shadow-sm"
                  src="/images/warehouse.png"
                />
              </div>
              <div className="pt-4 border-t border-secondary-container flex justify-between items-center text-xs text-secondary">
                <span>Middle East • South Asia • Europe • Americas</span>
                <Link
                  href="/contact"
                  className="text-primary font-label-bold hover:underline"
                >
                  View Office Directory &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile">
          <h2 className="font-headline-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Supply Chain?
          </h2>
          <p className="text-surface-variant font-body-lg mb-8 text-sm md:text-base">
            Get transparent quotes, dedicated account management, and world-class
            multimodal logistics tailored to your exact payload.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary px-8 py-3.5 rounded font-label-bold hover:bg-surface-container-high transition-colors shadow-lg text-sm"
            >
              Request an Estimate Now
            </Link>
            <Link
              href="/contact"
              className="border border-white/50 text-white px-8 py-3.5 rounded font-label-bold hover:bg-white/10 transition-colors text-sm"
            >
              Speak to a Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
