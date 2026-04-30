import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";
import UserWayWidget from "@/components/UserWayWidget";

export const metadata: Metadata = {
  title: "Green Street Capital | Mortgage Broker Brooklyn NY & NJ | Purchase & Refinance",
  description: "Green Street Capital, LLC — trusted mortgage broker serving NY, NJ, FL, PA. Purchase, refinance, FHA, VA, Jumbo loans. Fast approvals, competitive rates. NMLS #2066586.",
  keywords: ["mortgage broker", "home loans", "refinance", "FHA loans", "VA loans", "Brooklyn", "New York", "New Jersey", "Florida", "Pennsylvania", "Green Street Capital"],
  openGraph: {
    title: "Green Street Capital | Trusted Mortgage Broker",
    description: "Expert mortgage solutions for home purchase and refinancing. Serving NY, NJ, FL, PA with competitive rates and fast approvals.",
    type: "website",
    url: "https://www.greenstreetcapitalgroup.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IntroAnimation />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
        <UserWayWidget />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #userway-widget,
              .userway-widget-wrapper,
              [class*="userway"],
              div[id*="userway"],
              button[class*="userway"] {
                position: fixed !important;
                bottom: 7px !important;
                right: 20px !important;
                top: auto !important;
                left: auto !important;
                z-index: 999 !important;
                transform: none !important;
              }
              .userway-widget-trigger {
                position: fixed !important;
                bottom: 7px !important;
                right: 20px !important;
                top: auto !important;
                left: auto !important;
                z-index: 999 !important;
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
