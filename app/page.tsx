"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getHomepage,
  getReviews,
  getSite,
  getVideos,
} from "@/lib/cms";
import type { GoogleReview } from "@/lib/cms/types";

type MarketUpdate = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

const site = getSite();
const home = getHomepage();
const reviews = getReviews();
const videosData = getVideos();

function ReviewCard({ review }: { review: GoogleReview }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowToggle = review.text.length > 200;
  const displayText =
    shouldShowToggle && !isExpanded
      ? review.text.slice(0, 200) + "..."
      : review.text;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-sm font-medium text-foreground">Google Review</span>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <p className="font-semibold text-foreground">{review.author}</p>
        <div className="flex text-yellow-400" aria-label={`${review.rating} stars`}>
          {Array.from({ length: review.rating }).map((_, j) => (
            <Star key={j} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{review.date}</p>
      <p className="mb-3 text-sm text-foreground/80">{displayText}</p>
      {shouldShowToggle && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

function MarketUpdates() {
  const [updates, setUpdates] = useState<MarketUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const response = await fetch("/api/market-updates");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUpdates(data.items || []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, []);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays <= 0) return "Today";
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
            {home.marketUpdates.heading}
          </h2>
          <p className="text-muted-foreground">Loading market news…</p>
        </div>
      </section>
    );
  }

  if (error || updates.length === 0) {
    return (
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
            {home.marketUpdates.heading}
          </h2>
          <p className="mb-6 text-muted-foreground">{home.marketUpdates.subtitle}</p>
          <a
            href="https://www.mortgagenewsdaily.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              View Mortgage News Daily <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
              {home.marketUpdates.heading}
            </h2>
            <p className="font-manrope text-muted-foreground">
              {home.marketUpdates.subtitle}
            </p>
          </div>
          <a
            href="https://www.mortgagenewsdaily.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full md:w-auto">
              View All Updates <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {updates.slice(0, 3).map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="mb-2 text-xs text-muted-foreground">
                {formatDate(item.pubDate)}
              </p>
              <h3 className="mb-2 text-lg font-bold text-foreground line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const monthlyPayment = (() => {
    const principal = homePrice - downPayment;
    if (principal <= 0) return 0;
    if (rate === 0) return principal / (termYears * 12);
    const monthlyRate = rate / 100 / 12;
    const n = termYears * 12;
    return (
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
      (Math.pow(1 + monthlyRate, n) - 1)
    );
  })();

  const inputClass =
    "w-full min-h-[2.75rem] rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="mb-2 font-montserrat text-2xl font-bold text-foreground">
        {home.calculatorBook.calcHeading}
      </h3>
      <p className="mb-6 font-manrope text-muted-foreground">
        {home.calculatorBook.calcSubtitle}
      </p>
      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="home-price" className="mb-2 block text-sm font-medium text-muted-foreground">
            Home Price
          </label>
          <input
            id="home-price"
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="down-payment" className="mb-2 block text-sm font-medium text-muted-foreground">
            Down Payment
          </label>
          <input
            id="down-payment"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="interest-rate" className="mb-2 block text-sm font-medium text-muted-foreground">
              Interest Rate
            </label>
            <input
              id="interest-rate"
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="loan-term" className="mb-2 block text-sm font-medium text-muted-foreground">
              Loan Term
            </label>
            <select
              id="loan-term"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className={inputClass}
            >
              <option value={30}>30 years</option>
              <option value={25}>25 years</option>
              <option value={20}>20 years</option>
              <option value={15}>15 years</option>
              <option value={10}>10 years</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mb-6 rounded-xl bg-muted/50 p-4">
        <p className="mb-1 text-sm text-muted-foreground">Estimated Monthly Payment (P&amp;I)</p>
        <p className="text-3xl font-bold text-primary">
          {monthlyPayment > 0
            ? `$${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
            : "—"}
        </p>
      </div>
      <Link href="/calculator">
        <Button variant="outline" className="w-full">
          Open Full Mortgage Calculator
        </Button>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <section className="relative flex min-h-[max(32rem,100dvh)] w-full items-end justify-center overflow-hidden pb-20 pt-[max(3rem,env(safe-area-inset-top))] sm:min-h-screen sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={home.hero.image}
            alt={home.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            quality={88}
            className="object-cover object-[center_20%] sm:object-[center_28%] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/25" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1
              className="mb-6 font-montserrat text-4xl font-bold leading-[1.1] text-white sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              dangerouslySetInnerHTML={{ __html: home.hero.titleHtml }}
            />
            <p className="mx-auto mb-8 max-w-2xl font-manrope text-base leading-relaxed text-gray-200 sm:mb-12 sm:text-lg md:text-xl">
              {home.hero.subtitle}
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
              <Link href={site.applyPath}>
                <Button
                  size="lg"
                  className="h-16 w-full px-10 font-montserrat text-lg shadow-xl transition-all hover:shadow-2xl sm:w-auto"
                >
                  Apply Now
                </Button>
              </Link>
              <Link href="/calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 w-full border-white/40 px-10 font-montserrat text-lg text-white backdrop-blur-sm transition-all hover:bg-white hover:text-foreground sm:w-auto"
                >
                  Mortgage Calculator
                </Button>
              </Link>
              <Link href={site.teamPath}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 w-full border-white/40 px-10 font-montserrat text-lg text-white backdrop-blur-sm transition-all hover:bg-white hover:text-foreground sm:w-auto"
                >
                  Find a Loan Officer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Loan Programs */}
      <section className="bg-foreground py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-montserrat text-3xl font-bold md:text-4xl">
                {home.loanPrograms.heading}
              </h2>
              <p className="font-manrope text-gray-400">{home.loanPrograms.subtitle}</p>
            </div>
            <Link href={home.loanPrograms.viewAllHref}>
              <Button variant="accent" className="text-white hover:bg-accent/90">
                View All Loan Programs
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {home.loanPrograms.items.map((prog) => (
              <Link key={prog.title} href={prog.href} className="group block">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors group-hover:bg-white/10"
                >
                  <h3 className="mb-3 text-xl font-bold text-white">{prog.title}</h3>
                  <p className="mb-6 text-sm text-gray-400">{prog.description}</p>
                  <span className="inline-flex items-center font-medium text-primary transition-colors group-hover:text-accent">
                    Learn More{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Success Stories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="bg-muted py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
              {home.successStories.heading}
            </h2>
            <p className="mx-auto max-w-xl font-manrope text-muted-foreground">
              {home.successStories.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {home.successStories.items.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {story.clientType}
                  </span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-foreground">{story.title}</h3>
                <div className="flex-grow space-y-4">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-muted-foreground">Problem</p>
                    <p className="text-sm text-foreground/80">{story.problem}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-muted-foreground">Solution</p>
                    <p className="text-sm text-foreground/80">{story.solution}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-muted-foreground">Result</p>
                    <p className="text-sm text-foreground/80">{story.result}</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <Link href={`/success-stories#${story.slug}`}>
                    <Button variant="outline" className="w-full">
                      Read the Story
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Google Reviews */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
                {home.reviews.heading}
              </h2>
              <p className="font-manrope text-muted-foreground">{home.reviews.subtitle}</p>
            </div>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full md:w-auto">
                View All Reviews on Google
              </Button>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mortgage Calculator + First-Time Homebuyer Book */}
      <section className="border-y border-gray-100 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <QuickCalculator />
            <div className="flex flex-col rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <div className="flex-1">
                <div className="mx-auto mb-6 flex aspect-[3/4] max-w-[200px] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                  <BookOpen className="h-16 w-16 text-primary/60" />
                </div>
                <h3 className="mb-3 text-center font-montserrat text-2xl font-bold text-foreground">
                  {home.calculatorBook.bookHeading}
                </h3>
                <p className="mb-6 text-center font-manrope text-muted-foreground">
                  {home.calculatorBook.bookDescription}
                </p>
                <ul className="mb-6 space-y-3">
                  {home.calculatorBook.bookBullets.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm text-foreground">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={site.handbookPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="accent" className="w-full" size="lg">
                  {home.calculatorBook.bookCta}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Video Blog */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
              {home.videos.heading}
            </h2>
            <p className="mx-auto max-w-xl font-manrope text-muted-foreground">
              {home.videos.subtitle}
            </p>
          </div>
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videosData.items.slice(0, 3).map((video, i) => (
              <div
                key={video.videoId}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {video.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/video-blog">
              <Button variant="outline" size="lg">
                View All Videos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Updates (between videos and map — extra value block) */}
      <MarketUpdates />

      {/* 7. Google Map + Company Contacts */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-montserrat text-3xl font-bold text-foreground md:text-4xl">
                  {home.contact.heading}
                </h2>
                <p className="font-manrope text-lg text-muted-foreground">
                  {home.contact.subtitle}
                </p>
              </div>
              <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div>
                  <h4 className="font-montserrat text-xl font-bold text-foreground">
                    {site.legalName}
                  </h4>
                  <p className="text-sm text-muted-foreground">NMLS #{site.nmls}</p>
                </div>
                <div className="space-y-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="font-medium text-foreground">
                      {site.address.line1}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 shrink-0 text-primary" />
                    <div className="font-medium text-foreground">
                      <a
                        href={`tel:${site.phones.localTel}`}
                        className="block transition-colors hover:text-primary"
                      >
                        Local: {site.phones.local}
                      </a>
                      <a
                        href={`tel:${site.phones.tollFreeTel}`}
                        className="block transition-colors hover:text-primary"
                      >
                        Toll Free: {site.phones.tollFree}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 shrink-0 text-primary" />
                    <a
                      href={`mailto:${site.email}`}
                      className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="mb-4 text-sm font-medium text-muted-foreground">Follow Us</p>
                  <div className="flex flex-wrap gap-3">
                    {(
                      [
                        [site.social.instagram, Instagram, "Instagram"],
                        [site.social.facebook, Facebook, "Facebook"],
                        [site.social.twitter, Twitter, "Twitter"],
                        [site.social.linkedin, Linkedin, "LinkedIn"],
                        [site.social.youtube, Youtube, "YouTube"],
                      ] as const
                    ).map(([href, Icon, label]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                        aria-label={label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="h-96 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <iframe
                  title="Green Street Capital office location"
                  src={`https://maps.google.com/maps?q=${site.googleMapsEmbedQuery}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {site.legalName} — {site.address.full}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
