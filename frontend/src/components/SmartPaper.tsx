"use client";

import React, { useState } from "react";
import { SmartPaperFeature } from "@/types/cms";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SmartPaperProps {
  badge: string;
  title: string;
  slides: SmartPaperFeature[];
}

export const SmartPaper: React.FC<SmartPaperProps> = ({ badge, title, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
            {badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-white font-light mt-2">
            {title}
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-neutral-500">
            0{currentSlide + 1} / 0{slides.length}
          </span>
          <button
            onClick={prev}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left text pane */}
        <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              {slides[currentSlide].subTitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal leading-snug">
              {slides[currentSlide].title}
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed pt-2">
              {slides[currentSlide].text}
            </p>
          </div>

          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? "w-8 bg-white" : "w-2 bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right illustration / graphic pane */}
        <div className="lg:col-span-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 sm:p-12 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-800">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
            {/* Ambient backlight */}
            <div className="absolute w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none" />
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/thumb/2/E_-dKzAg6YZhD4xJJ6rAMA/233r734/d/library_image-14700-symbol-iw3g92519-nota_scene_2_img.png"
              alt="Nota Smart Paper & Pen"
              className="relative z-10 max-h-72 object-contain hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(255,255,255,0.06)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
