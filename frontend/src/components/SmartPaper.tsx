"use client";

import React, { useRef } from "react";
import { SmartPaperFeature } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";

interface SmartPaperProps {
  badge: string;
  title: string;
  slides: SmartPaperFeature[];
}

export const SmartPaper: React.FC<SmartPaperProps> = ({ badge, title, slides }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Primitive #6: Pin section for scroll duration (~300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const notebookImages = [
    "https://nota.uprock.pro/thumb/2/NdNsA4zjgwV803LVWQCIkg/1276r2108/d/41_block.jpg",
    "https://nota.uprock.pro/thumb/2/V-Pld1tdphvc6bqPvkKsvw/1276r2108/d/42_block.jpg",
    "https://nota.uprock.pro/thumb/2/uY0WbSXhbz5r3fxyMekPng/1276r2108/d/43_block.jpg",
    "https://nota.uprock.pro/thumb/2/ctuI-vbcqn2J7cCUXnBXig/1276r2108/d/41_block1212.png",
  ];

  // Discrete step index: 0, 1, 2, 3 based on scroll progress
  const slideCount = Math.min(slides.length, notebookImages.length);
  const stepProgress = useTransform(scrollYProgress, (v) => {
    const step = Math.min(Math.floor(v * slideCount), slideCount - 1);
    return Math.max(0, step);
  });

  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = stepProgress.on("change", (v) => {
      setActiveStep(v);
    });
    return () => unsubscribe();
  }, [stepProgress]);

  const activeSlide = slides[activeStep] || slides[0];
  const activeImage = notebookImages[activeStep] || notebookImages[0];

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black text-white">
      {/* Primitive #6: Two-Column Sticky Layout (image left, headline+copy right) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-24 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <TextInkReveal
            badge={`${badge} ${title}`}
            titleLine1="Looks like paper."
            titleLine2="Works like a system."
            theme="dark"
          />
        </div>

        {/* Center Stage: Two-Column Sticky Content */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          {/* Left Column: Crossfading Product / Open Notebook Mockup */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[360px] sm:min-h-[440px]">
            <div className="absolute w-[500px] h-[350px] bg-white/[0.04] blur-[120px] rounded-full pointer-events-none" />

            <motion.div
              key={`img-${activeStep}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-neutral-800/80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage}
                alt={activeSlide?.title || "Nota Notebook"}
                className="w-full h-auto max-h-[420px] object-contain mx-auto"
              />
            </motion.div>
          </div>

          {/* Right Column: Discrete Crossfade Headline & Copy */}
          <div className="lg:col-span-5 relative min-h-[260px] flex flex-col justify-center">
            <motion.div
              key={`text-${activeStep}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                0{activeStep + 1} — {activeSlide?.subTitle || "Intelligent Layer"}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white leading-snug">
                {activeSlide?.title}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                {activeSlide?.text}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Segmented Horizontal Progress Bar advancing in sync with scroll */}
        <div className="max-w-7xl mx-auto w-full pt-4">
          <div className="flex items-center gap-3 max-w-sm mx-auto">
            {Array.from({ length: slideCount }).map((_, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-neutral-800 transition-colors"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      isActive ? "w-full bg-white" : "w-0 bg-neutral-600"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
