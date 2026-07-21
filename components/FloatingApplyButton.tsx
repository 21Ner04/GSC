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
        bottom-[max(0.75rem,env(safe-area-inset-bottom))]
        left-[max(0.75rem,env(safe-area-inset-left))]
        flex max-w-[calc(100vw-5.5rem)] items-center gap-2
        rounded-full bg-primary px-3.5 py-2.5
        text-sm font-semibold text-white shadow-lg shadow-primary/25
        transition hover:bg-primary/90 hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        active:scale-[0.97]
        sm:bottom-6 sm:left-6 sm:max-w-none sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base
      "
      aria-label="Apply Now — choose a loan officer"
    >
      <FileText className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
      <span className="truncate">Apply Now</span>
    </Link>
  );
}
