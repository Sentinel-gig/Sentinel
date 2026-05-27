# SecuredSystems.in

**The awareness and investor platform for Sentinel — India's first passive safety intelligence system for gig workers.**

---

## What This Is

This is the public-facing website for Secured Systems, the parent company behind Sentinel. The site serves three audiences simultaneously: the general public and press who need to understand the scale of the gig worker safety crisis in India, investors who are evaluating the opportunity, and gig workers who want to join the pilot.

The site is built as a single-page React application, deployed on GitHub Pages, with a Supabase backend for dynamic content management and a password-protected admin CMS for the founding team.

---

## The Problem We Are Solving

India has 12 million gig workers. Every day, they deliver food, drive strangers across cities, and move goods across supply chains that the country depends on. They do this with no safety net, no emergency protocol, and no platform accountability.

According to NDTV, over 90 percent of India's gig workforce operates without comprehensive health or accident insurance. Platforms have real-time GPS data on every worker. They use it to optimise delivery times. They do not use it to check if anyone is alive.

Sentinel exists because no one else was going to build this.

---

## What Sentinel Does

Sentinel is a passive safety intelligence system. It runs silently in the background of a worker's phone. No buttons to press. No check-ins to remember. The system monitors motion, location, and behavioural signals continuously. When something looks wrong, it alerts the nearest verified gig worker in the peer mesh. Real people, close by, who understand the job.

**Current Pilot Status:**
- 200 downloads
- 4 cities: Mumbai, Delhi, Bangalore, Kanpur
- 100 workers onboarded
- 50 real-time alerts triggered
- Theoretical response time under 10 minutes
- Founded 2025

---

## Product Roadmap

**Phase 1 — Now:** Sentinel App. Passive safety intelligence, peer mesh, incident logging.

**Phase 2 — 2026:** Watch Interface. Hardware wearable layer with biometric alerts and direct peer pings.

**Phase 3 — 2027:** B2C Platform. Direct-to-worker safety subscription with insurance integration.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, inline styles, no CSS framework |
| Hosting | GitHub Pages via gh-pages |
| Database | Supabase (PostgreSQL) |
| CMS | Password-protected admin panel, built-in |
| AI Engine | Claude Sonnet via Anthropic API (blog content strategy) |
| Pilot Signups | Supabase + Google Sheets backup |

---

## Project Structure

```
securedsystems-prod/
├── public/
│   ├── index.html
│   ├── CNAME              ← sentinelco.in
│   └── 404.html           ← handles /sentinel redirect
├── src/
│   └── App.jsx            ← entire application, single file
├── api/
│   └── ai-suggest.js      ← Vercel serverless (AI blog engine)
├── package.json
└── vercel.json
```

---

## Deploying

```bash
# Install dependencies
npm install

# Local development
npm start

# Deploy to GitHub Pages
set DISABLE_ESLINT_PLUGIN=true && npm run deploy
```

---

## Admin CMS

Access via the Admin button in the nav. Password protected.

Manage: blogs, awareness stats, documented cases, press coverage.

All content syncs to Supabase in real time. Changes reflect across all devices immediately on page refresh.

---

## Founders

**Arav** — Co-Founder and CEO. BCA student, AI/ML practitioner, FMCG operator.

**Ashutosh Trivedi** — Co-Founder and CTO. Technology lead and strategy architect.

**Contact:** business@sentinelco.in

---

## Raise

Pre-seed open. ₹25 to 30 lakhs for 10 to 12 percent equity.

Investor inquiries: business@sentinelco.in
