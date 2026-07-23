import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  BreadcrumbJsonLd,
  CollectionItemListJsonLd,
} from "@/components/seo/JsonLd";
import { getAllLocationsAsync, getSite } from "@/lib/cms";
import { LOCAL_SEARCH_INTENTS } from "@/lib/seo/related";
import { buildPageMetadata } from "@/lib/seo/metadata";

const locationsSeo = {
  title: "Mortgage Broker Near Me | NY NJ FL PA Locations | GSC",
  description:
    "Find a mortgage broker near you: Brooklyn, NYC, Manhattan, Queens, Long Island, Westchester, New Jersey, Florida & Pennsylvania. Free consult. NMLS #2066586.",
  keywords: [
    "mortgage broker near me",
    "mortgage broker locations",
    "mortgage broker New York",
    "mortgage broker Brooklyn",
    "mortgage broker New Jersey",
    "mortgage broker Florida",
    "mortgage broker Pennsylvania",
    "home loans near me",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(locationsSeo, { path: "/locations" });
}

export default async function LocationsIndex() {
  const locations = await getAllLocationsAsync();
  const site = getSite();
  const localIntents = LOCAL_SEARCH_INTENTS.filter((i) =>
    i.href.startsWith("/locations")
  );

  return (
    <div className="w-full pb-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ]}
      />
      <CollectionItemListJsonLd
        name={locationsSeo.title}
        description={locationsSeo.description}
        path="/locations"
        items={locations.map((loc) => ({
          name: loc.hero.heading,
          urlPath: `/locations/${loc.slug}`,
          description: loc.hero.subheading || loc.seo.description,
        }))}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Locations" }]}
      />

      <div className="border-b border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
            Licensed mortgage broker · NMLS #{site.nmls}
          </p>
          <h1 className="mb-4 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            Mortgage Broker Near You — Cities & States We Serve
          </h1>
          <p className="text-lg text-muted-foreground">
            Searching for a <strong>mortgage broker near me</strong>, home loans in your city, or
            refinance nearby? Green Street Capital is a licensed broker serving{" "}
            {site.statesServed.join(", ")} with local pages for the markets people search most.
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
            {loc.serviceAreas && loc.serviceAreas.length > 0 && (
              <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
                Areas: {loc.serviceAreas.slice(0, 6).join(", ")}
                {loc.serviceAreas.length > 6 ? "…" : ""}
              </p>
            )}
            <p className="mt-4 text-sm font-medium text-primary">View local page →</p>
          </Link>
        ))}
      </div>

      <section className="border-t border-gray-100 bg-muted/40 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-4 text-center font-montserrat text-2xl font-bold">
            Popular local mortgage searches
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            People often find us with searches like these — each links to a dedicated page built for
            that intent.
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {localIntents.map((item) => (
              <li key={item.query}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-foreground shadow-sm transition hover:border-primary hover:text-primary"
                >
                  {item.query}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Also explore{" "}
            <Link href="/specialties" className="font-medium text-primary hover:underline">
              specialty programs
            </Link>
            ,{" "}
            <Link href="/purchase" className="font-medium text-primary hover:underline">
              purchase loans
            </Link>
            ,{" "}
            <Link href="/refinance" className="font-medium text-primary hover:underline">
              refinance
            </Link>
            , or{" "}
            <Link href="/schedule" className="font-medium text-primary hover:underline">
              schedule a free call
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
