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
        <div className="lg:col-span-6 bg-neutral-950 p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-sm aspect-[4/3] rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between shadow-inner">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-600">
              <span>CANVAS_LAYER // 0{currentSlide + 1}</span>
              <span>SYNCHRONIZED</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 bg-neutral-800 rounded-full" />
              <div className="h-2 w-1/2 bg-neutral-800 rounded-full" />
              <div className="h-2 w-5/6 bg-neutral-800 rounded-full" />
            </div>
            <div className="text-xs font-mono text-neutral-500 text-right">
              LATENCY &lt; 8ms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
