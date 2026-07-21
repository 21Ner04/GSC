=== GSC CMS (Green Street Capital) ===
Contributors: gsc
Requires at least: 6.0
Tested up to: 6.7
Stable tag: 1.0.0
License: GPLv2 or later

Headless CMS for the Green Street Capital Next.js website.

== Description ==

Adds:

* Locations CPT (gsc_location)
* Specialties CPT (gsc_specialty)
* Settings page: Settings → GSC Site Settings
* Public REST API under `/wp-json/gsc/v1/`

== Installation ==

1. Copy the `gsc-cms` folder into `wp-content/plugins/`
2. Activate **GSC CMS** in WordPress admin
3. Create Location / Specialty posts; fill the GSC fields (slug, SEO, FAQ JSON, etc.)
4. On the Next.js host set:

```
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json
WORDPRESS_REVALIDATE_SECONDS=60
```

5. Redeploy or restart Next.js

== REST endpoints ==

* GET /wp-json/gsc/v1/site
* GET /wp-json/gsc/v1/homepage  (optional homepage_json in settings)
* GET /wp-json/gsc/v1/reviews
* GET /wp-json/gsc/v1/videos
* GET /wp-json/gsc/v1/locations
* GET /wp-json/gsc/v1/locations/{slug}
* GET /wp-json/gsc/v1/specialties
* GET /wp-json/gsc/v1/specialties/{slug}

If homepage/videos are empty in WP, Next.js falls back to local `content/*.json`.
