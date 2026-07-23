import { NextRequest, NextResponse } from "next/server";
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

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Honeypot — must stay empty */
  website?: string;
  company?: string;
};

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, 6, 60_000);
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

  // Honeypot
  if (clampText(body.website, 200) || clampText(body.company, 200)) {
    return NextResponse.json({ ok: true, sent: true }); // pretend success
  }

  const name = clampText(body.name, 120);
  const email = clampText(body.email, 200);
  const phone = clampText(body.phone, 40);
  const message = clampText(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "Invalid phone number." }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Contact form email is not configured yet. Please call the office or email Info@GSCMortgage.com directly.",
        code: "EMAIL_NOT_CONFIGURED",
      },
      { status: 503 }
    );
  }

  const inbox = getContactInbox();
  const text = [
    "New website contact form submission",
    "====================================",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    `Submitted: ${new Date().toISOString()}`,
    `IP: ${ip}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const result = await sendEmail({
    to: inbox,
    replyTo: email,
    subject: `Website contact: ${name}`,
    text,
    html: textToHtml(text),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error || "Failed to send message." },
      { status: 502 }
    );
  }

  // Optional confirmation to the visitor (best-effort, ignore failures)
  void sendEmail({
    to: email,
    subject: "We received your message — Green Street Capital",
    text: [
      `Hi ${name},`,
      "",
      "Thank you for contacting Green Street Capital. We received your message and will get back to you as soon as possible.",
      "",
      "If your matter is urgent, call us:",
      "Office: 718-615-4545",
      "Toll free: 855-615-4545",
      "",
      "— Green Street Capital, LLC | NMLS #2066586",
    ].join("\n"),
  });

  return NextResponse.json({ ok: true, sent: true, id: result.id });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/contact",
    method: "POST",
    emailConfigured: isEmailConfigured(),
  });
}
