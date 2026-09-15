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

  // 3 Audience Topics: Slide in from right sequentially (earlier so Topic 3 is fully in place before pen enters)
  const topic1X = useTransform(smoothProgress, [0.10, 0.20], ["110%", "0%"]);
  const topic1Opacity = useTransform(smoothProgress, [0.10, 0.18], [0, 1]);

  const topic2X = useTransform(smoothProgress, [0.18, 0.28], ["110%", "0%"]);
  const topic2Opacity = useTransform(smoothProgress, [0.18, 0.26], [0, 1]);

  const topic3X = useTransform(smoothProgress, [0.26, 0.36], ["110%", "0%"]);
  const topic3Opacity = useTransform(smoothProgress, [0.26, 0.34], [0, 1]);

  // Text content moves naturally upward:
  // - 0.00 -> 0.20: Quote & Intro copy in view
  // - 0.20 -> 0.40: Shifts upward smoothly to reveal Topic 1, Topic 2, and Topic 3
  // - 0.40 -> 0.54: Sits steady at -46vh displaying Topic 2 & Topic 3 prominently while Pen Card enters below (media_1789456997919.png)
  // - 0.54 -> 0.66: Slides up out of viewport as Pen Card expands to full bleed
  const textContentY = useTransform(
    smoothProgress,
    [0.20, 0.40, 0.54, 0.66],
    ["0px", isMobile ? "-45vh" : "-44vh", isMobile ? "-50vh" : "-48vh", isMobile ? "-120vh" : "-110vh"]
  );
  const textContentOpacity = useTransform(smoothProgress, [0.55, 0.66], [1, 0]);

  // Pen Card Animation:
  // - 0.42 -> 0.54: Enters bottom-right beneath Topic 3 (media_1789456997919.png: sits at top: 65vh)
  // - 0.54 -> 0.68: Expands to full screen (top: 0, left: 0, right: 0)
  // - 0.68 -> 0.82: Full bleed white lock
  // - 0.82 -> 0.94: Recedes into upper center gray card with pen disappearing (media_1789455424779.png)
  const penLeft = useTransform(
    smoothProgress,
    [0.42, 0.54, 0.68, 0.82, 0.94],
    [isMobile ? "8%" : "40%", isMobile ? "4%" : "35%", "0%", "0%", isMobile ? "6%" : "15%"]
  );

  const penRight = useTransform(
    smoothProgress,
    [0.42, 0.54, 0.68, 0.82, 0.94],
    [isMobile ? "8%" : "2%", isMobile ? "4%" : "2%", "0%", "0%", isMobile ? "6%" : "15%"]
  );

  const penTop = useTransform(
    smoothProgress,
    [0.42, 0.54, 0.68, 0.82, 0.94],
    ["100vh", "65vh", "0vh", "0vh", isMobile ? "10vh" : "12vh"]
  );

  // Keep penBottom at 0vh so the gray card extends flush to the bottom without leaving an empty black gap
  const penBottom = useTransform(
    smoothProgress,
    [0.42, 0.54, 0.68, 0.82, 0.94],
    ["-35vh", "0vh", "0vh", "0vh", "0vh"]
  );

  const penTopRadius = useTransform(
    smoothProgress,
    [0.42, 0.54, 0.68, 0.82, 0.94],
    [12, 10, 0, 0, 16]
  );

  // Gray card background matching exact pixel value (56, 57, 56) in media_1789455424779.png
  const penBg = useTransform(
    smoothProgress,
    [0.42, 0.82, 0.92],
    ["#ffffff", "#ffffff", "#383938"]
  );

  // Pen Image disappears completely (fades to 0 opacity + moves left + scales down) as card recedes (Image 1 fix)
  const penImageOpacity = useTransform(smoothProgress, [0.78, 0.88], [1, 0]);
  const penImageX = useTransform(smoothProgress, [0.78, 0.88], ["0%", "-14%"]);
  const penImageScale = useTransform(smoothProgress, [0.78, 0.88], [1, 0.85]);

  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20">
      <div ref={pinTrackRef} className="relative h-[340vh]">
        {/* Sticky Viewport with guaranteed top clearance beneath fixed navbar */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start px-4 sm:px-8 md:px-12 lg:px-14">
          
          {/* Layer 1: Text Content (Quote, Divider, Label, Intro Copy never hidden, 3 Sliding Audience Topics) */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: textContentY, opacity: textContentOpacity }}
            className="max-w-7xl mx-auto w-full flex flex-col pt-14 sm:pt-16 lg:pt-20 space-y-6 sm:space-y-8 relative z-10"
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

          {/* Layer 2: Pen Card (Enters bottom-right in Screenshots 1&2, expands full screen in Screenshot 3, recedes to upper center in Screenshot 4 with pen disappearing) */}
          <motion.div
            style={
              shouldReduceMotion
                ? { display: "none" }
                : {
                    left: penLeft,
                    right: penRight,
                    top: penTop,
                    bottom: penBottom,
                    borderTopLeftRadius: penTopRadius,
                    borderTopRightRadius: penTopRadius,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    backgroundColor: penBg,
                  }
            }
            className="absolute z-20 flex items-center justify-center will-change-[left,right,top,bottom,border-radius,background-color] pointer-events-none p-2 sm:p-6 md:p-10 overflow-hidden shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/nota_horizontal_pen.png"
              alt="Nōta Smart Pen horizontal side profile"
              style={{
                opacity: penImageOpacity,
                x: penImageX,
                scale: penImageScale,
              }}
              className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none will-change-[opacity,transform]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
