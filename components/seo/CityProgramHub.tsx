import Link from "next/link";
import { getLocationNavLinks, getProgramNavLinks } from "@/lib/seo/related";

/**
 * Crawlable hub block for homepage — internal links to every
 * high-intent city and specialty page (helps rankings for related queries).
 */
export function CityProgramHub() {
  const locations = getLocationNavLinks();
  const programs = getProgramNavLinks();

  return (
    <section
      className="border-t border-gray-100 bg-muted/50 py-14 sm:py-16"
      aria-labelledby="seo-hub-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2
            id="seo-hub-heading"
            className="mb-3 font-montserrat text-2xl font-bold text-foreground sm:text-3xl"
          >
            Mortgage help by city & program
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Looking for a mortgage broker near you, or a specific loan type? Jump to a local page
            or specialty program — then book a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Cities & regions</h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {locations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40 hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">
              <Link href="/locations" className="font-medium text-primary hover:underline">
                View all locations →
              </Link>
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Loan types people search</h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {programs.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="block rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40 hover:text-primary"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/purchase"
                  className="block rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary/40 hover:text-primary"
                >
                  Purchase a home
                </Link>
              </li>
              <li>
                <Link
                  href="/refinance"
                  className="block rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary/40 hover:text-primary"
                >
                  Refinance mortgage
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="block rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary/40 hover:text-primary"
                >
                  Mortgage calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="block rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-sm font-medium shadow-sm transition hover:border-primary/40 hover:text-primary"
                >
                  Free mortgage consultation
                </Link>
              </li>
            </ul>
            <p className="mt-3 text-sm">
              <Link href="/specialties" className="font-medium text-primary hover:underline">
                View all specialty programs →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
