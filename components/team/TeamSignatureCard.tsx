import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Building2,
  PhoneCall,
  Printer,
  Mail,
  Globe,
  MapPin,
  Shield,
  Calendar,
  FileText,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TeamSocialLinks = {
  youtube?: string;
  facebook?: string;
  /** Email address or mailto: / Gmail compose URL */
  gmail?: string;
  linkedin?: string;
  instagram?: string;
};

export type TeamMemberSignature = {
  id?: string;
  name: string;
  title: string;
  nmls: string;
  companyName?: string;
  companyNmls?: string;
  photoSrc?: string;
  photoAlt?: string;
  logoSrc?: string;
  directLine?: string;
  office?: string;
  tollFree?: string;
  fax?: string;
  email?: string;
  website?: string;
  websiteLabel?: string;
  address?: string;
  secureDocsUrl?: string;
  applyPortalUrl?: string;
  scheduleHref?: string;
  bio?: string;
  licensedStates?: string;
  social?: TeamSocialLinks;
};

type Props = {
  member: TeamMemberSignature;
  className?: string;
};

function telHref(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

function gmailHref(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (v.startsWith("http://") || v.startsWith("https://") || v.startsWith("mailto:")) {
    return v;
  }
  // plain email → open Gmail compose (falls back to mailto in non-Gmail clients via browser)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(v)}`;
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex min-w-0 items-start gap-2 text-sm text-foreground/90">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-3 w-3" />
      </span>
      <span className="min-w-0 leading-snug">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="break-anywhere text-[13px] font-medium text-foreground">
          {value}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className="rounded-md transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        {content}
      </a>
    );
  }

  return content;
}

function SocialIconButton({
  href,
  label,
  className,
  children,
}: {
  href?: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const base =
    "inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        aria-label={label}
        title={label}
        className={cn(base, className, "hover:scale-105 hover:opacity-95 active:scale-95")}
      >
        {children}
      </a>
    );
  }

  // Always show icon slot (ready for personal links)
  return (
    <span
      aria-label={`${label} (coming soon)`}
      title={`${label} — link coming soon`}
      className={cn(base, "cursor-default bg-gray-200 text-gray-400 shadow-none")}
    >
      {children}
    </span>
  );
}

function TeamSocialRow({ social }: { social?: TeamSocialLinks }) {
  const gmail = social?.gmail ? gmailHref(social.gmail) : "";

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Social profiles">
      <SocialIconButton
        href={social?.youtube || undefined}
        label="YouTube"
        className="bg-[#FF0000] focus-visible:ring-red-500"
      >
        <Youtube className="h-4 w-4" />
      </SocialIconButton>
      <SocialIconButton
        href={social?.facebook || undefined}
        label="Facebook"
        className="bg-[#1877F2] focus-visible:ring-blue-500"
      >
        <Facebook className="h-4 w-4" />
      </SocialIconButton>
      <SocialIconButton
        href={gmail || undefined}
        label="Gmail"
        className="bg-[#EA4335] focus-visible:ring-red-400"
      >
        {/* Gmail-style envelope */}
        <Mail className="h-4 w-4" />
      </SocialIconButton>
      <SocialIconButton
        href={social?.linkedin || undefined}
        label="LinkedIn"
        className="bg-[#0A66C2] focus-visible:ring-sky-600"
      >
        <Linkedin className="h-4 w-4" />
      </SocialIconButton>
      <SocialIconButton
        href={social?.instagram || undefined}
        label="Instagram"
        className="bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] focus-visible:ring-pink-500"
      >
        <Instagram className="h-4 w-4" />
      </SocialIconButton>
    </div>
  );
}

/**
 * Compact signature-style team card (fits 3 per row on desktop).
 * Each card includes YouTube, Facebook, Gmail, LinkedIn, Instagram icons.
 */
export function TeamSignatureCard({ member, className }: Props) {
  const company = member.companyName || "Green Street Capital, LLC";
  const companyNmls = member.companyNmls || "2066586";
  const website = member.website || "https://www.greenstreetcapitalgroup.com";
  const websiteLabel = member.websiteLabel || "www.GreenStreetCapitalGroup.com";

  // Prefer explicit social.gmail, else email for Gmail icon
  const social: TeamSocialLinks = {
    youtube: member.social?.youtube,
    facebook: member.social?.facebook,
    linkedin: member.social?.linkedin,
    instagram: member.social?.instagram,
    gmail: member.social?.gmail || member.email,
  };

  const hasContact =
    member.directLine ||
    member.office ||
    member.tollFree ||
    member.fax ||
    member.email ||
    member.website ||
    member.address;

  return (
    <article
      className={cn(
        "card-stable flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl",
        className
      )}
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-muted shadow-sm">
            {member.photoSrc ? (
              <Image
                src={member.photoSrc}
                alt={member.photoAlt || member.name}
                fill
                className="object-cover"
                sizes="72px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10">
                <span className="font-montserrat text-lg font-bold text-primary">
                  {member.name
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 3)}
                </span>
              </div>
            )}
          </div>
          <div className="relative h-12 w-12 shrink-0 overflow-hidden sm:h-14 sm:w-14">
            <Image
              src={member.logoSrc || "/images/logo.png"}
              alt={company}
              fill
              className="object-contain"
              sizes="56px"
            />
          </div>
        </div>

        <header className="mb-3 border-b border-gray-100 pb-3">
          <h3 className="font-montserrat text-lg font-bold leading-tight tracking-tight text-foreground">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-primary">{member.title}</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">NMLS # {member.nmls}</span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {company}
            <span className="mx-1 text-gray-300">·</span>
            NMLS # {companyNmls}
          </p>
          {member.licensedStates && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Licensed: {member.licensedStates}
            </p>
          )}
        </header>

        {/* Social icons — always visible for all 14 members */}
        <div className="mb-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Connect
          </p>
          <TeamSocialRow social={social} />
        </div>

        {hasContact && (
          <div className="flex flex-col gap-2.5">
            {member.directLine && (
              <ContactRow
                icon={Phone}
                label="Direct Line"
                value={member.directLine}
                href={telHref(member.directLine)}
              />
            )}
            {member.office && (
              <ContactRow
                icon={Building2}
                label="Office"
                value={member.office}
                href={telHref(member.office)}
              />
            )}
            {member.tollFree && (
              <ContactRow
                icon={PhoneCall}
                label="Toll Free"
                value={member.tollFree}
                href={telHref(member.tollFree)}
              />
            )}
            {member.fax && (
              <ContactRow icon={Printer} label="Fax" value={member.fax} />
            )}
            {member.email && (
              <ContactRow
                icon={Mail}
                label="Email"
                value={member.email}
                href={`mailto:${member.email}`}
              />
            )}
            {(member.website || member.websiteLabel) && (
              <ContactRow
                icon={Globe}
                label="Website"
                value={websiteLabel}
                href={website}
              />
            )}
            {member.address && (
              <ContactRow icon={MapPin} label="Address" value={member.address} />
            )}
          </div>
        )}

        {member.bio && (
          <p className="mt-3 text-xs leading-relaxed text-foreground/75 sm:text-sm">
            {member.bio}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-5">
          {member.secureDocsUrl && (
            <a
              href={member.secureDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button variant="accent" className="h-10 w-full gap-2 text-sm">
                <Shield className="h-4 w-4 shrink-0" />
                Send Secure Docs
              </Button>
            </a>
          )}
          {member.scheduleHref && (
            <Link href={member.scheduleHref} className="block w-full">
              <Button className="h-10 w-full gap-2 text-sm">
                <Calendar className="h-4 w-4 shrink-0" />
                Book Time with Me
              </Button>
            </Link>
          )}
          {member.applyPortalUrl && (
            <a
              href={member.applyPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button variant="outline" className="h-10 w-full gap-2 text-sm">
                <FileText className="h-4 w-4 shrink-0" />
                Apply with Me
              </Button>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
