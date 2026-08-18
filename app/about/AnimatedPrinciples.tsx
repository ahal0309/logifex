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
      className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start py-16 lg:py-24 border-b border-secondary-container/50 last:border-b-0"
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
      <div className="w-full lg:w-8/12 flex flex-col justify-center space-y-6 lg:space-y-10">
        {/* Top: Bold, static statement */}
        <p
          className="text-3xl sm:text-4xl lg:text-[52px] text-on-background uppercase tracking-normal"
          style={{ fontFamily: bebasNeue.style.fontFamily, lineHeight: 0.95 }}
        >
          {statement}
        </p>

        {/* Bottom: Animated reveal paragraph */}
        <p
          ref={revealRef}
          className="text-3xl sm:text-4xl lg:text-[52px] uppercase tracking-normal"
          style={{ fontFamily: bebasNeue.style.fontFamily, lineHeight: 0.95 }}
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
      statement: "Making Every Shipment More Predictable, Precise, and Reliable",
      revealText: "Our mission is to deliver logistics solutions that keep businesses moving with confidence. We combine careful planning, operational precision, clear communication, and accountability to ensure every shipment is managed efficiently from origin to destination.",
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
