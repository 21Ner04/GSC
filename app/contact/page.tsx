"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";
import { getSite } from "@/lib/cms";

export default function Contact() {
  const site = getSite();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          website: formData.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            "Could not send your message. Please email us directly or call the office."
        );
        return;
      }
      setSent(true);
      setFormData({ name: "", email: "", phone: "", message: "", website: "" });
    } catch {
      setError(
        "Network error. Please try again or email " + site.email + " directly."
      );
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    [site.social.instagram, Instagram, "Instagram"],
    [site.social.facebook, Facebook, "Facebook"],
    [site.social.twitter, Twitter, "Twitter"],
    [site.social.linkedin, Linkedin, "LinkedIn"],
    [site.social.youtube, Youtube, "YouTube"],
  ] as const;

  return (
    <div className="w-full overflow-x-hidden pb-20 sm:pb-24">
      <div className="page-hero">
        <h1 className="page-hero-title">Contact Us</h1>
        <p className="page-hero-sub">
          Company phone, email, and address. Choose a loan officer on our Meet Our Team page for
          personal scheduling and applications.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="mb-6 font-montserrat text-2xl font-bold text-foreground sm:mb-8 sm:text-3xl">
              Get in Touch
            </h2>
            <div className="card-stable space-y-6 rounded-2xl bg-muted p-5 sm:space-y-8 sm:rounded-3xl sm:p-8">
              <div>
                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  {site.legalName}
                </h3>
                <p className="text-sm text-muted-foreground">NMLS #{site.nmls}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Serving {site.statesServed.join(", ")}
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">
                      <a href={`tel:${site.phones.localTel}`} className="hover:text-primary">
                        Office: {site.phones.local}
                      </a>
                    </p>
                    <p className="font-medium text-foreground">
                      <a href={`tel:${site.phones.tollFreeTel}`} className="hover:text-primary">
                        Toll Free: {site.phones.tollFree}
                      </a>
                    </p>
                    {site.phones.fax && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fax: {site.phones.fax}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={`mailto:${site.email}`}
                    className="break-anywhere min-w-0 font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </div>
                <div className="flex items-start">
                  <Globe className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <a
                    href={site.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-anywhere min-w-0 font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {site.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="min-w-0 font-medium text-foreground">
                    {site.address.line1}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </p>
                </div>
              </div>
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-foreground">Follow Us</h4>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {socials.map(([href, Icon, label]) =>
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-accent hover:text-white"
                        aria-label={label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ) : null
                  )}
                  {site.social.tiktok && (
                    <a
                      href={site.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-accent hover:text-white"
                      aria-label="TikTok"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.65 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.05a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.48z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
              <Link href="/schedule" className="block w-full">
                <Button className="w-full">Schedule a Call</Button>
              </Link>
              <Link href={site.teamPath} className="block w-full">
                <Button variant="outline" className="w-full">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>

          <div className="min-w-0 space-y-6 sm:space-y-8">
            <div className="card-stable rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8">
              <h3 className="mb-5 font-montserrat text-xl font-bold sm:mb-6 sm:text-2xl">
                Send a Message
              </h3>
              {sent ? (
                <div className="py-8 text-center sm:py-10">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-foreground">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    We&apos;ll get back to you as soon as possible. A confirmation may also arrive
                    in your inbox.
                  </p>
                  <Button className="mt-6" onClick={() => setSent(false)}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot — hidden from users */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>
                  <Input
                    placeholder="Your Name *"
                    required
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    required
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Textarea
                    placeholder="How can we help you?"
                    required
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                      {error}
                    </p>
                  )}
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Or email{" "}
                    <a href={`mailto:${site.email}`} className="underline hover:text-primary">
                      {site.email}
                    </a>
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-2">
              <div className="h-56 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-lg sm:h-64 sm:rounded-3xl">
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
              <p className="break-anywhere text-center text-xs text-muted-foreground sm:text-sm">
                {site.legalName} — {site.address.full}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
