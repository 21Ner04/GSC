import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { getFooterNav, getSite } from "@/lib/cms";

export function Footer() {
  const site = getSite();
  const nav = getFooterNav();

  return (
    <footer className="bg-foreground pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 text-white sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-5 sm:space-y-6">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-24 sm:w-24 md:h-28 md:w-28">
                <Image
                  src="/images/logo.png"
                  alt={site.companyName}
                  width={112}
                  height={112}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <span className="font-montserrat text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl">
                  Green Street
                </span>
                <span className="font-manrope mt-0.5 text-xs font-bold uppercase tracking-[0.22em] text-primary sm:mt-1 sm:text-sm sm:tracking-[0.28em] md:text-base">
                  Capital
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-gray-400 sm:text-base">
              {site.brandTagline}
            </p>

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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent active:bg-accent/90"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 inline-block border-b border-white/10 pb-2 font-montserrat text-base font-bold text-white sm:mb-6 sm:text-lg">
              Loan Programs
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {nav.loanPrograms.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 inline-block border-b border-white/10 pb-2 font-montserrat text-base font-bold text-white sm:mb-6 sm:text-lg">
              Locations & Specialties
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {nav.locations.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {nav.specialties.slice(0, 3).map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-sm sm:text-base">
                <Link
                  href="/locations"
                  className="text-primary transition-colors hover:underline"
                >
                  All locations
                </Link>
                <span className="text-gray-600" aria-hidden>
                  ·
                </span>
                <Link
                  href="/specialties"
                  className="text-primary transition-colors hover:underline"
                >
                  All specialties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 inline-block border-b border-white/10 pb-2 font-montserrat text-base font-bold text-white sm:mb-6 sm:text-lg">
              Company Info
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400 sm:space-y-3">
              <li>
                <strong className="block text-white">{site.legalName}</strong>
              </li>
              <li>NMLS #{site.nmls}</li>
              <li className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
                <Link href="/team" className="hover:text-primary">
                  Team
                </Link>
                <Link href="/schedule" className="hover:text-primary">
                  Schedule
                </Link>
                <Link href="/calculator" className="hover:text-primary">
                  Calculator
                </Link>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li className="break-anywhere pt-1">{site.address.full}</li>
              <li>
                <a
                  href={`tel:${site.phones.localTel}`}
                  className="hover:text-primary"
                >
                  Local: {site.phones.local}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phones.tollFreeTel}`}
                  className="hover:text-primary"
                >
                  Toll Free: {site.phones.tollFree}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-anywhere hover:text-primary"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={site.nmlsConsumerAccessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  NMLS Consumer Access
                </a>
              </li>
              <li className="pt-2">
                <strong className="mb-1 block text-white">States Served:</strong>
                {site.statesServed.join(", ")}
              </li>
              <li className="text-xs leading-relaxed">
                {site.licensedIn.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-[11px] leading-relaxed text-gray-500 sm:pt-8 sm:text-xs">
          {site.footerDisclaimer.map((line) => (
            <p key={line.slice(0, 40)} className="mb-2 break-anywhere">
              {line}
            </p>
          ))}
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
