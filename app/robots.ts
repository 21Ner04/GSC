import type { MetadataRoute } from "next";
import { getSite } from "@/lib/cms";

export default function robots(): MetadataRoute.Robots {
  const site = getSite();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.website}/sitemap.xml`,
  };
}
