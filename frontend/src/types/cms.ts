export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  preventIndexing?: boolean;
}

export interface SpecItem {
  name: string;
}

export interface SpecCard {
  title: string;
  features: string[];
}

export interface AudienceCard {
  title: string;
  description: string;
}

export interface BoxItem {
  title: string;
  description: string;
  badge?: string;
  details?: string;
  image?: string;
}

export interface ColorVariant {
  id: string;
  name: string;
  tagline: string;
  subtext: string;
  hexColor: string;
  image: string;
}

export interface SmartPaperFeature {
  title: string;
  subTitle: string;
  text: string;
  image: string;
}

export interface HomepageData {
  seo: SeoData;
  global: {
    siteName: string;
    productName: string;
    productPrice: string;
    orderBadge: string;
    footerCopyright: string;
    navLinks: Array<{ label: string; href: string }>;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    ctaText: string;
    price: string;
    smartPenImage?: string;
  };
  specs: {
    badge: string;
    title: string;
    cards: SpecCard[];
  };
  whoItIsFor: {
    introQuote: string;
    sectionTitle: string;
    description: string;
    audiences: AudienceCard[];
    videoUrl?: string;
  };
  smartPaper: {
    badge: string;
    title: string;
    slides: SmartPaperFeature[];
  };
  insideTheBox: {
    titleLine1: string;
    titleLine2: string;
    leadText: string;
    items: BoxItem[];
  };
  colorVariants: ColorVariant[];
}
