import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Green Street Capital" },
  description:
    "This page does not exist. Explore mortgage programs, our team, or contact Green Street Capital.",
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for does not exist or was moved. Try one of these popular pages:
      </p>
      <div className="mb-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/purchase" className="text-primary underline-offset-2 hover:underline">
          Purchase
        </Link>
        <Link href="/refinance" className="text-primary underline-offset-2 hover:underline">
          Refinance
        </Link>
        <Link href="/locations" className="text-primary underline-offset-2 hover:underline">
          Locations
        </Link>
        <Link href="/specialties" className="text-primary underline-offset-2 hover:underline">
          Specialties
        </Link>
        <Link href="/team" className="text-primary underline-offset-2 hover:underline">
          Team
        </Link>
        <Link href="/calculator" className="text-primary underline-offset-2 hover:underline">
          Calculator
        </Link>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="outline">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
