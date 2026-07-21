import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllLocationsAsync } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    {
      title: "Mortgage Broker Locations | NY, NJ, FL, PA",
      description:
        "Green Street Capital mortgage services by location: New York, NYC, Brooklyn, Manhattan, New Jersey, Florida, and Pennsylvania. Licensed NMLS #2066586.",
      keywords: [
        "mortgage broker locations",
        "mortgage broker New York",
        "mortgage broker New Jersey",
        "mortgage broker Florida",
        "mortgage broker Pennsylvania",
        "mortgage broker Brooklyn",
      ],
    },
    { path: "/locations" }
  );
}

export default async function LocationsIndex() {
  const locations = await getAllLocationsAsync();

  return (
    <div className="w-full pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Locations" },
        ]}
      />
      <div className="border-b border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            Locations We Serve
          </h1>
          <p className="text-lg text-muted-foreground">
            Licensed mortgage brokerage services in New York, New Jersey, Florida, and
            Pennsylvania — find local guidance for purchase, refinance, and specialty programs.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}`}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-bold text-foreground">{loc.hero.heading}</h2>
            <p className="line-clamp-3 text-sm text-muted-foreground">{loc.hero.subheading}</p>
            <p className="mt-4 text-sm font-medium text-primary">View page →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
