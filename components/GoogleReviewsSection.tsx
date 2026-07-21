"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHomepage, getReviews, getSite } from "@/lib/cms";
import type { GoogleReview } from "@/lib/cms/types";

type ReviewsApiResponse = {
  source: "google" | "local";
  rating: number | null;
  total: number | null;
  reviews: GoogleReview[];
  mapsUrl: string;
  placeId: string | null;
  error?: string;
};

function GoogleMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowToggle = review.text.length > 200;
  const displayText =
    shouldShowToggle && !isExpanded
      ? review.text.slice(0, 200) + "..."
      : review.text;

  return (
    <div className="card-stable rounded-xl border border-gray-200 bg-gray-50 p-5 transition-shadow hover:shadow-md sm:rounded-lg sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <GoogleMark className="h-6 w-6 shrink-0" />
        <span className="text-sm font-medium text-foreground">Google Review</span>
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {review.profilePhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.profilePhotoUrl}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
            width={32}
            height={32}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : null}
        <p className="min-w-0 font-semibold text-foreground">
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
            >
              {review.author}
            </a>
          ) : (
            review.author
          )}
        </p>
        <div
          className="flex shrink-0 text-yellow-400"
          aria-label={`${review.rating} stars`}
        >
          {Array.from({ length: review.rating }).map((_, j) => (
            <Star key={j} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>
      {review.date && (
        <p className="mb-3 text-xs text-muted-foreground">{review.date}</p>
      )}
      <p className="mb-3 text-sm text-foreground/80">{displayText}</p>
      {shouldShowToggle && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-100 bg-gray-50 p-5 sm:p-6">
      <div className="mb-4 h-6 w-32 rounded bg-gray-200" />
      <div className="mb-3 h-5 w-40 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-24 rounded bg-gray-200" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}

/**
 * Live Google Business reviews on the homepage.
 * Fetches /api/google-reviews (Places API) with local JSON fallback.
 */
export function GoogleReviewsSection() {
  const home = getHomepage();
  const site = getSite();
  const fallback = getReviews();

  const [data, setData] = useState<ReviewsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/google-reviews");
        if (!res.ok) throw new Error("Failed to load reviews");
        const json = (await res.json()) as ReviewsApiResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) {
          const local = getReviews();
          setData({
            source: "local",
            rating: null,
            total: local.length,
            reviews: local,
            mapsUrl: site.googleReviewsUrl,
            placeId: null,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch once on mount
  }, []);

  const reviews = data?.reviews?.length ? data.reviews : fallback;
  const mapsUrl = data?.mapsUrl || site.googleReviewsUrl;

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
          <div className="min-w-0 max-w-2xl">
            <h2 className="mb-0 font-montserrat text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              {home.reviews.heading}
            </h2>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full shrink-0 sm:w-auto"
          >
            <Button variant="outline" className="w-full gap-2 md:w-auto">
              View All Reviews on Google
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ReviewSkeleton key={i} />
              ))
            : reviews.slice(0, 6).map((review) => (
                <ReviewCard
                  key={`${review.author}-${review.date}-${review.text.slice(0, 24)}`}
                  review={review}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
