"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";

interface HeaderProps {
  siteName?: string;
  onOpenOrder: () => void;
  price?: string;
  links: Array<{ label: string; href: string }>;
  isRevealed?: boolean;
}

// Official Didone serif NŌTA logo SVG vector from nota.uprock.pro
const NotaWordmark: React.FC<{ className?: string }> = ({ className = "h-6 w-auto text-white" }) => (
  <svg
    width="71"
    height="26"
    viewBox="0 0 71 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Nōta"
  >
    <path
      d="M4.26969 7.45499H3.91969V24.99H-0.000313967V0.55999H5.63469L12.0397 18.095H12.3897V0.55999H16.3097V24.99H10.6747L4.26969 7.45499ZM20.776 -1.13845e-05H31.206V3.21999H20.776V-1.13845e-05ZM25.991 25.41C24.6143 25.41 23.3777 25.1883 22.281 24.745C21.2077 24.3017 20.286 23.6717 19.516 22.855C18.7693 22.0383 18.186 21.0467 17.766 19.88C17.3693 18.7133 17.171 17.4067 17.171 15.96C17.171 14.5133 17.3693 13.2067 17.766 12.04C18.186 10.8733 18.7693 9.88166 19.516 9.06499C20.286 8.24832 21.2077 7.61832 22.281 7.17499C23.3777 6.73166 24.6143 6.50999 25.991 6.50999C27.3443 6.50999 28.5693 6.73166 29.666 7.17499C30.7627 7.61832 31.6843 8.24832 32.431 9.06499C33.201 9.88166 33.7843 10.8733 34.181 12.04C34.601 13.2067 34.811 14.5133 34.811 15.96C34.811 17.4067 34.601 18.7133 34.181 19.88C33.7843 21.0467 33.201 22.0383 32.431 22.855C31.6843 23.6717 30.7627 24.3017 29.666 24.745C28.5693 25.1883 27.3443 25.41 25.991 25.41ZM25.991 21.98C27.2743 21.98 28.2893 21.595 29.036 20.825C29.7827 20.0317 30.156 18.8767 30.156 17.36V14.56C30.156 13.0433 29.7827 11.9 29.036 11.13C28.2893 10.3367 27.2743 9.93999 25.991 9.93999C24.7077 9.93999 23.6927 10.3367 22.946 11.13C22.1993 11.9 21.826 13.0433 21.826 14.56V17.36C21.826 18.8767 22.1993 20.0317 22.946 20.825C23.6927 21.595 24.7077 21.98 25.991 21.98ZM45.0523 24.99C43.3257 24.99 42.054 24.535 41.2373 23.625C40.4207 22.715 40.0123 21.5367 40.0123 20.09V10.465H34.7623V6.92999H38.3323C39.0557 6.92999 39.569 6.78999 39.8723 6.50999C40.1757 6.20666 40.3273 5.68166 40.3273 4.93499V0.55999H44.4923V6.92999H51.8423V10.465H44.4923V21.455H51.8423V24.99H45.0523ZM68.3137 24.99C67.217 24.99 66.3653 24.7217 65.7587 24.185C65.1753 23.625 64.8253 22.855 64.7087 21.875H64.5337C64.207 22.995 63.5653 23.87 62.6087 24.5C61.652 25.1067 60.4737 25.41 59.0737 25.41C57.2537 25.41 55.807 24.9317 54.7337 23.975C53.6603 23.0183 53.1237 21.6883 53.1237 19.985C53.1237 16.345 55.7953 14.525 61.1387 14.525H64.3237V13.335C64.3237 12.1917 64.0437 11.3283 63.4837 10.745C62.9237 10.1617 62.0137 9.86999 60.7537 9.86999C59.6103 9.86999 58.6887 10.0917 57.9887 10.535C57.2887 10.9783 56.6937 11.55 56.2037 12.25L53.6487 10.08C54.2087 9.07666 55.107 8.23666 56.3437 7.55999C57.6037 6.85999 59.2253 6.50999 61.2087 6.50999C63.5887 6.50999 65.4437 7.06999 66.7737 8.18999C68.127 9.28666 68.8037 10.9317 68.8037 13.125V21.63H70.9387V24.99H68.3137ZM60.5787 22.33C61.652 22.33 62.5387 22.085 63.2387 21.595C63.962 21.0817 64.3237 20.3933 64.3237 19.53V17.115H61.2437C58.7937 17.115 57.5687 17.885 57.5687 19.425V20.125C57.5687 20.8483 57.837 21.3967 58.3737 21.77C58.9103 22.1433 59.6453 22.33 60.5787 22.33Z"
      fill="currentColor"
    />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  siteName = "Nōta",
  onOpenOrder,
  price = "$300",
  links,
  isRevealed = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  // Smart Section-Aware & Scroll Behavior
  // - Over white sections (e.g. Specifications): Always visible, black text/logo matching sample site
  // - Over dark sections: Direction-aware scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;
          const scrollPercent = (currentScroll / (docHeight - winHeight)) * 100;

          // Check if currently inside Specifications section
          const specsEl = document.getElementById("specifications");
          let inSpecs = false;
          if (specsEl) {
            const rect = specsEl.getBoundingClientRect();
            // Header is 80px tall; active when specs is under header
            if (rect.top <= 80 && rect.bottom >= 80) {
              inSpecs = true;
            }
          }
          setIsLightSection(inSpecs);

          if (inSpecs) {
            // In Specs: Always show header with black text matching sample site
            setIsVisible(true);
            setIsScrolled(true);
            lastScrollY = currentScroll;
            ticking = false;
            return;
          }

          if (scrollPercent < 6 || currentScroll < 80) {
            setIsVisible(true);
            setIsScrolled(false);
            lastScrollY = currentScroll;
            ticking = false;
            return;
          }

          setIsScrolled(true);

          const diff = currentScroll - lastScrollY;
          if (diff > 5) {
            setIsVisible(false);
          } else if (diff < -5) {
            setIsVisible(true);
          }

          lastScrollY = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-101%)",
        transition:
          "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
        willChange: "transform",
      }}
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none h-16 sm:h-20 flex items-center ${
        isLightSection
          ? "bg-white/80 backdrop-blur-md border-b border-black/5"
          : isScrolled
          ? "bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-8 md:px-10 lg:px-14 flex items-center justify-between pointer-events-auto">
        {/* Left Side: Didone Serif Wordmark + Desktop Nav grouped together */}
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              window.location.reload();
            }}
            className="flex items-center gap-2 group transition-opacity hover:opacity-80 cursor-pointer bg-transparent border-none p-0 outline-none"
            aria-label="Refresh page"
          >
            <NotaWordmark
              className={`h-5 sm:h-6 w-auto transition-colors duration-300 ${
                isLightSection ? "text-black fill-black" : "text-white fill-white"
              }`}
            />
            <span className="sr-only">{siteName}</span>
          </button>

          {/* Desktop Nav: Title/sentence case, text-sm, clean styling with hover underline */}
          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-sans font-normal transition-colors duration-300 ${
              isLightSection ? "text-neutral-800" : "text-white/90"
            }`}
          >
            {links.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 group/nav ${
                  isLightSection
                    ? "text-neutral-800 hover:text-black"
                    : "text-white/90 hover:text-white"
                }`}
              >
                <ScrambleText
                  text={link.label}
                  trigger={isRevealed}
                  delay={idx * 60}
                  duration={480}
                />
                {/* Clean hover underline indicator matching sample site (media_1789402901410.png) */}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-200 ease-out group-hover/nav:w-full ${
                    isLightSection ? "bg-black" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Right Side: White rectangular card with flower logo & Order button (Matches sample media_1789402803096 & media_1789402873932) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-[#ffffff] text-[#000000] rounded-sm py-2 px-3 sm:py-2.5 sm:px-4 shadow-xl gap-4 sm:gap-6 border border-white/20">
            {/* Flower Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nota-flower-logo.svg"
              alt="Nōta Logo"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain select-none"
            />
            {/* Order Button: default bg #000000, hover bg rgb(255, 34, 0), rounded-sm */}
            <button
              onClick={onOpenOrder}
              className="bg-[#000000] hover:bg-[#ff2200] text-[#ffffff] px-4 py-2 sm:px-5 sm:py-2 rounded-sm font-sans font-medium text-xs sm:text-sm tracking-tight transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Order</span>
              <span className="text-white/60 font-normal">Nota One</span>
              <span>•</span>
              <span>{price}</span>
            </button>
          </div>

          <button
            onClick={onOpenOrder}
            className="sm:hidden bg-[#ffffff] hover:bg-[#ff2200] text-[#000000] hover:text-white px-3.5 py-1.5 rounded-sm text-xs font-semibold transition-colors duration-200 cursor-pointer"
          >
            Order • {price}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300 pointer-events-auto">
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
