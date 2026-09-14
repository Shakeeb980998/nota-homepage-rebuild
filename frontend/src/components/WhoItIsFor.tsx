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

  // Master scroll scrub across Audience topics, Pen entrance, full-bleed expansion, and shrink-recede exit
  const { scrollYProgress } = useScroll({
    target: pinTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // --- Phase 1: Scroll right column upward so text moves up smoothly ---
  const rightColumnY = useTransform(
    smoothProgress,
    [0.08, 0.42, 0.54, 0.66],
    ["0px", "-280px", "-520px", "-750px"]
  );

  // 3 Audience Topics Sliding in from Right (Side)
  const topic1X = useTransform(smoothProgress, [0.08, 0.22], ["110%", "0%"]);
  const topic2X = useTransform(smoothProgress, [0.18, 0.32], ["110%", "0%"]);
  const topic3X = useTransform(smoothProgress, [0.28, 0.42], ["110%", "0%"]);

  // Fade out text as pen expands to full screen
  const audienceOpacity = useTransform(smoothProgress, [0.54, 0.66], [1, 0]);

  // --- Phase 2: Pen Photo Entrance, Expansion to Full Screen, and Shrink-Recede Exit (NO duplicate text here) ---
  // Frame 2 (0.42): Rises from bottom (top: 72vh), right side (left: 45%)
  // Frame 3 (0.52): Rises higher (top: 48vh) directly under "Managers", expands left (left: 24%)
  // Frame 4 (0.68 -> 0.78): Full screen (top: 0vh, left: 0%, right: 0%, bottom: 0vh, pure white)
  // Exit (0.78 -> 0.94): Photo shrinks down / recedes cleanly on the black section background
  const penTop = useTransform(
    smoothProgress,
    [0.30, 0.42, 0.52, 0.68, 0.78, 0.94],
    ["100vh", "72vh", "48vh", "0vh", "0vh", "12vh"]
  );

  const penLeft = useTransform(
    smoothProgress,
    [0.30, 0.42, 0.52, 0.68, 0.78, 0.94],
    [
      isDesktop ? "45%" : "0%",
      isDesktop ? "45%" : "0%",
      isDesktop ? "24%" : "0%",
      "0%",
      "0%",
      isDesktop ? "12%" : "4%",
    ]
  );

  const penRight = useTransform(
    smoothProgress,
    [0.68, 0.78, 0.94],
    ["0%", "0%", isDesktop ? "12%" : "4%"]
  );

  const penBottom = useTransform(
    smoothProgress,
    [0.68, 0.78, 0.94],
    ["0vh", "0vh", "12vh"]
  );

  const penRadius = useTransform(
    smoothProgress,
    [0.68, 0.78, 0.94],
    [0, 0, 16]
  );

  const penFadeOut = useTransform(smoothProgress, [0.92, 0.98], [1, 0]);

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

      {/* Pinned Scroll Track */}
      <div ref={pinTrackRef} className="relative h-[360vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-10 lg:px-14">
          
          {/* Two-Column Section with Label & Upward Scrolling Text Column */}
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 relative z-10">
            {/* Left Column: Label */}
            <div className="shrink-0 pt-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                {sectionTitle || "WHO IT'S FOR:"}
              </span>
            </div>

            {/* Right Column: Illuminated Headline Copy + 3 Sliding Topics scrolling smoothly upward */}
            <motion.div
              style={shouldReduceMotion ? {} : { y: rightColumnY, opacity: audienceOpacity }}
              className="w-full lg:max-w-2xl ml-auto space-y-10 sm:space-y-12 will-change-[transform,opacity]"
            >
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
            </motion.div>
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
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 lg:p-12 select-none pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nota_horizontal_pen.png"
                alt="Nōta Smart Pen showcase"
                className="w-full h-full max-h-[35vh] sm:max-h-[45vh] lg:max-h-[60vh] object-contain select-none pointer-events-none"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
