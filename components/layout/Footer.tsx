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
    <footer className="bg-foreground pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-5">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36">
                <Image
                  src="/images/logo.png"
                  alt={site.companyName}
                  width={144}
                  height={144}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-montserrat text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  Green Street
                </span>
                <span className="font-manrope mt-1 text-sm font-bold uppercase tracking-[0.28em] text-primary md:text-base">
                  Capital
                </span>
              </div>
            </Link>

            <p className="text-base leading-relaxed text-gray-400">{site.brandTagline}</p>

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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 inline-block border-b border-white/10 pb-2 font-montserrat text-lg font-bold text-white">
              Loan Programs
            </h3>
            <ul className="space-y-3">
              {nav.loanPrograms.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 inline-block border-b border-white/10 pb-2 font-montserrat text-lg font-bold text-white">
              Locations & Specialties
            </h3>
            <ul className="space-y-3">
              {nav.locations.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {nav.specialties.slice(0, 3).map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-primary transition-colors hover:underline"
                >
                  All locations
                </Link>
                {" · "}
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
            <h3 className="mb-6 inline-block border-b border-white/10 pb-2 font-montserrat text-lg font-bold text-white">
              Company Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <strong className="block text-white">{site.legalName}</strong>
              </li>
              <li>NMLS #{site.nmls}</li>
              <li className="pt-1">{site.address.full}</li>
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
                <a href={`mailto:${site.email}`} className="hover:text-primary">
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
              <li className="text-xs">
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

        <div className="border-t border-white/10 pt-8 text-center text-xs leading-relaxed text-gray-500">
          {site.footerDisclaimer.map((line) => (
            <p key={line.slice(0, 40)} className="mb-2">
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
