import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";
import { FloatingApplyButton } from "@/components/FloatingApplyButton";
import UserWayWidget from "@/components/UserWayWidget";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { getHomepage, getSite } from "@/lib/cms";

const site = getSite();
const home = getHomepage();
const base = site.website.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: {
    default: home.seo.title,
    template: `%s | ${site.companyName}`,
  },
  description: home.seo.description,
  keywords: home.seo.keywords,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "finance",
  openGraph: {
    title: home.seo.title,
    description: home.seo.description,
    type: "website",
    url: site.website,
    siteName: site.companyName,
    locale: "en_US",
    images: [
      {
        url: `${base}/images/logo.png`,
        width: 512,
        height: 512,
        alt: site.companyName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: home.seo.title,
    description: home.seo.description,
    images: [`${base}/images/logo.png`],
  },
  robots: {
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
  alternates: {
    canonical: "/",
  },
  verification: {
    // Add when available:
    // google: "your-google-search-console-token",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <link rel="alternate" type="application/rss+xml" title="Market updates proxy" href="/api/market-updates" />
      </head>
      <body suppressHydrationWarning>
        <IntroAnimation />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingApplyButton />
        <UserWayWidget />
      </body>
    </html>
  );
}
