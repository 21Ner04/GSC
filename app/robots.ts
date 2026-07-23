import type { MetadataRoute } from "next";
import { getSite } from "@/lib/cms";

export default function robots(): MetadataRoute.Robots {
  const site = getSite();
  const base = site.website.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/api/*",
          // Next internals / previews if ever exposed
          "/_next/static/chunks/",
        ],
      },
      {
        // Allow major crawlers fully on public marketing pages
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/api/*"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/api/*"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
