import type { Metadata } from "next";
import { MortgageCalculatorSection } from "@/components/MortgageCalculatorSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  BreadcrumbJsonLd,
  CalculatorJsonLd,
  WebPageJsonLd,
} from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";

const calcSeo = {
  title: "Mortgage Calculator | Payment, Taxes, HOA, PMI & Schedule",
  description:
    "Free mortgage calculator: principal & interest, property taxes, insurance, HOA, PMI, amortization schedule, extra payments, and interest savings. Green Street Capital.",
  keywords: [
    "mortgage calculator",
    "monthly payment calculator",
    "amortization schedule",
    "PMI calculator",
    "mortgage calculator New York",
  ],
};

export const metadata: Metadata = buildPageMetadata(calcSeo, {
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <div className="w-full pb-16 sm:pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Mortgage Calculator", path: "/calculator" },
        ]}
      />
      <WebPageJsonLd
        name={calcSeo.title}
        description={calcSeo.description}
        path="/calculator"
      />
      <CalculatorJsonLd />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Mortgage Calculator" },
        ]}
      />
      <MortgageCalculatorSection headingLevel="h1" />
    </div>
  );
}
