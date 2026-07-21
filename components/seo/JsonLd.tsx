import { getSite } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo/metadata";
import type { FaqItem, LandingPageContent } from "@/lib/cms/types";

function JsonLdScript({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
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
    logo: `${base}/images/logo.png`,
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

  return <JsonLdScript data={data} />;
}

/** WebSite schema — helps brand search / sitelinks. */
export function WebSiteJsonLd() {
  const site = getSite();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.website.replace(/\/$/, "")}/#website`,
    name: site.companyName,
    url: site.website,
    publisher: { "@id": `${site.website.replace(/\/$/, "")}/#organization` },
    inLanguage: "en-US",
  };
  return <JsonLdScript data={data} />;
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
  return <JsonLdScript data={data} />;
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
  return <JsonLdScript data={data} />;
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
    category: page.kind === "location" ? "Local mortgage broker" : "Specialty mortgage program",
  };

  return <JsonLdScript data={data} />;
}
