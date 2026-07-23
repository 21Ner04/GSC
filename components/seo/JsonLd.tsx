import { getSite, getReviews, getHomepage } from "@/lib/cms";
import { absoluteUrl, serializeJsonLd, stripHtml } from "@/lib/seo/metadata";
import type { FaqItem, LandingPageContent, VideoItem } from "@/lib/cms/types";
import type { TeamMember } from "@/components/team/TeamSignature";

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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

function orgId(base: string) {
  return `${base}/#organization`;
}

function websiteId(base: string) {
  return `${base}/#website`;
}

/** Organization + LocalBusiness structured data (sitewide). */
export function OrganizationJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const mapsUrl =
    site.googleReviewsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

  const data = {
    "@context": "https://schema.org",
    "@type": ["MortgageBroker", "LocalBusiness", "FinancialService"],
    "@id": orgId(base),
    name: site.legalName,
    alternateName: [site.companyName, "GSC Mortgage"],
    legalName: site.legalName,
    url: site.website,
    email: site.email,
    telephone: [site.phones.tollFreeTel, site.phones.localTel],
    faxNumber: site.phones.fax || undefined,
    image: [`${base}/images/logo.png`, `${base}/MAIN PAGE PIC.jpg`],
    logo: {
      "@type": "ImageObject",
      url: `${base}/images/logo.png`,
      width: 512,
      height: 512,
    },
    slogan: site.brandTagline,
    description: stripHtml(
      getHomepage().seo.description || site.brandTagline
    ),
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Check, Wire Transfer, ACH",
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
    hasMap: mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    areaServed: [
      ...site.statesServed.map((s) => ({
        "@type": "State",
        name: s,
        containedInPlace: { "@type": "Country", name: "United States" },
      })),
      {
        "@type": "City",
        name: "Brooklyn",
        containedInPlace: { "@type": "State", name: "NY" },
      },
      {
        "@type": "City",
        name: "New York",
        containedInPlace: { "@type": "State", name: "NY" },
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phones.tollFreeTel,
        contactType: "customer service",
        areaServed: site.statesServed,
        availableLanguage: ["English", "Russian"],
      },
      {
        "@type": "ContactPoint",
        telephone: site.phones.localTel,
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English", "Russian"],
      },
    ],
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.twitter,
      site.social.linkedin,
      site.social.youtube,
      site.social.tiktok,
      site.nmlsConsumerAccessUrl,
    ].filter(Boolean),
    identifier: [
      {
        "@type": "PropertyValue",
        name: "NMLS",
        value: site.nmls,
        url: site.nmlsConsumerAccessUrl,
      },
    ],
    knowsAbout: [
      "Mortgage brokerage",
      "Home purchase loans",
      "Refinance",
      "FHA loans",
      "VA loans",
      "Conventional loans",
      "Jumbo loans",
      "Non-QM loans",
      "Bank statement loans",
      "DSCR loans",
      "First-time homebuyers",
      "Investment property financing",
    ],
  };

  return <JsonLdScript id="jsonld-organization" data={data} />;
}

/** WebSite schema — brand + sitelinks (no fake SearchAction). */
export function WebSiteJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(base),
    name: site.companyName,
    alternateName: site.legalName,
    url: site.website,
    description: getHomepage().seo.description,
    publisher: { "@id": orgId(base) },
    inLanguage: "en-US",
    copyrightHolder: { "@id": orgId(base) },
  };
  return <JsonLdScript id="jsonld-website" data={data} />;
}

/**
 * AggregateRating from review cards.
 * Omits datePublished when values are relative ("3 weeks ago") — invalid for Google.
 */
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
    "@id": orgId(base),
    name: site.legalName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(ratingValue.toFixed(1)),
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviews.length,
      reviewCount: reviews.length,
    },
    review: reviews.slice(0, 5).map((r) => {
      const isoDate = /^\d{4}-\d{2}-\d{2}/.test(r.date) ? r.date : undefined;
      return {
        "@type": "Review",
        author: { "@type": "Person", name: r.author },
        ...(isoDate ? { datePublished: isoDate } : {}),
        reviewBody: r.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
      };
    }),
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

  const placeName = page.hero.heading
    .replace(/^Mortgage Broker in\s+/i, "")
    .replace(/^Mortgages?\s+(in|for)\s+/i, "");

  const areaServed =
    page.kind === "location"
      ? [
          { "@type": "Place", name: placeName },
          ...(page.serviceAreas || []).slice(0, 12).map((name) => ({
            "@type": "Place",
            name,
            containedInPlace: { "@type": "Place", name: placeName },
          })),
        ]
      : [
          ...site.statesServed.map((s) => ({
            "@type": "State",
            name: s,
          })),
          ...(page.serviceAreas || []).slice(0, 8).map((name) => ({
            "@type": "Place",
            name,
          })),
        ];

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${base}${path}#service`,
    name: page.hero.heading,
    alternateName: page.seo.keywords?.slice(0, 5),
    description: page.seo.description,
    url: `${base}${path}`,
    provider: {
      "@id": orgId(base),
    },
    brand: {
      "@type": "Brand",
      name: site.companyName,
    },
    areaServed,
    serviceType: "Mortgage brokerage",
    category:
      page.kind === "location"
        ? "Local mortgage broker"
        : "Specialty mortgage program",
    audience: {
      "@type": "Audience",
      geographicArea: areaServed,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: `${base}/schedule`,
      description: "Free consultation with a licensed loan officer",
    },
    hasOfferCatalog: page.programs?.length
      ? {
          "@type": "OfferCatalog",
          name: page.programsHeading || "Programs",
          itemListElement: page.programs.map((p, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: p.title,
              description: p.description,
            },
          })),
        }
      : undefined,
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
    description: "Mortgage education and market guidance videos",
    url: pageUrl || `${base}/video-blog`,
    numberOfItems: videos.length,
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.description || v.title,
        thumbnailUrl: [
          `https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`,
          `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
        ],
        embedUrl: `https://www.youtube.com/embed/${v.videoId}`,
        contentUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
        // Omit fake uploadDate — better than inventing one
        publisher: { "@id": orgId(base) },
        isFamilyFriendly: true,
        inLanguage: "en-US",
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
    "@id": `${base}/contact#webpage`,
    name: "Contact Green Street Capital",
    description: `Contact ${site.legalName} in ${site.address.city}, ${site.address.state}. Phone ${site.phones.local}.`,
    url: `${base}/contact`,
    isPartOf: { "@id": websiteId(base) },
    about: { "@id": orgId(base) },
    mainEntity: { "@id": orgId(base) },
    inLanguage: "en-US",
  };
  return <JsonLdScript id="jsonld-contact" data={data} />;
}

/** Generic WebPage schema for key marketing pages. */
export function WebPageJsonLd({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ProfilePage" | "FAQPage";
}) {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": websiteId(base) },
    about: { "@id": orgId(base) },
    publisher: { "@id": orgId(base) },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${base}/images/logo.png`,
    },
  };
  return <JsonLdScript id={`jsonld-webpage-${path.replace(/\//g, "-") || "home"}`} data={data} />;
}

/** Homepage: WebPage + primary offers (loan paths). */
export function HomePageJsonLd() {
  const site = getSite();
  const home = getHomepage();
  const base = site.website.replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}/#webpage`,
        url: base,
        name: home.seo.title,
        description: home.seo.description,
        isPartOf: { "@id": websiteId(base) },
        about: { "@id": orgId(base) },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(home.hero.image),
          caption: home.hero.imageAlt,
        },
        inLanguage: "en-US",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".page-hero-sub", "main h2"],
        },
      },
      {
        "@type": "ItemList",
        name: "Loan Programs",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: home.loanPrograms.items.length,
        itemListElement: home.loanPrograms.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.title,
          url: absoluteUrl(item.href),
          description: item.description,
        })),
      },
    ],
  };

  return <JsonLdScript id="jsonld-home" data={data} />;
}

/** Collection ItemList for locations / specialties indexes. */
export function CollectionItemListJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; urlPath: string; description?: string }[];
}) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.urlPath),
        description: item.description,
      })),
    },
  };
  return <JsonLdScript id="jsonld-collection" data={data} />;
}

/** Team page — list of loan officers as Person entities. */
export function TeamJsonLd({ members }: { members: TeamMember[] }) {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const active = members.filter((m) => !m.placeholder && m.name);

  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Meet Our Team | Green Street Capital Loan Officers",
    url: `${base}/team`,
    isPartOf: { "@id": websiteId(base) },
    about: { "@id": orgId(base) },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: active.length,
      itemListElement: active.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Person",
          name: m.name,
          jobTitle: "Loan Officer",
          worksFor: { "@id": orgId(base) },
          email: m.email || undefined,
          telephone: m.direct || m.office || undefined,
          image: m.photo ? absoluteUrl(m.photo) : undefined,
          identifier: m.nmls
            ? {
                "@type": "PropertyValue",
                name: "NMLS",
                value: m.nmls,
              }
            : undefined,
          url: `${base}/team`,
        },
      })),
    },
  };

  return <JsonLdScript id="jsonld-team" data={data} />;
}

/** Mortgage calculator as a free WebApplication tool. */
export function CalculatorJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mortgage Payment Calculator",
    url: `${base}/calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free mortgage calculator with principal & interest, taxes, insurance, HOA, PMI, amortization schedule, and extra payment scenarios.",
    provider: { "@id": orgId(base) },
    inLanguage: "en-US",
  };
  return <JsonLdScript id="jsonld-calculator" data={data} />;
}

/** Schedule / booking page. */
export function SchedulePageJsonLd() {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Schedule a Mortgage Consultation",
    url: `${base}/schedule`,
    description:
      "Book a free 15-minute mortgage consultation with Green Street Capital.",
    isPartOf: { "@id": websiteId(base) },
    about: { "@id": orgId(base) },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/schedule`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "15-minute mortgage consultation",
      },
    },
  };
  return <JsonLdScript id="jsonld-schedule" data={data} />;
}
