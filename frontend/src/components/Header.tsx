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
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none h-20 flex items-center ${
        scrolled
          ? "bg-[#2c2e34]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between pointer-events-auto">
        {/* Left Side: Wordmark + Desktop Nav grouped together */}
        <div className="flex items-center gap-10 md:gap-14">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-serif text-3xl sm:text-4xl tracking-tight text-white font-normal">
              {siteName}
            </span>
          </a>

          {/* Desktop Nav: Title/sentence case, text-sm, clean white */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-normal text-white/90">
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
        </div>

        {/* Right Side: White rectangular card with flower logo & Order button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[#ffffff] text-[#000000] rounded-2xl p-1.5 pl-3.5 pr-1.5 shadow-2xl gap-3 border border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nota-flower-logo.svg"
              alt="Nōta Logo"
              className="w-6 h-6 object-contain select-none"
            />
            {/* Order Button: bg #000000, text #ffffff, rounded-xl */}
            <button
              onClick={onOpenOrder}
              className="bg-[#000000] hover:bg-neutral-900 text-[#ffffff] px-6 py-2.5 rounded-xl font-sans font-medium text-xs sm:text-sm tracking-tight transition-all flex items-center gap-1.5"
            >
              <span>Order</span>
              <span className="text-neutral-400 font-normal">Nota One</span>
              <span>•</span>
              <span>{price}</span>
            </button>
          </div>

          <button
            onClick={onOpenOrder}
            className="sm:hidden bg-[#ffffff] text-[#000000] px-4 py-2 rounded-xl text-xs font-semibold"
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
