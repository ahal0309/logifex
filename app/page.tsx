"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function CoreValuesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [translateVal, setTranslateVal] = useState(0);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const lockRef = useRef(false);
  const activeIdxRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const calculateActiveIndex = () => {
    const container = containerRef.current;
    if (!container) return 0;
    const offsetTop = container.offsetTop;
    const scrollY = window.scrollY;

    if (scrollY < offsetTop) return 0;

    const scrolled = scrollY - offsetTop;
    const scrolledVh = (scrolled / window.innerHeight) * 100;

    let index = 0;
    if (scrolledVh < 50) index = 0;
    else if (scrolledVh < 150) index = 1;
    else if (scrolledVh < 250) index = 2;
    else index = 3;

    return index;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.history.scrollRestoration) {
        window.history.scrollRestoration = "manual";
      }
      
      // Sync active index with actual scroll position on mount
      const initialIdx = calculateActiveIndex();
      setActiveIdx(initialIdx);
      activeIdxRef.current = initialIdx;
      setTranslateVal(initialIdx * 100);
    }
  }, []);

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

    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
        
        // Sync active index after layout stabilizes
        const currentIdx = calculateActiveIndex();
        if (currentIdx !== activeIdxRef.current) {
          activeIdxRef.current = currentIdx;
          setActiveIdx(currentIdx);
          setTranslateVal(currentIdx * 100);
        }
      });
      resizeObserver.observe(document.body);
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();

      // Reset and stop calculations if at top of page or container is below viewport
      if (window.scrollY === 0 || rect.top > 0) {
        setTranslateVal(0);
        setActiveIdx(0);
        activeIdxRef.current = 0;
        isTransitioningRef.current = false;
        lockRef.current = false;
        accumulatedDeltaRef.current = 0;
        setHasScrolledIntoView(false);
        return;
      }

      if (rect.top <= 0) {
        setHasScrolledIntoView(true);
      }

      const offsetTop = container.offsetTop;
      const height = container.offsetHeight;
      const maxScroll = offsetTop + height - window.innerHeight;
      const scrollY = window.scrollY;

      // Sync active index to Card 03 if we scrolled natively past the section
      if (scrollY > maxScroll + 5) {
        setActiveIdx(3);
        activeIdxRef.current = 3;
        setTranslateVal(300);
        isTransitioningRef.current = false;
        accumulatedDeltaRef.current = 0;
        return;
      }

      // Sync active index with actual scroll position if not transitioning
      if (!isTransitioningRef.current) {
        const targetIdx = calculateActiveIndex();
        if (targetIdx !== activeIdxRef.current) {
          activeIdxRef.current = targetIdx;
          setActiveIdx(targetIdx);
          setTranslateVal(targetIdx * 100);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const smoothScrollTo = (targetY: number, duration: number) => {
      const startY = window.scrollY;
      const difference = targetY - startY;
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percent = Math.min(progress / duration, 1);
        const ease = 1 - Math.pow(1 - percent, 4);
        window.scrollTo(0, startY + difference * ease);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    const triggerTransition = (nextIdx: number) => {
      isTransitioningRef.current = true;
      activeIdxRef.current = nextIdx;
      setActiveIdx(nextIdx);
      setTranslateVal(nextIdx * 100);

      const container = containerRef.current;
      if (container) {
        const targetScrollY = container.offsetTop + nextIdx * window.innerHeight;
        smoothScrollTo(targetScrollY, 1200);
      }

      setTimeout(() => {
        isTransitioningRef.current = false;
        accumulatedDeltaRef.current = 0;
      }, 1250);
    };

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      const container = containerRef.current;
      if (!container) return;

      const offsetTop = container.offsetTop;
      const height = container.offsetHeight;
      const maxScroll = offsetTop + height - window.innerHeight;
      const scrollY = window.scrollY;

      const isInside = scrollY >= offsetTop - 5 && scrollY <= maxScroll + 5;
      if (!isInside) return;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // Allow native scroll out at boundaries
      if (activeIdxRef.current === 0 && e.deltaY < 0 && scrollY <= offsetTop + 5) {
        return;
      }
      if (activeIdxRef.current === 3 && e.deltaY > 0 && scrollY >= maxScroll - 5) {
        return;
      }
      
      // Let the page scroll naturally to the top of the container before starting 01 -> 02 transition
      if (activeIdxRef.current === 0 && e.deltaY > 0 && scrollY < offsetTop) {
        return;
      }

      e.preventDefault();

      accumulatedDeltaRef.current += e.deltaY;
      const threshold = 50;

      if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
        accumulatedDeltaRef.current = 0;

        const nextIdx = activeIdxRef.current + direction;
        if (nextIdx >= 0 && nextIdx <= 3) {
          triggerTransition(nextIdx);
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (window.innerWidth < 768) return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (window.innerWidth < 768) return;
      const container = containerRef.current;
      if (!container) return;

      const offsetTop = container.offsetTop;
      const height = container.offsetHeight;
      const maxScroll = offsetTop + height - window.innerHeight;
      const scrollY = window.scrollY;

      const isInside = scrollY >= offsetTop - 5 && scrollY <= maxScroll + 5;
      if (!isInside) return;

      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (activeIdxRef.current === 0 && deltaY < 0 && scrollY <= offsetTop + 5) {
        return;
      }
      if (activeIdxRef.current === 3 && deltaY > 0 && scrollY >= maxScroll - 5) {
        return;
      }

      // Let the page scroll naturally to the top of the container before starting 01 -> 02 transition
      if (activeIdxRef.current === 0 && deltaY > 0 && scrollY < offsetTop) {
        return;
      }

      e.preventDefault();

      const touchThreshold = 50;
      if (Math.abs(deltaY) >= touchThreshold) {
        const direction = deltaY > 0 ? 1 : -1;
        touchStartYRef.current = touchY;

        const nextIdx = activeIdxRef.current + direction;
        if (nextIdx >= 0 && nextIdx <= 3) {
          triggerTransition(nextIdx);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const values = [
    {
      num: "01.",
      title: "Reliability",
      desc: "Consistency in every shipment and operation",
      alignment: "self-start",
    },
    {
      num: "02.",
      title: "Transparency",
      desc: "Clear communication and process visibility",
      alignment: "self-end md:pl-24",
    },
    {
      num: "03.",
      title: "Efficiency",
      desc: "Optimized logistics for time and cost control",
      alignment: "self-start",
    },
    {
      num: "04.",
      title: "Accountability",
      desc: "Ownership at every stage of execution",
      alignment: "self-end md:pl-24",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto md:h-[400vh] bg-primary z-30 overflow-visible"
    >
      {/* Sticky / static wrapper */}
      <div className="md:sticky md:top-0 w-full h-auto md:h-screen bg-primary overflow-hidden flex items-center">
        <div className="w-full h-full flex flex-col md:flex-row max-w-container-max mx-auto relative px-margin-mobile md:px-margin-desktop py-16 md:py-0">

          {/* Left Column: Sticky Title & Progress */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-auto md:h-full py-0 md:py-24 z-20">
            <div className="flex-grow flex items-center">
              <h2
                ref={headingRef}
                className="font-headline-display text-4xl sm:text-5xl md:text-8xl text-white font-black uppercase tracking-tight leading-none"
                style={{ willChange: "transform, opacity, clip-path" }}
              >
                Core <br className="hidden md:inline" /> Values
              </h2>
            </div>

            {/* Progress line - hidden on mobile, visible on desktop */}
            <div className="hidden md:block w-full max-w-md pt-8 border-t border-white/10 mt-auto">
              <div className="flex justify-between text-white/50 text-[10px] md:text-xs font-mono mb-2">
                <span>01 / RELIABILITY</span>
                <span>04 / ACCOUNTABILITY</span>
              </div>
              <div className="w-full h-[2px] bg-white/20 relative">
                <div
                  className="h-full bg-lime-400 absolute left-0 top-0 transition-all"
                  style={{
                    width: `${(activeIdx / 3) * 100}%`,
                    transitionDuration: "800ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Moving Content */}
          <div className="w-full md:w-1/2 h-auto md:h-full relative overflow-visible md:overflow-hidden mt-12 md:mt-0">
            <div
              className={!isMobile ? "w-full h-full relative flex items-center" : "w-full flex flex-col space-y-16"}
            >
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className={`w-full h-auto md:h-screen flex flex-col justify-center md:justify-start px-0 md:px-12 ${val.alignment}`}
                  style={
                    !isMobile
                      ? {
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          right: 0,
                          height: "auto",
                          opacity: activeIdx === idx ? 1 : 0,
                          transform: activeIdx === idx
                            ? "translateY(-50%) scale(1)"
                            : (idx < activeIdx ? "translateY(-50%) translateY(-30px) scale(0.97)" : "translateY(-50%) translateY(30px) scale(0.97)"),
                          filter: activeIdx === idx ? "none" : "blur(4px)",
                          pointerEvents: activeIdx === idx ? "auto" : "none",
                          transition: "opacity 800ms, transform 800ms, filter 800ms",
                          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                          willChange: "opacity, transform, filter",
                        }
                      : {}
                  }
                >
                  <span className="font-headline-display text-5xl md:text-8xl font-black text-lime-400 block mb-3">
                    {val.num}
                  </span>
                  <h3 className="font-headline-md text-2xl md:text-4xl text-white font-bold mb-3 uppercase tracking-tight">
                    {val.title}
                  </h3>
                  <p className="font-body-md text-sm md:text-base text-white/80 max-w-md leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

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

      {/* Featured Services Bento Grid */}
      <section className="py-24 bg-surface-container-lowest chevron-pattern relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-container font-label-bold uppercase tracking-wider text-xs block mb-2">
              Multimodal Excellence
            </span>
            <h2 className="font-headline-md text-headline-lg-mobile md:text-headline-lg text-on-background mb-4 font-bold">
              We Offer Every Way of Transport
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Seamless integration across all major modalities to ensure your
              cargo reaches its global destination efficiently, compliantly, and
              securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Air Freight */}
            <Link
              href="/services#air"
              className="group relative overflow-hidden rounded-xl border border-secondary-container bg-white flex flex-col h-[420px] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10"></div>
              <img
                alt="Air Freight Services"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="/images/air-cargo.png"
              />
              <div className="relative z-20 mt-auto p-6 text-white">
                <div className="bg-primary-container w-12 h-12 rounded flex items-center justify-center mb-4 shadow">
                  <span className="material-symbols-outlined text-white text-2xl">
                    flight
                  </span>
                </div>
                <h3 className="font-headline-md text-2xl text-white mb-2 font-bold group-hover:text-primary-fixed transition-colors">
                  Air Freight
                </h3>
                <p className="font-body-md text-sm text-surface-variant line-clamp-2 mb-4">
                  Fast, reliable, and secure air freight solutions with priority
                  flight space, chartered capacities, and door-to-door delivery.
                </p>
                <span className="text-xs font-label-bold uppercase tracking-wider text-primary-fixed flex items-center gap-1 group-hover:underline">
                  Explore Air Modality{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>

            {/* Sea Freight */}
            <Link
              href="/services#sea"
              className="group relative overflow-hidden rounded-xl border border-secondary-container bg-white flex flex-col h-[420px] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10"></div>
              <img
                alt="Sea Freight Services"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="/images/sea-freight.png"
              />
              <div className="relative z-20 mt-auto p-6 text-white">
                <div className="bg-tertiary w-12 h-12 rounded flex items-center justify-center mb-4 shadow">
                  <span className="material-symbols-outlined text-white text-2xl">
                    directions_boat
                  </span>
                </div>
                <h3 className="font-headline-md text-2xl text-white mb-2 font-bold group-hover:text-primary-fixed transition-colors">
                  Sea Freight
                </h3>
                <p className="font-body-md text-sm text-surface-variant line-clamp-2 mb-4">
                  Safe, scalable, and economical ocean freight solutions (FCL &
                  LCL) connecting major international deep-water ports worldwide.
                </p>
                <span className="text-xs font-label-bold uppercase tracking-wider text-primary-fixed flex items-center gap-1 group-hover:underline">
                  Explore Ocean Modality{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>

            {/* Road & Multimodal (Split Column) */}
            <div className="flex flex-col gap-gutter h-[420px]">
              {/* Road Freight */}
              <Link
                href="/services#road"
                className="group relative overflow-hidden rounded-xl border border-secondary-container bg-surface flex-grow flex items-end p-6 hover:border-primary-container transition-all"
              >
                <div className="absolute right-3 bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[110px]">
                    local_shipping
                  </span>
                </div>
                <div className="relative z-20 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-xl text-on-background font-bold group-hover:text-primary-container transition-colors">
                      Road Freight
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-secondary flex items-center justify-center group-hover:bg-primary-container group-hover:border-primary-container transition-colors">
                      <span className="material-symbols-outlined text-secondary group-hover:text-white text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-xs text-secondary">
                    Flexible, cross-border, and time-critical door-to-door road
                    network transport.
                  </p>
                </div>
              </Link>

              {/* Multimodal & Rail */}
              <Link
                href="/services#road"
                className="group relative overflow-hidden rounded-xl border border-secondary-container bg-tertiary text-white flex-grow flex items-end p-6 hover:bg-neutral-800 transition-all"
              >
                <div className="absolute right-3 bottom-3 opacity-10 group-hover:opacity-25 transition-opacity">
                  <span className="material-symbols-outlined text-[110px]">
                    hub
                  </span>
                </div>
                <div className="relative z-20 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-xl text-white font-bold group-hover:text-primary-fixed transition-colors">
                      Multimodal & Rail
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center group-hover:bg-primary-container group-hover:border-primary-container transition-colors">
                      <span className="material-symbols-outlined text-white text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                  <p className="font-body-md text-xs text-tertiary-fixed-dim">
                    Seamless optimization combining air, sea, rail corridors,
                    and road logistics.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Steps / Logistics Workflow Section */}
      <section className="py-20 bg-surface border-t border-secondary-container">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-primary-container font-label-bold uppercase tracking-wider text-xs block">
                Operational Blueprint
              </span>
              <h2 className="font-headline-md text-headline-lg-mobile md:text-headline-lg text-on-background font-bold">
                End-to-End Shipment Lifecycle With Zero Friction
              </h2>
              <p className="text-secondary font-body-md text-sm leading-relaxed">
                From instant rate estimation and route optimization to strict
                customs clearance and final-mile delivery, Logifex manages every
                milestone with absolute precision.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-lg border border-secondary-container">
                  <div className="flex items-center gap-2 text-primary font-label-bold mb-1 text-sm">
                    <span className="material-symbols-outlined text-lg">
                      verified
                    </span>
                    Customs Compliance
                  </div>
                  <p className="text-xs text-secondary">
                    Pre-cleared HS codes and tariff documentation across
                    international border posts.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-secondary-container">
                  <div className="flex items-center gap-2 text-primary font-label-bold mb-1 text-sm">
                    <span className="material-symbols-outlined text-lg">
                      sensors
                    </span>
                    Telemetry & Cold Chain
                  </div>
                  <p className="text-xs text-secondary">
                    Temperature logs and real-time alerts for pharmaceuticals and
                    perishables.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-primary-container text-white px-6 py-3 rounded font-label-bold hover:bg-primary transition-colors text-sm"
                >
                  Start Your Quote
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-secondary-container shadow-md overflow-hidden">
                <img
                  alt="Logifex Logistics Process"
                  className="w-full h-auto rounded-lg object-cover"
                  src="/images/7-steps.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
