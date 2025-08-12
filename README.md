# MyNetProceeds — Home Value & Net Proceeds Calculator

A single-page, mobile-first site that estimates **home value** and **net proceeds** after selling (commissions, closing costs, repairs, and taxes), with an **AVM API stub** and a **one-click PDF** report.

## 🚀 Quick Start

1. Create a new GitHub repo (empty).
2. Upload this folder to your repo.
3. In **Netlify → Add new site → Import from Git**, connect your repo.
4. In **Netlify → Domain settings → Custom domains**, add `mynetproceeds.com` and `www.mynetproceeds.com`.
5. Keep DNS where your email lives (WHOIS/Microsoft 365). Point:
   - `@` A record → `75.2.60.5` (Netlify LB) or ALIAS `apex-loadbalancer.netlify.com` if supported
   - `www` CNAME → your `*.netlify.app` site
6. Enable **HTTPS** in Netlify (Let’s Encrypt).

## 🔌 AVM Integration

Edit `netlify/functions/estimate.js` and swap the stub for a real provider call (Estated, ATTOM, HouseCanary). Put your API keys into Netlify **Environment variables** and redeploy.

## 📈 Analytics & Ads

Add GA4 snippet to `index.html`. Start with AdSense/Ezoic; upgrade to Mediavine at 50k sessions/mo.

## 📁 Structure

- `index.html` (app + UI)
- `data/state_data.json` (inputs for auto estimates)
- `netlify/functions/estimate.js` (AVM stub via Netlify Functions)
- `legal/` (Privacy, Terms, Disclaimer)
- `assets/logo.svg` (logo)
- `scripts/generate-states.js` (optional landing pages)
- `netlify.toml` (settings)
