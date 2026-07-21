import Link from "next/link";
import MortgageCalculator from "@/components/MortgageCalculator";

type HeadingLevel = "h1" | "h2";

const headingClass =
  "mb-3 font-montserrat text-3xl font-bold tracking-tight text-foreground sm:mb-4 md:text-4xl lg:text-5xl";

function CalculatorHeading({ level }: { level: HeadingLevel }) {
  const HeadingTag = level;
  return <HeadingTag className={headingClass}>Mortgage Calculator</HeadingTag>;
}

export function MortgageCalculatorSection({
  headingLevel = "h1",
}: {
  headingLevel?: HeadingLevel;
}) {
  return (
    <div className="w-full">
      {/* Hero header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <CalculatorHeading level={headingLevel} />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Model principal and interest, taxes, insurance, PMI, extra payments,
            and amortization. For a personalized quote, meet our team.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <MortgageCalculator />
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-gray-100 bg-muted/30 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Have questions about your numbers?
        </p>
        <p className="mt-1 text-base font-semibold text-foreground">
          Our loan officers can walk you through every line item.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/team"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:w-auto"
          >
            Find a Loan Officer
          </Link>

          <Link
            href="/apply"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 active:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40 sm:w-auto"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}