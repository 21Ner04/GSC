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
    if (Array.isArray(body.paths)) paths = body.paths;
    if (Array.isArray(body.tags)) tags = body.tags;
  } catch {
    // empty body is fine — revalidate CMS tag only
  }

  for (const tag of tags) {
    // Cache tag used by lib/cms/wordpress fetch()
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    if (typeof path === "string" && path.startsWith("/")) {
      revalidatePath(path);
    }
  }

  // Always refresh major listing pages
  revalidatePath("/");
  revalidatePath("/locations");
  revalidatePath("/specialties");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidated: true, paths, tags });
}
