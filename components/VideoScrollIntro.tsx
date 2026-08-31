"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function VideoScrollIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Disable body scroll while intro is active
    document.body.style.overflow = "hidden";
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frameCount = 120;
    const currentFrame = (index: number) => 
      `/video-frames/frame_${index.toString().padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    
    let cachedWidth = 0;
    let cachedHeight = 0;
    let drawWidth = 0;
    let drawHeight = 0;
    let offsetX = 0;
    let offsetY = 0;

    let loadedCount = 0;

    // Preload all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Draw first frame immediately
          handleResize();
          render(1);
        }
      };
      images.push(img);
    }

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

      const imgRatio = 16 / 9; // The extracted frames are 16:9
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
      render(obj.frame);
    }

    window.addEventListener("resize", handleResize);

    // Virtual scroll tracking
    const obj = { frame: 1 };
    let targetFrame = 1;
    let isComplete = false;

    const handleScroll = (deltaY: number) => {
      if (isComplete) return;
      
      // Sensitivity tuned for 120 frames
      const sensitivity = 0.05; 
      targetFrame += deltaY * sensitivity;
      targetFrame = Math.max(1, Math.min(frameCount, targetFrame));

      // GSAP tween to animate smoothly to the target frame
      gsap.to(obj, {
        frame: targetFrame,
        duration: 0.5, // Quick, snappy 0.5s duration since canvas paints instantly
        ease: "power2.out",
        onUpdate: () => render(Math.round(obj.frame)),
        onComplete: () => {
          // If we reached the final frame, trigger completion
          if (Math.round(obj.frame) >= frameCount && !isComplete) {
            isComplete = true;
            finishIntro();
          }
        }
      });
    };

    // Wheel event (desktop)
    const onWheel = (e: WheelEvent) => {
      handleScroll(e.deltaY);
    };

    // Touch events (mobile)
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      handleScroll(deltaY);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    function render(frameIndex: number) {
      if (!canvas || !ctx) return;
      const img = images[Math.max(0, Math.min(frameIndex - 1, frameCount - 1))];
      if (!img || !img.complete) return;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function finishIntro() {
      setIsFading(true);
      // Fade out timeline
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete(); // Tell HomeClient to unmount us
        }
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      gsap.killTweensOf(obj);
      gsap.killTweensOf(containerRef.current);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block" 
      />
      {/* Optional fade overlay during exit */}
      {isFading && <div className="absolute inset-0 bg-black/50 transition-opacity duration-500"></div>}
    </div>
  );
}
