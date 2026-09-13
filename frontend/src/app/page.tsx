import { Metadata } from "next";
import { getHomepageData } from "@/lib/strapi";
import { HomePageClient } from "@/components/HomePageClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepageData();

  return {
    title: data.seo.metaTitle || "NŌTA | Writing Infrastructure for Modern Thinking",
    description: data.seo.metaDescription,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: data.seo.metaTitle,
      description: data.seo.metaDescription,
      type: "website",
    },
  };
}

export default async function Page() {
  const data = await getHomepageData();

  return <HomePageClient initialData={data} />;
}
