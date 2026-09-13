import { HomepageData } from "@/types/cms";

export const defaultHomepageData: HomepageData = {
  seo: {
    metaTitle: "NŌTA | Writing Infrastructure for Modern Thinking",
    metaDescription:
      "NŌTA is a smart writing system that combines a precision smart pen, intelligent paper, and real-time digital sync. Designed for people who think better by hand.",
    keywords:
      "AI smart pen, smart notebook, handwriting recognition, digital handwriting, handwritten notes",
    preventIndexing: true,
  },
  global: {
    siteName: "NŌTA",
    productName: "Nota One",
    productPrice: "$300",
    orderBadge: "Order Nota One",
    footerCopyright: "@2026 Nōta Team",
    navLinks: [
      { label: "Specifications", href: "#specifications" },
      { label: "Who it's for", href: "#who-it-is-for" },
      { label: "About", href: "#about" },
      { label: "Inside the box", href: "#inside-the-box" },
    ],
  },
  hero: {
    badge: "Writing Infrastructure",
    titleLine1: "Smart pen",
    titleLine2: "for real thinking",
    subtitle: "Combines a precision smart pen, intelligent paper, and seamless digital sync. For those who think better by hand.",
    ctaText: "Order Nota One",
    price: "$300",
  },
  specs: {
    badge: "Nota pen",
    title: "Specifications",
    cards: [
      {
        title: "Writing System",
        features: [
          "Fountain pen nib",
          "Natural ink flow",
          "Replaceable fountain-pen ink cartridge",
          "Designed for precise, expressive handwriting",
        ],
      },
      {
        title: "Capture Technology",
        features: [
          "High-precision optical tracking",
          "Real-time stroke capture",
          "Line-by-line accuracy",
          "Supports handwriting, diagrams, sketches",
        ],
      },
      {
        title: "Digital Continuity",
        features: [
          "Notes sync automatically",
          "Searchable over time",
          "Structured with AI support",
          "Ready when you return",
        ],
      },
    ],
  },
  whoItIsFor: {
    introQuote:
      "Some thoughts need time, space, and a physical trace to exist. Writing by hand creates focus, presence, and a deeper connection with ideas. This tool is built around that simple truth.",
    sectionTitle: "Who it's for:",
    description:
      "This tool is made for people who think on paper. It keeps handwriting natural and focused, letting you write the way you always have without distractions or screens getting in the way. Everything you write syncs to the app, where your notes are organized, searchable, and ready to work with AI when you need more clarity or structure.",
    audiences: [
      {
        title: "Students & Learners",
        description:
          "Handwritten notes stay personal and intuitive, but become searchable, organized, and easy to study. Lectures, ideas, and revisions are captured as they are — then supported by AI summaries, text recognition, and quick navigation when it matters most.",
      },
      {
        title: "Creators, Designers & Architects",
        description:
          "Sketches, diagrams, concepts, and fragments of ideas belong on paper. This tool makes sure they don’t disappear. Everything drawn or written is safely stored, easy to revisit, and ready to evolve into something bigger — without interrupting the creative flow.",
      },
      {
        title: "Managers & Product Thinkers",
        description:
          "Meetings start on paper and end with structure. Notes turn into clear summaries, tasks, and follow-ups. The pen captures everything quietly, while the app helps organize decisions without pulling attention away from the room.",
      },
    ],
  },
  smartPaper: {
    badge: "Works with",
    title: "smart paper",
    slides: [
      {
        title: "We use special paper with a nearly invisible pattern",
        subTitle: "For the pen, it's a precise map",
        text: "The pattern defines exact coordinates across the page, allowing the pen to capture every stroke with precision and consistency. For you, it feels like ordinary paper. For the system, it becomes a stable reference that turns handwriting into structured, accurate digital data.",
        image: "https://nota.uprock.pro/thumb/2/hkWO_0PdjAnQD0OeUgMd8g/1920r1080/d/nota_scene_4_img_01.jpg",
      },
      {
        title: "Looks like paper. Works like a system.",
        subTitle: "For you, it’s just a blank sheet",
        text: "You write freely, without grids, guides, or visible markers. The paper feels clean and familiar, keeping your focus on ideas instead of tools. Nothing distracts you from the act of writing. Nothing changes in how you write — only what becomes possible after.",
        image: "https://nota.uprock.pro/thumb/2/7YfwgKVakw18X4hnPZia0Q/1920r1080/d/nota_scene_4_img_02.jpg",
      },
      {
        title: "No delays. No glitches. No random effects.",
        subTitle: "AI-powered structure",
        text: "Handwriting is processed in real time and enriched quietly in the background. AI recognizes text, structure, and context to organize notes, highlight key ideas, and connect thoughts over time. The technology stays invisible, so your focus remains fully on writing.",
        image: "https://nota.uprock.pro/thumb/2/5RXD9D7cr-Ez9A9KxlC5hw/1920r1080/d/nota_scene_4_img_03.jpg",
      },
      {
        title: "Everything you write is synced to your phone in real time",
        subTitle: "Your notes. Already there.",
        text: "Every note is instantly transferred to your device and safely stored in your personal space. Access your thoughts anytime, organize them effortlessly, and continue working across devices. Your handwriting becomes part of a system that is searchable, structured, and always available.",
        image: "https://nota.uprock.pro/thumb/2/XYdQ9jPC6FwmZfYcoOuhgQ/1920r1080/d/nota_scene_4_img_04.jpg",
      },
    ],
  },
  insideTheBox: {
    titleLine1: "Inside",
    titleLine2: "the box",
    leadText:
      "A precision smart pen with a solid aluminum body, designed for natural handwriting and accurate digital capture. Seamlessly connects to smart paper, translating every stroke into structured digital data — no screens, no distractions, just writing.",
    items: [
      {
        title: "A complete, ready-to-use set",
        description:
          "Smart pen, Smartpaper notepad, charging cable, and instructions — carefully packaged for a hassle-free start.",
        badge: "01",
      },
      {
        title: "The NŌTA Smart Pen",
        description:
          "Aluminum body, USB-C charging, physical control button, and Bluetooth connectivity. Up to 8 hours of active use with a lightweight, balanced design for everyday writing.",
        badge: "02",
      },
      {
        title: "Charging Adapter",
        description:
          "Compact USB-C power adapter with stable output for everyday charging. Designed for safe, efficient power delivery with minimal heat.",
        badge: "03",
      },
    ],
  },
  colorVariants: [
    {
      id: "silver",
      name: "Silver",
      tagline: "Impossible to",
      subtext: "overthink",
      hexColor: "#D1D5DB",
      image:
        "https://nota.uprock.pro/thumb/2/1SLA07O2y250d4sm92qnPg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_01.jpg",
    },
    {
      id: "graphite",
      name: "Graphite Black",
      tagline: "Graphite Black.",
      subtext: "Clarity in silence.",
      hexColor: "#1F2937",
      image:
        "https://nota.uprock.pro/thumb/2/TYFFgx_5tk3Z54ItqSDO4w/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_02.jpg",
    },
    {
      id: "blue",
      name: "Mist Blue",
      tagline: "Mist Blue.",
      subtext: "Light thinking.",
      hexColor: "#60A5FA",
      image:
        "https://nota.uprock.pro/thumb/2/WoVgGWdUhndJDCN4Hp4Y4w/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_03.jpg",
    },
    {
      id: "red",
      name: "Precision Red",
      tagline: "Precision Red.",
      subtext: "Form follows thought.",
      hexColor: "#EF4444",
      image:
        "https://nota.uprock.pro/thumb/2/p8a6t6D7aO3tSc3x4pW7nw/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_04.jpg",
    },
    {
      id: "orange",
      name: "Bright Orange",
      tagline: "Bright Orange.",
      subtext: "Steady focus.",
      hexColor: "#F97316",
      image:
        "https://nota.uprock.pro/thumb/2/XcxX2unL4tshlrNkYB4sRg/1920r1080/d/library_image-14781-symbol-i64njjjjo-nota_scene_7_img_05.jpg",
    },
  ],
};

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "https://nota-homepage-rebuild-production-efde.up.railway.app";

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const [homeRes, globalRes] = await Promise.allSettled([
      fetch(`${STRAPI_API_URL}/api/homepage?populate=deep,4`, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }),
      fetch(`${STRAPI_API_URL}/api/global`, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }),
    ]);

    let mergedData: HomepageData = JSON.parse(JSON.stringify(defaultHomepageData));

    if (globalRes.status === "fulfilled" && globalRes.value.ok) {
      const gData = await globalRes.value.json();
      if (gData?.data) {
        const g = gData.data;
        mergedData.global = {
          ...mergedData.global,
          siteName: g.siteName || mergedData.global.siteName,
          productPrice: g.productPrice || mergedData.global.productPrice,
          orderBadge: g.orderButtonText || mergedData.global.orderBadge,
          footerCopyright: g.footerCopyright || mergedData.global.footerCopyright,
          navLinks: Array.isArray(g.navLinks) && g.navLinks.length > 0 ? g.navLinks : mergedData.global.navLinks,
        };
        if (g.productPrice) {
          mergedData.hero.price = g.productPrice;
        }
      }
    }

    if (homeRes.status === "fulfilled" && homeRes.value.ok) {
      const hData = await homeRes.value.json();
      if (hData?.data) {
        mergedData = {
          ...mergedData,
          ...hData.data,
          global: {
            ...mergedData.global,
            ...(hData.data.global || {}),
          },
          seo: {
            ...mergedData.seo,
            ...(hData.data.seo || {}),
          },
        };
      }
    }

    return mergedData;
  } catch (err) {
    console.error("Error fetching Strapi data:", err);
    return defaultHomepageData;
  }
}
