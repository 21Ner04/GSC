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
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-50 to-white py-20 text-center md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 font-montserrat text-4xl font-bold text-foreground md:text-5xl">
            {page.hero.heading}
          </h1>
          <p className="text-xl text-muted-foreground">{page.hero.subheading}</p>
        </div>
      </div>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 font-montserrat text-3xl font-bold text-foreground">
                {page.intro.heading}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                {page.intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <ul className="space-y-3 pt-2">
                  {page.intro.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <h3 className="mb-4 font-montserrat text-2xl font-bold text-foreground">
                {page.sidebar.heading}
              </h3>
              <p className="mb-6 text-muted-foreground">{page.sidebar.body}</p>
              <div className="space-y-4">
                {page.sidebar.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-montserrat text-3xl font-bold text-foreground">
            {page.programsHeading}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.programs.map((program) => (
              <div
                key={program.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 text-xl font-bold text-foreground">{program.title}</h3>
                <p className="text-muted-foreground">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.market && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-montserrat text-3xl font-bold text-foreground">
              {page.market.heading}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {page.market.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-montserrat text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {page.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-bold text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Original SEO page CTA — buttons only, no extra contact/NMLS strip */}
      <section className="bg-foreground py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-montserrat text-3xl font-bold md:text-4xl">
            {page.cta.heading}
          </h2>
          <p className="mb-8 text-xl text-gray-300">{page.cta.body}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={site.applyPath}>
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
            <Link href={site.teamPath}>
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

      {/* Original Contact block on SEO pages */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-montserrat text-3xl font-bold text-foreground">
            Contact Us
          </h2>
          <div className="rounded-2xl bg-muted/50 p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href={`tel:${site.phones.tollFreeTel}`}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Toll Free: {site.phones.tollFree}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href={`tel:${site.phones.localTel}`}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  Local: {site.phones.local}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-foreground transition-colors hover:text-primary"
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
