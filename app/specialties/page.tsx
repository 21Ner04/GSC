import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllSpecialtiesAsync } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    {
      title: "Mortgage Specialties & Programs",
      description:
        "Specialized mortgage programs: truck drivers, self-employed, bank statement, DSCR, first-time buyers, ITIN, foreign national, Non-QM, and more. Green Street Capital NMLS #2066586.",
      keywords: [
        "Non-QM loans",
        "bank statement mortgage",
        "DSCR loans",
        "mortgage for self-employed",
        "first-time homebuyer programs",
        "truck driver mortgage",
      ],
    },
    { path: "/specialties" }
  );
}

export default async function SpecialtiesIndex() {
  const items = await getAllSpecialtiesAsync();

  return (
    <div className="w-full pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Specialties" },
        ]}
      />
      <div className="border-b border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            Mortgage Specialties
          </h1>
          <p className="text-lg text-muted-foreground">
            Programs tailored to real borrower situations — not one-size-fits-all banking.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/specialties/${item.slug}`}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-bold text-foreground">{item.hero.heading}</h2>
            <p className="line-clamp-3 text-sm text-muted-foreground">{item.hero.subheading}</p>
            <p className="mt-4 text-sm font-medium text-primary">View page →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
