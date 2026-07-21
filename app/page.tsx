"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  BookOpen,
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
  getSite,
  getVideos,
} from "@/lib/cms";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";

type MarketUpdate = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

const site = getSite();
const home = getHomepage();
const videosData = getVideos();

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
      <section className="bg-muted py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {home.marketUpdates.heading}
          </h2>
          <p className="text-muted-foreground">Loading market news…</p>
        </div>
      </section>
    );
  }

  if (error || updates.length === 0) {
    return (
      <section className="bg-muted py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {home.marketUpdates.heading}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground sm:text-base">
            {home.marketUpdates.subtitle}
          </p>
          <a
            href="https://www.mortgagenewsdaily.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-sm sm:w-auto sm:max-w-none"
          >
            <Button variant="outline" className="w-full sm:w-auto">
              View Mortgage News Daily <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
          <div className="min-w-0 max-w-2xl">
            <h2 className="mb-3 font-montserrat text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              {home.marketUpdates.heading}
            </h2>
            <p className="font-manrope text-sm text-muted-foreground sm:text-base">
              {home.marketUpdates.subtitle}
            </p>
          </div>
          <a
            href="https://www.mortgagenewsdaily.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full shrink-0 sm:w-auto"
          >
            <Button variant="outline" className="w-full md:w-auto">
              View All Updates <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {updates.slice(0, 3).map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-stable rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
            >
              <p className="mb-2 text-xs text-muted-foreground">
                {formatDate(item.pubDate)}
              </p>
              <h3 className="mb-2 line-clamp-2 text-base font-bold text-foreground sm:text-lg">
                {item.title}
              </h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">
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
    <div className="card-stable rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
      <h3 className="mb-2 font-montserrat text-xl font-bold text-foreground sm:text-2xl">
        {home.calculatorBook.calcHeading}
      </h3>
      <p className="mb-5 font-manrope text-sm text-muted-foreground sm:mb-6 sm:text-base">
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
            inputMode="decimal"
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
            inputMode="decimal"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor="interest-rate" className="mb-2 block text-sm font-medium text-muted-foreground">
              Interest Rate
            </label>
            <input
              id="interest-rate"
              type="number"
              step="0.01"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div className="min-w-0">
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
        <p className="text-2xl font-bold text-primary sm:text-3xl">
          {monthlyPayment > 0
            ? `$${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
            : "—"}
        </p>
      </div>
      <Link href="/calculator" className="block w-full">
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
      <section className="relative flex min-h-[min(100dvh,52rem)] w-full items-end justify-center overflow-hidden pb-16 pt-16 sm:min-h-screen sm:pb-28 sm:pt-20">
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
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1
              className="mb-4 font-montserrat text-[1.875rem] font-bold leading-[1.15] tracking-tight text-white sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              dangerouslySetInnerHTML={{ __html: home.hero.titleHtml }}
            />
            <p className="mx-auto mb-7 max-w-2xl font-manrope text-[0.95rem] leading-relaxed text-gray-200 sm:mb-12 sm:text-lg md:text-xl">
              {home.hero.subtitle}
            </p>
            <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:gap-5">
              <Link href={site.applyPath} className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full px-6 font-montserrat text-base shadow-xl transition-all hover:shadow-2xl sm:h-14 sm:px-8 sm:text-lg md:h-16 md:px-10"
                >
                  Apply Now
                </Button>
              </Link>
              <Link href="/calculator" className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-white/40 px-6 font-montserrat text-base text-white backdrop-blur-sm transition-all hover:bg-white hover:text-foreground sm:h-14 sm:px-8 sm:text-lg md:h-16 md:px-10"
                >
                  Mortgage Calculator
                </Button>
              </Link>
              <Link href={site.teamPath} className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full border-white/40 px-6 font-montserrat text-base text-white backdrop-blur-sm transition-all hover:bg-white hover:text-foreground sm:h-14 sm:px-8 sm:text-lg md:h-16 md:px-10"
                >
                  Find a Loan Officer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Loan Programs */}
      <section className="bg-foreground py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
            <div className="min-w-0 max-w-2xl">
              <h2 className="mb-3 font-montserrat text-2xl font-bold sm:mb-4 sm:text-3xl md:text-4xl">
                {home.loanPrograms.heading}
              </h2>
              <p className="font-manrope text-sm text-gray-400 sm:text-base">
                {home.loanPrograms.subtitle}
              </p>
            </div>
            <Link href={home.loanPrograms.viewAllHref} className="block w-full shrink-0 sm:w-auto">
              <Button variant="accent" className="w-full text-white hover:bg-accent/90 sm:w-auto">
                View All Loan Programs
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {home.loanPrograms.items.map((prog) => (
              <Link key={prog.title} href={prog.href} className="group block min-w-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card-stable h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors group-hover:bg-white/10 sm:p-6"
                >
                  <h3 className="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl">
                    {prog.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-400 sm:mb-6">
                    {prog.description}
                  </p>
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
        className="bg-muted py-14 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-16">
            <h2 className="mb-3 font-montserrat text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              {home.successStories.heading}
            </h2>
            <p className="mx-auto max-w-xl font-manrope text-sm text-muted-foreground sm:text-base">
              {home.successStories.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
            {home.successStories.items.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-stable flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-lg transition-shadow hover:shadow-xl sm:p-8"
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
                  <Link href={`/success-stories#${story.slug}`} className="block w-full">
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

      {/* 4. Google Reviews — live Places API + local fallback */}
      <GoogleReviewsSection />

      {/* 5. Mortgage Calculator + First-Time Homebuyer Book */}
      <section className="border-y border-gray-100 bg-white py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
            <QuickCalculator />
            <div className="card-stable flex flex-col rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-5 sm:rounded-3xl sm:p-8">
              <div className="flex-1">
                <div className="mx-auto mb-5 flex aspect-[3/4] w-full max-w-[160px] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 sm:mb-6 sm:max-w-[200px]">
                  <BookOpen className="h-12 w-12 text-primary/60 sm:h-16 sm:w-16" />
                </div>
                <h3 className="mb-3 text-center font-montserrat text-xl font-bold text-foreground sm:text-2xl">
                  {home.calculatorBook.bookHeading}
                </h3>
                <p className="mb-5 text-center font-manrope text-sm text-muted-foreground sm:mb-6 sm:text-base">
                  {home.calculatorBook.bookDescription}
                </p>
                <ul className="mb-6 space-y-3">
                  {home.calculatorBook.bookBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <p className="min-w-0 text-sm text-foreground">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={site.handbookPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
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
      <section className="bg-white py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-16">
            <h2 className="mb-3 font-montserrat text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              {home.videos.heading}
            </h2>
            <p className="mx-auto max-w-xl font-manrope text-sm text-muted-foreground sm:text-base">
              {home.videos.subtitle}
            </p>
          </div>
          <div className="mb-8 grid grid-cols-1 gap-5 sm:mb-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videosData.items.slice(0, 3).map((video, i) => (
              <div
                key={video.videoId}
                className="card-stable group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="mb-2 line-clamp-2 text-base font-bold text-foreground transition-colors group-hover:text-primary sm:text-lg">
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
            <Link href="/video-blog" className="inline-flex w-full max-w-xs sm:w-auto sm:max-w-none">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View All Videos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Updates (between videos and map — extra value block) */}
      <MarketUpdates />

      {/* 7. Google Map + Company Contacts */}
      <section className="bg-muted py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              <div>
                <h2 className="mb-3 font-montserrat text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl md:text-4xl">
                  {home.contact.heading}
                </h2>
                <p className="font-manrope text-base text-muted-foreground sm:text-lg">
                  {home.contact.subtitle}
                </p>
              </div>
              <div className="card-stable space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:space-y-6 sm:p-8">
                <div>
                  <h4 className="font-montserrat text-lg font-bold text-foreground sm:text-xl">
                    {site.legalName}
                  </h4>
                  <p className="text-sm text-muted-foreground">NMLS #{site.nmls}</p>
                </div>
                <div className="space-y-4 border-t border-gray-100 pt-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="min-w-0 font-medium text-foreground">
                      {site.address.line1}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </p>
                  </div>
                  <div className="flex items-start sm:items-center">
                    <Phone className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
                    <div className="min-w-0 font-medium text-foreground">
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
                  <div className="flex items-start sm:items-center">
                    <Mail className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" />
                    <a
                      href={`mailto:${site.email}`}
                      className="break-anywhere min-w-0 font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="mb-4 text-sm font-medium text-muted-foreground">Follow Us</p>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
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
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                        aria-label={label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <div className="h-64 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm sm:h-80 md:h-96">
                <iframe
                  title="Green Street Capital office location"
                  src={`https://maps.google.com/maps?q=${site.googleMapsEmbedQuery}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
              <p className="mt-3 break-anywhere text-center text-xs text-muted-foreground sm:text-sm">
                {site.legalName} — {site.address.full}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
