/**
 * WordPress REST adapter (headless CMS).
 *
 * Env:
 *   CONTENT_SOURCE=wordpress
 *   WORDPRESS_API_URL=https://cms.example.com/wp-json
 *   WORDPRESS_REVALIDATE_SECRET=optional-shared-secret
 *
 * Install plugin from /wordpress-plugin/gsc-cms on your WP site.
 * Falls back to local JSON when WP is unreachable (handled in index.ts).
 */

import type {
  GoogleReview,
  HomepageContent,
  LandingPageContent,
  SiteContent,
  VideoItem,
} from "./types";

const apiBase = () =>
  (process.env.WORDPRESS_API_URL || "").replace(/\/$/, "");

const revalidateSeconds = () => {
  const n = Number(process.env.WORDPRESS_REVALIDATE_SECONDS || "60");
  return Number.isFinite(n) && n >= 0 ? n : 60;
};

export async function wpGet<T>(path: string): Promise<T | null> {
  const base = apiBase();
  if (!base) {
    console.warn("[cms/wordpress] WORDPRESS_API_URL is not set");
    return null;
  }

  const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: revalidateSeconds(), tags: ["wordpress-cms"] },
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      console.error(`[cms/wordpress] ${res.status} ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("[cms/wordpress]", err);
    return null;
  }
}

export async function fetchSiteFromWordPress(): Promise<SiteContent | null> {
  return wpGet<SiteContent>("/gsc/v1/site");
}

export async function fetchHomepageFromWordPress(): Promise<HomepageContent | null> {
  return wpGet<HomepageContent>("/gsc/v1/homepage");
}

export async function fetchReviewsFromWordPress(): Promise<GoogleReview[] | null> {
  const data = await wpGet<{ items: GoogleReview[] }>("/gsc/v1/reviews");
  return data?.items ?? null;
}

export async function fetchVideosFromWordPress(): Promise<{
  youtubeChannel: string;
  items: VideoItem[];
} | null> {
  return wpGet("/gsc/v1/videos");
}

export async function fetchLocationFromWordPress(
  slug: string
): Promise<LandingPageContent | null> {
  return wpGet<LandingPageContent>(
    `/gsc/v1/locations/${encodeURIComponent(slug)}`
  );
}

export async function fetchSpecialtyFromWordPress(
  slug: string
): Promise<LandingPageContent | null> {
  return wpGet<LandingPageContent>(
    `/gsc/v1/specialties/${encodeURIComponent(slug)}`
  );
}

export async function fetchLocationSlugsFromWordPress(): Promise<string[] | null> {
  const data = await wpGet<{ slugs: string[] }>("/gsc/v1/locations");
  return data?.slugs ?? null;
}

export async function fetchSpecialtySlugsFromWordPress(): Promise<string[] | null> {
  const data = await wpGet<{ slugs: string[] }>("/gsc/v1/specialties");
  return data?.slugs ?? null;
}

export async function fetchAllLocationsFromWordPress(): Promise<
  LandingPageContent[] | null
> {
  const data = await wpGet<{ items: LandingPageContent[] }>(
    "/gsc/v1/locations?full=1"
  );
  return data?.items ?? null;
}

export async function fetchAllSpecialtiesFromWordPress(): Promise<
  LandingPageContent[] | null
> {
  const data = await wpGet<{ items: LandingPageContent[] }>(
    "/gsc/v1/specialties?full=1"
  );
  return data?.items ?? null;
}
