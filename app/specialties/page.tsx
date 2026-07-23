import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  BreadcrumbJsonLd,
  CollectionItemListJsonLd,
} from "@/components/seo/JsonLd";
import { getAllSpecialtiesAsync, getSite } from "@/lib/cms";
import { LOCAL_SEARCH_INTENTS } from "@/lib/seo/related";
import { buildPageMetadata } from "@/lib/seo/metadata";

const specialtiesSeo = {
  title: "Mortgage Programs Near Me | Non-QM, DSCR, FTHB | GSC",
  description:
    "Specialty mortgages near you: Non-QM, bank statement, DSCR, self-employed, first-time buyers, truck drivers, ITIN. NY, NJ, FL, PA. NMLS #2066586.",
  keywords: [
    "Non-QM loans near me",
    "bank statement mortgage",
    "DSCR loans",
    "mortgage for self-employed",
    "first-time homebuyer programs",
    "truck driver mortgage",
    "ITIN mortgage",
    "specialty mortgage programs",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(specialtiesSeo, { path: "/specialties" });
}

export default async function SpecialtiesIndex() {
  const items = await getAllSpecialtiesAsync();
  const site = getSite();
  const programIntents = LOCAL_SEARCH_INTENTS.filter(
    (i) => i.href.startsWith("/specialties") || i.href === "/calculator"
  );

  return (
    <div className="w-full pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
        ]}
      />
      <CollectionItemListJsonLd
        name={specialtiesSeo.title}
        description={specialtiesSeo.description}
        path="/specialties"
        items={items.map((item) => ({
          name: item.hero.heading,
          urlPath: `/specialties/${item.slug}`,
          description: item.hero.subheading || item.seo.description,
        }))}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Specialties" }]}
      />

      <div className="border-b border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
            Specialty mortgage programs · NMLS #{site.nmls}
          </p>
          <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            Mortgage Programs for Real Situations
          </h1>
          <p className="text-lg text-muted-foreground">
            Banks often say no when income is 1099, bank-statement based, or investment-driven.
            Green Street Capital compares{" "}
            <strong>Non-QM, DSCR, self-employed, first-time buyer</strong>, and other specialty
            mortgages across {site.statesServed.join(", ")}.
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
            <p className="mt-4 text-sm font-medium text-primary">View program →</p>
          </Link>
        ))}
      </div>

      <section className="border-t border-gray-100 bg-muted/40 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-4 text-center font-montserrat text-2xl font-bold">
            What people search when they need specialty loans
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            {programIntents.map((item) => (
              <li key={item.query}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm transition hover:border-primary hover:text-primary"
                >
                  {item.query}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Also see{" "}
            <Link href="/locations" className="font-medium text-primary hover:underline">
              city & state pages
            </Link>{" "}
            or{" "}
            <Link href="/schedule" className="font-medium text-primary hover:underline">
              book a free consultation
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
