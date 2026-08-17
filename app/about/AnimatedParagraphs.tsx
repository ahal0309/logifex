"use client";

import { useEffect, useRef } from "react";
import { Bebas_Neue } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const text1 =
  "Founded with the vision to modernize freight forwarding, Logifex combines decades of industry expertise with cutting-edge telemetry, regulatory compliance, and dedicated client service.";

const text2 =
  "Whether orchestrating full aircraft charters for urgent industrial machinery, deep-sea container lines, or overland cross-border trucking, we ensure that your cargo moves with uninterrupted precision from origin to final destination.";

const words1 = text1.split(" ");
const words2 = text2.split(" ");

export default function AnimatedParagraphs() {
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);

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

      if (p2Ref.current) {
        const targets = p2Ref.current.querySelectorAll(".reveal-word-2");
        gsap.to(targets, {
          color: "#A90000",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: p2Ref.current,
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
        className="text-center uppercase font-normal text-[clamp(32px,9vw,56px)] md:text-[clamp(42px,4.5vw,72px)] tracking-[0.005em]"
        style={{
          fontFamily: bebasNeue.style.fontFamily,
          lineHeight: 0.95,
          marginBottom: "50px",
        }}
      >
        {words1.map((word, i) => (
          <span
            key={i}
            className="reveal-word-1 inline-block mr-[0.2em] transition-colors duration-100"
            style={{ color: "rgba(169, 0, 0, 0.10)" }}
          >
            {word}
          </span>
        ))}
      </p>
      <p
        ref={p2Ref}
        className="text-center uppercase font-normal text-[clamp(32px,9vw,56px)] md:text-[clamp(42px,4.5vw,72px)] tracking-[0.005em]"
        style={{
          fontFamily: bebasNeue.style.fontFamily,
          lineHeight: 0.95,
        }}
      >
        {words2.map((word, i) => (
          <span
            key={i}
            className="reveal-word-2 inline-block mr-[0.2em] transition-colors duration-100"
            style={{ color: "rgba(169, 0, 0, 0.10)" }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
