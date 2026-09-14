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

// Word with scroll-driven ink reveal
const WordWithInk: React.FC<{
  word: string;
  progress: any;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(progress, range, ["#d1d5db", "#000000"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-150 will-change-transform"
    >
      {word}
    </motion.span>
  );
};

// Scroll Ink Reveal Lead Paragraph (media_1789373505196)
const ScrollInkLeadSection: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center 45%"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="bg-white py-24 sm:py-36 lg:py-44 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[54px] leading-[1.25] font-normal tracking-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 sm:gap-y-1.5 select-none">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = Math.min(start + 1.2 / words.length, 1);
            return (
              <WordWithInk
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
};

// Device Card Venetian Blinds (media_1789373538360)
const DeviceCardBlinds: React.FC<{ progress: any }> = ({ progress }) => {
  const scaleY = useTransform(progress, [0.12, 0.48], [1, 0]);
  const opacity = useTransform(progress, [0.42, 0.50], [1, 0]);
  const display = useTransform(progress, (v: number) => (v >= 0.50 ? "none" : "flex"));

  return (
    <motion.div
      style={{ opacity, display }}
      className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between overflow-hidden"
    >
      {Array.from({ length: 22 }).map((_, idx) => (
        <motion.div
          key={idx}
          style={{ scaleY, transformOrigin: "center" }}
          className="w-full h-3 sm:h-3.5 lg:h-4 bg-white will-change-transform"
        />
      ))}
    </motion.div>
  );
};

// Two Device Showcase Cards with Blinds & Adapter Hover Swap (media_1789373589438 & media_1789373605726)
const DeviceShowcaseCards: React.FC<{ items: BoxItem[] }> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 50%"],
  });

  const penItem = items?.[1] || {
    title: "The NŌTA Smart Pen",
    description:
      "Aluminum body, USB-C charging, physical control button, and Bluetooth connectivity. Up to 8 hours of active use with a lightweight, balanced design for everyday writing.",
  };

  const adapterItem = items?.[2] || {
    title: "Charging Adapter",
    description:
      "Compact USB-C power adapter with stable output for everyday charging. Designed for safe, efficient power delivery with minimal heat.",
  };

  return (
    <div ref={containerRef} className="bg-white pb-32 sm:pb-44 px-6 sm:px-12 lg:px-16">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Card: The NŌTA Smart Pen */}
        <div className="relative flex flex-col justify-between bg-[#fbfbfb] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
          {/* Card Header */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 z-10">
            <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-medium text-black tracking-tight whitespace-normal sm:whitespace-nowrap">
              {penItem.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed max-w-xs text-left sm:text-right">
              {penItem.description}
            </p>
          </div>

          {/* Image Container with Blinds */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] flex items-center justify-center overflow-hidden">
            {/* Macro Pen Nib Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_02.jpg"
              alt={penItem.title}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
            {/* Venetian Blinds Overlay */}
            <DeviceCardBlinds progress={scrollYProgress} />
          </div>
        </div>

        {/* Right Card: Charging Adapter with Interactive Hover Swap */}
        <div className="group relative flex flex-col justify-between bg-[#fbfbfb] rounded-2xl overflow-hidden border border-neutral-100 shadow-sm cursor-pointer">
          {/* Card Header */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 z-10">
            <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-medium text-black tracking-tight whitespace-normal sm:whitespace-nowrap">
              {adapterItem.title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed max-w-xs text-left sm:text-right">
              {adapterItem.description}
            </p>
          </div>

          {/* Image Container with Hover Swap & Blinds */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] flex items-center justify-center overflow-hidden">
            {/* Default Image: Adapter with plugged USB-C cable (media_1789373589438) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/d/library_image-14643-symbol-ispnvazts-nota_scene_5_img_03.jpg"
              alt={adapterItem.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0 select-none pointer-events-none"
            />

            {/* Hover Image: Adapter showing two-prong plug (media_1789373605726) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/d/library_image-14642-symbol-it4oyiz32-new-scene_5_adapter.jpg"
              alt={`${adapterItem.title} with plug`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none pointer-events-none"
            />

            {/* Venetian Blinds Overlay */}
            <DeviceCardBlinds progress={scrollYProgress} />
          </div>
        </div>

      </div>
    </div>
  );
};

export const InsideTheBox: React.FC<InsideTheBoxProps> = ({
  titleLine1 = "Inside",
  titleLine2 = "the box",
  leadText = "A precision smart pen with a solid aluminum body, designed for natural handwriting and accurate digital capture. Seamlessly connects to smart paper, translating every stroke into structured digital data — no screens, no distractions, just writing.",
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
    image: "/inside_box.webp",
  };

  return (
    <section id="inside-the-box" className="relative bg-white">
      {/* Pinned Viewport: Circle Reveal + Title + Luxury Unboxing Set */}
      <div ref={containerRef} className="relative h-[450vh] bg-black">
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
            className="absolute inset-0 z-20 flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
          >
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-normal leading-[0.92] tracking-tight select-none">
              <span className="text-[#999999] block">{titleLine1}</span>
              <span className="text-[#000000] block mt-1 sm:mt-2">{titleLine2}</span>
            </h2>
          </motion.div>

          {/* Phase 3 & 4: Full-Screen Showcase Stage with Full-Width Blinds (media_1789371918106) */}
          <motion.div
            style={shouldReduceMotion ? { opacity: 1 } : { opacity: stageOpacity, y: stageY }}
            className="relative z-20 w-full h-[82vh] sm:h-[84vh] lg:h-[86vh] bg-[#f2f2f2] flex items-end justify-center"
          >
            {/* Venetian Blinds Overlay spanning the full width of the screen */}
            <FullWidthHorizontalBlinds
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* Stage Container: Left large luxury box + Right top-aligned text */}
            <div className="relative z-10 w-full max-w-[1520px] h-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-4 sm:gap-8 lg:gap-14 pb-0">
              
              {/* Left Column: Full-Height Open Luxury Box touching bottom */}
              <div className="relative w-full lg:w-[56%] h-[55%] sm:h-[62%] lg:h-full flex items-end justify-center lg:justify-end order-2 lg:order-1">
                {/* High-resolution cropped box image without margins */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primaryItem.image || "/inside_box.webp"}
                  alt={primaryItem.title}
                  className="h-[98%] max-h-[780px] w-auto max-w-full object-contain object-bottom select-none pointer-events-none drop-shadow-md"
                />
              </div>

              {/* Right Column: Title and Description aligned to the top right of the box */}
              <div className="w-full lg:w-[40%] self-start pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 space-y-2 sm:space-y-4 text-left order-1 lg:order-2">
                <h3 className="font-sans text-lg sm:text-xl md:text-2xl lg:text-[25px] xl:text-[27px] font-medium text-[#1a1a1a] tracking-[-0.01em] leading-snug">
                  {primaryItem.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm md:text-base text-[#666666] font-normal leading-[1.55] sm:leading-[1.65] max-w-sm lg:max-w-md">
                  {primaryItem.description}
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Part 2: Scroll-Driven Ink Reveal for Lead Text (media_1789373505196) */}
      <ScrollInkLeadSection text={leadText} />

      {/* Part 3: Two Device Showcase Cards with Blinds & Charging Adapter Hover Swap (media_1789373589438 & media_1789373605726) */}
      <DeviceShowcaseCards items={items} />
    </section>
  );
};
