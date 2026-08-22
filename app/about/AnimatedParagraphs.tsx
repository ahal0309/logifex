"use client";

import { useEffect, useRef } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bebasNeue = localFont({
  src: "../../public/fonts/BebasNeue-Regular.ttf",
  display: "swap",
});

const text1 =
  "Founded with the vision to modernize freight forwarding, Logifex combines decades of industry expertise with cutting-edge telemetry, regulatory compliance, and dedicated client service.";

const words1 = text1.split(" ");

export default function AnimatedParagraphs() {
  const p1Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      if (p1Ref.current) {
        const targets = p1Ref.current.querySelectorAll(".reveal-word-1");
        gsap.to(targets, {
          color: "#A90000",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: p1Ref.current,
            start: "top 80%",
            end: "bottom 35%",
            scrub: 0.6,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full max-w-[1250px] mx-auto px-4 md:px-8">
      <p
        ref={p1Ref}
        className="text-left md:text-center uppercase font-normal text-[clamp(24px,7vw,40px)] md:text-[clamp(42px,4.5vw,72px)] tracking-[0.005em]"
        style={{
          fontFamily: bebasNeue.style.fontFamily,
          lineHeight: 0.95,
        }}
      >
        {words1.map((word, i) => (
          <span
            key={i}
            className="reveal-word-1 inline transition-colors duration-100"
            style={{ color: "rgba(169, 0, 0, 0.10)" }}
          >
            {word}
          </span>
        )).reduce((acc: any[], x, i) => (i === 0 ? [x] : [...acc, " ", x]), [])}
      </p>
    </div>
  );
}
