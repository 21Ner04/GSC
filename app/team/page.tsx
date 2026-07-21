import type { Metadata } from "next";
import Link from "next/link";
import { TeamSignature } from "@/components/team/TeamSignature";
import { teamList } from "@/data/team";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata(
  {
    title: "Meet Our Team | Loan Officers | Green Street Capital",
    description:
      "Meet the Green Street Capital team of loan officers. Apply, send secure docs, or call directly. Serving NY, NJ, FL & PA. NMLS #2066586.",
    keywords: [
      "mortgage loan officer",
      "Maxim Saleh",
      "Paul Litvintsev",
      "Eric Kushnir",
      "Ruslan Kushnir",
      "Liliya Gluzman",
      "Gregory Chervonsky",
      "Green Street Capital team",
    ],
  },
  { path: "/team" }
);

export default function TeamPage() {
  return (
    <div className="w-full overflow-x-hidden pb-20 sm:pb-24">
      <div className="page-hero">
        <div className="mx-auto max-w-4xl">
          <h1 className="page-hero-title">Meet Our Team</h1>
          <p className="page-hero-sub">
            Choose a loan officer for applications and secure documents. Company contacts are on
            our{" "}
            <Link
              href="/contact"
              className="text-primary underline-offset-2 hover:underline"
            >
              Contact
            </Link>{" "}
            page.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* 1 col mobile → 2 tablet → 3 desktop · 14 signature cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
          {teamList.map((member, i) => (
            <div
              key={member.id || `${member.nmls}-${member.email}-${i}`}
              className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5"
            >
              <TeamSignature member={member} logoSrc="/images/logo.png" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
