import Link from "next/link";
import { Button } from "@/components/ui/button";

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";

const aboutSeo = {
  title: "About Us | Mortgage Broker Serving NY, NJ, FL & PA",
  description:
    "Learn about Green Street Capital, LLC (NMLS #2066586) — Brooklyn mortgage broker for purchase, refinance, and specialty loan programs in NY, NJ, FL & PA.",
  keywords: [
    "Green Street Capital",
    "mortgage broker about",
    "NMLS 2066586",
    "Brooklyn mortgage broker",
  ],
};

export const metadata: Metadata = buildPageMetadata(aboutSeo, { path: "/about" });

export default function About() {
  return (
    <div className="w-full overflow-x-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />
      <WebPageJsonLd
        type="AboutPage"
        name={aboutSeo.title}
        description={aboutSeo.description}
        path="/about"
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About Us" }]} />
      <div className="page-hero bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="page-hero-title">About Green Street Capital</h1>
          <p className="page-hero-sub">
            Dedicated to transforming the mortgage experience through transparency, speed, and
            exceptional service.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="mb-4 font-montserrat text-2xl font-bold text-foreground sm:mb-6 sm:text-3xl">
              Our Story
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Green Street Capital was founded on the belief that every family deserves access to
                fair, transparent mortgage financing. With over 20 years in the industry, we&apos;ve
                helped thousands of clients achieve their homeownership dreams across New York, New
                Jersey, Florida, and Pennsylvania.
              </p>
              <p>
                As an independent mortgage broker, we don&apos;t work for a single bank — we work for
                you. We partner with dozens of the nation&apos;s top wholesale lenders to shop for the
                most competitive rates and terms available in the market today.
              </p>
              <p>
                Our mission is simple: to provide a stress-free, fast, and educational mortgage
                process that puts our clients&apos; financial well-being first.
              </p>
            </div>
            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link href="/team" className="block w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Meet Our Team
                </Button>
              </Link>
              <Link href="/contact" className="block w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden sm:overflow-visible">
            <div className="absolute inset-0 -z-10 hidden translate-x-4 translate-y-4 rounded-3xl bg-primary/20 sm:block" />
            <div className="flex min-h-[22rem] w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl sm:min-h-[28rem] sm:rounded-3xl md:h-[500px]">
              <div className="p-6 text-center sm:p-8">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/90 shadow-xl sm:mb-8 sm:h-32 sm:w-32">
                  <img
                    src="/images/logo.png"
                    alt="Green Street Capital"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mb-2 font-montserrat text-xl font-bold text-foreground sm:text-2xl">
                  20+ Years
                </h3>
                <p className="text-base text-muted-foreground sm:text-lg">Of Trusted Service</p>
                <div className="mt-5 space-y-2 sm:mt-6">
                  <p className="text-2xl font-bold text-primary sm:text-3xl">$1B+ Funded</p>
                  <p className="text-base text-muted-foreground sm:text-lg">
                    Thousands of Happy Clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-montserrat text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl md:mb-16">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-3 md:gap-10">
            <div className="card-stable rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-3 text-lg font-bold text-primary sm:mb-4 sm:text-xl">
                Transparency
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                No hidden fees, no last-minute surprises. We explain every cost and term clearly
                upfront so you can make informed decisions.
              </p>
            </div>
            <div className="card-stable rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-3 text-lg font-bold text-secondary sm:mb-4 sm:text-xl">
                Speed & Efficiency
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Our streamlined digital process and in-house expertise mean faster approvals and
                on-time closings, every time.
              </p>
            </div>
            <div className="card-stable rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-3 text-lg font-bold text-accent sm:mb-4 sm:text-xl">
                Client-First Approach
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                We&apos;re relationship-focused. We build long-term partnerships to serve your
                lifetime real estate needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Culture */}
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <div className="min-w-0 flex-1">
              <h2 className="mb-3 font-montserrat text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl">
                Company Culture
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                At Green Street Capital, we believe in hard work, dedication, and going the extra
                mile for our clients. Our team is committed to excellence in everything we do, from
                the first consultation to the closing table and beyond.
              </p>
            </div>
            <div className="w-full shrink-0 md:w-auto">
              <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-xl shadow-md sm:h-48 md:h-40 md:w-64">
                <img
                  src={"/caR%20PIC.png"}
                  alt="Company vehicle"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
