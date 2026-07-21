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
    <div className="w-full overflow-x-hidden">
      <div className="page-hero">
        <div className="mx-auto max-w-7xl">
          <h1 className="page-hero-title">Purchase a Home</h1>
          <p className="page-hero-sub">
            From pre-approval to the closing table, we make buying your dream home simple and
            stress-free.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mb-14 grid grid-cols-1 items-center gap-10 lg:mb-24 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl">
              Your First Step to Homeownership
            </h2>
            <p className="mb-4 text-base text-muted-foreground sm:mb-6 sm:text-lg">
              Buying a home is one of the most significant financial decisions you&apos;ll ever
              make. Having the right team by your side ensures you get the best terms and close on
              time.
            </p>
            <p className="mb-6 text-base text-muted-foreground sm:mb-8 sm:text-lg">
              At Green Street Capital, we offer a wide variety of purchase loans tailored to
              first-time buyers, move-up buyers, and investors.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/team" className="block w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Apply Now
                </Button>
              </Link>
              <Link href="/team" className="block w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <div className="card-stable rounded-2xl bg-muted p-4 sm:p-6">
              <PiggyBank className="mb-3 h-8 w-8 text-primary sm:mb-4 sm:h-10 sm:w-10" />
              <h3 className="mb-1.5 text-sm font-bold sm:mb-2 sm:text-lg">Down Payment Options</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Programs available with as little as 0% to 3% down.
              </p>
            </div>
            <div className="card-stable rounded-2xl bg-muted p-4 sm:p-6">
              <Key className="mb-3 h-8 w-8 text-secondary sm:mb-4 sm:h-10 sm:w-10" />
              <h3 className="mb-1.5 text-sm font-bold sm:mb-2 sm:text-lg">First-Time Buyers</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Specialized guidance and grants for your first purchase.
              </p>
            </div>
            <div className="card-stable rounded-2xl bg-muted p-4 sm:p-6">
              <HomeIcon className="mb-3 h-8 w-8 text-accent sm:mb-4 sm:h-10 sm:w-10" />
              <h3 className="mb-1.5 text-sm font-bold sm:mb-2 sm:text-lg">Pre-Approvals</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Shop with confidence knowing your exact budget.
              </p>
            </div>
            <div className="card-stable rounded-2xl border border-primary/20 bg-primary/10 p-4 sm:p-6">
              <CheckCircle2 className="mb-3 h-8 w-8 text-primary sm:mb-4 sm:h-10 sm:w-10" />
              <h3 className="mb-1.5 text-sm font-bold sm:mb-2 sm:text-lg">Fast Closings</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                On-time closings with dedicated processing support.
              </p>
            </div>
          </div>
        </div>

        <div className="card-stable rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-10 lg:p-16">
          <h2 className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl">
            The Purchase Process
          </h2>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="absolute left-[10%] right-[10%] top-8 z-0 hidden h-0.5 bg-gray-200 md:block" />
            {[
              {
                step: "01",
                title: "Pre-Qualification",
                desc: "A quick review of your financials to estimate what you can afford.",
              },
              {
                step: "02",
                title: "Pre-Approval",
                desc: "Verified documentation yielding a firm commitment letter for sellers.",
              },
              {
                step: "03",
                title: "Property Search",
                desc: "Find your home and submit an offer backed by our pre-approval.",
              },
              {
                step: "04",
                title: "Closing",
                desc: "Final underwriting, clear to close, and getting your keys!",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-lg sm:mb-6 sm:h-16 sm:w-16 sm:text-xl">
                  {s.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground sm:mb-3 sm:text-xl">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
