import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * WordPress (or any CMS) can POST here after publishing content.
 *
 * POST /api/revalidate
 * Headers: x-revalidate-secret: <WORDPRESS_REVALIDATE_SECRET>
 * Body JSON (optional): { "paths": ["/locations/brooklyn"], "tags": ["wordpress-cms"] }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;
  const header = req.headers.get("x-revalidate-secret") || "";

  if (!secret || header !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let paths: string[] = [];
  let tags: string[] = ["wordpress-cms"];

  try {
    const body = await req.json();
    if (Array.isArray(body?.paths)) paths = body.paths;
    if (Array.isArray(body?.tags) && body.tags.length) tags = body.tags;
  } catch {
    // empty body is fine — revalidate CMS tag only
  }

  const revalidatedTags: string[] = [];
  const revalidatedPaths: string[] = [];

  for (const tag of tags) {
    if (typeof tag !== "string" || !tag) continue;
    // Cache tag used by lib/cms/wordpress fetch()
    revalidateTag(tag, "max");
    revalidatedTags.push(tag);
  }

  // Always refresh major listing pages + reviews cache tags if requested
  if (revalidatedTags.includes("wordpress-cms") || revalidatedTags.includes("google-reviews")) {
    try {
      revalidateTag("google-reviews", "max");
    } catch {
      /* ignore if tag unused */
    }
  }

  const always = ["/", "/locations", "/specialties", "/sitemap.xml"];
  const allPaths = [...new Set([...paths, ...always])];

  for (const path of allPaths) {
    if (typeof path === "string" && path.startsWith("/")) {
      revalidatePath(path);
      revalidatedPaths.push(path);
    }
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    paths: revalidatedPaths,
    tags: revalidatedTags,
  });
}

/** Simple health for uptime checks (no secret). */
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/revalidate",
    method: "POST",
    auth: "x-revalidate-secret header required",
  });
}
