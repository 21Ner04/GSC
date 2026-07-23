import type { Metadata } from "next";
import { ContactPageJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Contact Green Street Capital | Brooklyn Mortgage Broker",
    description:
      "Contact Green Street Capital in Brooklyn, NY. Office 718-615-4545, toll-free 855-615-4545, Info@GSCMortgage.com. Schedule a free consultation. NMLS #2066586.",
    keywords: [
      "contact mortgage broker",
      "Green Street Capital phone",
      "Brooklyn mortgage office",
      "mortgage broker Coney Island Ave",
    ],
  },
  { path: "/contact" }
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ContactPageJsonLd />
      {children}
    </>
  );
}
