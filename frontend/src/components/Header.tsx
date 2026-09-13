"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  siteName?: string;
  onOpenOrder: () => void;
  price?: string;
  links: Array<{ label: string; href: string }>;
}

const CloverIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-black">
    <path d="M12 5.5a3 3 0 0 0-3 3c0 .7.25 1.3.7 1.8A3 3 0 0 0 6.5 12a3 3 0 0 0 3 3c.5 0 1.1-.2 1.8-.7a3 3 0 0 0 1.8.7 3 3 0 0 0 3-3 3 3 0 0 0-.7-1.8c.45-.5.7-1.1.7-1.8a3 3 0 0 0-3-3c-.7 0-1.3.25-1.8.7A3 3 0 0 0 12 5.5z" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  siteName = "Nōta",
  onOpenOrder,
  price = "$600",
  links,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-transparent transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-sans text-2xl tracking-tight text-white font-bold">
            {siteName}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium tracking-normal text-neutral-300">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Floating White Pill CTA from reference */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-white text-black rounded-2xl p-1.5 pl-4 shadow-2xl gap-5 border border-white/20">
            <CloverIcon />
            <button
              onClick={onOpenOrder}
              className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all"
            >
              Order <span className="text-neutral-400">Nota One</span> • {price}
            </button>
          </div>

          <button
            onClick={onOpenOrder}
            className="sm:hidden bg-white text-black px-4 py-2 rounded-xl text-xs font-semibold"
          >
            {price}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4 text-sm font-mono tracking-wider uppercase text-neutral-300">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-2 border-b border-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full py-3 bg-white text-black font-semibold rounded-xl text-center text-sm font-mono uppercase"
          >
            Order Nota One • {price}
          </button>
        </div>
      )}
    </header>
  );
};
