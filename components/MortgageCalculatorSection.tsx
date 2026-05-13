import { MortgageCalculator } from "@/components/MortgageCalculator";

type HeadingLevel = "h1" | "h2";

const headingClass =
  "mb-3 font-montserrat text-3xl font-bold tracking-tight text-foreground sm:mb-4 md:text-4xl lg:text-5xl";

function CalculatorHeading({ level }: { level: HeadingLevel }) {
  if (level === "h2") {
    return <h2 className={headingClass}>Mortgage Calculator</h2>;
  }
  return <h1 className={headingClass}>Mortgage Calculator</h1>;
}

export function MortgageCalculatorSection({
  headingLevel = "h1",
}: {
  headingLevel?: HeadingLevel;
}) {
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <CalculatorHeading level={headingLevel} />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Model principal and interest, taxes, insurance, PMI, extra payments,
            and amortization. For a personalized quote, meet our team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <MortgageCalculator />
      </div>
    </div>
  );
}
