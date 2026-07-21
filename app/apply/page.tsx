import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";
import { getSite } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Apply Now | Choose a Loan Officer",
  description:
    "Start your mortgage application by selecting a Green Street Capital loan officer. You will continue to their personal application link.",
  alternates: { canonical: "/apply" },
};

/**
 * TZ #7: general Apply Now first goes to loan officer selection,
 * then to that officer’s personal application link (on Team page).
 */
export default function Apply() {
  const site = getSite();

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-muted py-24">
      <div className="mx-4 w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-4 font-montserrat text-3xl font-bold">Apply Now</h1>
        <p className="mb-8 text-muted-foreground">
          Choose a loan officer first. After you select someone on the Team page,
          you will continue to their personal application link.
        </p>
        <div className="space-y-4">
          <Link href={site.teamPath} className="block">
            <Button size="lg" className="w-full gap-2">
              <Users className="h-5 w-5" />
              Select Loan Officer
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full text-muted-foreground">
              Return Home
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          {site.legalName} · NMLS #{site.nmls}
        </p>
      </div>
    </div>
  );
}
