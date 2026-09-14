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

const BLINDS_COUNT = 22;

// Horizontal Blinds Overlay that collapses open (media_1789369949345 -> media_1789369964283)
const HorizontalBlinds: React.FC<{ progress: any; shouldReduceMotion: boolean | null }> = ({
  progress,
  shouldReduceMotion,
}) => {
  // Blinds collapse open between 0.44 and 0.58
  const scaleY = useTransform(progress, [0.44, 0.58], [1, 0]);
  const opacity = useTransform(progress, [0.55, 0.59], [1, 0]);
  const display = useTransform(progress, (v: number) => (v >= 0.59 ? "none" : "flex"));

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ opacity, display }}
      className="absolute inset-0 flex flex-col justify-between pointer-events-none z-20 overflow-hidden"
    >
      {Array.from({ length: BLINDS_COUNT }).map((_, idx) => (
        <motion.div
          key={idx}
          style={{ scaleY, transformOrigin: "center" }}
          className="w-full h-2.5 sm:h-3.5 lg:h-4 bg-white will-change-transform"
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

  // Scroll scrub across the entire pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Expanding white circle from center on black background (0.00 -> 0.22)
  const circleScale = useTransform(scrollYProgress, [0.00, 0.22], [0, 4.8]);
  const whiteBgOpacity = useTransform(scrollYProgress, [0.20, 0.24], [0, 1]);

  // Phase 2: Centered "Inside the box" serif headline (0.12 -> 0.38)
  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.26, 0.36], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.25, 0.38], ["0px", "-180px"]);
  const titleDisplay = useTransform(scrollYProgress, (v: number) => (v >= 0.38 ? "none" : "flex"));

  // Phase 3 & 4: Unboxing stage entrance and scroll (0.30 -> 1.00)
  const stageOpacity = useTransform(scrollYProgress, [0.30, 0.38], [0, 1]);
  const stageY = useTransform(
    scrollYProgress,
    [0.30, 0.44, 0.70, 1.00],
    ["140px", "0px", "0px", "-240px"]
  );

  const primaryItem = items?.[0] || {
    title: "A complete, ready-to-use set",
    description:
      "Smart pen, Smartpaper notepad, charging cable, and instructions — carefully packaged for a hassle-free start.",
  };

  return (
    <div ref={containerRef} id="inside-the-box" className="relative h-[450vh] bg-black">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* Solid White Background layer that activates once circle finishes expansion */}
        <motion.div
          style={{ opacity: whiteBgOpacity }}
          className="absolute inset-0 bg-white z-0 pointer-events-none"
        />

        {/* Phase 1: Growing White Circle (media_1789369904406) */}
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

        {/* Phase 2: "Inside the box" Centered Title (media_1789369936878) */}
        <motion.div
          style={
            shouldReduceMotion
              ? { display: "none" }
              : { opacity: titleOpacity, y: titleY, display: titleDisplay }
          }
          className="absolute inset-0 z-30 flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h2 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[110px] xl:text-[130px] font-normal leading-[0.92] tracking-tight select-none">
            <span className="text-[#999999] block">{titleLine1}</span>
            <span className="text-[#000000] block mt-1 sm:mt-2">{titleLine2}</span>
          </h2>
        </motion.div>

        {/* Phase 3 & 4: Unboxing Showcase Set with Horizontal Blinds (media_1789369949345 -> media_1789369964283) */}
        <motion.div
          style={shouldReduceMotion ? { opacity: 1 } : { opacity: stageOpacity, y: stageY }}
          className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Open Luxury Box with Horizontal Blinds */}
            <div className="lg:col-span-7 flex justify-center items-center relative">
              <div className="relative w-full max-w-[640px] aspect-[16/11] flex items-center justify-center overflow-hidden">
                {/* Real Box Photograph from nota.uprock.pro */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_01_adaptive.jpg"
                  alt={primaryItem.title}
                  className="w-full h-full object-contain select-none pointer-events-none"
                />

                {/* Venetian Blinds Overlay */}
                <HorizontalBlinds
                  progress={scrollYProgress}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            </div>

            {/* Right Column: Title and Description */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-[34px] font-medium text-black tracking-tight leading-snug">
                {primaryItem.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-neutral-500 font-normal leading-relaxed max-w-md">
                {primaryItem.description}
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};
