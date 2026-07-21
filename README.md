# Green Street Capital — Next.js Website

Marketing site for Green Street Capital (mortgage broker, NMLS #2066586).

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Edit text without touching React (CMS-ready)

All marketing copy lives under **`content/`**:

| Path | What it controls |
|------|------------------|
| `content/site.json` | Phones, address, email, social, NMLS, handbook PDF |
| `content/homepage.json` | Hero, loan cards, success stories, section titles |
| `content/reviews.json` | Google review cards |
| `content/videos.json` | Featured / video-blog YouTube list |
| `content/locations/*.json` | SEO location pages |
| `content/specialties/*.json` | SEO specialty pages |

Helpers: `lib/cms/index.ts`  
WordPress later: see `content/README.md` and `lib/cms/wordpress.ts`

After editing JSON, restart or refresh the dev server.

## Site structure (homepage)

1. Intro animation (~1.8s, Skip, once per session)  
2. Hero  
3. Loan Programs (6 cards + View All)  
4. Success Stories  
5. Google Reviews  
6. Mortgage Calculator + First-Time Homebuyer Book  
7. Video Blog  
8. Market Updates (RSS)  
9. Map + Contacts  
10. Footer  
11. Floating **Apply Now** (bottom-left)

## Main routes

- `/` — Home  
- `/apply` — Choose loan officer (then Team)  
- `/calculator` — Full mortgage calculator (P&I, taxes, insurance, HOA, PMI, schedule, extras)  
- `/video-blog` — Videos  
- `/success-stories` — Story placeholders  
- `/locations` + `/locations/[city]` — SEO locations  
- `/specialties` + `/specialties/[slug]` — SEO programs  
- `/team` — Team (full personal LO pages still TBD)  
- `/about` — About + car culture block  
- `/sitemap.xml`, `/robots.txt`

## SEO

- Unique metadata + Open Graph / Twitter on **all** marketing pages  
- Absolute titles (no double brand suffix), canonical URLs, icons  
- `sitemap.xml` (static + locations + specialties), `robots.txt` (blocks `/api/`)  
- JSON-LD: Organization, WebSite, AggregateRating/Reviews, FAQ, BreadcrumbList, Service, VideoObject, ContactPage  
- Breadcrumb UI on location/specialty pages  
- City & program pages under `/locations/*` and `/specialties/*`

**Production domain:** `https://www.greenstreetcapitalgroup.com`  
(set in `content/site.json` → `website` — used for canonical, OG, sitemap, JSON-LD)

Submit `https://www.greenstreetcapitalgroup.com/sitemap.xml` in Google Search Console.  
Optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=…`

### Live Google Reviews

Homepage reviews load from **Google Places API** (`/api/google-reviews`).

1. Create a key in [Google Cloud Console](https://console.cloud.google.com/) with **Places API** enabled  
2. Add to env:

```env
GOOGLE_PLACES_API_KEY=...
# optional but recommended:
GOOGLE_PLACE_ID=ChIJ...
```

3. Without a key, the site uses `content/reviews.json` automatically  

Google returns up to **5** reviews per request (API limit). “View All Reviews on Google” opens the full Maps listing.

## WordPress (headless CMS)

Non-developers can edit text in WordPress; the public site stays on Next.js.

1. Install plugin from `wordpress-plugin/gsc-cms` (v1.1+)  
2. **Settings → GSC Site Settings**: company info + revalidate URL/secret  
3. Create Locations / Specialties posts  
4. Set env (see `.env.example`):

```env
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://cms.greenstreetcapitalgroup.com/wp-json
WORDPRESS_REVALIDATE_SECRET=...
WORDPRESS_REVALIDATE_SECONDS=60
```

5. Health: `https://cms.greenstreetcapitalgroup.com/wp-json/gsc/v1/health`  
6. Full guide: `content/README.md`

Local JSON is the fallback if WP is offline; site fields **merge** with local defaults.  
On save, the plugin can POST `/api/revalidate` so Next.js cache updates without redeploy.

## Still pending (by design)

- **UserWay** accessibility widget — add real Account ID later  
- **Team** personal pages from Custom eSignature  
- Hero background **video** (optional)  
- Live Google Reviews API (static cards + GBP link for now)

## Tech

- Next.js (App Router) · TypeScript · Tailwind · Framer Motion · Lucide

## Env

See `.env.example` for content source, WordPress, and optional brand vars.
