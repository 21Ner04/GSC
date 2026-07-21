import type { Metadata } from "next";
import type { SeoMeta } from "@/lib/cms/types";
import { getSite } from "@/lib/cms";

/** Build consistent Metadata for any page (titles, OG, Twitter, robots). */
export function buildPageMetadata(
  seo: SeoMeta,
  options: {
    path: string;
    type?: "website" | "article";
    noIndex?: boolean;
  }
): Metadata {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");
  const url = `${base}${options.path.startsWith("/") ? options.path : `/${options.path}`}`;
  const title = seo.title;
  const description = seo.description;
  const ogImage = `${base}/images/logo.png`;

  return {
    title,
    description,
    keywords: seo.keywords,
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    publisher: site.legalName,
    alternates: {
      canonical: options.path,
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
          width: 512,
          height: 512,
          alt: site.companyName,
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
