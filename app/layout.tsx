import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://cdn.userway.org/widget.js";
                fjs.parentNode.insertBefore(js, fjs);
              })(document, "script", "userway-widget-js");
              var userway = userway || {};
              userway.account = "greenstreetcapital";
              userway.position = "bottom_right";
              userway.color = "blue";
              userway.size = "small";
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #userway-widget,
              .userway-widget-wrapper,
              [class*="userway"],
              div[id*="userway"],
              button[class*="userway"] {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                top: auto !important;
                left: auto !important;
                z-index: 999 !important;
                transform: none !important;
              }
              .userway-widget-trigger {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                top: auto !important;
                left: auto !important;
                z-index: 999 !important;
              }
            `,
          }}
        />
        <IntroAnimation />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
