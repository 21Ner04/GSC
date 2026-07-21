import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";
import { FloatingApplyButton } from "@/components/FloatingApplyButton";
import UserWayWidget from "@/components/UserWayWidget";
import {
  AggregateRatingJsonLd,
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/JsonLd";
import { getHomepage, getSite } from "@/lib/cms";

const site = getSite();
const home = getHomepage();
const base = site.website.replace(/\/$/, "");
const ogImage = home.hero?.image
  ? `${base}${home.hero.image.startsWith("/") ? home.hero.image : `/${home.hero.image}`}`
  : `${base}/images/logo.png`;

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
  applicationName: site.companyName,
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    apple: [{ url: "/images/logo.png" }],
    shortcut: ["/images/logo.png"],
  },
  openGraph: {
    title: home.seo.title,
    description: home.seo.description,
    type: "website",
    url: site.website,
    siteName: site.companyName,
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: home.hero?.imageAlt || site.companyName,
      },
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
    images: [ogImage],
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
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION or use env in production
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <AggregateRatingJsonLd />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Market updates proxy"
          href="/api/market-updates"
        />
      </head>
      <body suppressHydrationWarning>
        <IntroAnimation />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="w-full min-w-0 flex-1 overflow-x-hidden pb-16 sm:pb-0">
            {children}
          </main>
          <Footer />
        </div>
        <FloatingApplyButton />
        <UserWayWidget />
      </body>
    </html>
  );
}
