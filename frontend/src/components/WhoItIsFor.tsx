"use client";

import React, { useRef } from "react";
import { AudienceCard } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

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
    <section
      id="who-it-is-for"
      className="bg-black text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Manifesto Quote (Matches sample site media_1789310058176.png) */}
        <div className="pb-20 sm:pb-28 lg:pb-36 border-b border-neutral-900">
          <ScrollIlluminatedText
            text={quoteText}
            className="max-w-5xl"
            wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-normal leading-[1.14] tracking-tight"
          />
        </div>

        {/* Two-Column Section: "WHO IT'S FOR:" on Left, Highlight Copy + Audience Theses on Right */}
        {/* (Matches sample site media_1789310075808.png, media_1789310100961.png, media_1789310115566.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 sm:pt-24 lg:pt-32">
          {/* Left Column: Label */}
          <div className="lg:col-span-3">
            <div className="sticky top-28">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a]">
                {sectionTitle || "WHO IT'S FOR:"}
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Word-Illuminated Body + Audience List + Pen Video Card */}
          <div className="lg:col-span-9 space-y-20 sm:space-y-28">
            {/* Word-by-Word Scroll Illuminated Paragraphs */}
            <div className="space-y-8 max-w-3xl">
              {descParagraphs.map((para, pIdx) => (
                <ScrollIlluminatedText
                  key={pIdx}
                  text={para}
                  wordClassName="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.28] tracking-tight"
                />
              ))}
            </div>

            {/* Audience Theses List (Students & Learners, Creators, Managers) */}
            <div className="space-y-16 sm:space-y-20 pt-8 max-w-3xl">
              {audiences.map((aud) => (
                <motion.div
                  key={aud.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white tracking-tight">
                    {aud.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[#9e9e9e] font-light leading-relaxed">
                    {aud.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Horizontal Pen Video Showcase Card (Matches sample site media_1789310115566.png) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-2xl overflow-hidden flex items-center justify-center max-w-4xl"
            >
              <video
                src="/who_pen_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[280px] object-contain select-none pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
