import type { Metadata } from "next";
import { SchedulePageJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Schedule a Call | Free Mortgage Consultation",
    description:
      "Book a free 15-minute mortgage consultation with Green Street Capital. Phone or video. Licensed in NY, NJ, FL & PA. NMLS #2066586.",
    keywords: [
      "schedule mortgage consultation",
      "book loan officer call",
      "mortgage appointment Brooklyn",
      "free mortgage consultation",
    ],
  },
  { path: "/schedule" }
);

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchedulePageJsonLd />
      {children}
    </>
  );
}
