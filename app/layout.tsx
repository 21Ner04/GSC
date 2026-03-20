import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation } from "@/components/IntroAnimation";

export const metadata: Metadata = {
  title: "Green Street Capital | Mortgage Broker Brooklyn NY",
  description: "Green Street Capital — trusted mortgage broker in Brooklyn, NY. Purchase, refinance, FHA, VA, Jumbo loans. Ruslan Kushnir NMLS #71488.",
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
      </body>
    </html>
  );
}
