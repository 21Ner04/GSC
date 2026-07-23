/**
 * Topical internal-link graph for local + program SEO.
 * Strong internal linking helps Google understand which pages
 * should rank for city + mortgage intent queries.
 */

import type { LandingPageContent, RelatedLink } from "@/lib/cms/types";

const LOCATION_HUB: RelatedLink[] = [
  {
    label: "All mortgage locations",
    href: "/locations",
    description: "NY, NJ, FL, PA service areas",
  },
  {
    label: "All specialty programs",
    href: "/specialties",
    description: "Non-QM, DSCR, self-employed & more",
  },
  {
    label: "Purchase a home",
    href: "/purchase",
    description: "Home purchase mortgage options",
  },
  {
    label: "Refinance",
    href: "/refinance",
    description: "Rate-and-term & cash-out",
  },
  {
    label: "Mortgage calculator",
    href: "/calculator",
    description: "Estimate monthly payment",
  },
  {
    label: "Schedule a consultation",
    href: "/schedule",
    description: "Free 15-minute call",
  },
];

const CORE_PROGRAMS: RelatedLink[] = [
  {
    label: "First-time homebuyers",
    href: "/specialties/first-time-homebuyers",
    description: "Down payment & program guidance",
  },
  {
    label: "Self-employed mortgages",
    href: "/specialties/self-employed",
    description: "Business owners & freelancers",
  },
  {
    label: "Bank statement loans",
    href: "/specialties/bank-statement-loans",
    description: "Qualify with deposits",
  },
  {
    label: "Non-QM loans",
    href: "/specialties/non-qm-loans",
    description: "Flexible underwriting",
  },
  {
    label: "DSCR investment loans",
    href: "/specialties/dscr-loans",
    description: "Rental cash-flow financing",
  },
  {
    label: "Investment properties",
    href: "/specialties/investment",
    description: "Buy & refinance rentals",
  },
];

const LOCATIONS: RelatedLink[] = [
  {
    label: "Mortgage broker Brooklyn",
    href: "/locations/brooklyn",
    description: "HQ on Coney Island Ave",
  },
  {
    label: "Mortgage broker NYC",
    href: "/locations/new-york-city",
    description: "All five boroughs",
  },
  {
    label: "Mortgage broker Manhattan",
    href: "/locations/manhattan",
    description: "Condos, co-ops & jumbo",
  },
  {
    label: "Mortgage broker Queens",
    href: "/locations/queens",
    description: "Purchase & refinance",
  },
  {
    label: "Mortgage broker Long Island",
    href: "/locations/long-island",
    description: "Nassau & Suffolk",
  },
  {
    label: "Mortgage broker Staten Island",
    href: "/locations/staten-island",
    description: "Home loans & refinance",
  },
  {
    label: "Mortgage broker Westchester",
    href: "/locations/westchester",
    description: "Suburban NY financing",
  },
  {
    label: "Mortgage broker New York State",
    href: "/locations/new-york",
    description: "Statewide licensed broker",
  },
  {
    label: "Mortgage broker New Jersey",
    href: "/locations/new-jersey",
    description: "NJ purchase & refinance",
  },
  {
    label: "Mortgage broker Florida",
    href: "/locations/florida",
    description: "Primary, second home & DSCR",
  },
  {
    label: "Mortgage broker Pennsylvania",
    href: "/locations/pennsylvania",
    description: "PA home loans",
  },
];

/** Default related links when a landing page omits relatedLinks. */
export function getRelatedLinks(page: LandingPageContent): RelatedLink[] {
  if (page.relatedLinks?.length) return page.relatedLinks;

  if (page.kind === "location") {
    const others = LOCATIONS.filter((l) => !l.href.endsWith(`/${page.slug}`));
    return [...others.slice(0, 6), ...CORE_PROGRAMS.slice(0, 4), ...LOCATION_HUB.slice(0, 3)];
  }

  // specialty
  const otherPrograms = CORE_PROGRAMS.filter(
    (l) => !l.href.endsWith(`/${page.slug}`)
  );
  return [
    ...otherPrograms,
    ...LOCATIONS.slice(0, 5),
    ...LOCATION_HUB.slice(0, 4),
  ];
}

export function getLocationNavLinks(): RelatedLink[] {
  return LOCATIONS;
}

export function getProgramNavLinks(): RelatedLink[] {
  return CORE_PROGRAMS;
}

/** Long-tail local phrases used in hub pages (visible content for crawlers). */
export const LOCAL_SEARCH_INTENTS: { query: string; href: string }[] = [
  { query: "mortgage broker near me Brooklyn", href: "/locations/brooklyn" },
  { query: "mortgage broker Brooklyn NY", href: "/locations/brooklyn" },
  { query: "best mortgage broker NYC", href: "/locations/new-york-city" },
  { query: "mortgage broker Manhattan condo", href: "/locations/manhattan" },
  { query: "home loans Queens NY", href: "/locations/queens" },
  { query: "mortgage broker Long Island", href: "/locations/long-island" },
  { query: "refinance mortgage New Jersey", href: "/locations/new-jersey" },
  { query: "mortgage broker Florida DSCR", href: "/locations/florida" },
  { query: "first time homebuyer mortgage NY", href: "/specialties/first-time-homebuyers" },
  { query: "bank statement loans self employed", href: "/specialties/bank-statement-loans" },
  { query: "Non-QM loans New York", href: "/specialties/non-qm-loans" },
  { query: "DSCR loans for investors", href: "/specialties/dscr-loans" },
  { query: "truck driver mortgage programs", href: "/specialties/truck-drivers" },
  { query: "ITIN mortgage loans", href: "/specialties/itin-mortgage-programs" },
  { query: "mortgage calculator monthly payment", href: "/calculator" },
  { query: "refinance cash out Brooklyn", href: "/refinance" },
];
