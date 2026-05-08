# Momentvm Music — Release Manager

Internal tool for managing Momentvm Music releases through the 9-phase Track Journey System (48 steps, 4 tiers).

## Stack

- **Frontend:** React 18 + Vite
- **Backend:** Netlify Functions + Netlify Blobs (cloud sync across devices)
- **Storage:** localStorage (primary) + Netlify Blobs (sync layer)
- **Deploy:** Netlify (auto-deploy from GitHub)

## Features

- 4 release tiers (T1 Deluxe / T1 / T2 / T3 Baseline) with budget and channel-activation rules per tier
- 48 steps grouped in 9 phases (Pre-production → Catalog & Reporting)
- Content production tracker (TikToks, Reels, Carousels, Stories cycles)
- Auto-save with debounced cloud sync
- Cross-device synchronization via Netlify Blobs
- Local-first: works offline, syncs to cloud when available

## Local development

```bash
npm install
npm run dev
```

For full backend testing locally, install Netlify CLI and run `netlify dev` instead.

## Deploy

1. Push this repo to GitHub
2. In Netlify: New site → Import from Git → select repo
3. Build settings auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Done — every push to main triggers a redeploy

## Project structure

```
momentvm-release-manager/
├── public/
│   └── _redirects          # SPA fallback for Netlify
├── src/
│   ├── App.jsx             # Main app (3000+ lines)
│   └── main.jsx            # React entry point
├── netlify/
│   └── functions/
│       └── data.js         # Backend: GET/POST/DELETE on Netlify Blobs
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md
```

## Cloud sync

Data is written to localStorage immediately, then synced to Netlify Blobs in the background. On other devices, the app pulls from Netlify Blobs on load. If the cloud is unavailable the app keeps working with local data only.

Health check endpoint: `GET /.netlify/functions/data?health=1` returns `{ok: true, blobsWorking: true}` if Blobs is reachable.

---

© Momentvm Music · MMXXVI
