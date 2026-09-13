"use client";

import React, { useRef } from "react";
import { AudienceCard } from "@/types/cms";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

  // Primitive #5: Vertical scroll drives horizontal translateX
  const { scrollYProgress } = useScroll({
    target: pinSectionRef,
    offset: ["start start", "end end"],
  });

  const cardsX = useTransform(scrollYProgress, [0, 1], ["15%", "-55%"]);

  return (
    <section id="who-it-is-for" className="bg-black text-white">
      {/* Upper Section: Primitive #4 Word-by-Word Scroll Highlight */}
      <div className="py-28 px-6 max-w-5xl mx-auto space-y-12">
        <TextInkReveal
          badge="Philosophy"
          titleLine1="Some thoughts need time,"
          titleLine2="space, and a physical trace."
          theme="dark"
        />

        <div className="pt-6">
          {/* Teleprompter word-by-word highlight */}
          <WordScrollHighlight text={description || introQuote} />
        </div>
      </div>

      {/* Primitive #5: Horizontal Pinned Card Slide */}
      {shouldReduceMotion ? (
        <div className="max-w-7xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((aud, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={aud.title}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-white">
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl font-serif text-white font-normal">{aud.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  {aud.description}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div ref={pinSectionRef} className="relative h-[220vh]">
          {/* Pinned Viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6">
            <div className="max-w-7xl mx-auto w-full mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Tailored Systems
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-white font-light mt-2">
                {sectionTitle || "Who it's for:"}
              </h3>
            </div>

            {/* Horizontal Track scrubbing across */}
            <motion.div
              style={{ x: cardsX }}
              className="flex gap-8 will-change-transform"
            >
              {audiences.map((aud, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <div
                    key={aud.title}
                    className="w-[85vw] sm:w-[420px] md:w-[480px] shrink-0 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-[36px] p-8 sm:p-10 flex flex-col justify-between shadow-2xl hover:border-neutral-700 transition-colors"
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
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};
