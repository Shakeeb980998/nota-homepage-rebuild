"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenOrder: () => void;
  price?: string;
  links: Array<{ label: string; href: string }>;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrder, price = "$300", links }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-neutral-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="font-serif text-2xl tracking-widest text-white font-semibold">
            NŌTA
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-neutral-400">
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

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenOrder}
            className="flex items-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full pl-5 pr-2 py-1.5 transition-all text-xs font-mono uppercase group"
          >
            <span className="text-white font-medium mr-3">Order</span>
            <span className="text-neutral-500 mr-3">Nota One</span>
            <span className="bg-white text-black px-3 py-1 rounded-full font-sans font-semibold">
              {price}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
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
