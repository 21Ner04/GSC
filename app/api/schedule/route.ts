import { NextRequest, NextResponse } from "next/server";
import { buildIcs, parseEasternLocal } from "@/lib/email/ics";
import {
  getContactInbox,
  isEmailConfigured,
  sendEmail,
  textToHtml,
} from "@/lib/email/send";
import {
  clampText,
  clientIp,
  isValidEmail,
  isValidPhone,
  rateLimit,
} from "@/lib/email/validate";

export const runtime = "nodejs";

const DURATION_MIN = 15;
const TZ_LABEL = "Eastern Time (America/New_York)";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  notes?: string;
  meetingType?: string;
  /** Honeypot */
  website?: string;
  company?: string;
};

function isBusinessHours(time: string): boolean {
  const [hh, mm] = time.split(":").map(Number);
  const mins = hh * 60 + mm;
  // 9:00 – 17:45 ET (last 15-min slot starts 17:45 ends 18:00)
  return mins >= 9 * 60 && mins <= 17 * 60 + 45 && mm % 15 === 0;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const rl = rateLimit(`schedule:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (clampText(body.website, 200) || clampText(body.company, 200)) {
    return NextResponse.json({ ok: true, booked: true });
  }

  const name = clampText(body.name, 120);
  const email = clampText(body.email, 200);
  const phone = clampText(body.phone, 40);
  const date = clampText(body.date, 20);
  const time = clampText(body.time, 10);
  const notes = clampText(body.notes, 2000);
  const meetingType = clampText(body.meetingType, 40) || "phone";

  if (!name || !email || !date || !time) {
    return NextResponse.json(
      { ok: false, error: "Name, email, date, and time are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "Invalid phone number." }, { status: 400 });
  }
  if (!isBusinessHours(time)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please choose a 15-minute slot between 9:00 AM and 6:00 PM Eastern, on the quarter hour.",
      },
      { status: 400 }
    );
  }

  const start = parseEasternLocal(date, time);
  if (!start) {
    return NextResponse.json({ ok: false, error: "Invalid date or time." }, { status: 400 });
  }

  // Must be at least ~2 hours from now
  if (start.getTime() < Date.now() + 2 * 60 * 60 * 1000) {
    return NextResponse.json(
      { ok: false, error: "Please choose a time at least 2 hours from now." },
      { status: 400 }
    );
  }

  // Not more than 90 days out
  if (start.getTime() > Date.now() + 90 * 24 * 60 * 60 * 1000) {
    return NextResponse.json(
      { ok: false, error: "Please choose a date within the next 90 days." },
      { status: 400 }
    );
  }

  // Weekends optional: allow Mon–Sat
  const dow = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
  }).format(start);
  if (dow === "Sun") {
    return NextResponse.json(
      { ok: false, error: "Sunday is not available. Please choose Mon–Sat." },
      { status: 400 }
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Scheduling email is not configured yet. Please call 718-615-4545 or email Info@GSCMortgage.com.",
        code: "EMAIL_NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  const inbox = getContactInbox();
  const whenLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(start);

  const meetingLabel =
    meetingType === "video" ? "Video meeting" : "Phone call";

  const title = `Mortgage consultation — ${name}`;
  const description = [
    `15-minute intro call with Green Street Capital`,
    `Client: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "n/a"}`,
    `Format: ${meetingLabel}`,
    notes ? `Notes: ${notes}` : "",
    "",
    "Booked via greenstreetcapitalgroup.com/schedule",
  ]
    .filter(Boolean)
    .join("\n");

  const ics = buildIcs({
    title,
    description,
    start,
    durationMinutes: DURATION_MIN,
    organizerEmail: inbox,
    organizerName: "Green Street Capital",
    attendeeEmail: email,
    attendeeName: name,
    location: meetingType === "video" ? "Video call (link to follow)" : "Phone",
  });

  const staffText = [
    "New consultation booking (website)",
    "==================================",
    `When: ${whenLabel} (${TZ_LABEL})`,
    `Duration: ${DURATION_MIN} minutes`,
    `Format: ${meetingLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    notes ? `Notes: ${notes}` : "Notes: (none)",
    `Submitted: ${new Date().toISOString()}`,
    `IP: ${ip}`,
    "",
    "A calendar invite (.ics) is attached — open it to add to your calendar.",
  ].join("\n");

  const staffResult = await sendEmail({
    to: inbox,
    replyTo: email,
    subject: `Calendar booking: ${name} — ${date} ${time} ET`,
    text: staffText,
    html: textToHtml(staffText),
    attachments: [
      {
        filename: "gsc-consultation.ics",
        content: ics,
        contentType: "text/calendar; method=REQUEST",
      },
    ],
  });

  if (!staffResult.ok) {
    return NextResponse.json(
      { ok: false, error: staffResult.error || "Failed to book appointment." },
      { status: 502 }
    );
  }

  const clientText = [
    `Hi ${name},`,
    "",
    "Your 15-minute mortgage consultation request is confirmed:",
    "",
    `  When: ${whenLabel}`,
    `  Format: ${meetingLabel}`,
    "",
    "A calendar invite is attached. Open the .ics file to add it to Google Calendar, Outlook, or Apple Calendar.",
    "",
    "A loan officer will reach out using the contact details you provided.",
    "Need to reschedule? Call 718-615-4545 or reply to this email.",
    "",
    "— Green Street Capital, LLC | NMLS #2066586",
    "2709 Coney Island Ave, 3rd Floor, Brooklyn, NY 11235",
  ].join("\n");

  void sendEmail({
    to: email,
    subject: `Confirmed: mortgage consultation — ${whenLabel}`,
    text: clientText,
    html: textToHtml(clientText),
    attachments: [
      {
        filename: "gsc-consultation.ics",
        content: ics,
        contentType: "text/calendar; method=REQUEST",
      },
    ],
  });

  return NextResponse.json({
    ok: true,
    booked: true,
    when: whenLabel,
    durationMinutes: DURATION_MIN,
    id: staffResult.id,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/schedule",
    method: "POST",
    durationMinutes: DURATION_MIN,
    timezone: "America/New_York",
    emailConfigured: isEmailConfigured(),
  });
}
