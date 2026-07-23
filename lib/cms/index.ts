/**
 * Content access layer.
 *
 * Default: local JSON in /content
 * WordPress: CONTENT_SOURCE=wordpress + WORDPRESS_API_URL=.../wp-json
 * Always falls back to local JSON if WP fails.
 */

import type {
  GoogleReview,
  HomepageContent,
  LandingPageContent,
  SiteContent,
  SuccessStory,
  VideoItem,
} from "./types";

import siteJson from "@/content/site.json";
import homepageJson from "@/content/homepage.json";
import reviewsJson from "@/content/reviews.json";
import videosJson from "@/content/videos.json";

import locBrooklyn from "@/content/locations/brooklyn.json";
import locFlorida from "@/content/locations/florida.json";
import locLongIsland from "@/content/locations/long-island.json";
import locManhattan from "@/content/locations/manhattan.json";
import locNewJersey from "@/content/locations/new-jersey.json";
import locNewYork from "@/content/locations/new-york.json";
import locNewYorkCity from "@/content/locations/new-york-city.json";
import locPennsylvania from "@/content/locations/pennsylvania.json";
import locQueens from "@/content/locations/queens.json";
import locStatenIsland from "@/content/locations/staten-island.json";
import locWestchester from "@/content/locations/westchester.json";

import sp1099 from "@/content/specialties/1099-borrowers.json";
import spBank from "@/content/specialties/bank-statement-loans.json";
import spCommission from "@/content/specialties/commission-bonus-income.json";
import spDscr from "@/content/specialties/dscr-loans.json";
import spFthb from "@/content/specialties/first-time-homebuyers.json";
import spForeign from "@/content/specialties/foreign-national-loans.json";
import spInvestment from "@/content/specialties/investment.json";
import spItin from "@/content/specialties/itin-mortgage-programs.json";
import spNonQm from "@/content/specialties/non-qm-loans.json";
import spSelf from "@/content/specialties/self-employed.json";
import spTruck from "@/content/specialties/truck-drivers.json";

import {
  fetchAllLocationsFromWordPress,
  fetchAllSpecialtiesFromWordPress,
  fetchHomepageFromWordPress,
  fetchLocationFromWordPress,
  fetchLocationSlugsFromWordPress,
  fetchReviewsFromWordPress,
  fetchSiteFromWordPress,
  fetchSpecialtyFromWordPress,
  fetchSpecialtySlugsFromWordPress,
  fetchVideosFromWordPress,
} from "./wordpress";
import {
  mergeHomepage,
  mergeReviews,
  mergeSite,
  mergeVideos,
} from "./merge";

const locationsLocal: Record<string, LandingPageContent> = {
  brooklyn: locBrooklyn as LandingPageContent,
  florida: locFlorida as LandingPageContent,
  "long-island": locLongIsland as LandingPageContent,
  manhattan: locManhattan as LandingPageContent,
  "new-jersey": locNewJersey as LandingPageContent,
  "new-york": locNewYork as LandingPageContent,
  "new-york-city": locNewYorkCity as LandingPageContent,
  pennsylvania: locPennsylvania as LandingPageContent,
  queens: locQueens as LandingPageContent,
  "staten-island": locStatenIsland as LandingPageContent,
  westchester: locWestchester as LandingPageContent,
};

const specialtiesLocal: Record<string, LandingPageContent> = {
  "1099-borrowers": sp1099 as LandingPageContent,
  "bank-statement-loans": spBank as LandingPageContent,
  "commission-bonus-income": spCommission as LandingPageContent,
  "dscr-loans": spDscr as LandingPageContent,
  "first-time-homebuyers": spFthb as LandingPageContent,
  "foreign-national-loans": spForeign as LandingPageContent,
  investment: spInvestment as LandingPageContent,
  "itin-mortgage-programs": spItin as LandingPageContent,
  "non-qm-loans": spNonQm as LandingPageContent,
  "self-employed": spSelf as LandingPageContent,
  "truck-drivers": spTruck as LandingPageContent,
};

export function getContentSource(): "local" | "wordpress" {
  return process.env.CONTENT_SOURCE?.toLowerCase() === "wordpress"
    ? "wordpress"
    : "local";
}

/** Sync local (safe for client components). */
export function getSite(): SiteContent {
  return siteJson as SiteContent;
}

export function getHomepage(): HomepageContent {
  return homepageJson as HomepageContent;
}

export function getReviews(): GoogleReview[] {
  return reviewsJson as GoogleReview[];
}

export function getVideos(): { youtubeChannel: string; items: VideoItem[] } {
  return videosJson as { youtubeChannel: string; items: VideoItem[] };
}

export function getSuccessStories(): SuccessStory[] {
  return getHomepage().successStories.items;
}

export function getLocation(slug: string): LandingPageContent | null {
  return locationsLocal[slug] ?? null;
}

export function getSpecialty(slug: string): LandingPageContent | null {
  return specialtiesLocal[slug] ?? null;
}

export function getLocationSlugs(): string[] {
  return Object.keys(locationsLocal);
}

export function getSpecialtySlugs(): string[] {
  return Object.keys(specialtiesLocal);
}

export function getAllLocations(): LandingPageContent[] {
  return Object.values(locationsLocal);
}

export function getAllSpecialties(): LandingPageContent[] {
  return Object.values(specialtiesLocal);
}

/** Async — prefers WordPress when enabled. Use in Server Components. */
export async function getSiteAsync(): Promise<SiteContent> {
  const local = siteJson as SiteContent;
  if (getContentSource() !== "wordpress") return local;
  try {
    const wp = await fetchSiteFromWordPress();
    return mergeSite(local, wp ?? undefined);
  } catch (e) {
    console.error("[cms] WordPress site fetch failed, using local JSON", e);
    return local;
  }
}

export async function getHomepageAsync(): Promise<HomepageContent> {
  const local = homepageJson as HomepageContent;
  if (getContentSource() !== "wordpress") return local;
  try {
    const wp = await fetchHomepageFromWordPress();
    return mergeHomepage(local, wp ?? undefined);
  } catch (e) {
    console.error("[cms] WordPress homepage fetch failed, using local JSON", e);
    return local;
  }
}

export async function getReviewsAsync(): Promise<GoogleReview[]> {
  const local = reviewsJson as GoogleReview[];
  if (getContentSource() !== "wordpress") return local;
  try {
    const wp = await fetchReviewsFromWordPress();
    return mergeReviews(local, wp);
  } catch (e) {
    console.error("[cms] WordPress reviews fetch failed, using local JSON", e);
    return local;
  }
}

export async function getVideosAsync(): Promise<{
  youtubeChannel: string;
  items: VideoItem[];
}> {
  const local = videosJson as { youtubeChannel: string; items: VideoItem[] };
  if (getContentSource() !== "wordpress") return local;
  try {
    const wp = await fetchVideosFromWordPress();
    return mergeVideos(local, wp);
  } catch (e) {
    console.error("[cms] WordPress videos fetch failed, using local JSON", e);
    return local;
  }
}

export async function getLocationAsync(
  slug: string
): Promise<LandingPageContent | null> {
  if (getContentSource() === "wordpress") {
    const wp = await fetchLocationFromWordPress(slug);
    if (wp) return wp;
  }
  return locationsLocal[slug] ?? null;
}

export async function getSpecialtyAsync(
  slug: string
): Promise<LandingPageContent | null> {
  if (getContentSource() === "wordpress") {
    const wp = await fetchSpecialtyFromWordPress(slug);
    if (wp) return wp;
  }
  return specialtiesLocal[slug] ?? null;
}

export async function getLocationSlugsAsync(): Promise<string[]> {
  if (getContentSource() === "wordpress") {
    const wp = await fetchLocationSlugsFromWordPress();
    if (wp?.length) return wp;
  }
  return Object.keys(locationsLocal);
}

export async function getSpecialtySlugsAsync(): Promise<string[]> {
  if (getContentSource() === "wordpress") {
    const wp = await fetchSpecialtySlugsFromWordPress();
    if (wp?.length) return wp;
  }
  return Object.keys(specialtiesLocal);
}

export async function getAllLocationsAsync(): Promise<LandingPageContent[]> {
  if (getContentSource() === "wordpress") {
    const wp = await fetchAllLocationsFromWordPress();
    if (wp?.length) return wp;
  }
  return Object.values(locationsLocal);
}

export async function getAllSpecialtiesAsync(): Promise<LandingPageContent[]> {
  if (getContentSource() === "wordpress") {
    const wp = await fetchAllSpecialtiesFromWordPress();
    if (wp?.length) return wp;
  }
  return Object.values(specialtiesLocal);
}

export function getFooterNav() {
  return {
    loanPrograms: [
      { label: "Purchase Loans", href: "/purchase" },
      { label: "Refinance", href: "/refinance" },
      { label: "First-Time Homebuyers", href: "/specialties/first-time-homebuyers" },
      { label: "Loan Programs", href: "/loan-programs" },
      { label: "Non-QM & Bank Statement", href: "/specialties/non-qm-loans" },
      { label: "Investment & DSCR", href: "/specialties/dscr-loans" },
      { label: "Mortgage Calculator", href: "/calculator" },
    ],
    locations: [
      { label: "Brooklyn", href: "/locations/brooklyn" },
      { label: "New York City", href: "/locations/new-york-city" },
      { label: "Manhattan", href: "/locations/manhattan" },
      { label: "Queens", href: "/locations/queens" },
      { label: "Long Island", href: "/locations/long-island" },
      { label: "Westchester", href: "/locations/westchester" },
      { label: "Staten Island", href: "/locations/staten-island" },
      { label: "New York State", href: "/locations/new-york" },
      { label: "New Jersey", href: "/locations/new-jersey" },
      { label: "Florida", href: "/locations/florida" },
      { label: "Pennsylvania", href: "/locations/pennsylvania" },
    ],
    specialties: [
      { label: "First-Time Homebuyers", href: "/specialties/first-time-homebuyers" },
      { label: "Investment Properties", href: "/specialties/investment" },
      { label: "Truck Drivers", href: "/specialties/truck-drivers" },
      { label: "Self-Employed", href: "/specialties/self-employed" },
      { label: "Bank Statement Loans", href: "/specialties/bank-statement-loans" },
      { label: "View All Specialties", href: "/specialties" },
    ],
  };
}
