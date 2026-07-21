import type { Metadata } from "next";
import type { SeoMeta } from "@/lib/cms/types";
import { getSite } from "@/lib/cms";

export type BuildPageMetadataOptions = {
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
  /** Absolute URL or site-relative path for Open Graph / Twitter image */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

function resolveImageUrl(image: string | undefined, base: string): string {
  if (!image) return `${base}/images/logo.png`;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${base}${image.startsWith("/") ? image : `/${image}`}`;
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
  const title = seo.title;
  const description = seo.description;
  const ogImage = resolveImageUrl(options.image, base);
  const ogAlt = options.imageAlt || site.companyName;

  return {
    // absolute avoids layout template doubling (e.g. "... | Brand | Brand")
    title: { absolute: title },
    description,
    keywords: seo.keywords,
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    publisher: site.legalName,
    category: "finance",
    metadataBase: new URL(site.website),
    alternates: {
      canonical: path === "" ? "/" : path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.companyName,
      locale: "en_US",
      type: options.type || "website",
      images: [
        {
          url: ogImage,
          width: options.imageWidth ?? 1200,
          height: options.imageHeight ?? 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
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
  };
}

export function absoluteUrl(path: string): string {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
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
