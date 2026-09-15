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
  audiences,
}) => {
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // 3 Audience Topics: Slide in from right sequentially
  const topic1X = useTransform(smoothProgress, [0.12, 0.25], ["110%", "0%"]);
  const topic1Opacity = useTransform(smoothProgress, [0.12, 0.22], [0, 1]);

  const topic2X = useTransform(smoothProgress, [0.22, 0.35], ["110%", "0%"]);
  const topic2Opacity = useTransform(smoothProgress, [0.22, 0.32], [0, 1]);

  const topic3X = useTransform(smoothProgress, [0.32, 0.45], ["110%", "0%"]);
  const topic3Opacity = useTransform(smoothProgress, [0.32, 0.42], [0, 1]);

  // Text content moves naturally upward as the pen box enters (Screenshots 1 & 2)
  const textContentY = useTransform(smoothProgress, [0.42, 0.65], ["0px", isMobile ? "-60vh" : "-50vh"]);
  const textContentOpacity = useTransform(smoothProgress, [0.55, 0.66], [1, 0]);

  // Pen Card Animation: Exact match to Screenshots 1, 2, 3, 4
  // 1. Enters from bottom-right (Screenshots 1 & 2)
  // 2. Expands to full screen (Screenshot 3)
  // 3. Recedes into upper center gray card (Screenshot 4)
  const penLeft = useTransform(
    smoothProgress,
    [0.40, 0.52, 0.65, 0.82, 0.98],
    [isMobile ? "8%" : "37%", isMobile ? "4%" : "30%", "0%", "0%", isMobile ? "6%" : "15%"]
  );

  const penRight = useTransform(
    smoothProgress,
    [0.40, 0.52, 0.65, 0.82, 0.98],
    [isMobile ? "8%" : "2%", isMobile ? "4%" : "2%", "0%", "0%", isMobile ? "6%" : "15%"]
  );

  const penTop = useTransform(
    smoothProgress,
    [0.40, 0.52, 0.65, 0.82, 0.98],
    ["100vh", "50vh", "0vh", "0vh", isMobile ? "12vh" : "16vh"]
  );

  const penBottom = useTransform(
    smoothProgress,
    [0.40, 0.52, 0.65, 0.82, 0.98],
    ["-50vh", "0vh", "0vh", "0vh", isMobile ? "45vh" : "48vh"]
  );

  const penRadius = useTransform(
    smoothProgress,
    [0.40, 0.52, 0.65, 0.82, 0.98],
    [12, 10, 0, 0, 14]
  );

  const penBg = useTransform(
    smoothProgress,
    [0.40, 0.82, 0.94],
    ["#ffffff", "#ffffff", "#555a5f"]
  );

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20">
      <div ref={pinTrackRef} className="relative h-[320vh]">
        {/* Sticky Viewport with guaranteed top clearance beneath fixed navbar */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-14">
          
          {/* Layer 1: Text Content (Quote, Divider, Label, Intro Copy never hidden, 3 Sliding Audience Topics) */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: textContentY, opacity: textContentOpacity }}
            className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full max-h-[88vh] my-auto relative z-10"
          >
            {/* Top Block: Manifesto Quote + Divider Line (Matches sample site media_1789446815432.png) */}
            <div className="space-y-3 sm:space-y-5 pt-1">
              <ScrollIlluminatedText
                text={quoteText}
                className="max-w-5xl"
                wordClassName="text-xl sm:text-2xl md:text-3xl lg:text-[36px] xl:text-[38px] font-serif font-normal leading-[1.2] tracking-tight"
              />
              <div className="w-full h-px bg-white/20" />
            </div>

            {/* Bottom Block: Two Column - Left Label & Right Content (Matches Screenshot 1 & 2 without hiding intro copy) */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 lg:gap-14 relative pt-1 pb-2">
              
              {/* Left Column: Label */}
              <div className="w-full lg:w-48 shrink-0 pt-1">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                  {sectionTitle || "WHO IT'S FOR:"}
                </span>
              </div>

              {/* Right Column: Intro Copy + 3 Sliding Topics Stacked Below (Intro copy NEVER hidden) */}
              <div className="w-full lg:max-w-2xl ml-auto space-y-4 sm:space-y-6">
                
                {/* Intro Copy: STAYS VISIBLE above audience blocks */}
                <div className="space-y-2 sm:space-y-3">
                  <ScrollIlluminatedText
                    text={p1}
                    wordClassName="text-sm sm:text-base lg:text-[19px] font-medium leading-[1.3] tracking-tight"
                  />
                  <ScrollIlluminatedText
                    text={p2}
                    wordClassName="text-sm sm:text-base lg:text-[19px] font-medium leading-[1.3] tracking-tight"
                  />
                </div>

                {/* 3 Audience Topics: Stacked below intro copy, sliding in sequentially from Right */}
                <div className="space-y-3 sm:space-y-4 pt-1">
                  {/* Topic 1 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%", opacity: 1 } : { x: topic1X, opacity: topic1Opacity }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-base sm:text-lg lg:text-[21px] font-medium text-white mb-0.5 tracking-tight">
                      {audiences[0]?.title || "Students & Learners"}
                    </h3>
                    <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[0]?.description ||
                        "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most."}
                    </p>
                  </motion.div>

                  {/* Topic 2 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%", opacity: 1 } : { x: topic2X, opacity: topic2Opacity }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-base sm:text-lg lg:text-[21px] font-medium text-white mb-0.5 tracking-tight">
                      {audiences[1]?.title || "Creators, Designers & Architects"}
                    </h3>
                    <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[1]?.description ||
                        "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don’t disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow."}
                    </p>
                  </motion.div>

                  {/* Topic 3 */}
                  <motion.div
                    style={shouldReduceMotion ? { x: "0%", opacity: 1 } : { x: topic3X, opacity: topic3Opacity }}
                    className="w-full flex flex-col items-start will-change-transform"
                  >
                    <h3 className="text-base sm:text-lg lg:text-[21px] font-medium text-white mb-0.5 tracking-tight">
                      {audiences[2]?.title || "Managers & Product Thinkers"}
                    </h3>
                    <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-[#a3a3a3] font-light leading-relaxed">
                      {audiences[2]?.description ||
                        "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room."}
                    </p>
                  </motion.div>
                </div>

              </div>

            </div>

          </motion.div>

          {/* Layer 2: Pen Card (Enters bottom-right in Screenshots 1&2, expands full screen in Screenshot 3, recedes to upper center in Screenshot 4) */}
          <motion.div
            style={
              shouldReduceMotion
                ? { display: "none" }
                : {
                    left: penLeft,
                    right: penRight,
                    top: penTop,
                    bottom: penBottom,
                    borderRadius: penRadius,
                    backgroundColor: penBg,
                  }
            }
            className="absolute z-20 flex items-center justify-center will-change-[left,right,top,bottom,border-radius,background-color] pointer-events-none p-2 sm:p-6 md:p-10 overflow-hidden shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nota_horizontal_pen.png"
              alt="Nōta Smart Pen horizontal side profile"
              className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
