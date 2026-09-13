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
  const penSectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track pinned scroll scrub across topics reveal
  const { scrollYProgress } = useScroll({
    target: pinTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Staggered horizontal slide-in from right (110% -> 0%) matching sample site keyframes
  const topic1X = useTransform(smoothProgress, [0.10, 0.40], ["110%", "0%"]);
  const topic2X = useTransform(smoothProgress, [0.30, 0.60], ["110%", "0%"]);
  const topic3X = useTransform(smoothProgress, [0.50, 0.80], ["110%", "0%"]);

  // Track scroll scrub for the white pen showcase section (pinned flight from 0 to 1)
  const { scrollYProgress: penScrollProgress } = useScroll({
    target: penSectionRef,
    offset: ["start start", "end end"],
  });

  const smoothPenProgress = useSpring(penScrollProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Container scale / crop via clipPath inset:
  // 0% -> 35%: container expands from ~55% centered box to full-bleed (100vw x 100vh)
  // 35% -> 55%: holds beat at full-bleed
  // 55% -> 100%: shrinks back down and collapses to near-0 height
  const clipInset = useTransform(smoothPenProgress, (v) => {
    // 1. Entrance: 0% -> 35%
    if (v <= 0.35) {
      const t = Math.max(0, v / 0.35); // 0 -> 1
      const tb = (1 - t) * 25; // 25% -> 0%
      const lr = (1 - t) * 22.5; // 22.5% -> 0%
      const radius = Math.round((1 - t) * 24); // 24px -> 0px
      return `inset(${tb.toFixed(2)}% ${lr.toFixed(2)}% ${tb.toFixed(2)}% ${lr.toFixed(2)}% round ${radius}px)`;
    }
    // 2. Hold: 35% -> 55%
    if (v <= 0.55) {
      return "inset(0% 0% 0% 0% round 0px)";
    }
    // 3. Exit: 55% -> 100%
    const t = Math.min(1, (v - 0.55) / 0.45); // 0 -> 1
    const tb = t * 50; // collapses to 50% top and 50% bottom (0 height)
    const lr = t * 25;
    const radius = Math.round(t * 16);
    return `inset(${tb.toFixed(2)}% ${lr.toFixed(2)}% ${tb.toFixed(2)}% ${lr.toFixed(2)}% round ${radius}px)`;
  });

  // Container opacity crossfade (1 -> 0 between 70% and 95%) with soft power1.inOut ease
  const containerOpacity = useTransform(smoothPenProgress, (v) => {
    if (v <= 0.70) return 1;
    if (v >= 0.95) return 0;
    const t = (v - 0.70) / 0.25;
    return 1 - (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  });

  // Next section title reveal on the black background behind the container (fades in 60% -> 90%)
  const titleOpacity = useTransform(smoothPenProgress, (v) => {
    if (v <= 0.60) return 0;
    if (v >= 0.90) return 1;
    const t = (v - 0.60) / 0.30;
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  });

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20">
      {/* Top Manifesto Quote (Matches sample site media_178932019030.png - NO border line) */}
      <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-14 max-w-7xl mx-auto">
        <ScrollIlluminatedText
          text={quoteText}
          className="max-w-5xl"
          wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif font-normal leading-[1.14] tracking-tight"
        />
      </div>

      {/* Pinned Two-Column Section: Label on Left, Sticky Copy + Scroll-Scrubbed Topics on Right */}
      <div ref={pinTrackRef} className="relative h-[260vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
            {/* Left Column: Label */}
            <div className="shrink-0 pt-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                {sectionTitle || "WHO IT'S FOR:"}
              </span>
            </div>

            {/* Right Column: Illuminated Headline Copy + 3 Sliding Topics */}
            <div className="w-full lg:max-w-2xl ml-auto space-y-12 sm:space-y-16">
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

              {/* 3 Audience Topics Sliding in from off-screen Right (110% -> 0%) */}
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
          </div>
        </div>
      </div>

      {/* Pinned Pen Scale/Crop Full-Bleed Transition (Reference sequence) */}
      <div
        ref={penSectionRef}
        className="relative h-[180vh] bg-black text-white pointer-events-none"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Background Behind Container: Next section title reveals starting around 60% progress */}
          <motion.div
            style={shouldReduceMotion ? { opacity: 1 } : { opacity: titleOpacity }}
            className="absolute top-20 sm:top-24 left-6 sm:left-10 lg:left-14 z-10 max-w-7xl pointer-events-none"
          >
            <span className="block italic text-[#8a8a8a] text-xs sm:text-sm font-mono uppercase tracking-[0.15em] mb-2">
              Works with smart paper
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-white leading-tight tracking-tight">
              <span className="block">Looks like paper.</span>
              <span className="block">Works like a system.</span>
            </h2>
          </motion.div>

          {/* Pen Container: Scales from ~55% centered box up to 100vw x 100vh full-bleed, holds beat, then collapses and dissolves */}
          <motion.div
            style={
              shouldReduceMotion
                ? { opacity: containerOpacity }
                : {
                    clipPath: clipInset,
                    opacity: containerOpacity,
                    willChange: "clip-path, opacity",
                  }
            }
            className="absolute inset-0 bg-white flex items-center justify-center overflow-hidden z-20 shadow-2xl"
          >
            <div className="w-full max-w-5xl px-6 flex items-center justify-center select-none pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nota_horizontal_pen.png"
                alt="Nōta Smart Pen full-bleed showcase"
                className="w-full max-w-4xl h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
