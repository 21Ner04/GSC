import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Contact Green Street Capital | Brooklyn Mortgage Broker",
    description:
      "Contact Green Street Capital, LLC in Brooklyn, NY. Local 718-615-4545, toll-free 855-615-4545, Info@GSCMortgage.com. NMLS #2066586.",
    keywords: [
      "contact mortgage broker",
      "Green Street Capital phone",
      "Brooklyn mortgage office",
    ],
  },
  { path: "/contact" }
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
