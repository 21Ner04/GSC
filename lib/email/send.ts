/**
 * Transactional email via Resend HTTP API (no SDK required).
 *
 * Env:
 *   RESEND_API_KEY=re_...
 *   RESEND_FROM_EMAIL="Green Street Capital <noreply@yourdomain.com>"
 *   CONTACT_TO_EMAIL=Info@GSCMortgage.com  (inbox for form submissions)
 *
 * Free Resend accounts can send from onboarding@resend.dev to the account owner only.
 * For production: verify your domain in Resend and set RESEND_FROM_EMAIL.
 */

export type EmailAttachment = {
  filename: string;
  content: string; // base64 or plain text
  contentType?: string;
};

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

export type SendEmailResult =
  | { ok: true; id?: string; provider: "resend" }
  | { ok: false; error: string; configured: boolean };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getContactInbox(): string {
  return (
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "Info@GSCMortgage.com"
  );
}

export function getFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Green Street Capital <onboarding@resend.dev>"
  );
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      configured: false,
      error:
        "Email is not configured. Set RESEND_API_KEY (and optionally RESEND_FROM_EMAIL, CONTACT_TO_EMAIL).",
    };
  }

  const to = Array.isArray(input.to) ? input.to : [input.to];
  if (!to.length || !to.every((e) => typeof e === "string" && e.includes("@"))) {
    return { ok: false, configured: true, error: "Invalid recipient address." };
  }

  const body: Record<string, unknown> = {
    from: getFromAddress(),
    to,
    subject: input.subject,
    text: input.text,
  };

  if (input.html) body.html = input.html;
  if (input.replyTo) body.reply_to = input.replyTo;

  if (input.attachments?.length) {
    body.attachments = input.attachments.map((a) => ({
      filename: a.filename,
      content: Buffer.from(a.content, "utf8").toString("base64"),
      content_type: a.contentType || "application/octet-stream",
    }));
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!res.ok) {
      const msg =
        data.message ||
        data.name ||
        `Resend HTTP ${res.status}`;
      console.error("[email/resend]", res.status, data);
      return { ok: false, configured: true, error: msg };
    }

    return { ok: true, id: data.id, provider: "resend" };
  } catch (err) {
    console.error("[email/resend]", err);
    return {
      ok: false,
      configured: true,
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}

/** Escape HTML for plain-text → simple HTML bodies. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function textToHtml(text: string): string {
  return `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;line-height:1.5">${escapeHtml(
    text
  )}</pre>`;
}
