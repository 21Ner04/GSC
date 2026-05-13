import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  UploadCloud,
  Headphones,
  ExternalLink,
  Calendar,
  Send,
} from "lucide-react";
import { MortgageCalculatorSection } from "@/components/MortgageCalculatorSection";

export const metadata = { title: "Useful Links & Forms | Green Street Capital" };

const applyItems = [
  { title: "Apply Now", icon: FileText, link: "/team", primary: true },
  { title: "Schedule Time", icon: Calendar, link: "/team" },
  { title: "Contact Us", icon: Headphones, link: "/contact" },
  { title: "Live Meeting", icon: ExternalLink, link: "/team" },
];

const formsItems = [
  {
    title: "Borrower Portal",
    icon: UploadCloud,
    desc: "Securely upload your tax returns, bank statements, and ID via our encrypted portal.",
    actionLabel: "Access Portal",
    variant: "secondary" as const,
  },
  {
    title: "Borrower Authorization",
    icon: FileText,
    desc: "Required form to allow us to pull credit and verify employment.",
    actionLabel: "Download PDF",
    variant: "outline" as const,
  },
  {
    title: "Send Secure Docs",
    icon: Send,
    desc: "Alternative secure drop portal for non-registered users.",
    actionLabel: "Secure Drop",
    variant: "outline" as const,
  },
  {
    title: "Loan Application",
    icon: FileText,
    desc: "Complete URLA (Uniform Residential Loan Application).",
    actionLabel: "Download PDF",
    variant: "outline" as const,
  },
  {
    title: "Privacy Notice",
    icon: FileText,
    desc: "Our privacy policy and how we protect your information.",
    actionLabel: "Download PDF",
    variant: "outline" as const,
  },
  {
    title: "Fair Lending Notice",
    icon: FileText,
    desc: "Equal housing opportunity and fair lending practices.",
    actionLabel: "Download PDF",
    variant: "outline" as const,
  },
];

const disclosuresItems = [
  {
    title: "Loan Estimate",
    desc: "Standardized 3-page form showing loan terms and closing costs.",
    actionLabel: "Sample PDF",
  },
  {
    title: "Closing Disclosure",
    desc: "Final loan terms and closing costs provided 3 days before closing.",
    actionLabel: "Sample PDF",
  },
  {
    title: "HELOC TILA",
    desc: "Truth in Lending Act disclosure for home equity lines of credit.",
    actionLabel: "Sample PDF",
  },
];

const resourcesItems = [
  {
    title: "HUD Resources",
    desc: "Housing and Urban Development official site.",
    href: "https://www.hud.gov",
    cta: "Visit HUD.gov →",
  },
  {
    title: "CFPB",
    desc: "Consumer Financial Protection Bureau.",
    href: "https://www.consumerfinance.gov",
    cta: "Visit CFPB →",
  },
  {
    title: "Fannie Mae",
    desc: "Mortgage guidelines and home buying resources.",
    href: "https://www.fanniemae.com",
    cta: "Visit FannieMae.com →",
  },
  {
    title: "Freddie Mac",
    desc: "Home buying guides and mortgage education.",
    href: "https://www.freddiemac.com",
    cta: "Visit FreddieMac.com →",
  },
  {
    title: "NMLS Consumer Access",
    desc: "Verify mortgage professional licenses.",
    href: "https://www.nmlsconsumeraccess.org",
    cta: "Check License →",
  },
];

export default function UsefulLinks() {
  return (
    <div className="w-full pb-24">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <h1 className="mb-3 font-montserrat text-3xl font-bold text-foreground sm:mb-4 md:text-4xl lg:text-5xl">
            Useful Links & Forms
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Everything you need to manage your mortgage application in one place.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-3 py-10 sm:space-y-16 sm:px-6 sm:py-16 lg:px-8">
        <section>
          <h2 className="text-2xl font-montserrat font-bold text-foreground mb-8 border-b border-gray-200 pb-4">
            Apply & Contact
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {applyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={i} href={item.link} className="block h-full">
                  <div
                    className={`h-full min-h-[150px] rounded-2xl border p-6 flex flex-col items-center justify-center text-center transition-all ${
                      item.primary
                        ? "bg-primary border-primary text-white hover:bg-primary/90"
                        : "bg-white border-gray-100 hover:border-primary text-foreground"
                    }`}
                  >
                    <Icon className={`w-10 h-10 mb-4 shrink-0 ${item.primary ? "text-white" : "text-primary"}`} />
                    <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-montserrat font-bold text-foreground mb-8 border-b border-gray-200 pb-4">
            Forms & Documents
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {formsItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col min-h-[230px]"
                >
                  <Icon className="w-8 h-8 text-secondary mb-4 shrink-0" />
                  <h3 className="font-bold text-lg mb-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-6 flex-1">
                    {item.desc}
                  </p>
                  <Button variant={item.variant} className="w-full shrink-0">
                    {item.actionLabel}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-montserrat font-bold text-foreground mb-8 border-b border-gray-200 pb-4">
            Disclosures & Compliance
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {disclosuresItems.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col min-h-[210px]"
              >
                <FileText className="w-8 h-8 text-accent mb-4 shrink-0" />
                <h3 className="font-bold text-lg mb-2 leading-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-6 flex-1">
                  {item.desc}
                </p>
                <Button variant="outline" className="w-full shrink-0">
                  {item.actionLabel}
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section id="mortgage-calculator" className="scroll-mt-24">
          <div className="mb-6 border-b border-gray-200 pb-4 sm:mb-8">
            <h2 className="text-xl font-montserrat font-bold text-foreground sm:text-2xl">
              Useful Resources
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Full mortgage calculator (same as our dedicated calculator page),
              plus trusted government and industry links.
            </p>
          </div>

          <MortgageCalculatorSection headingLevel="h2" />

          <h3 className="mb-4 mt-10 font-montserrat text-lg font-bold text-foreground sm:mb-6 sm:mt-14 sm:text-xl">
            Government &amp; industry resources
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-2">
            {resourcesItems.map((item, i) => (
              <div
                key={i}
                className="flex min-w-0 items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-4 sm:p-6"
              >
                <ExternalLink className="mt-0.5 h-7 w-7 shrink-0 text-accent sm:h-8 sm:w-8" />
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 text-base font-bold leading-tight text-foreground sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="mb-3 text-sm leading-6 text-muted-foreground">
                    {item.desc}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm font-bold text-primary hover:underline"
                  >
                    {item.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}