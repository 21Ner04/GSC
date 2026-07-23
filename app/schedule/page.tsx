"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle2, Clock, Phone, Video } from "lucide-react";
import { getSite } from "@/lib/cms";

const TIME_SLOTS = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
];

function formatSlotLabel(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function minDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 0);
  return d.toISOString().slice(0, 10);
}

function maxDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return d.toISOString().slice(0, 10);
}

export default function Schedule() {
  const site = getSite();
  const calendlyUrl = site.calendlyUrl?.trim();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "10:00",
    meetingType: "phone" as "phone" | "video",
    notes: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successWhen, setSuccessWhen] = useState<string | null>(null);

  const minDate = useMemo(() => minDateStr(), []);
  const maxDate = useMemo(() => maxDateStr(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        when?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            "Could not book this slot. Please call the office or try another time."
        );
        return;
      }
      setSuccessWhen(data.when || "your selected time");
    } catch {
      setError("Network error. Please try again or call " + site.phones.local + ".");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[70vh] bg-muted py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 sm:h-20 sm:w-20">
            <Calendar className="h-8 w-8 text-secondary sm:h-10 sm:w-10" />
          </div>
          <h1 className="font-montserrat text-3xl font-bold sm:text-4xl">Schedule a Call</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Book a free 15-minute mortgage consultation. Times are Eastern Time. You and our team
            will receive a calendar invite by email.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <Clock className="h-5 w-5 shrink-0 text-secondary" />
            <span className="text-sm font-medium">15 Min Intro Call</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <Video className="h-5 w-5 shrink-0 text-secondary" />
            <span className="text-sm font-medium">Phone or Video Meeting</span>
          </div>
        </div>

        {successWhen ? (
          <div className="card-stable rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-10">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-primary" />
            <h2 className="mb-2 font-montserrat text-2xl font-bold">You&apos;re booked</h2>
            <p className="mb-2 text-muted-foreground">
              <strong className="text-foreground">{successWhen}</strong>
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              Check your email for a confirmation and calendar invite (.ics). Our team will follow
              up shortly.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => setSuccessWhen(null)}>Book another time</Button>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="card-stable rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="sched-website">Website</label>
                <input
                  id="sched-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Your Name *"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email *"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <Input
                type="tel"
                placeholder="Phone Number"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sched-date" className="mb-1.5 block text-sm font-medium">
                    Preferred date *
                  </label>
                  <Input
                    id="sched-date"
                    type="date"
                    required
                    min={minDate}
                    max={maxDate}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="sched-time" className="mb-1.5 block text-sm font-medium">
                    Time (ET) *
                  </label>
                  <select
                    id="sched-time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {formatSlotLabel(t)} ET
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className="mb-2 text-sm font-medium">Meeting type</legend>
                <div className="flex flex-wrap gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="meetingType"
                      value="phone"
                      checked={form.meetingType === "phone"}
                      onChange={() => setForm({ ...form, meetingType: "phone" })}
                      className="accent-primary"
                    />
                    <Phone className="h-4 w-4" /> Phone
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="meetingType"
                      value="video"
                      checked={form.meetingType === "video"}
                      onChange={() => setForm({ ...form, meetingType: "video" })}
                      className="accent-primary"
                    />
                    <Video className="h-4 w-4" /> Video
                  </label>
                </div>
              </fieldset>

              <Textarea
                placeholder="Anything we should know? (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" variant="secondary" className="w-full" disabled={loading}>
                {loading ? "Booking..." : "Confirm appointment"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Mon–Sat · 9:00 AM – 6:00 PM Eastern · confirmation email with .ics calendar invite
              </p>
            </form>

            {calendlyUrl && (
              <div className="mt-8 border-t border-gray-100 pt-8 text-center">
                <p className="mb-3 text-sm text-muted-foreground">Prefer Calendly?</p>
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Open external calendar
                  </Button>
                </a>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link href="/">
                <Button variant="ghost" className="text-muted-foreground">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {site.legalName} · NMLS #{site.nmls} ·{" "}
          <a href={`tel:${site.phones.localTel}`} className="underline hover:text-primary">
            {site.phones.local}
          </a>
        </p>
      </div>
    </div>
  );
}
