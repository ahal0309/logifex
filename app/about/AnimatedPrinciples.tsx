"use client";

import { useEffect, useRef } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bebasNeue = localFont({
  src: "../../public/fonts/BebasNeue-Regular.ttf",
  display: "swap",
});

interface PrincipleProps {
  title: string;
  statement: string;
  revealText: string;
  sectionIdx: number;
}

function PrincipleSection({ title, statement, revealText, sectionIdx }: PrincipleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (revealRef.current) {
        const targets = revealRef.current.querySelectorAll(`.reveal-word-${sectionIdx}`);
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.to(targets, {
            color: "#141d23", // Solid dark color matching on-background
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.3,
            },
          });
        });

        mm.add("(max-width: 1023px)", () => {
          gsap.to(targets, {
            color: "#141d23",
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "bottom 90%",
              scrub: 0.3,
            },
          });
        });
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, [sectionIdx]);

  const words = revealText.split(" ");

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center justify-center py-8 lg:py-12 border-b border-secondary-container/50 last:border-b-0"
    >
      {/* Left Column: Bebas Neue Title */}
      <div className="w-full lg:w-4/12">
        <h2
          className="font-normal text-3xl sm:text-6xl lg:text-[90px] text-on-background uppercase tracking-tight leading-none"
          style={{ fontFamily: bebasNeue.style.fontFamily }}
        >
          {title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Right Column: Statement & Animated Reveal */}
      <div className="w-full lg:w-8/12 flex flex-col justify-center space-y-4 lg:space-y-10">
        {/* Top: Bold, static statement */}
        <p
          className="text-xl sm:text-3xl lg:text-[52px] uppercase tracking-normal"
          style={{ fontFamily: bebasNeue.style.fontFamily, lineHeight: 0.95, color: "#A90000" }}
        >
          {statement}
        </p>

        {/* Bottom: Animated reveal paragraph */}
        <p
          ref={revealRef}
          className="text-lg sm:text-3xl lg:text-[52px] uppercase tracking-normal"
          style={{ fontFamily: bebasNeue.style.fontFamily, lineHeight: 0.95 }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`reveal-word-${sectionIdx} inline transition-colors duration-100`}
              style={{ color: "rgba(20, 29, 35, 0.08)" }} // Very faint gray before reveal
            >
              {word}
            </span>
          )).reduce((acc: any[], x, i) => (i === 0 ? [x] : [...acc, " ", x]), [])}
        </p>
      </div>
    </div>
  );
}

export default function AnimatedPrinciples() {
  const principles = [
    {
      title: "Our Mission",
      statement: "Making Every Shipment More Predictable, Precise, and Reliable",
      revealText: "Our mission is to deliver logistics solutions that keep businesses moving with confidence. We combine careful planning, operational precision, clear communication, and accountability to ensure every shipment is managed efficiently from origin to destination.",
    },
    {
      title: "Our Vision",
      statement: "To build a logistics ecosystem where movement is not just efficient, but predictable and dependable",
      revealText: "enabling businesses to operate with confidence across domestic and international markets.",
    },
    {
      title: "Our Values",
      statement: "Precision in planning, relentless compliance standards, and transparent communication",
      revealText: "and unwavering accountability for every kilogram of cargo under our care.",
    },
  ];

  return (
    <section className="w-full max-w-[1250px] mx-auto px-4 md:px-8">
      {/* Principles List */}
      <div className="flex flex-col">
        {principles.map((p, idx) => (
          <PrincipleSection
            key={idx}
            title={p.title}
            statement={p.statement}
            revealText={p.revealText}
            sectionIdx={idx}
          />
        ))}
      </div>
    </section>
  );
}
