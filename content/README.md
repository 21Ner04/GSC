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

## WordPress mode (headless CMS)

1. Install WordPress on a subdomain (e.g. `cms.yoursite.com`).
2. Copy `wordpress-plugin/gsc-cms` into `wp-content/plugins/` and activate **GSC CMS**.
3. Create **Locations** and **Specialties** posts; fill GSC fields (slug, SEO title, FAQs as JSON, etc.).
4. Optional: **Settings → GSC Site Settings** for company info and `homepage_json` / `reviews_json` / `videos_json`.
5. On the Next.js host:

```env
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://cms.yoursite.com/wp-json
WORDPRESS_REVALIDATE_SECONDS=60
WORDPRESS_REVALIDATE_SECRET=long-random-string
```

6. Redeploy Next.js.

### Optional: auto-refresh after WP publish

From WordPress (or any webhook), POST:

```http
POST https://www.yoursite.com/api/revalidate
x-revalidate-secret: long-random-string
Content-Type: application/json

{"paths":["/locations/brooklyn"],"tags":["wordpress-cms"]}
```

### Fallback

If WordPress is down or a field is missing, Next.js uses local JSON automatically.

### What an editor can do in WP (without code)

- Change SEO titles / descriptions for each city & program  
- Edit intro text, bullets, FAQs, CTAs  
- Add new location/specialty posts (set `gsc_slug` to the URL segment)  
- Update company phone/email in Site Settings  

Block “page builder” (Elementor-style freeform layouts) is **not** included — content is structured fields that map to the Next.js design system. That keeps SEO and design consistent.
