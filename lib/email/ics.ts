/**
 * Generate a minimal RFC 5545 .ics calendar invite (VEVENT).
 * Compatible with Google Calendar, Outlook, Apple Calendar.
 */

export type IcsEventInput = {
  title: string;
  description: string;
  /** Instant in time (UTC under the hood) */
  start: Date;
  durationMinutes: number;
  organizerEmail: string;
  organizerName?: string;
  attendeeEmail: string;
  attendeeName?: string;
  location?: string;
  uid?: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** UTC timestamp in ICS form: 20260315T143000Z */
export function toIcsUtc(d: Date): string {
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function foldLine(line: string): string {
  if (line.length <= 74) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 74));
  rest = rest.slice(74);
  while (rest.length) {
    parts.push(" " + rest.slice(0, 73));
    rest = rest.slice(73);
  }
  return parts.join("\r\n");
}

function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildIcs(event: IcsEventInput): string {
  const start = event.start;
  const end = new Date(start.getTime() + event.durationMinutes * 60 * 1000);
  const uid =
    event.uid ||
    `${Date.now()}-${Math.random().toString(36).slice(2, 10)}@greenstreetcapitalgroup.com`;
  const stamp = toIcsUtc(new Date());
  const dtStart = toIcsUtc(start);
  const dtEnd = toIcsUtc(end);
  const orgName = event.organizerName || "Green Street Capital";
  const attName = event.attendeeName || event.attendeeEmail;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Green Street Capital//Website//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    foldLine(`SUMMARY:${escapeIcsText(event.title)}`),
    foldLine(`DESCRIPTION:${escapeIcsText(event.description)}`),
    event.location
      ? foldLine(`LOCATION:${escapeIcsText(event.location)}`)
      : null,
    `ORGANIZER;CN=${escapeIcsText(orgName)}:mailto:${event.organizerEmail}`,
    `ATTENDEE;CN=${escapeIcsText(attName)};RSVP=TRUE:mailto:${event.attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: mortgage consultation in 30 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean) as string[];

  return lines.join("\r\n") + "\r\n";
}

/**
 * Convert a wall-clock date+time in America/New_York to a real UTC Date.
 * date = "YYYY-MM-DD", time = "HH:mm"
 */
export function parseEasternLocal(date: string, time: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  if (!/^\d{2}:\d{2}$/.test(time)) return null;

  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if (
    !Number.isFinite(y) ||
    !Number.isFinite(m) ||
    !Number.isFinite(d) ||
    hh < 0 ||
    hh > 23 ||
    mm < 0 ||
    mm > 59
  ) {
    return null;
  }

  const timeZone = "America/New_York";
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const asZonedUtcMs = (instant: Date): number => {
    const parts = Object.fromEntries(
      dtf
        .formatToParts(instant)
        .filter((p) => p.type !== "literal")
        .map((p) => [p.type, p.value])
    );
    const hour = parts.hour === "24" ? 0 : Number(parts.hour);
    return Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      hour,
      Number(parts.minute),
      Number(parts.second)
    );
  };

  // Assume wall clock numbers are UTC, then subtract the zone offset.
  const guess = Date.UTC(y, m - 1, d, hh, mm, 0);
  const desired = Date.UTC(y, m - 1, d, hh, mm, 0);
  let utcMs = guess - (asZonedUtcMs(new Date(guess)) - desired);

  // One correction pass for DST edges
  utcMs = utcMs - (asZonedUtcMs(new Date(utcMs)) - desired);

  const result = new Date(utcMs);
  if (Number.isNaN(result.getTime())) return null;

  // Final verification of wall-clock components
  const check = Object.fromEntries(
    dtf
      .formatToParts(result)
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value])
  );
  const chHour = check.hour === "24" ? "00" : check.hour;
  if (
    check.year !== String(y) ||
    check.month !== pad(m) ||
    check.day !== pad(d) ||
    chHour !== pad(hh) ||
    check.minute !== pad(mm)
  ) {
    // Fallback: treat as system-local (still usable for demos)
    return new Date(y, m - 1, d, hh, mm, 0);
  }
  return result;
}
