/**
 * Merge WordPress payloads with local JSON so partial WP configs still work.
 */

import type {
  GoogleReview,
  HomepageContent,
  SiteContent,
  VideoItem,
} from "./types";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Shallow-merge nested objects; arrays/strings from WP win when non-empty. */
export function mergeSite(local: SiteContent, wp: Partial<SiteContent> | null | undefined): SiteContent {
  if (!wp) return local;
  return {
    ...local,
    ...wp,
    address: { ...local.address, ...(wp.address || {}) },
    phones: { ...local.phones, ...(wp.phones || {}) },
    social: { ...local.social, ...(wp.social || {}) },
    statesServed:
      Array.isArray(wp.statesServed) && wp.statesServed.length
        ? wp.statesServed
        : local.statesServed,
    licensedIn:
      Array.isArray(wp.licensedIn) && wp.licensedIn.length
        ? wp.licensedIn
        : local.licensedIn,
    footerDisclaimer:
      Array.isArray(wp.footerDisclaimer) && wp.footerDisclaimer.length
        ? wp.footerDisclaimer
        : local.footerDisclaimer,
  };
}

export function mergeHomepage(
  local: HomepageContent,
  wp: Partial<HomepageContent> | null | undefined
): HomepageContent {
  if (!wp) return local;
  const merged: HomepageContent = {
    ...local,
    ...wp,
    seo: { ...local.seo, ...(wp.seo || {}) },
    hero: { ...local.hero, ...(wp.hero || {}) },
    loanPrograms: {
      ...local.loanPrograms,
      ...(wp.loanPrograms || {}),
      items:
        wp.loanPrograms?.items?.length
          ? wp.loanPrograms.items
          : local.loanPrograms.items,
    },
    successStories: {
      ...local.successStories,
      ...(wp.successStories || {}),
      items:
        wp.successStories?.items?.length
          ? wp.successStories.items
          : local.successStories.items,
    },
    reviews: { ...local.reviews, ...(wp.reviews || {}) },
    calculatorBook: {
      ...local.calculatorBook,
      ...(wp.calculatorBook || {}),
      bookBullets:
        wp.calculatorBook?.bookBullets?.length
          ? wp.calculatorBook.bookBullets
          : local.calculatorBook.bookBullets,
    },
    videos: { ...local.videos, ...(wp.videos || {}) },
    marketUpdates: {
      ...local.marketUpdates,
      ...(wp.marketUpdates || {}),
    },
    contact: { ...local.contact, ...(wp.contact || {}) },
  };
  return merged;
}

export function mergeReviews(
  local: GoogleReview[],
  wp: GoogleReview[] | null | undefined
): GoogleReview[] {
  if (wp && wp.length) return wp;
  return local;
}

export function mergeVideos(
  local: { youtubeChannel: string; items: VideoItem[] },
  wp: { youtubeChannel?: string; items?: VideoItem[] } | null | undefined
): { youtubeChannel: string; items: VideoItem[] } {
  if (!wp) return local;
  return {
    youtubeChannel: wp.youtubeChannel || local.youtubeChannel,
    items: wp.items?.length ? wp.items : local.items,
  };
}

/** Runtime shape check for landing pages from WP. */
export function isLandingLike(v: unknown): boolean {
  if (!isObject(v)) return false;
  return typeof v.slug === "string" && isObject(v.seo) && isObject(v.hero);
}
