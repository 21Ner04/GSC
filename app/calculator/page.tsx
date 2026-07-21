import type { Metadata } from "next";
import { MortgageCalculatorSection } from "@/components/MortgageCalculatorSection";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Mortgage Calculator | Payment, Taxes, HOA, PMI & Schedule",
    description:
      "Free mortgage calculator: principal & interest, property taxes, insurance, HOA, PMI, amortization schedule, extra payments, and estimated interest savings.",
    keywords: [
      "mortgage calculator",
      "monthly payment calculator",
      "amortization schedule",
      "PMI calculator",
    ],
  },
  { path: "/calculator" }
);

export default function CalculatorPage() {
  return (
    <div className="w-full pb-16 sm:pb-24">
      <MortgageCalculatorSection headingLevel="h1" />
    </div>
  );
}
