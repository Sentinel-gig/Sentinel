# SecuredSystems.in — Hosting Guide

## What's in this folder

```
securedsystems-prod/
├── api/
│   └── ai-suggest.js      ← Vercel serverless function (AI blog engine backend)
├── public/
│   └── index.html         ← HTML shell
├── src/
│   ├── index.js           ← React entry point
│   └── App.jsx            ← Full site (all pages + components)
├── package.json
├── vercel.json            ← Vercel build + routing config
└── README.md              ← This file
```

---

## Step 1 — Install Node.js

Download from https://nodejs.org (use the LTS version).

---

## Step 2 — Set up the project locally

Open a terminal, navigate to this folder, and run:

```bash
npm install
npm start
```

This opens the site at http://localhost:3000. Verify everything looks right.

---

## Step 3 — Push to GitHub

1. Go to https://github.com/new and create a new repo called `securedsystems`
2. In your terminal:

```bash
git init
git add .
git commit -m "initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/securedsystems.git
git push -u origin main
```

---

## Step 4 — Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New → Project**
3. Import your `securedsystems` repo
4. Vercel auto-detects it's a React app — just click **Deploy**

---

## Step 5 — Add your Anthropic API key (IMPORTANT)

The AI blog engine in the admin panel needs this or it won't work.

1. Get your API key from https://console.anthropic.com
2. In Vercel: go to your project → **Settings → Environment Variables**
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (your actual key)
4. Click Save, then **Redeploy** the project

---

## Step 6 — Add your custom domain

1. In Vercel: go to your project → **Settings → Domains**
2. Type `securedsystems.in` and click Add
3. Vercel will give you DNS records (usually an A record and CNAME)
4. Log in to wherever you bought the domain (GoDaddy, Namecheap, etc.)
5. Go to DNS settings and add those records
6. Wait 5–30 minutes for DNS to propagate

Your site will be live at https://securedsystems.in ✓

---

## How the AI blog engine works in production

```
Browser (Admin panel)
  → POST /api/ai-suggest  { prompt: "raw blog idea" }
  → Vercel serverless function (api/ai-suggest.js)
  → Anthropic API  (API key stays server-side, never exposed)
  → Returns JSON  { refined_title, hook, awareness_angles, ... }
  → Admin panel renders suggestions
```

---

## Admin panel

Password: `arav@2134`

Access via the **Admin ↗** button in the nav.

All content (blogs, stats, cases, news) is stored in `localStorage` — it persists in the browser automatically. Nothing is stored in a database, so content is per-browser. If you want true multi-device CMS later, we can add a database (Supabase is free and simple).

---

## Costs

| Service | Cost |
|---------|------|
| Vercel hosting | Free (Hobby plan) |
| Anthropic API | Pay per use (~₹0.50–2 per blog suggestion) |
| Domain `securedsystems.in` | ~₹700–900/year |

---

## Need a database?

Right now blog/stats/news content is stored in localStorage (browser only). To make content editable from anywhere and shared across devices, the next step is adding Supabase (free tier). Ask and I'll build that integration.
