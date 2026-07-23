import type { MetadataRoute } from "next";
import {
  getHomepage,
  getLocationSlugsAsync,
  getSiteAsync,
  getSpecialtySlugsAsync,
} from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteAsync();
  const base = site.website.replace(/\/$/, "");
  const home = getHomepage();
  const heroImage = home.hero?.image
    ? `${base}${home.hero.image.startsWith("/") ? home.hero.image : `/${home.hero.image}`}`
    : `${base}/images/logo.png`;

  const staticPaths: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    images?: string[];
  }[] = [
    {
      path: "",
      priority: 1,
      changeFrequency: "weekly",
      images: [heroImage, `${base}/images/logo.png`],
    },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
    { path: "/calculator", priority: 0.85, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/links", priority: 0.45, changeFrequency: "monthly" },
    { path: "/loan-programs", priority: 0.9, changeFrequency: "monthly" },
    { path: "/purchase", priority: 0.9, changeFrequency: "monthly" },
    { path: "/refinance", priority: 0.9, changeFrequency: "monthly" },
    { path: "/schedule", priority: 0.8, changeFrequency: "monthly" },
    { path: "/team", priority: 0.85, changeFrequency: "weekly" },
    { path: "/video-blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/success-stories", priority: 0.7, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.95, changeFrequency: "weekly" },
    { path: "/specialties", priority: 0.95, changeFrequency: "weekly" },
  ];

  const [locationSlugs, specialtySlugs] = await Promise.all([
    getLocationSlugsAsync(),
    getSpecialtySlugsAsync(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(
    ({ path, priority, changeFrequency, images }) => ({
      url: path ? `${base}${path}` : base,
      lastModified: now,
      changeFrequency,
      priority,
      ...(images?.length ? { images } : {}),
    })
  );

  const locationEntries: MetadataRoute.Sitemap = locationSlugs.map((s) => ({
    url: `${base}/locations/${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    // Local SEO pages are high-value
    priority:
      ["brooklyn", "new-york-city", "manhattan", "queens", "long-island", "new-jersey"].includes(s)
        ? 0.92
        : 0.86,
  }));

  const specialtyEntries: MetadataRoute.Sitemap = specialtySlugs.map((s) => ({
    url: `${base}/specialties/${s}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.88,
  }));

  return [...staticEntries, ...locationEntries, ...specialtyEntries];
}
