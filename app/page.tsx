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

// ─── Типы ────────────────────────────────────────────────────────────────────

type MarketUpdate = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

// ─── Константы ───────────────────────────────────────────────────────────────

const SUCCESS_STORIES = [
  {
    title: "Truck Driver Finds the Right Path to Homeownership",
    clientType: "Truck Driver",
    problem:
      "A truck driver with non-traditional income needed a mortgage solution that reflected his real financial picture.",
    solution:
      "Our team reviewed his income structure and available programs to identify a practical path toward financing.",
    result: "Successfully secured financing tailored to his income situation.",
  },
  {
    title: "Self-Employed Borrower Gets More Flexibility",
    clientType: "Self-Employed Business Owner",
    problem:
      "A business owner had healthy cash flow but did not qualify through standard income documentation.",
    solution:
      "We explored alternative documentation and bank statement options designed for self-employed borrowers.",
    result: "Found a flexible financing option that matched his business income.",
  },
  {
    title: "First-Time Buyer Moves Forward With Confidence",
    clientType: "First-Time Homebuyer",
    problem:
      "A first-time homebuyer needed help understanding the process, available programs, and down payment options.",
    solution:
      "Our team provided clear guidance and helped create a realistic path toward purchasing a home.",
    result: "Gained confidence and successfully navigated the home buying process.",
  },
  {
    title: "Investor Expands a Rental Portfolio",
    clientType: "Real Estate Investor",
    problem:
      "A real estate investor wanted financing based on a property's rental income.",
    solution:
      "We reviewed the property's cash flow and investor-focused options to help structure a suitable financing strategy.",
    result: "Structured financing that aligned with investment goals.",
  },
];

const GOOGLE_REVIEWS = [
  {
    author: "Ostap Pavliv",
    rating: 5,
    date: "3 weeks ago",
    text: "We had an amazing experience working with Ruslan from Green Street Capital and his assistant Marina throughout our home mortgage process. They were always available to answer questions, extremely thorough and informative, and made the entire process feel smooth and stress-free. Their professionalism and genuine care for their clients truly stood out from start to finish. As a thoughtful surprise, they even gifted us moving boxes on closing day, which was such a kind gesture during a busy time. Highly recommend Ruslan and Marina to anyone looking for a reliable and supportive mortgage team.",
  },
  {
    author: "Yuriy Polozov",
    rating: 5,
    date: "2 months ago",
    text: "I've had the service which is beyond excellence from Mr. Gregory Chervonsky at Greenstreet Capital while refinancing my loan. The terms had been much more beneficial for me than those offered by Mortgage Depot company at the same time. Moreover, I would like to emphasise that Greenstreet required much less supporting documentation, some of which might appear to be non-starter if you choose another mortgage broker. I would like to recommend Gregory Chervonsky and the team at Greenstreet Capital to anyone if you need to purchase real estate or refinance. They are the best in town!",
  },
  {
    author: "Diliara Malikova",
    rating: 5,
    date: "1 month ago",
    text: "My mortgage broker was Liliya and she was recommended to me by a friend, and we stayed in touch for probably 2–3 years before I finally found the right apartment. Every time I found a property and needed to attend an open house, she was always incredibly quick with preparing my pre-approval letters. Throughout the entire mortgage process, Lily explained everything in detail — every step, what to expect, how to act, and what to prepare for. Her guidance was extremely helpful, and I really appreciated that she always shared information in advance to avoid any confusion or misunderstandings later in the process for me as a first time buyer. There were moments when my attorney was very busy and difficult to reach, and Lily also helped me a lot with communication and navigating those situations. Having someone responsive, patient, and knowledgeable during such a stressful process made a huge difference. I'm very grateful for all her help and would definitely recommend working with her.",
  },
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Green+Street+Capital,+LLC./@40.5905813,-73.9605374,17z/data=!3m1!5s0x89c2445e30371431:0x96e9dda46d51111c!4m18!1m9!3m8!1s0x89c2459fef3b7d45:0x3fecb4145a53c4d5!2sGreen+Street+Capital,+LLC.!8m2!3d40.5905934!4d-73.9602968!9m1!1b1!16s%2Fg%2F11gl11ydc1!3m7!1s0x89c2459fef3b7d45:0x3fecb4145a53c4d5!8m2!3d40.5905934!4d-73.9602968!9m1!1b1!16s%2Fg%2F11gl11ydc1?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";

const FEATURED_VIDEOS = [
  {
    title: "3-2-1 SPECIAL MORTGAGE PROGRAM 2023",
    desc: "How the 3-2-1 buydown can structure your early-year mortgage payments.",
    videoId: "QMJeFhBU2Ic",
  },
  {
    title: "Meet Ruslan Kushnir: Your Trusted Guide in the World of Mortgages",
    desc: "Get to know our team and how we guide borrowers from application to closing.",
    videoId: "U1R4kBZepqY",
  },
  {
    title: "Don't buy a house until you watch this video!",
    desc: "Important perspective before you make one of the largest purchases of your life.",
    videoId: "CaGjyUlpQ8w",
  },
];

const YOUTUBE_CHANNEL_VIDEOS = "https://www.youtube.com/@GSC.MORTGAGE/videos";

const LOAN_PROGRAMS = [
  { title: "Purchase Loans", desc: "Financing options for buying your dream home." },
  { title: "Refinance", desc: "Lower your rate or cash out your home equity." },
  { title: "First-Time Homebuyers", desc: "Special programs and guidance for new buyers." },
  { title: "Conventional, FHA & VA", desc: "Government-backed and traditional loan options." },
  { title: "Non-QM & Bank Statement", desc: "Flexible solutions for unique income situations." },
  { title: "Investment & DSCR", desc: "Financing for real estate investors and landlords." },
];

// ─── Вспомогательные компоненты ───────────────────────────────────────────────

// ИСПРАВЛЕНИЕ 1: useState внутри .map() — нарушение Rules of Hooks.
// Вынесен в отдельный компонент ReviewCard.
function ReviewCard({ review }: { review: (typeof GOOGLE_REVIEWS)[number] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowToggle = review.text.length > 200;
  const displayText =
    shouldShowToggle && !isExpanded
      ? review.text.slice(0, 200) + "..."
      : review.text;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {/* Google logo SVG */}
        <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
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

      <div className="flex items-center gap-2 mb-3">
        <p className="font-semibold text-foreground">{review.author}</p>
        <div className="flex text-yellow-400" aria-label={`${review.rating} stars`}>
          {Array.from({ length: review.rating }).map((_, j) => (
            <Star key={j} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{review.date}</p>
      <p className="text-sm text-foreground/80 mb-3">{displayText}</p>

      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
        >
          {isExpanded ? (
            <>Show less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Read more <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  );
}

// ИСПРАВЛЕНИЕ 2: добавлен error state — раньше ошибка молча глоталась,
// секция просто исчезала без какого-либо сигнала пользователю.
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
      } catch (err) {
        console.error("Failed to fetch market updates:", err);
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
      const diffDays = Math.ceil(
        Math.abs(Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Market Updates
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-manrope">
              Loading latest market news...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ИСПРАВЛЕНИЕ 2 (продолжение): показываем понятный fallback вместо null
  if (error || updates.length === 0) {
    return (
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Market Updates
            </h2>
            <p className="text-muted-foreground font-manrope">
              {error
                ? "Unable to load market updates. Please try again later."
                : "No market updates available at the moment."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Market Updates
            </h2>
            <p className="text-muted-foreground font-manrope">
              Latest news from Mortgage News Daily
            </p>
          </div>

          <a
            href="https://www.mortgagenewsdaily.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full md:w-auto">
              View All Updates <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, i) => (
            <a
              key={update.link || i}
              href={update.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  Market News
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(update.pubDate)}
                </span>
              </div>

              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {update.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {update.description}
              </p>

              <div className="mt-4 flex items-center text-primary text-sm font-medium">
                Read more <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Встроенный мини-калькулятор ──────────────────────────────────────────────

// ИСПРАВЛЕНИЕ 3: калькулятор был декоративным — inputs не влияли на результат.
// Теперь вычисление реальное.
function QuickCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const monthlyPayment = (() => {
    const principal = homePrice - downPayment;
    if (principal <= 0 || rate <= 0) return 0;
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
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
      <h3 className="text-2xl font-montserrat font-bold text-foreground mb-2">
        Mortgage Calculator
      </h3>
      <p className="text-muted-foreground mb-6 font-manrope">
        Get a quick estimate of your monthly payment.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="home-price"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Home Price
          </label>
          <input
            id="home-price"
            type="number"
            placeholder="500000"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="down-payment"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Down Payment
          </label>
          <input
            id="down-payment"
            type="number"
            placeholder="100000"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="interest-rate"
              className="mb-2 block text-sm font-medium text-muted-foreground"
            >
              Interest Rate
            </label>
            <input
              id="interest-rate"
              type="number"
              step="0.01"
              placeholder="6.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="loan-term"
              className="mb-2 block text-sm font-medium text-muted-foreground"
            >
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

      <div className="rounded-xl bg-muted/50 p-4 mb-6">
        <p className="text-sm text-muted-foreground mb-1">
          Estimated Monthly Payment
        </p>
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

// ─── Главная страница ─────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative flex min-h-[max(32rem,100dvh)] w-full items-end justify-center overflow-hidden pb-20 pt-[max(3rem,env(safe-area-inset-top))] sm:min-h-screen sm:pb-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/MAIN PAGE PIC.jpg"
            alt="Green Street Capital team"
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
            <h1 className="mb-6 font-montserrat text-4xl font-bold leading-[1.1] text-white sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Your Path to <span className="text-primary">Homeownership</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl font-manrope text-base leading-relaxed text-gray-200 sm:mb-12 sm:text-lg md:text-xl">
              Trusted mortgage solutions. Fast approvals. Competitive rates.
            </p>

            <div className="mx-auto flex max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-6">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg h-16 px-10 font-montserrat shadow-xl hover:shadow-2xl transition-all"
                >
                  Apply Now
                </Button>
              </Link>

              <Link href="/calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg h-16 px-10 border-white/40 text-white hover:bg-white hover:text-foreground font-montserrat backdrop-blur-sm transition-all"
                >
                  Mortgage Calculator
                </Button>
              </Link>

              <Link href="/team">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg h-16 px-10 border-white/40 text-white hover:bg-white hover:text-foreground font-montserrat backdrop-blur-sm transition-all"
                >
                  Find a Loan Officer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loan Programs */}
      <section className="py-16 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
                Loan Programs
              </h2>
              <p className="text-gray-400 font-manrope">
                Right solution for your situation.
              </p>
            </div>

            <Link href="/loan-programs">
              <Button variant="accent" className="text-white hover:bg-accent/90">
                View All Loan Programs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOAN_PROGRAMS.map((prog) => (
              <motion.div
                key={prog.title}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-3 text-white">{prog.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{prog.desc}</p>
                <Link
                  href="/loan-programs"
                  className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors"
                >
                  Learn More{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-muted"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-manrope">
              Real Clients. Real Solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SUCCESS_STORIES.map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {story.clientType}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">
                  {story.title}
                </h3>

                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Problem
                    </p>
                    <p className="text-sm text-foreground/80">{story.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Solution
                    </p>
                    <p className="text-sm text-foreground/80">{story.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      Result
                    </p>
                    <p className="text-sm text-foreground/80">{story.result}</p>
                  </div>
                </div>

                {/* ИСПРАВЛЕНИЕ 4: кнопка "Read the Story" была без действия.
                    Заменена на ссылку на страницу /success-stories. */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link href="/success-stories">
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

      {/* Google Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
                Google Reviews
              </h2>
              <p className="text-muted-foreground font-manrope">
                See what our clients say about us.
              </p>
            </div>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="w-full md:w-auto">
                View All Reviews on Google
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Featured Videos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-manrope">
              Expert guidance, market updates, and valuable resources for your
              home buying journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {FEATURED_VIDEOS.slice(0, 3).map((video, i) => (
              <div
                key={video.videoId}
                className="group rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {video.desc}
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

      {/* Market Updates */}
      <MarketUpdates />

      {/* Quick Resources */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
              Quick Resources
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-manrope">
              Tools and guides to help you on your home buying journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ИСПРАВЛЕНИЕ 3: заменён декоративный калькулятор на рабочий компонент */}
            <QuickCalculator />

            {/* First-Time Homebuyer Guide */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 flex flex-col">
              <div className="flex-1">
                <div className="mb-6 aspect-[3/4] max-w-[200px] mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary/60" />
                </div>

                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-3 text-center">
                  First-Time Homebuyer Guide
                </h3>
                <p className="text-muted-foreground text-center mb-6 font-manrope">
                  Everything you need to know about buying your first home. From
                  understanding mortgage basics to navigating the closing process.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    "Understanding mortgage basics",
                    "Choosing the right loan program",
                    "Preparing for pre-approval",
                    "Navigating the closing process",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      <p className="text-sm text-foreground">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/buyers-handbook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="accent" className="w-full" size="lg">
                  Get the Guide
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-6">
                  Contact Us
                </h2>
                <p className="text-muted-foreground text-lg font-manrope">
                  Ready to take the next step? Our team is here to help.
                </p>
              </div>

              <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div>
                  <h4 className="font-montserrat font-bold text-xl text-foreground">
                    Green Street Capital, LLC
                  </h4>
                  <p className="text-sm text-muted-foreground">NMLS #2066586</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mr-3 mt-1 shrink-0" />
                    <p className="text-foreground font-medium">
                      2709 Coney Island Ave, 3rd Floor
                      <br />
                      Brooklyn, NY 11235
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <a
                      href="tel:+18556154545"
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      Toll Free: 855-615-4545
                    </a>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <a
                      href="mailto:Info@GSCMortgage.com"
                      className="text-foreground font-medium hover:text-primary transition-colors"
                    >
                      Info@GSCMortgage.com
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-muted-foreground mb-4">Follow Us</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.instagram.com/gsc.mortgage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.facebook.com/greenstreetcapital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>

                    <a
                      href="https://twitter.com/greenstreetcap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/green-street-capital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.youtube.com/@GSC.MORTGAGE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <iframe
                  title="Green Street Capital office location"
                  src="https://maps.google.com/maps?q=Green+Street+Capital+2709+Coney+Island+Ave+3rd+Floor+Brooklyn+NY+11235&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Green Street Capital, LLC — 2709 Coney Island Ave, 3rd Floor,
                Brooklyn, NY 11235
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}