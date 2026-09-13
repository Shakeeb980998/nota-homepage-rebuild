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

  // Curved trajectory (X, Y, rotation, scale) - 1:1 scroll-scrubbed
  const penX = useTransform(
    smoothPenProgress,
    [0, 0.25, 0.5, 0.75, 1.0],
    ["18vw", "6vw", "0vw", "-6vw", "-18vw"]
  );

  const penY = useTransform(
    smoothPenProgress,
    [0, 0.25, 0.5, 0.75, 1.0],
    ["-14vh", "-4vh", "0vh", "4vh", "14vh"]
  );

  const penRotate = useTransform(
    smoothPenProgress,
    [0, 0.25, 0.5, 0.75, 1.0],
    ["-5deg", "-2deg", "0deg", "2deg", "5deg"]
  );

  const penScale = useTransform(
    smoothPenProgress,
    [0, 0.2, 0.8, 1.0],
    [0.82, 1.0, 1.0, 0.82]
  );

  // Soft power1.inOut opacity: 0 -> 1 over first 20%, 1.0 in middle, 1 -> 0 over final 20%
  const penOpacity = useTransform(smoothPenProgress, (v) => {
    if (v <= 0) return 0;
    if (v < 0.2) {
      const t = v / 0.2;
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    if (v <= 0.8) return 1;
    if (v < 1.0) {
      const t = (v - 0.8) / 0.2;
      const fade = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      return 1 - fade;
    }
    return 0;
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

      {/* Pinned Pen Flight Section: curved trajectory, 0->1 entrance, 1->0 exit, seamless handoff to SmartPaper */}
      <div
        ref={penSectionRef}
        className="relative h-[150vh] bg-white pointer-events-none"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    scale: penScale,
                    x: penX,
                    y: penY,
                    rotate: penRotate,
                    opacity: penOpacity,
                  }
            }
            className="w-full max-w-5xl px-4 flex items-center justify-center will-change-transform select-none"
          >
            {/* Only the pen graphic itself — zero guide lines, SVG paths, or strokes */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nota_horizontal_pen.png"
              alt="Nōta Smart Pen horizontal showcase"
              className="w-full max-w-4xl h-auto object-contain select-none pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
