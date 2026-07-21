import { NextResponse } from "next/server";

const FEED_CANDIDATES = [
  "https://www.mortgagenewsdaily.com/rss/full",
  "http://www.mortgagenewsdaily.com/rss/full",
];

export async function GET() {
  try {
    let rssText = "";
    let lastError: unknown;

    for (const url of FEED_CANDIDATES) {
      try {
        const response = await fetch(url, {
          next: { revalidate: 3600 },
          headers: { Accept: "application/rss+xml, application/xml, text/xml" },
        });
        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status} for ${url}`);
          continue;
        }
        rssText = await response.text();
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!rssText) {
      throw lastError || new Error("No RSS response");
    }

    const items = parseRSS(rssText);
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching market updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch market updates", items: [] },
      { status: 200 }
    );
  }
}

function parseRSS(rssText: string) {
  const items: Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(rssText)) !== null) {
    const itemContent = match[1];

    const titleMatch =
      itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
      itemContent.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const descMatch =
      itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
      itemContent.match(/<description>(.*?)<\/description>/);
    const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);

    if (titleMatch && linkMatch) {
      const rawDesc = descMatch
        ? descMatch[1].replace(/<[^>]*>/g, "").trim()
        : "";
      const description =
        rawDesc.length > 200 ? `${rawDesc.slice(0, 200)}...` : rawDesc;

      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch[1].trim(),
        description,
        pubDate: dateMatch ? dateMatch[1].trim() : "",
      });
    }

    if (items.length >= 6) break;
  }

  return items;
}
