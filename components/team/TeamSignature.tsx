"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import { Instagram, Facebook, Youtube } from "lucide-react";

// ===== Icons =====
const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const GoogleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

// ===== Types =====
export interface TeamMember {
  id?: string;
  name: string;
  nmls: string;
  /** Optional headshot: /team/name.jpg */
  photo?: string;
  direct: string;
  office: string;
  tollFree?: string;
  fax?: string;
  email: string;
  secureDocs: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    google?: string;
  };
  applyLink?: string;
  /** Empty reserved slot */
  placeholder?: boolean;
}

interface Props {
  member: TeamMember;
  logoSrc?: string;
  className?: string;
  verified?: boolean;
}

function telHref(phone: string) {
  if (!phone || phone === "—" || phone === "-") return undefined;
  const base = phone.split(/ext\.?/i)[0].replace(/\D/g, "");
  return base ? `tel:${base}` : undefined;
}

function googleHref(value: string) {
  const v = value.trim();
  if (!v || v === "#") return undefined;
  if (v.startsWith("http") || v.startsWith("mailto:")) return v;
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(v)}`;
}

function SocialButton({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: ReactNode;
}) {
  if (!href || href === "#") {
    return (
      <span
        title={`${label} (coming soon)`}
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-gray-300"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
    >
      {children}
    </a>
  );
}

/**
 * Email-signature layout:
 * Photo left · 2px black rule · logo, name, contacts, socials, Apply Now.
 */
export function TeamSignature({
  member,
  logoSrc = "/images/logo.png",
  className = "",
  verified = true,
}: Props) {
  const isPlaceholder = !!member.placeholder;
  const showVerified = verified && !isPlaceholder;
  const [photoError, setPhotoError] = useState(false);
  const gmail = member.socials?.google
    ? googleHref(member.socials.google)
    : member.email
      ? googleHref(member.email)
      : undefined;

  const initials = member.name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const showPhoto = Boolean(member.photo) && !photoError;

  return (
    <div
      className={`flex w-full min-w-0 max-w-full items-start bg-white font-sans text-gray-900 ${className}`}
    >
      {/* ===== PHOTO + LOGO (under photo) ===== */}
      <div className="flex w-[120px] shrink-0 flex-col items-center sm:w-[150px] lg:w-[170px]">
        <div className="flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm sm:h-[150px] sm:w-[150px]">
          {showPhoto ? (
            <Image
              src={member.photo as string}
              alt={member.name}
              width={150}
              height={150}
              className="h-full w-full object-cover object-top"
              onError={() => setPhotoError(true)}
            />
          ) : (
            <span
              className="select-none font-sans text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl"
              aria-hidden
            >
              {isPlaceholder ? "?" : initials}
            </span>
          )}
        </div>

      </div>

      {/* ===== VERTICAL BLACK LINE ===== */}
      <div
        className="mx-3 my-1 w-[2px] shrink-0 self-stretch bg-black sm:mx-5"
        aria-hidden
      />

      {/* ===== RIGHT COLUMN ===== */}
      <div className="min-w-0 flex-1 overflow-hidden pt-0.5">
        {isPlaceholder ? (
          <div className="flex min-h-[150px] flex-col justify-center py-2">
            <h2 className="mb-1 text-[21px] font-bold leading-none tracking-tight text-gray-400">
              Coming Soon
            </h2>
            <p className="mb-4 text-[13px] text-gray-400">
              Team member details & photo will be added here
            </p>
            <a
              href="/apply"
              className="inline-block w-fit rounded bg-black px-4 py-[7px] text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
            >
              Apply Now
            </a>
          </div>
        ) : (
          <>
            {/* Name + check */}
            <div className="mb-0.5 flex items-center gap-1.5">
              <h2 className="text-[21px] font-bold leading-none tracking-tight">
                {member.name}
              </h2>
              {showVerified && (
                <span
                  className="text-[17px] leading-none text-[#1DA1F2]"
                  aria-label="Verified"
                >
                  ✓
                </span>
              )}
            </div>

            {member.nmls && member.nmls !== "—" && (
              <p className="mb-2.5 text-[13px] text-gray-600">
                NMLS # {member.nmls}
              </p>
            )}

            {/* Company */}
            <p className="text-[15px] font-bold leading-tight">
              Green Street Capital, LLC
            </p>
            <p className="mb-2 text-[13px] text-gray-700">NMLS # 2066586</p>

            {/* Phones */}
            <div className="mb-2 space-y-[2px] text-[13.5px] leading-snug">
              {member.direct && (
                <p>
                  <span className="font-medium">Direct Line</span>{" "}
                  <a
                    href={telHref(member.direct)}
                    className="hover:underline"
                  >
                    {member.direct}
                  </a>
                </p>
              )}
              {member.office && (
                <p>
                  <span className="font-medium">Office</span>{" "}
                  <a
                    href={telHref(member.office)}
                    className="hover:underline"
                  >
                    {member.office}
                  </a>
                </p>
              )}
              {member.tollFree && (
                <p>
                  <span className="font-medium">Toll Free</span>{" "}
                  <a
                    href={telHref(member.tollFree)}
                    className="hover:underline"
                  >
                    {member.tollFree}
                  </a>
                </p>
              )}
              {member.fax && (
                <p>
                  <span className="font-medium">Fax</span> {member.fax}
                </p>
              )}
            </div>

            {/* Email */}
            {member.email && (
              <div className="mb-1.5">
                <a
                  href={`mailto:${member.email}`}
                  className="block break-all text-[13.5px] text-blue-600 hover:underline"
                >
                  {member.email}
                </a>
              </div>
            )}

            {/* Send Secure Docs */}
            {member.secureDocs && (
              <a
                href={member.secureDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 inline-block text-[13.5px] font-medium text-blue-600 hover:underline"
              >
                Send Secure Docs
              </a>
            )}

            {/* Socials + Apply */}
            <div className="flex flex-wrap items-center gap-2">
              {member.socials?.instagram !== undefined && (
                <SocialButton href={member.socials.instagram} label="Instagram">
                  <Instagram className="h-4 w-4" />
                </SocialButton>
              )}
              {member.socials?.facebook !== undefined && (
                <SocialButton href={member.socials.facebook} label="Facebook">
                  <Facebook className="h-4 w-4" />
                </SocialButton>
              )}
              {member.socials?.tiktok !== undefined && (
                <SocialButton href={member.socials.tiktok} label="TikTok">
                  <TikTokIcon />
                </SocialButton>
              )}
              {member.socials?.youtube !== undefined && (
                <SocialButton href={member.socials.youtube} label="YouTube">
                  <Youtube className="h-4 w-4" />
                </SocialButton>
              )}
              {(member.socials?.google !== undefined || member.email) && (
                <SocialButton href={gmail} label="Gmail">
                  <GoogleIcon />
                </SocialButton>
              )}

              <a
                href={member.applyLink || "/apply"}
                className="ml-1 rounded bg-black px-4 py-[7px] text-[13px] font-medium text-white transition-colors hover:bg-gray-800"
              >
                Apply Now
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeamSignature;
