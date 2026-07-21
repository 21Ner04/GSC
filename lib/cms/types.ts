/** Shared CMS content types. Local JSON now; WordPress REST later. */

export type SeoMeta = {
  title: string;
  description: string;
  keywords?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProgramCard = {
  title: string;
  description: string;
};

export type SiteContent = {
  companyName: string;
  legalName: string;
  nmls: string;
  brandTagline: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phones: {
    local: string;
    localTel: string;
    tollFree: string;
    tollFreeTel: string;
    fax?: string;
  };
  email: string;
  website: string;
  googleReviewsUrl: string;
  googleMapsEmbedQuery: string;
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    tiktok?: string;
  };
  statesServed: string[];
  licensedIn: string[];
  nmlsConsumerAccessUrl: string;
  handbookPdf: string;
  applyPath: string;
  teamPath: string;
  footerDisclaimer: string[];
};

export type SuccessStory = {
  slug: string;
  title: string;
  clientType: string;
  problem: string;
  solution: string;
  result: string;
  body?: string;
};

export type GoogleReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type VideoItem = {
  title: string;
  description: string;
  videoId: string;
};

export type LoanProgramCard = {
  title: string;
  description: string;
  href: string;
};

export type HomepageContent = {
  seo: SeoMeta;
  hero: {
    titleHtml: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  loanPrograms: {
    heading: string;
    subtitle: string;
    viewAllHref: string;
    items: LoanProgramCard[];
  };
  successStories: {
    heading: string;
    subtitle: string;
    items: SuccessStory[];
  };
  reviews: {
    heading: string;
    subtitle: string;
  };
  calculatorBook: {
    calcHeading: string;
    calcSubtitle: string;
    bookHeading: string;
    bookDescription: string;
    bookBullets: string[];
    bookCta: string;
  };
  videos: {
    heading: string;
    subtitle: string;
  };
  marketUpdates: {
    heading: string;
    subtitle: string;
  };
  contact: {
    heading: string;
    subtitle: string;
  };
};

export type LandingPageContent = {
  slug: string;
  seo: SeoMeta;
  hero: {
    heading: string;
    subheading: string;
  };
  intro: {
    heading: string;
    paragraphs: string[];
    bullets: string[];
  };
  sidebar: {
    heading: string;
    body: string;
    highlights: string[];
  };
  programsHeading: string;
  programs: ProgramCard[];
  market?: {
    heading: string;
    paragraphs: string[];
  };
  faqs: FaqItem[];
  cta: {
    heading: string;
    body: string;
  };
  kind: "location" | "specialty";
};
