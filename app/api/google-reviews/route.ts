import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/google/reviews";

/**
 * GET /api/google-reviews
 * Live Google Business reviews (Places API) with local JSON fallback.
 */
export async function GET() {
  const payload = await fetchGoogleReviews();

  return NextResponse.json(payload, {
    headers: {
      // Browser / CDN cache hint (server also uses next.revalidate)
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
