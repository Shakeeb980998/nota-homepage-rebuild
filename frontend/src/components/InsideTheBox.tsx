"use client";

import React, { useRef } from "react";
import { BoxItem } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface InsideTheBoxProps {
  titleLine1: string;
  titleLine2: string;
  leadText: string;
  items: BoxItem[];
}

const BLINDS_COUNT = 18;

// Full-width Venetian Blinds Overlay that collapses open (media_1789370947573 -> media_1789370960390)
const FullWidthHorizontalBlinds: React.FC<{
  progress: any;
  shouldReduceMotion: boolean | null;
}> = ({ progress, shouldReduceMotion }) => {
  // Blinds collapse open between 0.42 and 0.58
  const scaleY = useTransform(progress, [0.42, 0.58], [1, 0]);
  const opacity = useTransform(progress, [0.54, 0.60], [1, 0]);
  const display = useTransform(progress, (v: number) => (v >= 0.60 ? "none" : "flex"));

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ opacity, display }}
      className="absolute inset-0 w-full z-30 pointer-events-none flex flex-col justify-between overflow-hidden"
    >
      {Array.from({ length: BLINDS_COUNT }).map((_, idx) => (
        <motion.div
          key={idx}
          style={{ scaleY, transformOrigin: "center" }}
          className="w-full h-3 sm:h-3.5 lg:h-4.5 bg-white will-change-transform"
        />
      ))}
    </motion.div>
  );
};

export const InsideTheBox: React.FC<InsideTheBoxProps> = ({
  titleLine1 = "Inside",
  titleLine2 = "the box",
  leadText,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll scrub across the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Expanding white circle from center on black background (0.00 -> 0.22)
  const circleScale = useTransform(scrollYProgress, [0.00, 0.22], [0, 4.8]);
  const whiteBgOpacity = useTransform(scrollYProgress, [0.20, 0.24], [0, 1]);

  // Phase 2: Centered "Inside the box" serif headline moving up (0.12 -> 0.48)
  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.38, 0.48], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.24, 0.46], ["0px", "-36vh"]);
  const titleDisplay = useTransform(scrollYProgress, (v: number) => (v >= 0.48 ? "none" : "flex"));

  // Phase 3 & 4: Full-screen unboxing showcase entrance, blinds opening, and smooth exit (0.28 -> 1.00)
  const stageOpacity = useTransform(scrollYProgress, [0.28, 0.36, 0.88, 1.00], [0, 1, 1, 0]);
  const stageY = useTransform(
    scrollYProgress,
    [0.28, 0.46, 0.78, 1.00],
    ["45vh", "0vh", "0vh", "-180px"]
  );

  const primaryItem = items?.[0] || {
    title: "A complete, ready-to-use set",
    description:
      "Smart pen, Smartpaper notepad, charging cable, and instructions — carefully packaged for a hassle-free start.",
  };

  return (
    <div ref={containerRef} id="inside-the-box" className="relative h-[450vh] bg-black">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end bg-transparent">
        
        {/* Solid White Background layer that activates once circle finishes expansion */}
        <motion.div
          style={{ opacity: whiteBgOpacity }}
          className="absolute inset-0 bg-white z-0 pointer-events-none"
        />

        {/* Phase 1: Growing White Circle */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10">
          <motion.div
            style={
              shouldReduceMotion
                ? { opacity: 1, width: "100%", height: "100%", borderRadius: 0 }
                : { scale: circleScale }
            }
            className="w-[50vmin] h-[50vmin] rounded-full bg-white will-change-transform"
          />
        </div>

        {/* Phase 2: "Inside the box" Centered Title gliding up (media_1789370947573) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { display: "none" }
              : { opacity: titleOpacity, y: titleY, display: titleDisplay }
          }
          className="absolute inset-0 z-20 flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[110px] xl:text-[130px] font-normal leading-[0.92] tracking-tight select-none">
            <span className="text-[#999999] block">{titleLine1}</span>
            <span className="text-[#000000] block mt-1 sm:mt-2">{titleLine2}</span>
          </h2>
        </motion.div>

        {/* Phase 3 & 4: Full-Screen Showcase Stage with Full-Width Blinds (media_1789370947573 -> media_1789370960390) */}
        <motion.div
          style={shouldReduceMotion ? { opacity: 1 } : { opacity: stageOpacity, y: stageY }}
          className="relative z-20 w-full h-[82vh] sm:h-[85vh] lg:h-[88vh] flex items-end justify-center"
        >
          {/* Venetian Blinds Overlay spanning the full width of the screen */}
          <FullWidthHorizontalBlinds
            progress={scrollYProgress}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Stage Container: Left large luxury box + Right top-aligned text */}
          <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-end justify-between gap-6 lg:gap-12 pb-0">
            
            {/* Left Column: Full-Height Open Luxury Box */}
            <div className="relative w-full lg:w-[60%] h-[68vh] sm:h-[75vh] lg:h-[82vh] max-h-[820px] flex items-end justify-center lg:justify-end">
              {/* Real Box Photograph from nota.uprock.pro */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_01_adaptive.jpg"
                alt={primaryItem.title}
                className="h-full w-auto max-w-full object-contain object-bottom select-none pointer-events-none drop-shadow-sm"
              />
            </div>

            {/* Right Column: Title and Description aligned to the top right of the box */}
            <div className="w-full lg:w-[38%] self-start pt-4 sm:pt-8 lg:pt-14 xl:pt-18 space-y-3 sm:space-y-4 text-left">
              <h3 className="font-sans text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] font-medium text-black tracking-[-0.01em] leading-snug">
                {primaryItem.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#555555] font-normal leading-[1.65] max-w-sm lg:max-w-md">
                {primaryItem.description}
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};
