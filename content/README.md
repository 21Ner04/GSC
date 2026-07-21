# Editable content + WordPress

## Local mode (default)

Edit JSON files here. Restart / refresh Next.js after changes.

| File | Purpose |
|------|---------|
| `site.json` | Company, phones, address, social, NMLS |
| `homepage.json` | Home sections + success story cards |
| `reviews.json` | Google review cards |
| `videos.json` | YouTube embeds |
| `locations/*.json` | City / state SEO pages |
| `specialties/*.json` | Program SEO pages |
| `team.json` | 14 team cards: contacts + YouTube / Facebook / Gmail / LinkedIn / Instagram |

## WordPress mode (headless CMS)

1. Install WordPress on a subdomain (e.g. `cms.greenstreetcapitalgroup.com`).
2. Copy `wordpress-plugin/gsc-cms` into `wp-content/plugins/` and activate **GSC CMS**.
3. Create **Locations** and **Specialties** posts; fill GSC fields (slug, SEO title, FAQs as JSON, etc.).
4. Open **Settings → GSC Site Settings**:
   - Company / phones / social
   - `website` = `https://www.greenstreetcapitalgroup.com`
   - Optional `homepage_json` / `reviews_json` / `videos_json` overrides
   - **Next.js revalidate**:  
     `next_revalidate_url` = `https://www.greenstreetcapitalgroup.com/api/revalidate`  
     `next_revalidate_secret` = long random string
5. On the Next.js host:

```env
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://cms.greenstreetcapitalgroup.com/wp-json
WORDPRESS_REVALIDATE_SECONDS=60
WORDPRESS_REVALIDATE_SECRET=long-random-string
```

6. Redeploy Next.js.
7. Check `https://cms.greenstreetcapitalgroup.com/wp-json/gsc/v1/health`.

### Auto-refresh after WP publish

The plugin POSTs on save (when revalidate URL + secret are set). You can also call manually:

```http
POST https://www.greenstreetcapitalgroup.com/api/revalidate
x-revalidate-secret: long-random-string
Content-Type: application/json

{"paths":["/locations/brooklyn"],"tags":["wordpress-cms"]}
```

### Fallback & merge

- If WordPress is down → local JSON  
- If homepage/videos JSON empty in WP → local JSON  
- Site settings from WP are **merged** onto local `site.json` (missing fields keep local defaults)

### What an editor can do in WP (without code)

- Change SEO titles / descriptions for each city & program  
- Edit intro text, bullets, FAQs, CTAs  
- Add new location/specialty posts (set `gsc_slug` to the URL segment)  
- Update company phone/email/social in Site Settings  
- Trigger Next.js cache refresh after edits  

Block “page builder” (Elementor-style freeform layouts) is **not** included — content is structured fields that map to the Next.js design system. That keeps SEO and design consistent.

## SEO notes

- Every marketing page has unique title, description, canonical, Open Graph, Twitter cards  
- `sitemap.xml` + `robots.txt`  
- JSON-LD: Organization, WebSite, AggregateRating/Reviews, FAQ, Breadcrumb, Service, Video, ContactPage  
- Location & specialty pages use breadcrumbs + FAQ schema  
