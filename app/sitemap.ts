import type { MetadataRoute } from "next";
import {
  getLocationSlugsAsync,
  getSiteAsync,
  getSpecialtySlugsAsync,
} from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteAsync();
  const base = site.website.replace(/\/$/, "");

  const staticPaths: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
    { path: "/calculator", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/links", priority: 0.5, changeFrequency: "monthly" },
    { path: "/loan-programs", priority: 0.8, changeFrequency: "monthly" },
    { path: "/purchase", priority: 0.8, changeFrequency: "monthly" },
    { path: "/refinance", priority: 0.8, changeFrequency: "monthly" },
    { path: "/schedule", priority: 0.6, changeFrequency: "monthly" },
    { path: "/team", priority: 0.8, changeFrequency: "weekly" },
    { path: "/video-blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/success-stories", priority: 0.7, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.9, changeFrequency: "weekly" },
    { path: "/specialties", priority: 0.9, changeFrequency: "weekly" },
  ];

  const [locationSlugs, specialtySlugs] = await Promise.all([
    getLocationSlugsAsync(),
    getSpecialtySlugsAsync(),
  ]);

  const now = new Date();

  const staticEntries = staticPaths.map(({ path, priority, changeFrequency }) => ({
    url: path ? `${base}${path}` : base,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const locationEntries = locationSlugs.map((s) => ({
    url: `${base}/locations/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const specialtyEntries = specialtySlugs.map((s) => ({
    url: `${base}/specialties/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...locationEntries, ...specialtyEntries];
}
