import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";
import { getSite } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Apply Now | Choose a Loan Officer",
    description:
      "Start your mortgage application with Green Street Capital. Select a licensed loan officer on our team page and continue to their secure application. NMLS #2066586.",
    keywords: [
      "apply for mortgage",
      "mortgage application",
      "loan officer application",
      "Green Street Capital apply",
      "online mortgage application NY",
    ],
  },
  { path: "/apply" }
);

/**
 * TZ #7: general Apply Now first goes to loan officer selection,
 * then to that officer’s personal application link (on Team page).
 */
export default function Apply() {
  const site = getSite();

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-muted px-4 py-16 sm:py-24">
      <div className="card-stable w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-xl sm:rounded-3xl sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:mb-6 sm:h-20 sm:w-20">
          <FileText className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
        </div>
        <h1 className="mb-3 font-montserrat text-2xl font-bold sm:mb-4 sm:text-3xl">
          Apply Now
        </h1>
        <p className="mb-6 text-sm text-muted-foreground sm:mb-8 sm:text-base">
          Choose a loan officer first. After you select someone on the Team page, you will continue
          to their personal application link.
        </p>
        <div className="space-y-3 sm:space-y-4">
          <Link href={site.teamPath} className="block w-full">
            <Button size="lg" className="w-full gap-2">
              <Users className="h-5 w-5 shrink-0" />
              Select Loan Officer
            </Button>
          </Link>
          <Link href="/" className="block w-full">
            <Button variant="ghost" className="w-full text-muted-foreground">
              Return Home
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground sm:mt-8">
          {site.legalName} · NMLS #{site.nmls}
        </p>
      </div>
    </div>
  );
}
