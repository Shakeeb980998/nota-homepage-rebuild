"use client";

import React, { useRef, useState, useEffect } from "react";
import { SmartPaperFeature } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TextInkReveal } from "@/components/TextInkReveal";
import { LazyImage } from "@/components/LazyImage";

interface SmartPaperProps {
  badge: string;
  title: string;
  slides: SmartPaperFeature[];
}

export const SmartPaper: React.FC<SmartPaperProps> = ({ badge, title, slides }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pin section for 320vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const notebookImages = [
    "https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg",
    "https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg",
    "https://nota.uprock.pro/thumb/2/5RXD9D7cr-Ez9A9KxlC5hw/1920r1080/d/nota_scene_4_img_03.jpg",
    "https://nota.uprock.pro/thumb/2/XYdQ9jPC6FwmZfYcoOuhgQ/1920r1080/d/nota_scene_4_img_04.jpg",
  ];

  const slideCount = Math.min(slides.length, notebookImages.length);

  // Transition cover: Glides up and off-screen (0% -> -100%) during the first 14% of scroll
  const coverY = useTransform(scrollYProgress, [0.00, 0.14], ["0%", "-100%"]);
  const coverOpacity = useTransform(scrollYProgress, [0.12, 0.15], [1, 0]);

  // Step indices mapped across [0.12, 0.85] with release buffer for the 4 notebook slides
  const stepIndex = useTransform(scrollYProgress, (v) => {
    if (v < 0.32) return 0;
    if (v < 0.52) return 1;
    if (v < 0.72) return 2;
    return 3;
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = stepIndex.on("change", (latest) => {
      setActiveStep(latest);
    });
    return () => unsubscribe();
  }, [stepIndex]);

  const activeSlide = slides[activeStep] || slides[0];
  const activeImage = notebookImages[activeStep] || notebookImages[0];

  return (
    // Pinned container with clean unpin release buffer
    <div ref={containerRef} className="relative h-[320vh] bg-black text-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-14 z-10">
        
        {/* Continuous White Cover Handoff from Previous Pen Transition */}
        <motion.div
          style={shouldReduceMotion ? { display: "none" } : { y: coverY, opacity: coverOpacity }}
          className="absolute inset-0 bg-white z-40 flex flex-col justify-center px-6 sm:px-10 lg:px-14 will-change-transform pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-[96px] font-normal leading-[1.05] tracking-tight">
              <span className="text-[#8a8a8a] block">Works with</span>
              <span className="text-[#000000] block mt-1 sm:mt-2">smart paper</span>
            </h2>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto w-full">
          <TextInkReveal
            badge={`${badge} ${title}`}
            titleLine1="Looks like paper."
            titleLine2="Works like a system."
            theme="dark"
          />
        </div>

        {/* Center Stage: Two-Column Sticky Layout */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left Column: Un-boxed large image directly on section background (~60-70% width) */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[260px] sm:min-h-[360px] lg:min-h-[440px]">
            <motion.div
              key={`img-${activeStep}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative z-10 w-full flex justify-center items-center"
            >
              <LazyImage
                src={activeImage}
                alt={activeSlide?.title || "Nota Notebook"}
                className="w-full h-auto max-h-[300px] sm:max-h-[380px] lg:max-h-[480px] object-contain mx-auto"
              />
            </motion.div>
          </div>

          {/* Right Column: Plain text directly on black background — no card/box wrapper */}
          <div className="lg:col-span-5 relative min-h-[260px] flex flex-col justify-center">
            <motion.div
              key={`text-${activeStep}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="text-[11px] font-sans uppercase tracking-[0.12em] text-[#8a8a8a]">
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
              const isPassed = activeStep > idx;
              return (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-neutral-800 transition-colors"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      isActive || isPassed ? "w-full bg-white" : "w-0 bg-neutral-600"
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
