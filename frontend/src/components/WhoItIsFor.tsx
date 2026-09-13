"use client";

import React from "react";
import { AudienceCard } from "@/types/cms";
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
  return (
    <section id="who-it-is-for" className="py-28 px-6 bg-neutral-950 border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Philosophical Intro */}
        <div className="max-w-3xl">
          <p className="text-xl sm:text-2xl font-serif italic text-neutral-300 leading-relaxed">
            "{introQuote}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              Purpose & Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-light">
              {sectionTitle}
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {audiences.map((aud, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={aud.title}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 hover:border-neutral-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center text-white">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-white">
                      {aud.title}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed">
                      {aud.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
