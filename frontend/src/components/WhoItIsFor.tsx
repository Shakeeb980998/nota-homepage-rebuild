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
  // Topic 1: start 0.08, end 0.40
  // Topic 2: start 0.26, end 0.58
  // Topic 3: start 0.44, end 0.76
  const topic1X = useTransform(smoothProgress, [0.08, 0.40], ["110%", "0%"]);
  const topic2X = useTransform(smoothProgress, [0.26, 0.58], ["110%", "0%"]);
  const topic3X = useTransform(smoothProgress, [0.44, 0.76], ["110%", "0%"]);

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const descText =
    description ||
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way. Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  // Split description into two paragraphs if possible for exact sample site flow
  const descParagraphs = descText.includes("Everything you write syncs")
    ? [
        descText.split("Everything you write syncs")[0].trim(),
        "Everything you write syncs" + descText.split("Everything you write syncs")[1].trim(),
      ]
    : [descText];

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20">
      {/* Top Manifesto Quote (Matches sample site media_1789310058176.png) */}
      <div className="pt-24 sm:pt-36 pb-20 sm:pb-28 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-neutral-900">
        <ScrollIlluminatedText
          text={quoteText}
          className="max-w-5xl"
          wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-normal leading-[1.14] tracking-tight"
        />
      </div>

      {/* Pinned Two-Column Section: Sticky Text on Left, Scroll-Scrubbed 3 Topics on Right */}
      {/* (Matches sample site media_1789311216589.png and media_1789311319692.png) */}
      <div ref={pinTrackRef} className="relative h-[280vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Label + Illuminated Headline Copy */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                {sectionTitle || "WHO IT'S FOR:"}
              </span>
              <div className="space-y-6">
                {descParagraphs.map((para, pIdx) => (
                  <ScrollIlluminatedText
                    key={pIdx}
                    text={para}
                    wordClassName="text-2xl sm:text-3xl md:text-[34px] font-normal leading-[1.28] tracking-tight"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: 3 Audience Topics Sliding in from off-screen Right (110% -> 0%) */}
            <div className="lg:col-span-7 flex flex-col items-end space-y-10 sm:space-y-14 overflow-hidden py-4">
              {/* Topic 1: Students & Learners */}
              <motion.div
                style={shouldReduceMotion ? { x: "0%" } : { x: topic1X }}
                className="w-full max-w-xl flex flex-col items-start will-change-transform"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white mb-2 tracking-tight">
                  {audiences[0]?.title || "Students & Learners"}
                </h3>
                <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
                  {audiences[0]?.description ||
                    "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most."}
                </p>
              </motion.div>

              {/* Topic 2: Creators, Designers & Architects */}
              <motion.div
                style={shouldReduceMotion ? { x: "0%" } : { x: topic2X }}
                className="w-full max-w-xl flex flex-col items-start will-change-transform"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white mb-2 tracking-tight">
                  {audiences[1]?.title || "Creators, Designers & Architects"}
                </h3>
                <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
                  {audiences[1]?.description ||
                    "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don’t disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow."}
                </p>
              </motion.div>

              {/* Topic 3: Managers & Product Thinkers */}
              <motion.div
                style={shouldReduceMotion ? { x: "0%" } : { x: topic3X }}
                className="w-full max-w-xl flex flex-col items-start will-change-transform"
              >
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white mb-2 tracking-tight">
                  {audiences[2]?.title || "Managers & Product Thinkers"}
                </h3>
                <p className="text-base sm:text-lg text-[#a3a3a3] font-light leading-relaxed">
                  {audiences[2]?.description ||
                    "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room."}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Pen Video Showcase Card (Matches sample site media_1789310115566.png) */}
      <div className="pb-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex justify-center">
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-2xl overflow-hidden flex items-center justify-center w-full max-w-4xl">
          <video
            src="/who_pen_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto max-h-[280px] object-contain select-none pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};
