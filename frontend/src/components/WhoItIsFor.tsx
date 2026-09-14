"use client";

import React, { useRef } from "react";
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

  // Unified master scroll track for Audience reveal, Pen Entrance, Full-Bleed Expansion, and Next Section Hand-off
  const { scrollYProgress } = useScroll({
    target: pinTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // --- Phase 1: 3 Audience Topics Sliding in from Right ---
  const topic1X = useTransform(smoothProgress, [0.08, 0.24], ["110%", "0%"]);
  const topic2X = useTransform(smoothProgress, [0.18, 0.34], ["110%", "0%"]);
  const topic3X = useTransform(smoothProgress, [0.28, 0.44], ["110%", "0%"]);

  // Audience Content Fade & Drift Up as Pen Expands
  const audienceOpacity = useTransform(smoothProgress, [0.44, 0.52], [1, 0]);
  const audienceY = useTransform(smoothProgress, [0.44, 0.52], ["0px", "-40px"]);

  // --- Phase 2 & 3: Pen Card Enters & Expands to Full Screen (Matching media_1789358417860 -> media_1789358383060) ---
  // Entrance at 0.28 -> 0.44: Card rises into view from bottom (52vh), holding horizontal pen
  // Expansion at 0.44 -> 0.64: Card expands to 100vw x 100vh full-bleed
  // Hold at 0.64 -> 0.76: Holds full-bleed white pen showcase
  // Recession at 0.76 -> 0.88: Shrinks down slightly into dark container (media_1789358453483)
  const cardY = useTransform(
    smoothProgress,
    [0.26, 0.44, 0.64, 0.76, 0.88],
    ["110vh", "50vh", "0vh", "0vh", "6vh"]
  );
  const cardWidth = useTransform(
    smoothProgress,
    [0.26, 0.44, 0.64, 0.76, 0.88],
    ["78vw", "78vw", "100vw", "100vw", "82vw"]
  );
  const cardHeight = useTransform(
    smoothProgress,
    [0.26, 0.44, 0.64, 0.76, 0.88],
    ["44vh", "44vh", "100vh", "100vh", "65vh"]
  );
  const cardRadius = useTransform(
    smoothProgress,
    [0.26, 0.44, 0.64, 0.76, 0.88],
    [24, 24, 0, 0, 20]
  );
  const cardBg = useTransform(
    smoothProgress,
    [0.64, 0.76, 0.88],
    ["#ffffff", "#ffffff", "#383b42"]
  );
  const penScale = useTransform(
    smoothProgress,
    [0.26, 0.44, 0.64, 0.76, 0.88],
    [0.88, 0.94, 1.05, 1.05, 0.92]
  );

  // --- Phase 4: Disappear into Next Section "Works with smart paper" (Matching media_1789358453483) ---
  // White cover panel slides up from 100% to 0% between 0.78 and 0.98, seamlessly covering pen
  const coverY = useTransform(smoothProgress, [0.78, 0.98], ["100%", "0%"]);

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20">
      {/* Top Manifesto Quote (Matches sample site media_178932019030.png) */}
      <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
        <ScrollIlluminatedText
          text={quoteText}
          className="max-w-5xl"
          wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif font-normal leading-[1.14] tracking-tight"
        />
      </div>

      {/* Pinned Scroll Track: Audience scrub + Pen entrance, full-screen scale, and exit cover */}
      <div ref={pinTrackRef} className="relative h-[380vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-10 lg:px-14">
          
          {/* Layer 1: Two-Column Section with Label, Illuminated Copy & 3 Audience Cards */}
          <motion.div
            style={shouldReduceMotion ? {} : { opacity: audienceOpacity, y: audienceY }}
            className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 relative z-10 will-change-[opacity,transform]"
          >
            {/* Left Column: Label */}
            <div className="shrink-0 pt-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                {sectionTitle || "WHO IT'S FOR:"}
              </span>
            </div>

            {/* Right Column: Illuminated Headline Copy + 3 Sliding Topics */}
            <div className="w-full lg:max-w-2xl ml-auto space-y-10 sm:space-y-14">
              {/* Word-by-Word Scroll Illuminated Copy */}
              <div className="space-y-4">
                <ScrollIlluminatedText
                  text={p1}
                  wordClassName="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-medium leading-[1.25] tracking-tight"
                />
                <ScrollIlluminatedText
                  text={p2}
                  wordClassName="text-xl sm:text-2xl md:text-[26px] lg:text-[28px] font-medium leading-[1.25] tracking-tight"
                />
              </div>

              {/* 3 Audience Topics Sliding in from off-screen Right */}
              <div className="space-y-8 sm:space-y-10 overflow-hidden py-2">
                {/* Topic 1: Students & Learners */}
                <motion.div
                  style={shouldReduceMotion ? { x: "0%" } : { x: topic1X }}
                  className="w-full flex flex-col items-start will-change-transform"
                >
                  <h3 className="text-2xl sm:text-[28px] font-medium text-white mb-2 tracking-tight">
                    {audiences[0]?.title || "Students & Learners"}
                  </h3>
                  <p className="text-sm sm:text-base text-[#a3a3a3] font-light leading-relaxed">
                    {audiences[0]?.description ||
                      "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most."}
                  </p>
                </motion.div>

                {/* Topic 2: Creators, Designers & Architects */}
                <motion.div
                  style={shouldReduceMotion ? { x: "0%" } : { x: topic2X }}
                  className="w-full flex flex-col items-start will-change-transform"
                >
                  <h3 className="text-2xl sm:text-[28px] font-medium text-white mb-2 tracking-tight">
                    {audiences[1]?.title || "Creators, Designers & Architects"}
                  </h3>
                  <p className="text-sm sm:text-base text-[#a3a3a3] font-light leading-relaxed">
                    {audiences[1]?.description ||
                      "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don’t disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow."}
                  </p>
                </motion.div>

                {/* Topic 3: Managers & Product Thinkers */}
                <motion.div
                  style={shouldReduceMotion ? { x: "0%" } : { x: topic3X }}
                  className="w-full flex flex-col items-start will-change-transform"
                >
                  <h3 className="text-2xl sm:text-[28px] font-medium text-white mb-2 tracking-tight">
                    {audiences[2]?.title || "Managers & Product Thinkers"}
                  </h3>
                  <p className="text-sm sm:text-base text-[#a3a3a3] font-light leading-relaxed">
                    {audiences[2]?.description ||
                      "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room."}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Pen Card (Enters from bottom, scales to 100vw x 100vh full-bleed, then recedes) */}
          <motion.div
            style={
              shouldReduceMotion
                ? { display: "none" }
                : {
                    y: cardY,
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: cardRadius,
                    backgroundColor: cardBg,
                  }
            }
            className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center overflow-hidden shadow-2xl will-change-transform pointer-events-none"
          >
            <motion.div
              style={shouldReduceMotion ? {} : { scale: penScale }}
              className="w-full max-w-5xl px-6 flex items-center justify-center select-none will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nota_horizontal_pen.png"
                alt="Nōta Smart Pen showcase"
                className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl max-h-[35vh] sm:max-h-[45vh] lg:max-h-[55vh] object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
              />
            </motion.div>
          </motion.div>

          {/* Layer 3: Next Section White Cover ("Works with smart paper" - media_1789358453483) */}
          <motion.div
            style={shouldReduceMotion ? { display: "none" } : { y: coverY }}
            className="absolute inset-0 bg-white z-30 flex flex-col justify-center px-6 sm:px-10 lg:px-14 will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.18)] pointer-events-none"
          >
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-[96px] font-normal leading-[1.05] tracking-tight">
                <span className="text-[#8a8a8a] block">Works with</span>
                <span className="text-[#000000] block mt-1 sm:mt-2">smart paper</span>
              </h2>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
