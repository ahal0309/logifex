"use client";

import { useState } from "react";

export default function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full mb-8">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100">
        <img 
          key={currentIndex}
          src={images[currentIndex]} 
          alt={`Gallery Image ${currentIndex + 1}`}
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>

      {/* Controls & Share Bar */}
      <div className="flex items-center justify-between mt-4">
        {/* Navigation Arrows */}
        {images.length > 1 ? (
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="w-8 h-8 bg-gray-300 hover:bg-gray-400 text-white flex items-center justify-center transition-colors rounded-sm"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined text-white text-[20px]">chevron_left</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-8 h-8 bg-gray-300 hover:bg-gray-400 text-white flex items-center justify-center transition-colors rounded-sm"
              aria-label="Next"
            >
              <span className="material-symbols-outlined text-white text-[20px]">chevron_right</span>
            </button>
          </div>
        ) : <div />}

        {/* Share Button */}
        <div className="flex items-center bg-[#298256] text-white px-5 py-2 rounded-full gap-3 font-medium text-sm shadow-md">
          <span>Share on:</span>
          <a href="#" className="font-bold hover:text-gray-200 transition-colors">f</a>
          <a href="#" className="font-bold hover:text-gray-200 transition-colors">in</a>
        </div>
      </div>
    </div>
  );
}
