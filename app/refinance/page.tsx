import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingDown, Coins, CalendarDays, RefreshCw } from "lucide-react";

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Refinance Your Mortgage | Rate & Cash-Out Options",
    description:
      "Refinance with Green Street Capital: lower your rate, shorten your term, or access equity with cash-out options. Serving NY, NJ, FL, PA. NMLS #2066586.",
    keywords: [
      "refinance mortgage",
      "rate and term refinance",
      "cash out refinance",
      "lower mortgage rate",
    ],
  },
  { path: "/refinance" }
);

export default function Refinance() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-hero">
        <div className="mx-auto max-w-7xl">
          <h1 className="page-hero-title">Refinance Your Home</h1>
          <p className="page-hero-sub">
            Lower your payments, shorten your term, or access your home&apos;s equity.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl">
            Is it the right time to refinance?
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Refinancing replaces your current mortgage with a new one, often with better terms. We
            can run the numbers to see if it makes sense for you.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:mb-16 sm:gap-8 md:grid-cols-2 md:gap-10 lg:mb-20 lg:gap-12">
          <div className="card-stable rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8 md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 sm:mb-8 sm:h-16 sm:w-16">
              <RefreshCw className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
            </div>
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">Rate & Term Refinance</h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:mb-6 sm:text-base">
              The most common type of refinance. Secure a lower interest rate, change the loan
              duration, or switch from an adjustable to a fixed rate.
            </p>
            <ul className="mb-6 space-y-3 sm:mb-8">
              <li className="flex items-center text-sm font-medium">
                <TrendingDown className="mr-3 h-5 w-5 shrink-0 text-primary" /> Lower monthly
                payments
              </li>
              <li className="flex items-center text-sm font-medium">
                <CalendarDays className="mr-3 h-5 w-5 shrink-0 text-primary" /> Pay off loan faster
              </li>
            </ul>
            <Link href="/team" className="block w-full">
              <Button className="w-full">Explore Rate & Term</Button>
            </Link>
          </div>

          <div className="card-stable rounded-2xl bg-foreground p-6 text-white shadow-xl sm:rounded-3xl sm:p-8 md:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 sm:mb-8 sm:h-16 sm:w-16">
              <Coins className="h-7 w-7 text-white sm:h-8 sm:w-8" />
            </div>
            <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">Cash-Out Refinance</h3>
            <p className="mb-5 text-sm leading-relaxed text-gray-300 sm:mb-6 sm:text-base">
              Tap into the equity you&apos;ve built in your home. A cash-out refinance replaces your
              mortgage with a larger loan, giving you the difference in cash.
            </p>
            <ul className="mb-6 space-y-3 sm:mb-8">
              <li className="flex items-center text-sm font-medium text-gray-200">
                <Coins className="mr-3 h-5 w-5 shrink-0 text-secondary" /> Fund home renovations
              </li>
              <li className="flex items-center text-sm font-medium text-gray-200">
                <RefreshCw className="mr-3 h-5 w-5 shrink-0 text-secondary" /> Consolidate
                high-interest debt
              </li>
            </ul>
            <Link href="/team" className="block w-full">
              <Button variant="secondary" className="w-full">
                Explore Cash-Out
              </Button>
            </Link>
          </div>
        </div>

        <div className="card-stable mx-auto max-w-4xl rounded-2xl bg-muted p-6 text-center sm:rounded-3xl sm:p-10 md:p-12">
          <h2 className="mb-3 font-montserrat text-xl font-bold text-foreground sm:mb-4 sm:text-2xl">
            Want to see how much you could save?
          </h2>
          <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
            Schedule a brief 15-minute call. We&apos;ll run a free, no-obligation cost-benefit
            analysis.
          </p>
          <Link href="/team" className="inline-flex w-full max-w-sm sm:w-auto sm:max-w-none">
            <Button size="lg" className="w-full px-8 sm:w-auto sm:px-12">
              Schedule a Free Analysis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
