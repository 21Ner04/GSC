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

- Unique metadata + Open Graph / Twitter cards on SEO routes  
- `sitemap.xml`, `robots.txt`  
- JSON-LD: Organization, WebSite, FAQ, BreadcrumbList, Service (locations/specialties)  
- Breadcrumb UI on location/specialty pages  
- City & program pages under `/locations/*` and `/specialties/*`

Submit `https://your-domain/sitemap.xml` in Google Search Console.

## WordPress (headless CMS)

Non-developers can edit text in WordPress; the public site stays on Next.js.

1. Install plugin from `wordpress-plugin/gsc-cms`  
2. Set env (see `.env.example`):

```env
CONTENT_SOURCE=wordpress
WORDPRESS_API_URL=https://cms.yourdomain.com/wp-json
WORDPRESS_REVALIDATE_SECRET=...
```

3. Full guide: `content/README.md`

Local JSON remains the fallback if WP is offline.

## Still pending (by design)

- **UserWay** accessibility widget — add real Account ID later  
- **Team** personal pages from Custom eSignature  
- Hero background **video** (optional)  
- Live Google Reviews API (static cards + GBP link for now)

## Tech

- Next.js (App Router) · TypeScript · Tailwind · Framer Motion · Lucide

## Env

See `.env.example` for content source, WordPress, and optional brand vars.
