"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface FooterProps {
  siteName?: string;
  copyright?: string;
  links?: Array<{ label: string; href: string }>;
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

export const Footer: React.FC<FooterProps> = ({
  copyright = "@2026 Nōta Team",
  links = [
    { label: "Specifications", href: "#specifications" },
    { label: "Who it's for", href: "#who-it-is-for" },
    { label: "About", href: "#about" },
    { label: "Inside the box", href: "#inside-the-box" },
  ],
}) => {
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);

  return (
    <footer className="bg-black text-white pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-neutral-900">
      <div className="max-w-[1520px] mx-auto space-y-12 sm:space-y-16 md:space-y-20">
        
        {/* Top Grid: Description, Navigation, Year */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-14 items-start">
          
          {/* Left Column (Span 6): Statement */}
          <div className="md:col-span-6 lg:col-span-7 pr-0 sm:pr-4 md:pr-8">
            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.45] text-white font-normal max-w-xl">
              NŌTA creates tools that respect the way people think and write. Natural handwriting, quietly connected to digital structure.
            </p>
          </div>

          {/* Middle Column (Span 3): Navigation */}
          <div className="md:col-span-3 lg:col-span-3 space-y-2 sm:space-y-3">
            <h3 className="text-xs font-sans text-neutral-500 font-medium">Navigation</h3>
            <nav className="flex flex-col space-y-2 sm:space-y-2.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm font-sans text-white hover:text-neutral-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column (Span 2): Year */}
          <div className="md:col-span-3 lg:col-span-2 space-y-2 sm:space-y-3">
            <h3 className="text-xs font-sans text-neutral-500 font-medium">Year</h3>
            <p className="text-xs sm:text-sm font-sans text-white font-medium">2026</p>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Team links, Credits */}
        <div className="pt-6 sm:pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-sans text-neutral-500 text-center sm:text-left">
          <div>{copyright}</div>

          <div className="flex items-center gap-2">
            <a
              href="https://taptop.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Made in Taptop
            </a>
            <span>•</span>
            <button
              onClick={() => setTeamPopupOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Builded by NōtaTeam
            </button>
          </div>

          <div>
            <span className="hover:text-neutral-400 transition-colors">
              Designed by Alice &amp; UPROCK Studio
            </span>
          </div>
        </div>

      </div>

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
    </footer>
  );
};
