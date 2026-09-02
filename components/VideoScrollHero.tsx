"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function VideoScrollHero({ children }: { children?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameCount = 120;
    const currentFrame = (index: number) => 
      `/video-frames/frame_${index.toString().padStart(3, "0")}.webp`;

    const images: HTMLImageElement[] = [];
    const scrollObj = { frame: 1 };
    
    // Performance optimization: cache dimensions
    let cachedWidth = 0;
    let cachedHeight = 0;
    let drawWidth = 0;
    let drawHeight = 0;
    let offsetX = 0;
    let offsetY = 0;

    // Preload all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => {
      handleResize();
      render();
      ScrollTrigger.refresh(); // Crucial: tell GSAP to recalculate pin spacing now that the canvas is rendering
    };

    function handleResize() {
      if (!canvas || !ctx) return;
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      if (cachedWidth === windowWidth && cachedHeight === windowHeight) return;
      cachedWidth = windowWidth;
      cachedHeight = windowHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = windowWidth * dpr;
      canvas.height = windowHeight * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowHeight}px`;

      const imgRatio = 1280 / 720;
      const winRatio = windowWidth / windowHeight;

      if (winRatio > imgRatio) {
        drawHeight = windowWidth / imgRatio;
        drawWidth = windowWidth;
        offsetY = (windowHeight - drawHeight) / 2;
        offsetX = 0;
      } else {
        drawWidth = windowHeight * imgRatio;
        drawHeight = windowHeight;
        offsetX = (windowWidth - drawWidth) / 2;
        offsetY = 0;
      }
      render(); // force render on resize
    }

    function render() {
      if (!canvas || !ctx) return;
      const img = images[Math.max(0, Math.min(scrollObj.frame - 1, frameCount - 1))];
      if (!img || !img.complete) return;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    window.addEventListener("resize", handleResize);

    // Main animation timeline tied to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 8}`, // 8 screen heights of scrolling (butter smooth and fixed)
        scrub: 0.5, // 0.5s scrub delay for butter smooth catch-up
        pin: true,
        pinSpacing: true, // explicitly true
        anticipatePin: 1, // helps prevent flashing
      }
    });

    tl.to(scrollObj, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      onUpdate: () => requestAnimationFrame(render), // Use rAF for smoothest rendering
      duration: 1
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-0" 
      />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
