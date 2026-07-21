"use client";

import Image from "next/image";
import {
  Instagram,
  Facebook,
  Youtube,
  BadgeCheck,
} from "lucide-react";

/** TikTok (not in lucide) */
function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/** Google “G” multicolor mark */
function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
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
  );
}

function telHref(phone: string) {
  // Keep extension out of tel: when possible
  const base = phone.split(/ext\.?/i)[0].replace(/\D/g, "");
  return base ? `tel:${base}` : undefined;
}

export type EmailSignatureSocial = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  /** Opens Gmail compose or mailto */
  google?: string;
};

export type EmailSignatureProps = {
  photoUrl?: string;
  logoUrl?: string;
  name?: string;
  nmls?: string;
  companyName?: string;
  companyNmls?: string;
  verified?: boolean;
  directLine?: string;
  office?: string;
  tollFree?: string;
  fax?: string;
  email?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  address?: string;
  secureDocsUrl?: string;
  applyUrl?: string;
  social?: EmailSignatureSocial;
  className?: string;
};

const DEFAULTS = {
  photoUrl: "/images/avatar-1.png",
  logoUrl: "/images/logo.png",
  name: "Maxim Saleh",
  nmls: "2542660",
  companyName: "Green Street Capital, LLC",
  companyNmls: "2066586",
  directLine: "917-318-7571",
  office: "718-615-4545 ext.313",
  tollFree: "855-615-4545",
  fax: "718-819-1127",
  email: "MSaleh@GSCMortgage.com",
  websiteUrl: "https://www.greenstreetcapitalgroup.com",
  websiteLabel: "www.GreenStreetCapitalGroup.com",
  address: "2709 Coney Island Ave, 3rd Floor, Brooklyn, NY, 11235",
  secureDocsUrl: "https://documentguardian.com/filedrop/MSaleh@GSCMortgage.com",
  applyUrl: "/apply",
  social: {
    instagram: "https://www.instagram.com/gsc.mortgage",
    facebook: "https://www.facebook.com/greenstreetcapital",
    tiktok: "https://www.tiktok.com/@gsc.mortgage",
    youtube: "https://www.youtube.com/@GSC.MORTGAGE",
    google: "MSaleh@GSCMortgage.com",
  } satisfies EmailSignatureSocial,
};

function googleHref(value: string) {
  const v = value.trim();
  if (!v) return "#";
  if (v.startsWith("http") || v.startsWith("mailto:")) return v;
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(v)}`;
}

/**
 * Pixel-faithful email-signature card (Custom eSignature layout).
 * Photo left · 2px black rule · brand + contacts + social + Apply Now.
 */
export function EmailSignature({
  photoUrl = DEFAULTS.photoUrl,
  logoUrl = DEFAULTS.logoUrl,
  name = DEFAULTS.name,
  nmls = DEFAULTS.nmls,
  companyName = DEFAULTS.companyName,
  companyNmls = DEFAULTS.companyNmls,
  verified = true,
  directLine = DEFAULTS.directLine,
  office = DEFAULTS.office,
  tollFree = DEFAULTS.tollFree,
  fax = DEFAULTS.fax,
  email = DEFAULTS.email,
  websiteUrl = DEFAULTS.websiteUrl,
  websiteLabel = DEFAULTS.websiteLabel,
  address = DEFAULTS.address,
  secureDocsUrl = DEFAULTS.secureDocsUrl,
  applyUrl = DEFAULTS.applyUrl,
  social = DEFAULTS.social,
  className = "",
}: EmailSignatureProps) {
  const socialBox =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-700 transition hover:bg-gray-50";

  return (
    <div
      className={`flex max-w-[680px] items-start bg-white p-4 font-sans text-sm text-gray-900 ${className}`}
    >
      {/* ===== PHOTO — ~140×140, 16px radius ===== */}
      <div className="shrink-0">
        <div className="h-[140px] w-[140px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <Image
            src={photoUrl}
            alt={name}
            width={140}
            height={140}
            className="h-full w-full object-cover object-top"
            priority={false}
          />
        </div>
      </div>

      {/* ===== VERTICAL RULE — 2px black ===== */}
      <div className="mx-5 mb-1 mt-1 w-[2px] self-stretch bg-black" aria-hidden />

      {/* ===== RIGHT COLUMN ===== */}
      <div className="min-w-0 flex-1 pt-0">
        {/* Logo */}
        <div className="mb-3">
          <Image
            src={logoUrl}
            alt="Green Street Capital"
            width={180}
            height={60}
            className="h-14 w-auto object-contain object-left"
          />
        </div>

        {/* Name + verification */}
        <div className="mb-0.5 flex items-center gap-1.5">
          <h2 className="text-[22px] font-bold leading-tight text-gray-900">
            {name}
          </h2>
          {verified && (
            <BadgeCheck
              className="h-5 w-5 shrink-0 fill-blue-500 text-white"
              aria-label="Verified"
            />
          )}
        </div>

        <p className="mb-3 text-[13px] text-gray-600">NMLS # {nmls}</p>

        <p className="text-[15px] font-bold leading-snug text-gray-900">
          {companyName}
        </p>
        <p className="mb-2 text-[13px] text-gray-700">NMLS # {companyNmls}</p>

        {/* Phones */}
        <div className="mb-2 space-y-0.5 text-[13.5px] leading-relaxed">
          {directLine && (
            <p>
              <span className="font-medium">Direct Line</span>{" "}
              <a
                href={telHref(directLine)}
                className="text-gray-900 hover:underline"
              >
                {directLine}
              </a>
            </p>
          )}
          {office && (
            <p>
              <span className="font-medium">Office</span>{" "}
              <a href={telHref(office)} className="text-gray-900 hover:underline">
                {office}
              </a>
            </p>
          )}
          {tollFree && (
            <p>
              <span className="font-medium">Toll Free</span>{" "}
              <a
                href={telHref(tollFree)}
                className="text-gray-900 hover:underline"
              >
                {tollFree}
              </a>
            </p>
          )}
          {fax && (
            <p>
              <span className="font-medium">Fax</span> {fax}
            </p>
          )}
        </div>

        {/* Email + website */}
        <div className="mb-2 space-y-0.5">
          {email && (
            <a
              href={`mailto:${email}`}
              className="block text-[13.5px] text-blue-600 hover:underline"
            >
              {email}
            </a>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[13.5px] text-blue-600 hover:underline"
            >
              {websiteLabel || websiteUrl.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>

        {/* Address */}
        {address && (
          <p className="mb-2 text-[13px] leading-snug text-gray-700">{address}</p>
        )}

        {/* Secure docs */}
        {secureDocsUrl && (
          <a
            href={secureDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 inline-block text-[13.5px] font-medium text-blue-600 hover:underline"
          >
            Send Secure Docs
          </a>
        )}

        {/* Social + Apply */}
        <div className="flex flex-wrap items-center gap-2.5">
          {social?.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBox}
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4 text-gray-700" />
            </a>
          )}
          {social?.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBox}
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4 text-gray-700" />
            </a>
          )}
          {social?.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBox}
              aria-label="TikTok"
            >
              <TikTokIcon className="h-4 w-4 text-gray-700" />
            </a>
          )}
          {social?.youtube && (
            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBox}
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4 text-gray-700" />
            </a>
          )}
          {social?.google && (
            <a
              href={googleHref(social.google)}
              target="_blank"
              rel="noopener noreferrer"
              className={socialBox}
              aria-label="Gmail"
            >
              <GoogleIcon className="h-4 w-4" />
            </a>
          )}

          {applyUrl && (
            <a
              href={applyUrl}
              className="ml-1 rounded bg-black px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-gray-800"
            >
              Apply Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailSignature;
