import type { Metadata } from "next";
import type { SeoMeta } from "@/lib/cms/types";
import { getSite } from "@/lib/cms";

export type BuildPageMetadataOptions = {
  path: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  /** Absolute URL or site-relative path for Open Graph / Twitter image */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Override default brand keywords merge */
  skipGeo?: boolean;
};

/** Google typically displays ~50–60 chars of title; keep under ~65. */
export function clampTitle(title: string, max = 65): string {
  const t = title.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

/** Meta descriptions work best ~140–160 characters. */
export function clampDescription(desc: string, max = 160): string {
  const d = desc.trim().replace(/\s+/g, " ");
  if (d.length <= max) return d;
  const cut = d.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

function resolveImageUrl(image: string | undefined, base: string): string {
  if (!image) return `${base}/images/logo.png`;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${base}${image.startsWith("/") ? image : `/${image}`}`;
}

function siteBase(): string {
  return getSite().website.replace(/\/$/, "");
}

/** Build consistent Metadata for any page (titles, OG, Twitter, robots, canonical). */
export function buildPageMetadata(
  seo: SeoMeta,
  options: BuildPageMetadataOptions
): Metadata {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const path = options.path.startsWith("/") ? options.path : `/${options.path}`;
  const url = path === "/" ? base : `${base}${path}`;
  const title = clampTitle(seo.title);
  const description = clampDescription(seo.description);
  const ogImage = resolveImageUrl(options.image, base);
  const ogAlt = options.imageAlt || `${site.companyName} — ${title}`;

  const keywords = Array.from(
    new Set(
      [
        ...(seo.keywords || []),
        site.companyName,
        "mortgage broker",
        "NMLS " + site.nmls,
        ...site.statesServed.map((s) => `mortgage ${s}`),
      ].filter(Boolean)
    )
  );

  const geo: Record<string, string> = options.skipGeo
    ? {}
    : {
        "geo.region": "US-NY",
        "geo.placename": "Brooklyn",
        "geo.position": "40.5905934;-73.9602968",
        ICBM: "40.5905934, -73.9602968",
      };

  return {
    // absolute avoids layout template doubling (e.g. "... | Brand | Brand")
    title: { absolute: title },
    description,
    keywords,
    authors: [{ name: site.legalName, url: base }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "finance",
    classification: "Mortgage Brokerage",
    metadataBase: new URL(site.website),
    applicationName: site.companyName,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: path === "" ? "/" : path,
      languages: {
        "en-US": path === "" ? "/" : path,
        en: path === "" ? "/" : path,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.companyName,
      locale: "en_US",
      type: options.type === "article" ? "article" : "website",
      images: [
        {
          url: ogImage,
          width: options.imageWidth ?? 1200,
          height: options.imageHeight ?? 630,
          alt: ogAlt,
          type: ogImage.endsWith(".png")
            ? "image/png"
            : ogImage.match(/\.jpe?g$/i)
              ? "image/jpeg"
              : undefined,
        },
      ],
      emails: [site.email],
      phoneNumbers: [site.phones.local, site.phones.tollFree],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage, alt: ogAlt }],
    },
    robots: options.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false, noimageindex: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    other: {
      ...geo,
      "business:contact_data:street_address": site.address.line1,
      "business:contact_data:locality": site.address.city,
      "business:contact_data:region": site.address.state,
      "business:contact_data:postal_code": site.address.zip,
      "business:contact_data:country_name": "United States",
      "business:contact_data:email": site.email,
      "business:contact_data:phone_number": site.phones.local,
      "business:contact_data:website": site.website,
    },
  };
}

export function absoluteUrl(path: string): string {
  const base = siteBase();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strip HTML for plain-text SEO / schema descriptions. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Safe JSON-LD serialization (prevents </script> breakouts). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
