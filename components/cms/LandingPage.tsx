import Link from "next/link";
import { CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingPageContent } from "@/lib/cms/types";
import { getSite } from "@/lib/cms";

type Props = {
  page: LandingPageContent;
};

/**
 * SEO location / specialty template.
 * Ends with the original CTA + Contact blocks (same style as before CMS refactor).
 * Site-wide Footer is rendered by root layout after this page.
 */
export function LandingPage({ page }: Props) {
  const site = getSite();

  return (
    <div className="w-full overflow-x-hidden">
      <div className="page-hero bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="page-hero-title">{page.hero.heading}</h1>
          <p className="page-hero-sub">{page.hero.subheading}</p>
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
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-muted py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-10 sm:text-3xl">
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

      {/* CTA */}
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
            <Link href={site.teamPath} className="block w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white hover:text-foreground sm:w-auto"
              >
                Speak with a Loan Officer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact block on SEO pages */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl">
            Contact Us
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
