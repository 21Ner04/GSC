/**
 * Google Places reviews fetcher (server-only).
 *
 * Env:
 *   GOOGLE_PLACES_API_KEY  — required for live reviews
 *   GOOGLE_PLACE_ID        — optional Place ID (ChIJ…)
 *                            If missing, resolved via Find Place from text query
 *
 * Google Places returns up to 5 reviews (Google's selection), not the full list.
 * Always keep a Maps "View all" link for the complete feed.
 */

import type { GoogleReview } from "@/lib/cms/types";
import { getSite } from "@/lib/cms";
import localReviews from "@/content/reviews.json";

export type GoogleReviewsPayload = {
  source: "google" | "local";
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
  mapsUrl: string;
  placeId: string | null;
  error?: string;
};

const FIND_QUERY =
  process.env.GOOGLE_PLACE_QUERY ||
  "Green Street Capital, LLC 2709 Coney Island Ave Brooklyn NY";

function apiKey() {
  return (process.env.GOOGLE_PLACES_API_KEY || "").trim();
}

function configuredPlaceId() {
  return (process.env.GOOGLE_PLACE_ID || "").trim() || null;
}

async function resolvePlaceId(key: string): Promise<string | null> {
  const configured = configuredPlaceId();
  if (configured) return configured;

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  );
  url.searchParams.set("input", FIND_QUERY);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name,formatted_address");
  url.searchParams.set("key", key);

  const res = await fetch(url.toString(), {
    next: { revalidate: 86400, tags: ["google-place-id"] },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status: string;
    candidates?: { place_id?: string }[];
  };
  if (data.status !== "OK" || !data.candidates?.[0]?.place_id) {
    console.warn("[google/reviews] findplace status:", data.status);
    return null;
  }
  return data.candidates[0].place_id;
}

type PlacesReview = {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
  profile_photo_url?: string;
  author_url?: string;
};

function mapReviews(raw: PlacesReview[]): GoogleReview[] {
  return raw
    .filter((r) => r.author_name && r.text)
    .map((r) => ({
      author: r.author_name as string,
      rating: Math.min(5, Math.max(1, Math.round(r.rating || 5))),
      date: r.relative_time_description || formatUnix(r.time),
      text: (r.text || "").trim(),
      profilePhotoUrl: r.profile_photo_url,
      authorUrl: r.author_url,
    }));
}

function formatUnix(time?: number): string {
  if (!time) return "";
  try {
    return new Date(time * 1000).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function localPayload(error?: string): GoogleReviewsPayload {
  const site = getSite();
  const reviews = localReviews as GoogleReview[];
  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : null;
  return {
    source: "local",
    rating: avg,
    total: reviews.length,
    reviews,
    mapsUrl: site.googleReviewsUrl,
    placeId: configuredPlaceId(),
    error,
  };
}

/**
 * Fetch live Google reviews for the business Place.
 * Falls back to content/reviews.json when API key is missing or request fails.
 */
export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  const site = getSite();
  const key = apiKey();

  if (!key) {
    return localPayload("GOOGLE_PLACES_API_KEY not set");
  }

  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) {
      return localPayload("Could not resolve Google Place ID");
    }

    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    url.searchParams.set("place_id", placeId);
    url.searchParams.set(
      "fields",
      "name,rating,user_ratings_total,reviews,url"
    );
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("key", key);

    const res = await fetch(url.toString(), {
      // Cache on the server ~1 hour (reviews don't change every minute)
      next: { revalidate: 3600, tags: ["google-reviews"] },
    });

    if (!res.ok) {
      return localPayload(`Places HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
      status: string;
      error_message?: string;
      result?: {
        rating?: number;
        user_ratings_total?: number;
        reviews?: PlacesReview[];
        url?: string;
      };
    };

    if (data.status !== "OK" || !data.result) {
      console.warn(
        "[google/reviews] details status:",
        data.status,
        data.error_message
      );
      return localPayload(data.error_message || data.status);
    }

    const reviews = mapReviews(data.result.reviews || []);
    if (!reviews.length) {
      // API OK but no reviews field (billing / field restriction) → local
      return {
        ...localPayload("No reviews returned from Google"),
        placeId,
        rating: data.result.rating ?? null,
        total: data.result.user_ratings_total ?? null,
        mapsUrl: data.result.url || site.googleReviewsUrl,
      };
    }

    return {
      source: "google",
      rating: data.result.rating ?? null,
      total: data.result.user_ratings_total ?? null,
      reviews,
      mapsUrl: data.result.url || site.googleReviewsUrl,
      placeId,
    };
  } catch (err) {
    console.error("[google/reviews]", err);
    return localPayload(err instanceof Error ? err.message : "Unknown error");
  }
}
