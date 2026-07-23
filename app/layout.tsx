import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: {
    default: home.seo.title,
    template: `%s | ${site.companyName}`,
  },
  description: home.seo.description,
  keywords: [
    ...(home.seo.keywords || []),
    site.companyName,
    "mortgage broker Brooklyn",
    "NMLS " + site.nmls,
  ],
  authors: [{ name: site.legalName, url: base }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "finance",
  classification: "Mortgage Brokerage",
  applicationName: site.companyName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/images/logo.png", sizes: "180x180" }],
    shortcut: ["/images/logo.png"],
  },
  manifest: "/manifest.webmanifest",
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
    images: [{ url: ogImage, alt: home.hero?.imageAlt || site.companyName }],
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
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
  },
  other: {
    "geo.region": "US-NY",
    "geo.placename": "Brooklyn",
    "geo.position": "40.5905934;-73.9602968",
    ICBM: "40.5905934, -73.9602968",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <AggregateRatingJsonLd />
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.companyName} market updates`}
          href="/api/market-updates"
        />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg"
        >
          Skip to main content
        </a>
        <IntroAnimation />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main
            id="main-content"
            className="w-full min-w-0 flex-1 overflow-x-hidden pb-16 sm:pb-0"
            tabIndex={-1}
          >
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
