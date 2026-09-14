"use client";

import React, { useRef, useState, useEffect } from "react";
import { SmartPaperFeature } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface SmartPaperProps {
  badge: string;
  title: string;
  slides: SmartPaperFeature[];
}

// Vertical Line that draws down from top to bottom (media_1789365968867 -> media_1789365980850)
const DividingLine: React.FC<{
  index: number;
  progress: any;
  shouldReduceMotion: boolean | null;
}> = ({ index, progress, shouldReduceMotion }) => {
  // Staggered top-to-bottom line draw between 0.04 and 0.18
  const start = 0.04 + index * 0.025;
  const end = start + 0.08;
  const scaleY = useTransform(progress, [start, end], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <div className="relative w-1/6 h-full pointer-events-none">
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute top-0 right-0 w-[1px] h-full bg-neutral-200/80 will-change-transform"
      />
    </div>
  );
};

// Vertical Curtain Column that drops down AFTER lines are drawn (media_1789365992897)
const CurtainColumn: React.FC<{
  index: number;
  progress: any;
  shouldReduceMotion: boolean | null;
}> = ({ index, progress, shouldReduceMotion }) => {
  // Drops down between 0.18 and 0.32 in staggered cascade
  const start = 0.18 + index * 0.025;
  const end = start + 0.10;
  const y = useTransform(progress, [start, end], ["0%", "100%"]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ y }}
      className="w-1/6 h-full bg-white will-change-transform"
    />
  );
};

export const SmartPaper: React.FC<SmartPaperProps> = ({ badge, title, slides }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pinned container
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

  // Title ("Works with smart paper") fades out smoothly as lines finish drawing and columns drop (0.12 -> 0.20)
  const titleFadeOpacity = useTransform(scrollYProgress, [0.12, 0.20], [1, 0]);

  // Step indices mapped across [0.34, 0.90] for the 4 notebook slides
  const stepIndex = useTransform(scrollYProgress, (v) => {
    if (v < 0.48) return 0;
    if (v < 0.64) return 1;
    if (v < 0.82) return 2;
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
  const activeImage = slides[activeStep]?.image || notebookImages[activeStep] || notebookImages[0];

  return (
    <div id="about" ref={containerRef} className="relative h-[400vh] bg-black text-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10 flex flex-col justify-between">
        
        {/* Layer A: Centered Title ("Works with smart paper" - media_1789364660655) */}
        <motion.div
          style={shouldReduceMotion ? { display: "none" } : { opacity: titleFadeOpacity }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-normal leading-[0.92] tracking-tight select-none">
            <span className="text-[#888888] block">Works with</span>
            <span className="text-[#000000] block mt-1 sm:mt-2">smart paper</span>
          </h2>
        </motion.div>

        {/* Layer B1: 5 Dividing Lines Drawing Down from Top (media_1789365968867 -> media_1789365980850) */}
        <div className="absolute inset-0 z-45 pointer-events-none overflow-hidden flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <DividingLine
              key={`line-${i}`}
              index={i}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Layer B2: 6 Vertical Curtain Columns Dropping Down (media_1789365992897) */}
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <CurtainColumn
              key={`col-${i}`}
              index={i}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Layer C: Step 3 Revealed Dark Section (media_1789364689354) */}
        {/* Top-Left: Large Serif Headline */}
        <div className="absolute top-20 sm:top-24 lg:top-28 left-6 sm:left-10 lg:left-14 z-20 max-w-sm sm:max-w-md lg:max-w-lg pointer-events-none">
          <motion.h2
            key={`title-${activeStep}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-normal text-white leading-[1.12] tracking-tight"
          >
            {activeSlide?.title}
          </motion.h2>
        </div>

        {/* Center: Vertical Notebook Showcase */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6">
          <motion.div
            key={`img-${activeStep}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage}
              alt={activeSlide?.title || "Nota Notebook"}
              className="w-auto h-auto max-h-[48vh] sm:max-h-[56vh] lg:max-h-[64vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] select-none pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Bottom-Right: Dark Rounded Glass Card */}
        <div className="absolute bottom-20 sm:bottom-24 right-6 sm:right-10 lg:right-14 z-20 max-w-xs sm:max-w-sm w-full">
          <motion.div
            key={`card-${activeStep}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#18181b]/90 border border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-2xl space-y-2.5"
          >
            <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">
              {activeSlide?.subTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {activeSlide?.text}
            </p>
          </motion.div>
        </div>

        {/* Bottom-Center: 4-Segment Progress Indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex justify-center z-20">
          <div className="w-full max-w-md flex items-center gap-3">
            {Array.from({ length: slideCount }).map((_, idx) => (
              <div
                key={idx}
                className="h-1 flex-1 rounded-full overflow-hidden bg-neutral-800 transition-colors"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    activeStep === idx || activeStep > idx ? "w-full bg-white" : "w-0 bg-neutral-600"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
