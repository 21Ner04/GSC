import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";
import { CityProgramHub } from "@/components/seo/CityProgramHub";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import { getHomepage } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";

const home = getHomepage();

export const metadata: Metadata = buildPageMetadata(home.seo, {
  path: "/",
  image: home.hero.image,
  imageAlt: home.hero.imageAlt,
  imageWidth: 1200,
  imageHeight: 630,
});

/**
 * Server wrapper: metadata + JSON-LD + crawlable city/program hub.
 * Interactive UI lives in HomePageClient (still SSR'd by Next.js).
 */
export default function HomePage() {
  return (
    <>
      <HomePageJsonLd />
      <HomePageClient />
      <CityProgramHub />
    </>
  );
}
