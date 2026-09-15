"use client";

import React, { useRef, useState, useEffect } from "react";
import { SmartPaperFeature } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface SmartPaperProps {
  badge: string;
  title: string;
  slides: SmartPaperFeature[];
}

// Vertical Dividing Line that draws down from top to bottom (media_1789366700783 & media_1789365968867)
const DividingLine: React.FC<{
  index: number;
  progress: any;
  shouldReduceMotion: boolean | null;
}> = ({ index, progress, shouldReduceMotion }) => {
  // Lines draw down from right to left between 0.08 and 0.17 (matching media_1789366700783 and media_1789365968867)
  const lineStart = 0.08 + (4 - index) * 0.014;
  const lineEnd = lineStart + 0.045;
  const scaleY = useTransform(progress, [lineStart, Math.min(lineEnd, 0.17)], [0, 1]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{
        left: `${((index + 1) / 6) * 100}%`,
        scaleY,
        transformOrigin: "top",
      }}
      className="absolute top-0 w-[1px] h-full bg-neutral-300 pointer-events-none will-change-transform"
    />
  );
};

// Vertical Curtain Column that drops down AFTER lines are drawn and vanished (media_1789365992897)
const CurtainColumn: React.FC<{
  index: number;
  progress: any;
  shouldReduceMotion: boolean | null;
}> = ({ index, progress, shouldReduceMotion }) => {
  // Drops down between 0.22 and 0.42 in staggered cascade from left to right (matching media_1789365992897)
  const colStart = 0.22 + index * 0.024;
  const colEnd = colStart + 0.10;
  const y = useTransform(progress, [colStart, colEnd], ["0%", "100%"]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ y }}
      className="w-1/6 h-full bg-white will-change-transform pointer-events-none"
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

  // Title ("Works with smart paper") fades out cleanly before dividing lines draw (0.01 -> 0.06)
  const titleFadeOpacity = useTransform(scrollYProgress, [0.01, 0.06], [1, 0]);
  const titleDisplay = useTransform(scrollYProgress, (v) => (v >= 0.07 ? "none" : "flex"));

  // Dividing lines draw down (0.08 -> 0.17) and vanish completely before curtain drop begins (0.17 -> 0.19)
  const linesOpacity = useTransform(scrollYProgress, [0.17, 0.19], [1, 0]);
  const linesDisplay = useTransform(scrollYProgress, (v) => (v >= 0.19 ? "none" : "block"));

  // Step indices mapped across [0.42, 0.95] for the 4 notebook slides
  const stepIndex = useTransform(scrollYProgress, (v) => {
    if (v < 0.56) return 0;
    if (v < 0.70) return 1;
    if (v < 0.84) return 2;
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

  const formattedTitles: Record<number, string> = {
    0: "We use special paper<br/>with a nearly invisible<br/>pattern",
    1: "Looks like paper.<br/>Works like a system.",
    2: "No delays. No glitches.<br/>No random effects.",
    3: "Everything you write is synced<br/>to your phone in real time",
  };

  return (
    <div id="about" ref={containerRef} className="relative h-[450vh] bg-black text-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10 flex flex-col justify-between">
        
        {/* Layer A: Centered Title ("Works with smart paper" - matches PenZoomTransition concurrent fade-in) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { display: "none" }
              : { opacity: titleFadeOpacity, display: titleDisplay }
          }
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
        >
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-normal leading-[0.92] tracking-tight select-none">
            <span className="text-[#888888] block">Works with</span>
            <span className="text-white block mt-1 sm:mt-2">smart paper</span>
          </h2>
        </motion.div>

        {/* Layer B1: 5 Vertical Dividing Lines (vanishes with display: none before columns drop) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { display: "none" }
              : { opacity: linesOpacity, display: linesDisplay }
          }
          className="absolute inset-0 z-45 pointer-events-none overflow-hidden"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <DividingLine
              key={`line-${i}`}
              index={i}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>

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

        {/* Layer C: Step 3 Revealed Dark Section (media_1789368040023) */}
        {/* Full-bleed Studio Background Image */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.img
            key={`img-${activeStep}`}
            src={activeImage}
            alt={activeSlide?.title || "Nota Notebook"}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
        </div>

        {/* Top-Left: Large Serif Headline (Fluid scaling across viewports) */}
        <div className="absolute top-16 sm:top-20 md:top-24 lg:top-28 left-5 sm:left-8 md:left-12 lg:left-16 z-20 max-w-[85vw] sm:max-w-md lg:max-w-xl xl:max-w-2xl pointer-events-none pr-4">
          <motion.h2
            key={`title-${activeStep}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-normal text-white leading-[1.05] tracking-tight"
            dangerouslySetInnerHTML={{
              __html: formattedTitles[activeStep] || activeSlide?.title || "",
            }}
          />
        </div>

        {/* Bottom-Right: Refined Dark Card (Fluid width and padding) */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 right-4 sm:right-8 md:right-12 lg:right-16 z-20 max-w-[92vw] sm:max-w-[380px] lg:max-w-[420px] w-full">
          <motion.div
            key={`card-${activeStep}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#181818]/90 border border-white/10 rounded-[18px] sm:rounded-[22px] p-4 sm:p-6 lg:p-7 backdrop-blur-md shadow-2xl space-y-2 sm:space-y-2.5"
          >
            <h3 className="font-sans text-sm sm:text-base lg:text-[17px] font-medium text-white tracking-tight leading-snug">
              {activeSlide?.subTitle}
            </h3>
            <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-neutral-300 font-light leading-[1.55] sm:leading-[1.6]">
              {activeSlide?.text}
            </p>
          </motion.div>
        </div>

        {/* Bottom-Center: Sleek Hairline Progress Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 right-6 sm:right-12 flex justify-center z-20">
          <div className="w-full max-w-xl lg:max-w-2xl flex items-center gap-4 sm:gap-6">
            {Array.from({ length: slideCount }).map((_, idx) => (
              <div
                key={idx}
                className="h-[1.5px] flex-1 overflow-hidden bg-white/20 transition-colors"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    activeStep === idx || activeStep > idx ? "w-full bg-white" : "w-0 bg-transparent"
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
