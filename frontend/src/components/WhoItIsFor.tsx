"use client";

import React, { useRef } from "react";
import { AudienceCard } from "@/types/cms";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { WordScrollHighlight } from "@/components/WordScrollHighlight";
import { TextInkReveal } from "@/components/TextInkReveal";
import { GraduationCap, Palette, Briefcase } from "lucide-react";

interface WhoItIsForProps {
  introQuote: string;
  sectionTitle: string;
  description: string;
  audiences: AudienceCard[];
}

const icons = [GraduationCap, Palette, Briefcase];

export const WhoItIsFor: React.FC<WhoItIsForProps> = ({
  introQuote,
  sectionTitle,
  description,
  audiences,
}) => {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Issue #3: Pin this section for ~250vh of scroll
  const { scrollYProgress } = useScroll({
    target: pinSectionRef,
    offset: ["start start", "end end"],
  });

  // Motion Token: Scrub smoothing equivalent to scrub: 0.5
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Cards start off-screen right (translateX: 100%+) and animate to translateX(0) with scroll-scrubbed stagger
  const card1X = useTransform(smoothProgress, [0.05, 0.55], ["100vw", "0vw"]);
  const card2X = useTransform(smoothProgress, [0.18, 0.72], ["130vw", "0vw"]);
  const card3X = useTransform(smoothProgress, [0.30, 0.88], ["160vw", "0vw"]);

  const cardTransforms = [card1X, card2X, card3X];

  return (
    <section id="who-it-is-for" className="bg-[#000000] text-white">
      {/* Upper Section: Word-by-Word Scroll Highlight */}
      <div className="py-36 px-6 max-w-5xl mx-auto space-y-12">
        <TextInkReveal
          badge="Philosophy"
          titleLine1="Some thoughts need time,"
          titleLine2="space, and a physical trace."
          theme="dark"
        />

        <div className="pt-6">
          <WordScrollHighlight text={description || introQuote} />
        </div>
      </div>

      {/* Issue #3: Pinned Horizontal Scroll Section */}
      <div ref={pinSectionRef} className="relative h-[250vh]">
        {/* Sticky Viewport pinned during scroll */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6">
          <div className="max-w-7xl mx-auto w-full mb-12">
            <span className="text-[11px] font-sans uppercase tracking-[0.12em] text-[#8a8a8a]">
              Tailored Systems
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif text-white font-light mt-2">
              {sectionTitle || "Who it's for:"}
            </h3>
          </div>

          {/* Cards Track: Starts off-screen right (100%+) and scrubs to resting translateX(0) */}
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {audiences.map((aud, idx) => {
                const Icon = icons[idx % icons.length];
                const cardX = cardTransforms[idx % cardTransforms.length];

                return (
                  <motion.div
                    key={aud.title}
                    style={shouldReduceMotion ? {} : { x: cardX }}
                    className="bg-[#131313] border border-neutral-800/80 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between shadow-2xl hover:border-neutral-700 transition-colors will-change-transform min-h-[380px]"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <Icon size={24} />
                        </div>
                        <span className="font-mono text-xs text-neutral-500">0{idx + 1}</span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-serif text-white font-normal">
                        {aud.title}
                      </h4>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                        {aud.description}
                      </p>
                    </div>

                    <div className="pt-8 border-t border-neutral-800/80 flex items-center text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      <span>Designed for continuous flow</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
