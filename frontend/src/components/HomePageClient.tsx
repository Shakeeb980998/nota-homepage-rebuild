"use client";

import React, { useState } from "react";
import { HomepageData } from "@/types/cms";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Specs } from "@/components/Specs";
import { WhoItIsFor } from "@/components/WhoItIsFor";
import { SmartPaper } from "@/components/SmartPaper";
import { InsideTheBox } from "@/components/InsideTheBox";
import { ColorVariants } from "@/components/ColorVariants";
import { BentoGallery } from "@/components/BentoGallery";
import { Footer } from "@/components/Footer";
import { OrderModal } from "@/components/OrderModal";

interface HomePageClientProps {
  initialData: HomepageData;
}

export const HomePageClient: React.FC<HomePageClientProps> = ({ initialData }) => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-neutral-800 selection:text-white">
      {/* Header */}
      <Header
        siteName={initialData.global.siteName}
        links={initialData.global.navLinks}
        price={initialData.global.productPrice}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Hero */}
      <Hero
        badge={initialData.hero.badge}
        titleLine1={initialData.hero.titleLine1}
        titleLine2={initialData.hero.titleLine2}
        subtitle={initialData.hero.subtitle}
        ctaText={initialData.hero.ctaText}
        price={initialData.global.productPrice || initialData.hero.price}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Specifications */}
      <Specs
        badge={initialData.specs.badge}
        title={initialData.specs.title}
        cards={initialData.specs.cards}
      />

      {/* Who it is for */}
      <WhoItIsFor
        introQuote={initialData.whoItIsFor.introQuote}
        sectionTitle={initialData.whoItIsFor.sectionTitle}
        description={initialData.whoItIsFor.description}
        audiences={initialData.whoItIsFor.audiences}
      />

      {/* Works with smart paper */}
      <SmartPaper
        badge={initialData.smartPaper.badge}
        title={initialData.smartPaper.title}
        slides={initialData.smartPaper.slides}
      />

      {/* Inside the box */}
      <InsideTheBox
        titleLine1={initialData.insideTheBox.titleLine1}
        titleLine2={initialData.insideTheBox.titleLine2}
        leadText={initialData.insideTheBox.leadText}
        items={initialData.insideTheBox.items}
      />

      {/* Color Variants Slider / Switcher */}
      <ColorVariants
        variants={initialData.colorVariants}
        onOpenOrder={() => setIsOrderOpen(true)}
      />

      {/* Bento Detail Gallery Section */}
      <BentoGallery />

      {/* Footer */}
      <Footer
        siteName={initialData.global.siteName}
        copyright={initialData.global.footerCopyright}
        links={initialData.global.navLinks}
      />

      {/* Interactive Reservation / Pre-order Modal */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        productPrice={initialData.global.productPrice}
      />
    </main>
  );
};
