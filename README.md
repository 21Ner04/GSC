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
| `content/site.json` | Phones, address, email, social, NMLS, handbook PDF, optional Calendly URL |
| `content/homepage.json` | Hero, loan cards, success stories, section titles |
| `content/reviews.json` | Google review cards (fallback when Places API off) |
| `content/videos.json` | Featured / video-blog YouTube list |
| `content/locations/*.json` | SEO location pages |
| `content/specialties/*.json` | SEO specialty pages |
| `content/team.json` | Team card fields (optional alternate to `data/team.ts`) |

Helpers: `lib/cms/index.ts`  
WordPress: `content/README.md`, `lib/cms/wordpress.ts`, plugin `wordpress-plugin/gsc-cms`

After editing JSON, restart or refresh the dev server.

## Contact form + calendar booking

| Route | What it does |
|-------|----------------|
| `/contact` | Contact form → `POST /api/contact` → email to office + confirmation to visitor |
| `/schedule` | 15‑min booking → `POST /api/schedule` → email staff + client with **`.ics` calendar invite** |

### Env (required for live email)

```env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=Green Street Capital <noreply@greenstreetcapitalgroup.com>
CONTACT_TO_EMAIL=Info@GSCMortgage.com
```

1. Create a free account at [resend.com](https://resend.com)
2. Create an API key
3. **Production:** add & verify domain `greenstreetcapitalgroup.com` (DNS records in Resend)
4. Until the domain is verified, Resend only delivers to the account owner email
5. Redeploy with the env vars set (Vercel / host dashboard)

Optional alternate calendar link: set `calendlyUrl` in `content/site.json` (or WP settings).  
If set, `/schedule` also shows “Open external calendar”.

Without `RESEND_API_KEY`, forms return a clear error and users can still call/email the office.

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
- `/calculator` — Full mortgage calculator  
- `/contact` — Contact + working message form  
- `/schedule` — Book 15‑min call (email + calendar invite)  
- `/video-blog` — Videos  
- `/success-stories` — Story cards  
- `/locations` + `/locations/[city]` — SEO locations  
- `/specialties` + `/specialties/[slug]` — SEO programs  
- `/team` — Team signatures  
- `/about` — About + car culture block  
- `/sitemap.xml`, `/robots.txt`

## SEO

- Unique metadata + Open Graph / Twitter on **all** marketing pages  
- Absolute titles, canonical URLs, icons  
- `sitemap.xml` (static + locations + specialties), `robots.txt` (blocks `/api/`)  
- JSON-LD: Organization, WebSite, AggregateRating/Reviews, FAQ, BreadcrumbList, Service, VideoObject, ContactPage  
- Breadcrumb UI on location/specialty pages  

**Production domain:** `https://www.greenstreetcapitalgroup.com`  
(set in `content/site.json` → `website`)

Submit `https://www.greenstreetcapitalgroup.com/sitemap.xml` in Google Search Console.  
Optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=…`

### Live Google Reviews

Homepage reviews load from **Google Places API** (`/api/google-reviews`).

```env
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=ChIJ...   # recommended
```

Without a key, the site uses `content/reviews.json`. Google returns up to **5** reviews per request.

## WordPress (headless CMS)

Non-developers can edit text in WordPress; the public site stays on Next.js.

1. Host WordPress on a subdomain (e.g. `cms.greenstreetcapitalgroup.com`) — **you must provide hosting**
2. Install plugin from `wordpress-plugin/gsc-cms` (zip the folder or copy into `wp-content/plugins/`)
3. Activate **GSC CMS**
4. **Settings → GSC Site Settings**: company info + revalidate URL/secret + optional Calendly URL  
5. Create **Locations** / **Specialties** posts (slug, SEO, FAQs as JSON, etc.)
6. On the Next.js host:

```env
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://cms.greenstreetcapitalgroup.com/wp-json
WORDPRESS_REVALIDATE_SECRET=long-random-string
WORDPRESS_REVALIDATE_SECONDS=60
```

7. Health: `https://cms.greenstreetcapitalgroup.com/wp-json/gsc/v1/health`  
8. Full guide: `content/README.md`

Local JSON is the fallback if WP is offline; site fields **merge** with local defaults.  
On save, the plugin can POST `/api/revalidate` so Next.js cache updates without redeploy.

### What the client can edit in WP (no code)

- SEO titles / descriptions for cities & programs  
- Intro text, bullets, FAQs, CTAs  
- New location/specialty posts (`gsc_slug` = URL segment)  
- Company phone / email / social / optional Calendly  
- Trigger Next.js cache refresh after edits  

Not included: freeform page builders (Elementor-style). Content is structured fields mapped to the Next.js design system.

## Still for you / client before go-live

| Item | Who | Notes |
|------|-----|--------|
| Team headshots | Client | Drop into `public/team/*.jpg` (filenames in `data/team.ts`) |
| UserWay widget | Client | Real Account ID → `NEXT_PUBLIC_USERWAY_ACCOUNT_ID` |
| Resend API key + domain DNS | You / client IT | Required for contact + schedule emails |
| WordPress hosting | You / client | Install plugin; set `CONTENT_SOURCE=wordpress` |
| Google Places key | Optional | Live reviews on homepage |
| Per-officer Calendly / apply portals | Optional | Update team links when available |
| Google Search Console | Optional | Verify + submit sitemap |

## Tech

- Next.js (App Router) · TypeScript · Tailwind · Framer Motion · Lucide  
- Email: Resend HTTP API (`lib/email/`) · Calendar: RFC 5545 `.ics`

## Env

See `.env.example` for content source, WordPress, Resend, Google Places, and brand vars.
