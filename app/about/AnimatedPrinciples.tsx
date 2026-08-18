"use client";

import { useEffect, useRef } from "react";
import { Bebas_Neue } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
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
        gsap.to(targets, {
          color: "#141d23", // Solid dark color matching on-background
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.6,
          },
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
      className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start py-6 lg:py-12 border-b border-secondary-container/50 last:border-b-0"
    >
      {/* Left Column: Bebas Neue Title */}
      <div className="w-full lg:w-4/12">
        <h2
          className="font-normal text-4xl sm:text-6xl lg:text-[90px] text-on-background uppercase tracking-tight leading-none"
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
      <div className="w-full lg:w-8/12 flex flex-col justify-center">
        {/* Top: Bold, static statement */}
        <p className="text-lg sm:text-2xl lg:text-3xl font-headline-display font-extrabold uppercase text-on-background tracking-tight leading-snug mb-4 lg:mb-6">
          {statement}
        </p>

        {/* Bottom: Animated reveal paragraph */}
        <p
          ref={revealRef}
          className="text-base sm:text-xl lg:text-2xl font-headline-display font-extrabold uppercase tracking-tight leading-snug"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`reveal-word-${sectionIdx} inline-block mr-[0.22em] transition-colors duration-100`}
              style={{ color: "rgba(20, 29, 35, 0.08)" }} // Very faint gray before reveal
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function AnimatedPrinciples() {
  const principles = [
    {
      title: "Our Mission",
      statement: "To deliver cost-effective, dependable, and swift freight forwarding services.",
      revealText: "We eliminate supply chain bottlenecks and accelerate client growth across international borders.",
    },
    {
      title: "Our Vision",
      statement: "To be the most reliable and technologically integrated freight partner.",
      revealText: "We operate in the Middle East and South Asian trade corridor, recognized globally for operational integrity and excellence.",
    },
    {
      title: "Our Values",
      statement: "Precision in planning, relentless compliance standards, and transparent communication.",
      revealText: "We maintain unwavering accountability for every kilogram of cargo under our care.",
    },
  ];

  return (
    <section className="w-full max-w-[1250px] mx-auto bg-surface-container-lowest p-6 md:p-14 rounded-2xl border border-secondary-container shadow-sm space-y-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
          Guiding Principles
        </span>
        <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background">
          Our Mission, Vision & Values
        </h2>
      </div>

      {/* Principles List */}
      <div className="flex flex-col gap-6">
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
