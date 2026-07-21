import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-5">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-32 sm:w-32 md:h-36 md:w-36">
                <Image
                  src="/images/logo.png"
                  alt="Green Street Capital"
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

            <p className="text-gray-400 text-base leading-relaxed">
              Your trusted partner for home purchases, refinancing, and mortgage
              solutions across NY, NJ, FL, and PA.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/gsc.mortgage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.facebook.com/greenstreetcapital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com/greenstreetcap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/green-street-capital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://www.youtube.com/@GSC.MORTGAGE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">
              Loan Programs
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/loan-programs"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Conventional Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/loan-programs"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  FHA Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/loan-programs"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  VA Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/loan-programs"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Jumbo Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/loan-programs"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Refinance Options
                </Link>
              </li>
              <li>
                <Link
                  href="/loan-programs"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Non-QM & Bank Statement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">
              Locations & Specialties
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/locations/new-york"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  New York
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/new-jersey"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  New Jersey
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/florida"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Florida
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/pennsylvania"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Pennsylvania
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties/first-time-buyers"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  First-Time Homebuyers
                </Link>
              </li>
              <li>
                <Link
                  href="/specialties/investment"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Investment Properties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">
              Company Info
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <strong className="text-white block">Green Street Capital, LLC</strong>
              </li>
              <li>NMLS #2066586</li>
              <li className="pt-2">
                <a
                  href="https://www.nmlsconsumeraccess.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  NMLS Consumer Access
                </a>
              </li>
              <li className="pt-2">
                <strong className="text-white block mb-1">
                  States Served:
                </strong>
                NY, NJ, FL, PA
              </li>
              <li className="pt-2">
                <strong className="text-white block mb-1">
                  Licensed In:
                </strong>
              </li>
              <li className="text-xs">
                NYS Dept of Financial Services<br />
                NJ Dept of Banking & Insurance<br />
                FL Office of Financial Regulation<br />
                PA Dept of Banking & Securities
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-gray-500 text-center leading-relaxed">
          <p className="mb-2">
            Registered Mortgage Broker | NYS Department of Financial Services |
            NJ Department of Banking and Insurance | Florida Office of Financial
            Regulation | PA Department of Banking and Securities | Loans
            arranged with third party lenders | NMLS #2066586
          </p>

          <p className="mb-4">
            Mortgage Broker will not make any mortgage loan commitments or fund
            any mortgage loans.
          </p>

          <p>
            &copy; {new Date().getFullYear()} Green Street Capital, LLC. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}