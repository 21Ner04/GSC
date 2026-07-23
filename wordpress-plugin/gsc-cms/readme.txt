=== GSC CMS (Green Street Capital) ===
Contributors: gsc
Requires at least: 6.0
Tested up to: 6.7
Stable tag: 1.2.0
License: GPLv2 or later

Headless CMS for the Green Street Capital Next.js website.

== Description ==

Adds:

* Locations CPT (`gsc_location`)
* Specialties CPT (`gsc_specialty`)
* Settings page: **Settings → GSC Site Settings**
* Public REST API under `/wp-json/gsc/v1/`
* Optional auto-revalidate of the Next.js site on publish/save

== Installation ==

1. Copy the `gsc-cms` folder into `wp-content/plugins/`
2. Activate **GSC CMS** in WordPress admin
3. Create Location / Specialty posts; fill the GSC fields (slug, SEO, FAQ JSON, etc.)
4. Open **Settings → GSC Site Settings** and set company info
5. Optional: set `next_revalidate_url` = `https://www.greenstreetcapitalgroup.com/api/revalidate` and matching secret
6. On the Next.js host set:

```
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://cms.greenstreetcapitalgroup.com/wp-json
WORDPRESS_REVALIDATE_SECONDS=60
WORDPRESS_REVALIDATE_SECRET=same-secret-as-in-wp
```

7. Redeploy or restart Next.js

== REST endpoints ==

* GET `/wp-json/gsc/v1/health` — plugin status
* GET `/wp-json/gsc/v1/site` — company, phones, social, NMLS
* GET `/wp-json/gsc/v1/homepage` — optional homepage_json override
* GET `/wp-json/gsc/v1/reviews`
* GET `/wp-json/gsc/v1/videos`
* GET `/wp-json/gsc/v1/locations` — `{ "slugs": [...] }` or `?full=1` for full items
* GET `/wp-json/gsc/v1/locations/{slug}`
* GET `/wp-json/gsc/v1/specialties`
* GET `/wp-json/gsc/v1/specialties/{slug}`

If homepage/videos JSON is empty in WP, Next.js falls back to local `content/*.json`.
Site fields from WP are **merged** with local JSON defaults so partial config still works.

== Revalidate webhook ==

On save of Locations, Specialties, or Site Settings, the plugin POSTs:

```
POST {next_revalidate_url}
x-revalidate-secret: {secret}
{"paths":["/locations/brooklyn"],"tags":["wordpress-cms"]}
```

You can also click **Send test revalidate** on the settings page.

== Changelog ==

= 1.2.0 =
* Optional calendlyUrl in site settings / REST site payload

= 1.1.0 =
* Full site settings (social, maps, fax, TikTok)
* Auto revalidate to Next.js on save
* Health endpoint
* Field help text on landing metaboxes
* Test revalidate button

= 1.0.0 =
* Initial release
