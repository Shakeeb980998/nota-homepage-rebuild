"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface FooterProps {
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

export const Footer: React.FC<FooterProps> = ({ copyright, links }) => {
  const [teamPopupOpen, setTeamPopupOpen] = useState(false);

  return (
    <footer className="bg-black border-t border-neutral-900 py-16 px-6 text-neutral-400">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <span className="font-serif text-2xl tracking-widest text-white font-semibold">
              NŌTA
            </span>
            <p className="text-xs text-neutral-500 max-w-sm">
              Tools that respect the way people think and write. Natural handwriting, quietly connected to digital structure.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider">
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

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
          <div>{copyright}</div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setTeamPopupOpen(true)}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Builded by NōtaTeam
            </button>
            <a
              href="https://www.uprock.ru/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              &amp; UPROCK Studio
            </a>
          </div>
        </div>
      </div>

      {/* Team Popup Modal */}
      {teamPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-white space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
              <h3 className="font-serif text-2xl font-normal">NōtaTeam</h3>
              <button
                onClick={() => setTeamPopupOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
                aria-label="Close team modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
              {teamMembers.map((member) => (
                <a
                  key={member.name}
                  href={member.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 transition-colors border border-neutral-800/80 block group"
                >
                  <div className="text-sm font-medium text-white group-hover:underline">
                    {member.name}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    {member.role}
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setTeamPopupOpen(false)}
                className="px-6 py-2 bg-white text-black text-xs font-mono uppercase rounded-full hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
