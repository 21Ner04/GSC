import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Loan Programs | Conventional, FHA, VA, Jumbo & More",
    description:
      "Explore mortgage loan programs: conventional, FHA, VA, USDA, jumbo, and investment property financing with Green Street Capital NMLS #2066586.",
    keywords: [
      "mortgage loan programs",
      "FHA loans",
      "VA loans",
      "conventional mortgage",
      "jumbo loans",
    ],
  },
  { path: "/loan-programs" }
);

const PROGRAMS = [
  {
    id: "conventional",
    name: "Conventional Loans",
    desc: "The most common type of mortgage. Not guaranteed by the government, usually requiring a higher credit score and down payments starting as low as 3%.",
  },
  {
    id: "fha",
    name: "FHA Loans",
    desc: "Backed by the Federal Housing Administration. Popular among first-time buyers due to lower credit score requirements and a 3.5% minimum down payment.",
  },
  {
    id: "va",
    name: "VA Loans",
    desc: "Exclusive to veterans, active-duty service members, and eligible surviving spouses. Offers 0% down payment and no private mortgage insurance (PMI).",
  },
  {
    id: "usda",
    name: "USDA Loans",
    desc: "Designed for rural and suburban homebuyers. Backed by the US Department of Agriculture, offering 0% down payment options.",
  },
  {
    id: "jumbo",
    name: "Jumbo Loans",
    desc: "For purchasing high-value properties that exceed the conforming loan limits set by the FHFA. Requires stronger credit and larger reserves.",
  },
  {
    id: "investment",
    name: "Investment Properties",
    desc: "Specialized financing for non-owner occupied properties, including DSCR loans that use rental income to qualify instead of personal income.",
  },
];

export default function LoanPrograms() {
  return (
    <div className="w-full overflow-x-hidden pb-20 sm:pb-24">
      <div className="page-hero relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="page-hero-title">Loan Programs</h1>
          <p className="page-hero-sub">
            Discover the right financing solution for your unique needs.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="card-stable group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl sm:p-6 md:p-8"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10 sm:mb-6 sm:h-12 sm:w-12">
                <ChevronRight className="h-5 w-5 text-foreground transition-colors group-hover:text-primary sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground sm:mb-4 sm:text-2xl">
                {prog.name}
              </h3>
              <p className="flex-grow text-sm leading-relaxed text-muted-foreground sm:text-base">
                {prog.desc}
              </p>
              <div className="mt-6 border-t border-gray-100 pt-5 sm:mt-8 sm:pt-6">
                <Link href="/team" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                  >
                    Apply for {prog.name.split(" ")[0]}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="card-stable mt-12 rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center sm:mt-16 sm:rounded-3xl sm:p-8 md:mt-20 md:p-10">
          <h2 className="mb-3 font-montserrat text-xl font-bold text-foreground sm:mb-4 sm:text-2xl">
            Not sure which program is right for you?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-muted-foreground sm:mb-8 sm:text-base">
            Contact us to discuss your goals and we&apos;ll match you with the perfect loan product.
          </p>
          <Link href="/team" className="inline-flex w-full max-w-sm sm:w-auto sm:max-w-none">
            <Button size="lg" className="w-full sm:w-auto">
              Contact an Advisor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
