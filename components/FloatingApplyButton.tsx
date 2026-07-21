"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { getSite } from "@/lib/cms";

/**
 * Persistent Apply Now CTA.
 * Positioned bottom-left so it does not cover the UserWay widget (bottom-right).
 */
export function FloatingApplyButton() {
  const site = getSite();

  return (
    <Link
      href={site.applyPath}
      className="
        fixed z-[90]
        bottom-[max(1rem,env(safe-area-inset-bottom))]
        left-[max(1rem,env(safe-area-inset-left))]
        flex items-center gap-2
        rounded-full bg-primary px-4 py-3
        text-sm font-semibold text-white shadow-lg
        transition hover:bg-primary/90 hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        sm:bottom-6 sm:left-6 sm:px-5 sm:py-3.5 sm:text-base
      "
      aria-label="Apply Now — choose a loan officer"
    >
      <FileText className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
      <span>Apply Now</span>
    </Link>
  );
}
