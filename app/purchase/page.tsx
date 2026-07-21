import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home as HomeIcon, Key, PiggyBank } from "lucide-react";

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Purchase a Home | Mortgage Loans NY, NJ, FL, PA",
    description:
      "Home purchase mortgage options with Green Street Capital: conventional, FHA, VA, jumbo, and specialty programs. Get pre-approved with a licensed loan officer.",
    keywords: [
      "home purchase mortgage",
      "buy a house loan",
      "pre-approval mortgage",
      "FHA purchase loan",
    ],
  },
  { path: "/purchase" }
);

export default function Purchase() {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 bg-white py-20 text-center md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 font-montserrat text-4xl font-bold text-foreground md:text-6xl">
            Purchase a Home
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            From pre-approval to the closing table, we make buying your dream
            home simple and stress-free.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-foreground">Your First Step to Homeownership</h2>
            <p className="text-lg text-muted-foreground mb-6">Buying a home is one of the most significant financial decisions you'll ever make. Having the right team by your side ensures you get the best terms and close on time.</p>
            <p className="text-lg text-muted-foreground mb-8">At Green Street Capital, we offer a wide variety of purchase loans tailored to first-time buyers, move-up buyers, and investors.</p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/team"><Button size="lg">Apply Now</Button></Link>
              <Link href="/team"><Button variant="outline" size="lg">Schedule Consultation</Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-muted p-6 rounded-2xl">
              <PiggyBank className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Down Payment Options</h3>
              <p className="text-sm text-muted-foreground">Programs available with as little as 0% to 3% down.</p>
            </div>
            <div className="bg-muted p-6 rounded-2xl">
              <Key className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-bold text-lg mb-2">First-Time Buyers</h3>
              <p className="text-sm text-muted-foreground">Specialized guidance and grants for your first purchase.</p>
            </div>
            <div className="bg-muted p-6 rounded-2xl">
              <HomeIcon className="w-10 h-10 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">Pre-Approvals</h3>
              <p className="text-sm text-muted-foreground">Shop with confidence knowing your exact budget.</p>
            </div>
            <div className="bg-primary/10 p-6 rounded-2xl border border-primary/20">
              <CheckCircle2 className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Fast Closings</h3>
              <p className="text-sm text-muted-foreground">On-time closings with dedicated processing support.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-montserrat font-bold mb-12 text-center text-foreground">The Purchase Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
            {[
              { step: "01", title: "Pre-Qualification", desc: "A quick review of your financials to estimate what you can afford." },
              { step: "02", title: "Pre-Approval", desc: "Verified documentation yielding a firm commitment letter for sellers." },
              { step: "03", title: "Property Search", desc: "Find your home and submit an offer backed by our pre-approval." },
              { step: "04", title: "Closing", desc: "Final underwriting, clear to close, and getting your keys!" },
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-6 shadow-lg">{s.step}</div>
                <h3 className="font-bold text-xl mb-3 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
