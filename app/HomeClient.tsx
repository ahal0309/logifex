"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import VideoScrollIntro from "@/components/VideoScrollIntro";

function CoreValuesSection({ getVal }: { getVal: (key: string, fb: string) => string }) {
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
      className="relative w-full bg-primary z-30 py-16 md:py-32 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start">

          {/* Left Column: Title */}
          <div className="w-full md:w-5/12">
            <h2
              ref={headingRef}
              className="font-headline-display text-3xl sm:text-5xl md:text-8xl text-white font-black uppercase tracking-tight leading-none"
              style={{ willChange: "transform, opacity, clip-path" }}
            >
              Core <br className="hidden md:inline" /> Values
            </h2>
          </div>

          {/* Right Column: 4 Values Grid */}
          <div className="w-full md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-16">
            {values.map((val, idx) => (
              <div key={idx}>
                <span className="font-headline-display text-5xl md:text-8xl font-black text-lime-400 block mb-2 md:mb-3">
                  {val.num}
                </span>
                <h3 className="font-headline-md text-xl md:text-3xl text-white font-bold mb-2 md:mb-3 uppercase tracking-tight">
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

function ServicesSection({ services }: { services: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
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
      className="relative w-full bg-background z-30 py-16 md:py-32 overflow-hidden border-t border-secondary-container"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-left mb-12 md:mb-16">
          <div className="max-w-3xl">
            <h2
              ref={headingRef}
              className="font-headline-display text-3xl sm:text-5xl md:text-7xl text-on-background font-black uppercase tracking-tight leading-none mb-6"
              style={{ willChange: "transform, opacity" }}
            >
              Services We Provide
            </h2>
            <p className="font-body-md text-sm md:text-base text-secondary max-w-xl">
              Precision in motion. Integrated global logistics solutions tailored for your cargo.
            </p>
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
          {services.map((service, idx) => {
            return (
              <div
                key={idx}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] snap-start service-card rounded-3xl p-5 md:p-10 flex flex-col justify-between shadow-lg relative group overflow-hidden min-h-[320px] md:min-h-[380px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Background Image and Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image_url || service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/65 z-10 transition-opacity duration-300 group-hover:opacity-95" />
                </div>

                <div className="relative z-20">
                  <div
                    className="font-headline-display text-3xl xs:text-4xl md:text-7xl font-black tracking-tighter select-none leading-none mb-1 md:mb-4 transition-all duration-300 text-white/10 group-hover:text-lime-400/30"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="space-y-1.5 md:space-y-3">
                    <span
                      className="text-[10px] md:text-xs font-label-bold uppercase tracking-wider block text-white/60"
                    >
                      {service.supporting_text || service.supporting}
                    </span>
                    <h3
                      className="font-headline-md text-base xs:text-lg md:text-2xl font-bold uppercase tracking-tight leading-none text-white"
                    >
                      {service.title}
                    </h3>
                    <p className="font-body-md text-[11px] xs:text-xs md:text-sm leading-relaxed text-white/80">
                      {service.description || service.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-20 mt-4 md:mt-8 flex justify-end">
                  <Link
                    href={service.href}
                    className="w-9 h-9 xs:w-10 xs:h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md bg-white text-primary-container hover:bg-lime-400 hover:text-black"
                  >
                    <span className="material-symbols-outlined text-base xs:text-lg md:text-xl font-black transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        </div>

      </div>
    </section>
  );
}

function AchievementsSection() {
  const stats = [
    { title: "193+", subtitle: "Global Destinations", desc: "Extensive worldwide coverage connecting all major commercial trade hubs." },
    { title: "5,000+", subtitle: "Shipments Delivered", desc: "Ensured timely and secure delivery across various global trade lanes." },
    { title: "50+", subtitle: "Trusted Partners", desc: "Built a strong worldwide network of carriers and supply chain experts." },
    { title: "100%", subtitle: "Client Retention", desc: "Maintained an exceptional standard of service and continuous customer support." },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-surface-container-lowest border-t border-secondary-container overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-primary-container font-label-bold uppercase tracking-wider mb-2 block text-xs">
            Our Journey So Far
          </span>
          <h2 className="font-headline-display text-3xl sm:text-4xl md:text-5xl text-on-background font-black uppercase tracking-tight leading-none mb-6">
            Rapid Growth
          </h2>
          <p className="font-body-md text-sm md:text-base text-secondary max-w-xl mx-auto">
            We have rapidly established a strong foundation of reliability, transparency, and efficiency in the global logistics landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-surface p-6 md:p-8 rounded-3xl border border-secondary-container shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center">
              <span className="font-headline-display text-5xl md:text-6xl font-black text-primary mb-3 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-container">
                {stat.title}
              </span>
              <h3 className="font-headline-md text-lg font-bold text-on-background uppercase tracking-tight mb-3">
                {stat.subtitle}
              </h3>
              <p className="font-body-md text-sm text-secondary leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeClient({ content, services }: { content: any[], services: any[] }) {
  const getVal = (key: string, fallback: string) => 
    content?.find(c => c.content_key === key)?.content_value || fallback;

  const [introFinished, setIntroFinished] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Commercial Rates & Quotations");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <>
      {!introFinished && <VideoScrollIntro onComplete={() => {
        setIntroFinished(true);
        window.scrollTo(0, 0); // Ensure they start at the top of the normal page
      }} />}
      <div className="flex flex-col w-full overflow-hidden">
        {/* Video/Image Background Container (covers Hero and About card) */}
      <div className="relative w-full bg-inverse-surface overflow-hidden">
        {/* Background */}
        {getVal('hero_video', '') ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={getVal('hero_image', '')}
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={getVal('hero_video', '/images/hero-video.mp4')} type="video/mp4" />
          </video>
        ) : getVal('hero_image', '') ? (
          <img
            src={getVal('hero_image', '')}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : null}
        <div className="absolute inset-0 hero-overlay z-10"></div>

        {/* Hero Section */}
        <section className="relative z-20 w-full min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-112px)] flex items-center py-20">
          <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="max-w-4xl">
              <h1 className="font-headline-display text-[clamp(38px,11vw,64px)] sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-[0.95] md:leading-tight font-black tracking-tight">
                {getVal('headline_line1', 'Seamless Freight,')} <br />
                <span className="text-primary-fixed">{getVal('headline_line2', 'Seamless Solutions.')}</span>
              </h1>
              <p className="font-body-lg text-body-lg text-surface-variant mb-6 md:mb-10 max-w-xl leading-relaxed">
                {getVal('subtext', 'Trusted Freight. Tailored Solutions. We offer world-class Air, Rail, Road, Sea, and specialized multimodal logistics – ensuring fast, compliant, and reliable global transport.')}
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
              className="relative rounded-2xl overflow-hidden shadow-2xl p-6 md:p-20 min-h-[550px] lg:min-h-[740px] flex flex-col justify-between"
              style={{ backgroundImage: `url('${getVal("about_bg_image", "/images/warehouse.png")}')`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Brand Red Overlay Tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/95 via-primary-container/80 to-primary/65 mix-blend-multiply z-0"></div>
              {/* Subtle dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 z-0"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-16 w-full mb-8">
                {/* Left: Heading & Action Button */}
                <div className="w-full lg:w-5/12 flex flex-col justify-between self-stretch">
                  <h2 className="font-headline-display text-2xl sm:text-3xl md:text-5xl text-white font-bold uppercase tracking-tight leading-tight mb-6 lg:mb-8">
                    Built on Reliability. <br className="hidden lg:inline" />Driven by Logistics.
                  </h2>
                  <Link
                    href="/about"
                    className="hidden lg:inline-flex items-center gap-2 bg-white text-primary-container px-8 py-3.5 rounded font-label-bold hover:bg-surface-container-high transition-colors shadow-lg text-sm w-fit mt-auto"
                  >
                    Learn More About Us
                    <span className="material-symbols-outlined text-sm font-bold">
                      arrow_forward
                    </span>
                  </Link>
                </div>

                {/* Right: Detailed Copy */}
                <div className="w-full lg:w-7/12 flex flex-col justify-between self-stretch">
                  <div className="space-y-4 font-body-md text-white/95 text-sm md:text-base leading-relaxed mb-8 lg:mb-0">
                    <p>
                      Logifex was established with a clear purpose — to bring structure,
                      reliability, and clarity to logistics operations that are often
                      complex and time-sensitive. With a commitment to precision and
                      dependable service, we approach every shipment with careful planning
                      and attention to detail.
                    </p>
                    <p>
                      From the initial pickup to final delivery, every stage is managed
                      with consistency and control. Our approach is built around
                      understanding the requirements of each shipment, coordinating
                      operations efficiently, and ensuring that goods move safely and
                      smoothly through every step of the logistics process.
                    </p>
                    <p>
                      At Logifex, we believe reliable logistics is more than simply
                      moving cargo from one place to another. It is about creating a
                      seamless, transparent, and dependable experience for every
                      shipment, while delivering the efficiency and care our customers
                      expect.
                    </p>
                  </div>
                  <Link
                    href="/about"
                    className="inline-flex lg:hidden items-center gap-2 bg-white text-primary-container px-8 py-3.5 rounded font-label-bold hover:bg-surface-container-high transition-colors shadow-lg text-sm w-fit"
                  >
                    Learn More About Us
                    <span className="material-symbols-outlined text-sm font-bold">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* High-visibility horizontal scrolling statistics ticker at the bottom (Desktop only) */}
              <div className="hidden lg:block relative z-10 stats-marquee-wrapper w-full overflow-hidden select-none border-t border-white/10 pt-10 mt-16 pb-2">
                <div className="stats-marquee-track flex">
                  {/* Group 1 */}
                  <div className="flex-shrink-0 flex items-center gap-16 md:gap-32 px-8 md:px-16 whitespace-nowrap">
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">193+</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">Global Destinations</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">100%</span>
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
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">193+</span>
                      <span className="text-[10px] md:text-xs font-label-bold text-white/80 uppercase tracking-wider">Global Destinations</span>
                    </div>
                    <div className="text-white/20 text-xl font-light select-none">|</div>
                    <div className="flex flex-col items-center text-center">
                      <span className="font-headline-display text-3xl md:text-4xl font-bold text-white mb-1">100%</span>
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

              {/* Static vertical stack with thin divider lines (Mobile/Tablet only) */}
              <div className="lg:hidden relative z-10 w-full border-t border-white/10 pt-4 mt-8 flex flex-col divide-y divide-white/10">
                <div className="py-5 flex flex-col items-center text-center first:pt-0 last:pb-0">
                  <span className="font-headline-display text-4xl font-bold text-white mb-1">193+</span>
                  <span className="text-xs font-label-bold text-white/85 uppercase tracking-wider">Global Destinations</span>
                </div>
                <div className="py-5 flex flex-col items-center text-center first:pt-0 last:pb-0">
                  <span className="font-headline-display text-4xl font-bold text-white mb-1">100%</span>
                  <span className="text-xs font-label-bold text-white/85 uppercase tracking-wider">On-Time Dispatches</span>
                </div>
                <div className="py-5 flex flex-col items-center text-center first:pt-0 last:pb-0">
                  <span className="font-headline-display text-4xl font-bold text-white mb-1">3 Hubs</span>
                  <span className="text-xs font-label-bold text-white/85 uppercase tracking-wider">UAE • India • UK</span>
                </div>
                <div className="py-5 flex flex-col items-center text-center first:pt-0 last:pb-0">
                  <span className="font-headline-display text-4xl font-bold text-white mb-1">24 / 7</span>
                  <span className="text-xs font-label-bold text-white/85 uppercase tracking-wider">Dedicated Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CoreValuesSection getVal={getVal} />

      <ServicesSection services={services} />

      <AchievementsSection />

      {/* Direct Operational Inquiry Form */}
      <section className="py-16 bg-surface-container-low border-t border-secondary-container">
        <div className="max-w-3xl mx-auto px-margin-mobile">
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-secondary-container shadow-sm">
            <h3 className="font-headline-md text-xl font-bold text-on-background mb-1">
              Send a Direct Operational Inquiry
            </h3>
            <p className="text-xs text-secondary mb-6">
              Our forwarders reply within 1 hour during active business hours.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <span className="material-symbols-outlined text-emerald-600 text-3xl">check_circle</span>
                <h4 className="font-bold text-emerald-800 text-sm">Inquiry Submitted Successfully</h4>
                <p className="text-xs text-emerald-700">Thank you. An operations desk representative will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-bold text-xs text-on-surface">
                      Your Name *
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                      placeholder="Full Name"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-bold text-xs text-on-surface">
                      Email Address *
                    </label>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                      placeholder="email@company.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-bold text-xs text-on-surface">
                      Phone / Mobile
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                      placeholder="+971 50 123 4567"
                      type="tel"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-bold text-xs text-on-surface">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                    >
                      <option>Commercial Rates & Quotations</option>
                      <option>Active Consignment Tracking Support</option>
                      <option>Customs Clearance & HS Tariff Advisory</option>
                      <option>Contract Logistics & Bonded Warehousing</option>
                      <option>Carrier & Airline Vendor Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label-bold text-xs text-on-surface">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm resize-none"
                    placeholder="Provide consignment details, dates, or specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-primary-container text-white px-6 py-2.5 rounded font-label-bold text-sm hover:bg-primary transition-all flex items-center gap-2 shadow-md w-full sm:w-auto"
                >
                  Send Message
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
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
              Request Now
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
