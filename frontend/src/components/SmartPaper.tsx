"use client";

import React, { useState } from "react";
import { SmartPaperFeature } from "@/types/cms";
import { motion, AnimatePresence } from "framer-motion";

interface SmartPaperProps {
  badge: string;
  title: string;
  slides: SmartPaperFeature[];
}

export const SmartPaper: React.FC<SmartPaperProps> = ({ badge, title, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(2); // Slide 3 as shown in reference Image 3

  const notebookImages = [
    "https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg",
    "https://nota.uprock.pro/thumb/2/V-Pld1tdphvc6bqPvkKsvw/1276r2108/d/42_block.jpg",
    "https://nota.uprock.pro/thumb/2/uY0WbSXhbz5r3fxyMekPng/1276r2108/d/43_block.jpg",
    "https://nota.uprock.pro/thumb/2/ctuI-vbcqn2J7cCUXnBXig/1276r2108/d/41_block1212.png",
  ];

  const active = slides[currentSlide % slides.length];
  const activeImage = notebookImages[currentSlide % notebookImages.length];

  return (
    <section id="about" className="py-32 px-6 bg-black text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Big Editorial Headline from Image 3 */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            {badge} {title}
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight leading-[1.05] text-white">
            <span className="block">No delays. No glitches.</span>
            <span className="block italic text-neutral-400">No random effects.</span>
          </h2>
        </div>

        {/* Center Stage: Open Notebook + Floating Glassmorphic Card */}
        <div className="relative min-h-[520px] flex items-center justify-center">
          {/* Ambient Lighting Glow */}
          <div className="absolute w-[600px] h-[400px] bg-white/[0.04] blur-[120px] rounded-full pointer-events-none" />

          {/* Open Notebook Mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage}
                alt="Nota Open Smart Paper Notebook"
                className="w-full h-auto object-contain max-h-[480px] mx-auto rounded-3xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Glassmorphic Card from Image 3 */}
          <motion.div
            key={`glass-${currentSlide}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute bottom-4 right-4 md:bottom-12 md:right-8 z-20 max-w-sm backdrop-blur-2xl bg-neutral-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
          >
            <h3 className="text-lg sm:text-xl font-medium mb-3 tracking-tight">
              {active.subTitle || "AI-powered structure"}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {active.text}
            </p>
          </motion.div>
        </div>

        {/* 4-Segment Progress Bar Slider from Image 3 */}
        <div className="flex justify-center items-center gap-3 max-w-md mx-auto pt-6">
          {slides.slice(0, 4).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className="group py-3 flex-1 cursor-pointer focus:outline-none"
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-white" : "bg-neutral-800 group-hover:bg-neutral-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
