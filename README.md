# Dierhaul — Logistics Platform

A Next.js marketing site with **DHL Shipment Tracking – Unified** for live shipment status and delivery estimates.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## DHL tracking API

Copy [`.env.example`](.env.example) to **`.env.local`** for local development only (this file is gitignored). Set **`DHL_API_KEY`** from your DHL Developer app (Shipment Tracking – Unified, Production Europe).

For **production**, add the same variables in your hosting dashboard (e.g. Vercel → Project → Settings → Environment Variables). Do not deploy `.env.local` or use `NEXT_PUBLIC_` for keys — tracking calls run only on the server via `/api/track`.

Then open **`/track`** and enter a tracking number.

Docs: [Shipment Tracking – Unified](https://developer.dhl.com/api-reference/tracking-unified)

## Routes

| Route | Module |
|-------|--------|
| `/` | Landing page |
| `/track` | Shipment tracking |
| `/calculator` | Redirects to `/track` |
| `/project` | Project highlights |
| `/login` | Sign in (UI demo) |
| `/about` | About Us — Abraham Dier Spiez |
