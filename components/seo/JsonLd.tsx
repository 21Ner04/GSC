import { getSite, getReviews } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo/metadata";
import type { FaqItem, LandingPageContent, VideoItem } from "@/lib/cms/types";

function JsonLdScript({
  data,
  id,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + LocalBusiness structured data (sitewide). */
export function OrganizationJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@type": ["MortgageBroker", "LocalBusiness", "FinancialService"],
    "@id": `${base}/#organization`,
    name: site.legalName,
    alternateName: site.companyName,
    url: site.website,
    email: site.email,
    telephone: [site.phones.tollFreeTel, site.phones.localTel],
    image: `${base}/images/logo.png`,
    logo: {
      "@type": "ImageObject",
      url: `${base}/images/logo.png`,
      width: 512,
      height: 512,
    },
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.5905934,
      longitude: -73.9602968,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: site.statesServed.map((s) => ({
      "@type": "State",
      name: s,
      containedInPlace: { "@type": "Country", name: "United States" },
    })),
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.twitter,
      site.social.linkedin,
      site.social.youtube,
      site.social.tiktok,
    ].filter(Boolean),
    identifier: {
      "@type": "PropertyValue",
      name: "NMLS",
      value: site.nmls,
    },
    knowsAbout: [
      "Mortgage brokerage",
      "Home purchase loans",
      "Refinance",
      "FHA loans",
      "VA loans",
      "Non-QM loans",
      "Bank statement loans",
      "DSCR loans",
    ],
  };

  return <JsonLdScript id="jsonld-organization" data={data} />;
}

/** WebSite schema — helps brand search / sitelinks. */
export function WebSiteJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: site.companyName,
    url: site.website,
    publisher: { "@id": `${base}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/loan-programs`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLdScript id="jsonld-website" data={data} />;
}

/** AggregateRating from static review cards (when available). */
export function AggregateRatingJsonLd() {
  const reviews = getReviews();
  if (!reviews.length) return null;

  const ratingValue =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  const site = getSite();
  const base = site.website.replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    "@id": `${base}/#organization`,
    name: site.legalName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(ratingValue.toFixed(1)),
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviews.length,
      reviewCount: reviews.length,
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return <JsonLdScript id="jsonld-reviews" data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs?.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
  return <JsonLdScript id="jsonld-faq" data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  return <JsonLdScript id="jsonld-breadcrumb" data={data} />;
}

/** Location or specialty landing page → Service + place signals. */
export function LandingServiceJsonLd({ page }: { page: LandingPageContent }) {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const path =
    page.kind === "location"
      ? `/locations/${page.slug}`
      : `/specialties/${page.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.hero.heading,
    description: page.seo.description,
    url: `${base}${path}`,
    provider: {
      "@id": `${base}/#organization`,
    },
    areaServed:
      page.kind === "location"
        ? {
            "@type": "Place",
            name: page.hero.heading.replace(/^Mortgage Broker in\s+/i, ""),
          }
        : site.statesServed.map((s) => ({
            "@type": "State",
            name: s,
          })),
    serviceType: "Mortgage brokerage",
    category:
      page.kind === "location"
        ? "Local mortgage broker"
        : "Specialty mortgage program",
  };

  return <JsonLdScript id="jsonld-service" data={data} />;
}

/** Video blog ItemList + VideoObject entries. */
export function VideoBlogJsonLd({
  videos,
  pageUrl,
}: {
  videos: VideoItem[];
  pageUrl?: string;
}) {
  if (!videos.length) return null;
  const site = getSite();
  const base = site.website.replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Green Street Capital Video Blog",
    url: pageUrl || `${base}/video-blog`,
    numberOfItems: videos.length,
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.description,
        thumbnailUrl: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${v.videoId}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
        uploadDate: "2024-01-01",
        publisher: { "@id": `${base}/#organization` },
      },
    })),
  };

  return <JsonLdScript id="jsonld-videos" data={data} />;
}

/** ContactPage schema. */
export function ContactPageJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Green Street Capital",
    url: `${base}/contact`,
    mainEntity: { "@id": `${base}/#organization` },
  };
  return <JsonLdScript id="jsonld-contact" data={data} />;
}

/** Generic WebPage schema for key marketing pages. */
export function WebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${base}/#website` },
    about: { "@id": `${base}/#organization` },
    inLanguage: "en-US",
  };
  return <JsonLdScript id="jsonld-webpage" data={data} />;
}
