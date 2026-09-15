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
  const quoteText =
    introQuote ||
    "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.";

  const p1 =
    "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way.";
  const p2 =
    "Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.";

  return (
    <section id="who-it-is-for" className="bg-black text-white relative z-20 pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 px-4 sm:px-8 md:px-12 lg:px-14">
      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20 md:space-y-24">
        
        {/* Top Part: Manifesto Quote + Divider + Two-Column "Who it's for" (Matches sample site media_1789446815432.png) */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {/* Manifesto Quote */}
          <div className="max-w-5xl">
            <ScrollIlluminatedText
              text={quoteText}
              wordClassName="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-serif font-normal leading-[1.22] sm:leading-[1.18] tracking-tight"
            />
          </div>

          {/* Thin Divider Line matching sample site */}
          <div className="w-full h-px bg-white/20" />

          {/* Two-Column: Left Label & Right Paragraphs */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 lg:gap-16 pt-2">
            {/* Left Column: Label */}
            <div className="w-full lg:w-48 shrink-0 pt-1 sm:pt-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-[#8a8a8a] block">
                {sectionTitle || "WHO IT'S FOR:"}
              </span>
            </div>

            {/* Right Column: Illuminated Paragraphs */}
            <div className="w-full lg:max-w-2xl ml-auto space-y-4 sm:space-y-6">
              <ScrollIlluminatedText
                text={p1}
                wordClassName="text-lg sm:text-xl md:text-2xl font-medium leading-[1.3] sm:leading-[1.28] tracking-tight"
              />
              <ScrollIlluminatedText
                text={p2}
                wordClassName="text-lg sm:text-xl md:text-2xl font-medium leading-[1.3] sm:leading-[1.28] tracking-tight"
              />
            </div>
          </div>
        </div>

        {/* Bottom Part: 3 Audience Topics on the Right + Pen Showcase (Matches sample site media_1789446834370.png) */}
        <div className="space-y-16 sm:space-y-20 md:space-y-24">
          
          {/* 3 Audience Topics aligned to the right column */}
          <div className="w-full lg:max-w-2xl ml-auto space-y-10 sm:space-y-14 md:space-y-16">
            {audiences.map((aud, idx) => (
              <div
                key={idx}
                className="space-y-2.5 sm:space-y-3"
              >
                <h3 className="text-2xl sm:text-[28px] md:text-3xl font-medium text-white tracking-tight">
                  {aud.title}
                </h3>
                <p className="text-sm sm:text-base md:text-[17px] text-[#a3a3a3] font-light leading-relaxed">
                  {aud.description}
                </p>
              </div>
            ))}
          </div>

          {/* Smart Pen Showcase (Pure white card with horizontal pen photo) */}
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 flex items-center justify-center shadow-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nota_horizontal_pen.png"
              alt="Nōta Smart Pen showcase"
              className="w-full max-h-[35vh] sm:max-h-[45vh] md:max-h-[55vh] object-contain select-none"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
