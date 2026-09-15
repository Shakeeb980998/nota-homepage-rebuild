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

  // Master scroll scrub across Manifesto/Intro, 3 Topics sliding in, Pen entrance, full-bleed expansion, and shrink-recede exit
  const { scrollYProgress } = useScroll({
    target: pinTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Staged Transition: Intro copy fades smoothly as topics slide in
  const introOpacity = useTransform(smoothProgress, [0.15, 0.26], [1, 0]);
  const introY = useTransform(smoothProgress, [0.15, 0.26], ["0px", "-16px"]);

  // 3 Audience Topics: Slide in from right sequentially
  const topic1X = useTransform(smoothProgress, [0.20, 0.40], ["110%", "0%"]);
  const topic1Opacity = useTransform(smoothProgress, [0.20, 0.35], [0, 1]);

  const topic2X = useTransform(smoothProgress, [0.38, 0.58], ["110%", "0%"]);
  const topic2Opacity = useTransform(smoothProgress, [0.38, 0.52], [0, 1]);

  const topic3X = useTransform(smoothProgress, [0.56, 0.76], ["110%", "0%"]);
  const topic3Opacity = useTransform(smoothProgress, [0.56, 0.70], [0, 1]);

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20">
      <div ref={pinTrackRef} className="relative h-[150vh] sm:h-[180vh] lg:h-[200vh]">
        {/* Sticky Viewport with guaranteed top clearance beneath fixed navbar */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-14">
          
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full max-h-[86vh] my-auto relative z-10">
            {/* Top Block: Manifesto Quote + Divider Line (Matches sample site media_1789446815432.png) */}
            <div className="space-y-4 sm:space-y-6 pt-2">
              <ScrollIlluminatedText
                text={quoteText}
                className="max-w-5xl"
                wordClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif font-normal leading-[1.2] tracking-tight"
              />
              <div className="w-full h-px bg-white/20" />
            </div>

            {/* Bottom Block: Two Column - Left Label & Right Sliding Topics (Matches sample site media_1789446815432.png) */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-16 relative pt-1 pb-4">
              
              {/* Left Column: Label */}
              <div className="w-full lg:w-48 shrink-0 pt-1">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                  {sectionTitle || "WHO IT'S FOR:"}
                </span>
              </div>

              {/* Right Column: Intro Copy + 3 Sliding Topics */}
              <div className="w-full lg:max-w-2xl ml-auto relative min-h-[260px] sm:min-h-[290px]">
                
                {/* Intro Copy: illuminated on scroll, then gently fades as topics slide in */}
                <motion.div
                  style={shouldReduceMotion ? {} : { opacity: introOpacity, y: introY }}
                  className="space-y-4"
                >
                  <ScrollIlluminatedText
                    text={p1}
                    wordClassName="text-base sm:text-lg lg:text-[22px] font-medium leading-[1.3] tracking-tight"
                  />
                  <ScrollIlluminatedText
                    text={p2}
                    wordClassName="text-base sm:text-lg lg:text-[22px] font-medium leading-[1.3] tracking-tight"
                  />
                </motion.div>

                {/* 3 Audience Topics: Slide in sequentially from Right */}
                <div className="absolute inset-x-0 top-0 space-y-5 sm:space-y-6 overflow-hidden py-1">
                  {/* Topic 1 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%", opacity: 1 } : { x: topic1X, opacity: topic1Opacity }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-medium text-white mb-1 tracking-tight">
                      {audiences[0]?.title || "Students & Learners"}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[0]?.description ||
                        "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most."}
                    </p>
                  </motion.div>

                  {/* Topic 2 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%", opacity: 1 } : { x: topic2X, opacity: topic2Opacity }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-medium text-white mb-1 tracking-tight">
                      {audiences[1]?.title || "Creators, Designers & Architects"}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[1]?.description ||
                        "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don’t disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow."}
                    </p>
                  </motion.div>

                  {/* Topic 3 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%", opacity: 1 } : { x: topic3X, opacity: topic3Opacity }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-medium text-white mb-1 tracking-tight">
                      {audiences[2]?.title || "Managers & Product Thinkers"}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-[15px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[2]?.description ||
                        "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room."}
                    </p>
                  </motion.div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
