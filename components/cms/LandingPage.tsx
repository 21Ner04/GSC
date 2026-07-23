import Link from "next/link";
import { CheckCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingPageContent } from "@/lib/cms/types";
import { getSite } from "@/lib/cms";
import { getRelatedLinks } from "@/lib/seo/related";

type Props = {
  page: LandingPageContent;
};

/**
 * SEO location / specialty template.
 * Optimized for local + program intent: H1 keyword, FAQs, service areas,
 * deep internal links, and clear CTAs.
 */
export function LandingPage({ page }: Props) {
  const site = getSite();
  const related = getRelatedLinks(page);
  const isLocation = page.kind === "location";

  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-hero bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            {isLocation
              ? `Licensed mortgage broker · NMLS #${site.nmls}`
              : `Specialty mortgage program · NMLS #${site.nmls}`}
          </p>
          <h1 className="page-hero-title">{page.hero.heading}</h1>
          <p className="page-hero-sub">{page.hero.subheading}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
            <Link href="/schedule">
              <Button size="lg">Free Consultation</Button>
            </Link>
            <Link href={site.applyPath}>
              <Button size="lg" variant="outline">
                Apply Now
              </Button>
            </Link>
            <Link href="/calculator">
              <Button size="lg" variant="ghost">
                Payment Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl">
                {page.intro.heading}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {page.intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <ul className="space-y-3 pt-2">
                  {page.intro.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="min-w-0">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card-stable rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-5 sm:rounded-3xl sm:p-8">
              <h3 className="mb-3 font-montserrat text-xl font-bold text-foreground sm:mb-4 sm:text-2xl">
                {page.sidebar.heading}
              </h3>
              <p className="mb-5 text-sm text-muted-foreground sm:mb-6 sm:text-base">
                {page.sidebar.body}
              </p>
              <div className="space-y-3 sm:space-y-4">
                {page.sidebar.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 sm:items-center">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
                    <span className="min-w-0 font-medium">{h}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-primary/10 pt-5 text-sm">
                <p className="flex items-start gap-2 text-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{site.address.full}</span>
                </p>
                <p>
                  <a
                    href={`tel:${site.phones.localTel}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {site.phones.local}
                  </a>
                  {" · "}
                  <a
                    href={`tel:${site.phones.tollFreeTel}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {site.phones.tollFree}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {page.serviceAreas && page.serviceAreas.length > 0 && (
        <section
          className="border-y border-gray-100 bg-muted/40 py-10 sm:py-12"
          aria-labelledby="service-areas-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="service-areas-heading"
              className="mb-4 text-center font-montserrat text-xl font-bold text-foreground sm:text-2xl"
            >
              {isLocation ? "Neighborhoods & areas we serve" : "Where this program is available"}
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted-foreground">
              {isLocation
                ? `Searching for a mortgage broker near you? Green Street Capital helps borrowers across these ${page.hero.heading.replace(/^Mortgage Broker in\s+/i, "")} communities.`
                : `Available to eligible borrowers in ${site.statesServed.join(", ")} where licensed.`}
            </p>
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {page.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-foreground shadow-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-muted py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl">
            {page.programsHeading}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.programs.map((program) => (
              <div
                key={program.title}
                className="card-stable rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">
                  {program.title}
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Compare options with our{" "}
            <Link href="/loan-programs" className="font-medium text-primary hover:underline">
              full loan program list
            </Link>{" "}
            or explore{" "}
            <Link href="/specialties" className="font-medium text-primary hover:underline">
              specialty mortgages
            </Link>
            .
          </p>
        </div>
      </section>

      {page.market && (
        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl">
              {page.market.heading}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.market.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.faqs?.length > 0 && (
        <section
          className="bg-muted py-12 sm:py-16 md:py-20"
          aria-labelledby="landing-faq-heading"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2
              id="landing-faq-heading"
              className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-10 sm:text-3xl"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {page.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="card-stable rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
                >
                  <h3 className="mb-2 text-base font-bold text-foreground sm:text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground sm:text-base">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Internal linking graph — critical for ranking related queries */}
      <section
        className="bg-white py-12 sm:py-16"
        aria-labelledby="related-searches-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="related-searches-heading"
            className="mb-3 text-center font-montserrat text-2xl font-bold text-foreground sm:text-3xl"
          >
            Related mortgage topics
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
            Looking for something similar? Explore nearby cities, loan types, and tools people
            often search for alongside {page.hero.heading.toLowerCase()}.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {related.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="group flex items-start justify-between gap-3 rounded-2xl border border-gray-100 bg-muted/30 p-4 transition hover:border-primary/30 hover:bg-white hover:shadow-md"
              >
                <span>
                  <span className="block font-semibold text-foreground group-hover:text-primary">
                    {link.label}
                  </span>
                  {link.description && (
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {link.description}
                    </span>
                  )}
                </span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-14 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-montserrat text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
            {page.cta.heading}
          </h2>
          <p className="mb-6 text-base text-gray-300 sm:mb-8 sm:text-xl">{page.cta.body}</p>
          <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <Link href={site.applyPath} className="block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href="/schedule" className="block w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white hover:text-foreground sm:w-auto"
              >
                Schedule a Call
              </Button>
            </Link>
            <Link href={site.teamPath} className="block w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white hover:text-foreground sm:w-auto"
              >
                Meet Our Team
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-400 sm:text-sm">
            {site.legalName} · NMLS #{site.nmls} · Serving {site.statesServed.join(", ")}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl">
            Contact a licensed mortgage broker
          </h2>
          <div className="card-stable rounded-2xl bg-muted/50 p-5 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3 sm:items-center">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
                <a
                  href={`tel:${site.phones.tollFreeTel}`}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Toll Free: {site.phones.tollFree}
                </a>
              </div>
              <div className="flex items-start gap-3 sm:items-center">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
                <a
                  href={`tel:${site.phones.localTel}`}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Local: {site.phones.local}
                </a>
              </div>
              <div className="flex items-start gap-3 sm:items-center">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-anywhere min-w-0 font-medium text-foreground transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="font-medium text-foreground">{site.address.full}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button variant="outline">Contact page</Button>
              </Link>
              <Link href="/schedule">
                <Button>Book time</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
