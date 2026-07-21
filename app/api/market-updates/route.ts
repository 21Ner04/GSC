import { NextResponse } from 'next/server';

const RSS_FEED_URL = 'http://www.mortgagenewsdaily.com/rss/full';

export async function GET() {
  try {
    const response = await fetch(RSS_FEED_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const rssText = await response.text();
    
    // Simple RSS parser
    const items = parseRSS(rssText);

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching market updates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market updates', items: [] },
      { status: 500 }
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

  // Simple regex-based RSS parser
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(rssText)) !== null) {
    const itemContent = match[1];

    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                       itemContent.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
    const descMatch = itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                      itemContent.match(/<description>(.*?)<\/description>/);
    const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);

    if (titleMatch && linkMatch) {
      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch[1].trim(),
        description: descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 200) + '...' : '',
        pubDate: dateMatch ? dateMatch[1].trim() : '',
      });
    }

    // Limit to 6 items
    if (items.length >= 6) break;
  }

  return items;
}
