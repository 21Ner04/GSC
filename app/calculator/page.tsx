import type { Metadata } from "next";
import { MortgageCalculatorSection } from "@/components/MortgageCalculatorSection";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Green Street Capital",
  description:
    "Estimate monthly payment, taxes, insurance, PMI, amortization, and payoff savings with extra principal and prepayments.",
};

export default function CalculatorPage() {
  return (
    <div className="w-full pb-16 sm:pb-24">
      <MortgageCalculatorSection headingLevel="h1" />
    </div>
  );
}
