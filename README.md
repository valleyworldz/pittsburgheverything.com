# PittsburghEverything.com

Everything Pittsburgh — in one place.

Events, restaurants, neighborhoods, local services, deals, and an AI-powered city guide.

## Stack

- Next.js 14 (App Router)
- React 18
- TailwindCSS
- TypeScript
- JSON data layer (events, restaurants, neighborhoods, services, deals, businesses, top 100)
- API routes for:
  - Lead capture (`/api/leads`)
  - Business submissions (`/api/businesses`)
  - AI Guide (`/api/ai-guide`)

## Key Features

- Homepage with:
  - Trending events grid
  - Featured restaurants
  - Local services marketplace
  - AI guide widget
  - Newsletter signup ("Pittsburgh Pulse Weekly")

- Dedicated pages:
  - `/events`
  - `/restaurants`
  - `/services` (+ lead form)
  - `/neighborhoods`
  - `/deals`
  - `/top-100`
  - `/ai-guide` (chat-style UI)
  - `/submit-business` (business intake funnel)
  - `/dashboard` (owner/business overview)

## Data Files

Located under `/data`:
- `events.json`
- `restaurants.json`
- `neighborhoods.json`
- `services.json`
- `deals.json`
- `top100.json`
- `businesses.json`

## Automation Scripts

Located in `/scripts`:
- `scrape-events.ts` — ingest/update events
- `scrape-restaurants.ts` — seed/refresh restaurant data
- `gen-ai-summaries.ts` — AI-written descriptions
- `seo-generator.ts` — draft SEO articles
- `auto-newsletter.ts` — draft weekly newsletter

These can be run manually:
```bash
node scripts/scrape-events.ts
node scripts/scrape-restaurants.ts
node scripts/gen-ai-summaries.ts
node scripts/seo-generator.ts
node scripts/auto-newsletter.ts
```

Or automatically via GitHub Actions / cron.

## Environment Variables

Create `.env.local` with:
* `OPENAI_API_KEY=...` (for AI Guide + summaries)
* `EMAIL_SMTP_*` (optional; for email notifications if added)

## Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Monetization

* Lead generation via `/services` + `/api/leads`
* Paid listings via business plans (free, featured, premium)
* Sponsored spots in `/top-100`, `/deals`, and the newsletter
* Affiliate and ad placements (to be configured by new owner)

## Handoff Notes

* Replace JSON with a database if scaling is needed.
* Connect AI routes to your preferred model.
* Configure email + billing to match your stack.
