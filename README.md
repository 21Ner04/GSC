# Green Street Capital — Next.js Website

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Requirements
- Node.js 18+
- npm

## Pages
- `/` — Home
- `/purchase` — Purchase a Home
- `/refinance` — Refinance
- `/loan-programs` — Loan Programs
- `/about` — About Us
- `/team` — Meet Our Team
- `/links` — Useful Links & Forms
- `/contact` — Contact
- `/apply` — Apply Now
- `/schedule` — Schedule Time

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 3
- Framer Motion (animations)
- Lucide React (icons)

## Customization
- **Colors**: `tailwind.config.js`
- **Fonts**: `app/globals.css`
- **Team**: `app/team/page.tsx` → update the `TEAM` array
- **Videos**: `app/page.tsx` → Video section → replace YouTube IDs
- **Contact info**: `components/layout/Navbar.tsx` and `components/layout/Footer.tsx`
