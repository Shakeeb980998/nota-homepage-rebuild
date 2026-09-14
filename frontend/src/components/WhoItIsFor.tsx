"use client";

import React, { useRef, useState, useEffect } from "react";
import { AudienceCard } from "@/types/cms";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface WhoItIsForProps {
  introQuote: string;
  sectionTitle: string;
  description: string;
  audiences: AudienceCard[];
}

// Reusable word-by-word scroll illumination component
const ScrollIlluminatedText: React.FC<{
  text: string;
  className?: string;
  wordClassName?: string;
}> = ({ text, className = "", wordClassName = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 45%"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(1, start + 1.2 / words.length);

          return (
            <WordSpan
              key={i}
              word={word}
              range={[start, end]}
              progress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
              className={wordClassName}
            />
          );
        })}
      </p>
    </div>
  );
};

const WordSpan: React.FC<{
  word: string;
  range: [number, number];
  progress: any;
  shouldReduceMotion: boolean | null;
  className?: string;
}> = ({ word, range, progress, shouldReduceMotion, className = "" }) => {
  const color = useTransform(progress, range, ["#525252", "#ffffff"]);
  const opacity = useTransform(progress, range, [0.45, 1]);

  if (shouldReduceMotion) {
    return <span className={`mr-2.5 inline-block text-white ${className}`}>{word}</span>;
  }

  return (
    <motion.span
      style={{ color, opacity }}
      className={`mr-2.5 inline-block will-change-[color,opacity] ${className}`}
    >
      {word}
    </motion.span>
  );
};

export const WhoItIsFor: React.FC<WhoItIsForProps> = ({
  introQuote,
  sectionTitle = "Who it's for:",
  description,
  audiences,
}) => {
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsDesktop(window.innerWidth >= 1024);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Desktop Master scroll scrub across Intro, 3 Topics, Pen entrance, full-bleed expansion, and shrink-recede exit
  const { scrollYProgress } = useScroll({
    target: pinTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Staged Reveal: Intro copy fades out as topics arrive
  const introOpacity = useTransform(smoothProgress, [0.12, 0.24], [1, 0]);
  const introY = useTransform(smoothProgress, [0.12, 0.24], ["0px", "-16px"]);

  // 3 Audience Topics: Fade in and slide from right
  const topicsOpacity = useTransform(smoothProgress, [0.20, 0.28, 0.58, 0.65], [0, 1, 1, 0]);
  const topic1X = useTransform(smoothProgress, [0.20, 0.32], ["80%", "0%"]);
  const topic2X = useTransform(smoothProgress, [0.30, 0.44], ["80%", "0%"]);
  const topic3X = useTransform(smoothProgress, [0.42, 0.56], ["80%", "0%"]);

  // Pen Photo Entrance, Expansion to Full Screen, and Shrink-Recede Exit
  const penTop = useTransform(
    smoothProgress,
    [0.55, 0.65, 0.74, 0.84, 0.94],
    ["100vh", "45vh", "0vh", "0vh", "12vh"]
  );

  const penLeft = useTransform(
    smoothProgress,
    [0.55, 0.65, 0.74, 0.84, 0.94],
    ["25%", "15%", "0%", "0%", "12%"]
  );

  const penRight = useTransform(
    smoothProgress,
    [0.74, 0.84, 0.94],
    ["0%", "0%", "12%"]
  );

  const penBottom = useTransform(
    smoothProgress,
    [0.74, 0.84, 0.94],
    ["0vh", "0vh", "12vh"]
  );

  const penRadius = useTransform(
    smoothProgress,
    [0.74, 0.84, 0.94],
    [0, 0, 16]
  );

  const penFadeOut = useTransform(smoothProgress, [0.93, 0.98], [1, 0]);

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20 overflow-hidden">
      {/* Stage 1: Manifesto Quote (Dedicated breathing room, finishes completely before Stage 2 engages) */}
      <div className="min-h-[55vh] flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-14 max-w-7xl mx-auto pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24">
        <ScrollIlluminatedText
          text={quoteText}
          className="max-w-5xl"
          wordClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.22] sm:leading-[1.18] tracking-tight"
        />
        <div className="w-full h-px bg-white/15 mt-10 sm:mt-14" />
      </div>

      {/* Stage 2: Mobile & Tablet Layout (< 1024px: Clean natural document flow, zero clipping or overlap) */}
      <div className="block lg:hidden px-4 sm:px-8 md:px-12 pb-24 max-w-7xl mx-auto space-y-12">
        {/* Section Label & Illuminated Copy */}
        <div className="space-y-6">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
            {sectionTitle || "WHO IT'S FOR:"}
          </span>
          <div className="space-y-4">
            <ScrollIlluminatedText
              text={p1}
              wordClassName="text-lg sm:text-xl font-medium leading-relaxed tracking-tight"
            />
            <ScrollIlluminatedText
              text={p2}
              wordClassName="text-lg sm:text-xl font-medium leading-relaxed tracking-tight"
            />
          </div>
        </div>

        {/* 3 Audience Topic Cards */}
        <div className="space-y-6">
          {audiences.map((aud, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2.5"
            >
              <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                {aud.title}
              </h3>
              <p className="text-sm sm:text-base text-[#a3a3a3] font-light leading-relaxed">
                {aud.description}
              </p>
            </div>
          ))}
        </div>

        {/* Smart Pen Showcase Card */}
        <div className="rounded-2xl bg-white p-6 sm:p-10 flex items-center justify-center shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nota_horizontal_pen.png"
            alt="Nōta Smart Pen"
            className="max-h-[28vh] sm:max-h-[35vh] w-auto object-contain"
          />
        </div>
      </div>

      {/* Stage 2 & 3: Desktop Pinned Track (>= 1024px: Laptops, Monitors, Ultrawides) */}
      <div className="hidden lg:block">
        <div ref={pinTrackRef} className="relative h-[280vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-8 md:px-12 lg:px-14">
            
            {/* Two-Column Stage */}
            <div className="max-w-7xl mx-auto w-full flex flex-row justify-between items-start gap-12 lg:gap-16 relative z-10">
              
              {/* Left Column: Fixed Anchor Label (Always visible, never displaced) */}
              <div className="w-48 shrink-0 pt-2">
                <span className="text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                  {sectionTitle || "WHO IT'S FOR:"}
                </span>
              </div>

              {/* Right Column: Staged Reveal of Intro Copy + 3 Sliding Topics */}
              <div className="w-full max-w-2xl ml-auto relative min-h-[320px] flex flex-col justify-start">
                
                {/* Intro Copy: illuminated, then smoothly fades as topics arrive */}
                <motion.div
                  style={shouldReduceMotion ? {} : { opacity: introOpacity, y: introY }}
                  className="space-y-4 lg:space-y-5"
                >
                  <ScrollIlluminatedText
                    text={p1}
                    wordClassName="text-xl lg:text-[24px] font-medium leading-[1.3] tracking-tight"
                  />
                  <ScrollIlluminatedText
                    text={p2}
                    wordClassName="text-xl lg:text-[24px] font-medium leading-[1.3] tracking-tight"
                  />
                </motion.div>

                {/* 3 Audience Topics: Slide in smoothly from Right as user scrolls */}
                <motion.div
                  style={shouldReduceMotion ? {} : { opacity: topicsOpacity }}
                  className="absolute inset-x-0 top-0 space-y-6 lg:space-y-7 overflow-hidden py-1"
                >
                  {/* Topic 1 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%" } : { x: topic1X }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-2xl lg:text-[25px] font-medium text-white mb-1 tracking-tight">
                      {audiences[0]?.title || "Students & Learners"}
                    </h3>
                    <p className="text-sm lg:text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[0]?.description ||
                        "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most."}
                    </p>
                  </motion.div>

                  {/* Topic 2 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%" } : { x: topic2X }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-2xl lg:text-[25px] font-medium text-white mb-1 tracking-tight">
                      {audiences[1]?.title || "Creators, Designers & Architects"}
                    </h3>
                    <p className="text-sm lg:text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[1]?.description ||
                        "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don’t disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow."}
                    </p>
                  </motion.div>

                  {/* Topic 3 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%" } : { x: topic3X }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-2xl lg:text-[25px] font-medium text-white mb-1 tracking-tight">
                      {audiences[2]?.title || "Managers & Product Thinkers"}
                    </h3>
                    <p className="text-sm lg:text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[2]?.description ||
                        "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room."}
                    </p>
                  </motion.div>
                </motion.div>

              </div>

            </div>

            {/* Layer 2: Pen Photo Showcase (Shrinks down and recedes with scroll, pure white card) */}
            <motion.div
              style={
                shouldReduceMotion
                  ? { display: "none" }
                  : {
                      top: penTop,
                      left: penLeft,
                      right: penRight,
                      bottom: penBottom,
                      borderRadius: penRadius,
                      opacity: penFadeOut,
                    }
              }
              className="absolute z-20 bg-white overflow-hidden will-change-[top,left,right,bottom,opacity] pointer-events-none shadow-2xl"
            >
              <div className="w-full h-full flex items-center justify-center p-8 lg:p-12 select-none pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/nota_horizontal_pen.png"
                  alt="Nōta Smart Pen showcase"
                  className="w-full h-full max-h-[50vh] object-contain select-none pointer-events-none"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
