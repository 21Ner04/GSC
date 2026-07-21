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
        disallow: ["/api/", "/api/*"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
