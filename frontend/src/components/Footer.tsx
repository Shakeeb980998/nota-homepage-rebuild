"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";

interface FooterProps {
  siteName?: string;
  copyright: string;
  links: Array<{ label: string; href: string }>;
}

const teamMembers = [
  { name: "Alexandra Kazimirskaya", role: "Design Lead", link: "https://telegram.me/lunary_me" },
  { name: "Daria Zubareva", role: "Product Designer", link: "https://telegram.me/mi_shunia" },
  { name: "Olga Kopyeva", role: "Motion & 3D", link: "https://telegram.me/imkopyova" },
  { name: "Stefania Orlova", role: "Visual Identity", link: "https://telegram.me/whybitchcry" },
  { name: "Dobrinya Karepin", role: "Creative Technologist", link: "https://telegram.me/donkarepin" },
  { name: "Maya Melnichuk", role: "Strategy", link: "https://telegram.me/MYaroslavovna" },
  { name: "Valeria Yalova-Chernova", role: "Copywriter", link: "https://telegram.me/Yalova_Valeriya" },
  { name: "Natalia Borovkova", role: "Brand Specialist", link: "https://telegram.me/NatalieMeribel" },
  { name: "Anastasia Voronova", role: "Producer", link: "https://telegram.me/Anastasia_coin" },
];

export const Footer: React.FC<FooterProps> = ({ siteName = "Nōta", copyright, links }) => {
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);

  return (
    <div>
      {/* Primitive #9: Product Image on Vertical Gradient (dark -> warm orange/red) */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-[#101012] via-[#2d140e] to-[#7c2d12] text-white text-center">
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-amber-200">
            <Sparkles size={13} /> Writing Infrastructure
          </span>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight leading-tight">
            Designed for those who <br />
            <span className="italic text-amber-100">think better by hand.</span>
          </h2>

          <div className="relative w-full max-w-xl mx-auto py-6 flex justify-center drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://nota.uprock.pro/thumb/2/zOzK4LBsVJn0W98Pf5CalQ/364r1526/d/library_image-14634-symbol-is6ru9kkd-nota_hero_image_adaptive_866220.png"
              alt="Nota Precision Pen"
              className="w-full max-h-72 object-contain transform -rotate-6 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Abrupt Transition to Solid Black Footer with 3-Column Layout */}
      <footer className="bg-black py-20 px-6 text-neutral-400 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
            {/* Column 1: Brand Blurb */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-sans text-2xl tracking-tight text-white font-bold">
                {siteName}
              </span>
              <p className="text-sm text-neutral-400 max-w-sm font-light leading-relaxed">
                Writing infrastructure for modern thinking. A precision smart pen and intelligent paper system that connects analog handwriting to structured digital knowledge.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Navigation</h4>
              <nav className="flex flex-col space-y-3 text-sm font-light">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 3: Credits & Reviewer Info */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Credits & Administration</h4>
              <div className="space-y-3 text-sm font-light">
                <button
                  onClick={() => setTeamPopupOpen(true)}
                  className="hover:text-white transition-colors underline underline-offset-4 block text-left"
                >
                  Builded by NōtaTeam
                </button>
                <a
                  href="/admin"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 transition-colors block text-xs font-mono"
                >
                  Strapi Admin Panel →
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
            <div>{copyright}</div>
            <div className="text-neutral-600">Surge Global Senior Web Developer Assessment</div>
          </div>
        </div>
      </footer>

      {/* Team Modal Popup */}
      {teamPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl">
            <button
              onClick={() => setTeamPopupOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-serif text-white mb-6">Nōta Team Creators</h3>
            <div className="divide-y divide-neutral-800">
              {teamMembers.map((member) => (
                <a
                  key={member.name}
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 flex justify-between items-center hover:bg-neutral-800/50 px-2 rounded-lg transition-colors group"
                >
                  <span className="text-white text-sm group-hover:underline">{member.name}</span>
                  <span className="text-neutral-500 text-xs font-mono">{member.role}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
