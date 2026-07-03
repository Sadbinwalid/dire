# Butch Dyer | Real Estate Website

A complete static real estate website for **Butch Dyer**, REALTOR® — personal-name brand, brokerage-agnostic architecture.

**Live Site:** https://dyer-realty-nc.vercel.app  
**GitHub Repo:** https://github.com/Sadbinwalid/dire

---

## Pages

| Page | File | Description |
|---|---|---|
| Homepage | `index.html` | Hero, search, value props, listings, testimonials, CTA sections |
| Property Search | `search.html` | Filter panel, listings grid, map toggle |
| Property Detail | `property-detail.html` | Photo gallery, specs, mortgage calc, inquiry form |
| New Construction Hub | `new-construction.html` | Builder expertise, community cards, lead form |
| Community Page | `community.html` | Per-community template — floor plans, amenities, inquiry |
| Relocation Guide | `relocation-guide.html` | Neighborhoods, schools, remote closing process, FAQ |
| Content Hub | `content-hub.html` | Video guides, neighborhood spotlights, written articles |
| Home Valuation | `home-valuation.html` | Seller lead capture with confirmation state |
| About | `about.html` | Full bio, certifications, philosophy, team placeholder |
| Contact | `contact.html` | Phone/email cards, map, contact form |
| Blog | `blog.html` | Post grid, category filter, newsletter signup |
| Blog Post | `blog-post.html` | Article template with sidebar CTA |
| Privacy Policy | `privacy-policy.html` | NC-compliant privacy policy with NCREC disclosures |
| Terms of Service | `terms.html` | IDX disclaimer, Equal Housing, MLS terms |
| 404 | `404.html` | Branded error page with quick-nav links |

---

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JS — no frameworks, no build step
- [Google Fonts](https://fonts.google.com) — Playfair Display + Inter
- [Font Awesome 6](https://fontawesome.com) — icons via CDN
- Hosted on [Vercel](https://vercel.com) (free tier)

---

## Project Structure

```
dyer-realty-nc/
├── css/
│   └── styles.css       # Complete design system (tokens, components, layout)
├── js/
│   ├── config.js        # Single source of truth — agent name, brokerage, contact info
│   └── main.js          # Mobile nav, mortgage calc, form confirmations
├── index.html
├── search.html
├── property-detail.html
├── new-construction.html
├── community.html
├── relocation-guide.html
├── content-hub.html
├── home-valuation.html
├── about.html
├── contact.html
├── blog.html
├── blog-post.html
├── privacy-policy.html
├── terms.html
└── 404.html
```

---

## Design System

| Token | Value |
|---|---|
| Primary (Navy) | `#1B3A5C` |
| Accent (Gold) | `#C9963B` |
| Off-white | `#FAFAF8` |
| Heading font | Playfair Display (serif) |
| Body font | Inter (sans-serif) |

---

## Deployment

**Deploy to Vercel (staging):**
```bash
npx vercel deploy --yes
```

**Push changes to GitHub:**
```bash
git add .
git commit -m "your message"
git push origin develop
```
Then open a Pull Request from `develop` → `main` on GitHub.

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — live site source |
| `develop` | Staging — all changes go here first |
| `feature/*` | Individual features or page updates |

---

## To-Do Before Going Live

- [ ] Replace `NCREC #XXXXXX` with Butch's real license number in `js/config.js` + HTML files
- [ ] Add real headshot photo
- [ ] Connect IDX feed (iHomeFinder, Showcase IDX, etc.)
- [ ] Wire contact/valuation forms to CRM or Formspree
- [ ] Point `ButchDyer.com` domain DNS to Vercel
- [ ] ⚠️ Activate `butch@butchdyer.com` email (currently a placeholder — see `SITE_CONFIG.CONTACT.email` in `js/config.js`)
- [ ] Replace gradient placeholders with real photography
- [ ] Add Google Analytics / Meta Pixel
- [ ] Update Instagram handle `@butchdyer` once confirmed
- [ ] Set up Google Business Profile link in footer

## Brokerage Swap Instructions

If Butch changes brokerages, open `js/config.js` and update only the `BROKERAGE` block:
```js
BROKERAGE: {
  name:      "New Brokerage Name",
  shortName: "Short / Display Name",
  badge:     "Badge Text",
  address:   "123 Office Address, City, NC XXXXX",
},
```
All elements with `id="brokerage-*"` across every page update automatically.
The NCREC and EHO compliance lines are separate and unaffected.

---

## Agent Info

**Butch Dyer** — REALTOR®  
Keller Williams Realty · Raleigh, NC  
📞 919-427-0069  
✉️ butch@butchdyer.com *(⚠️ placeholder — pending ButchDyer.com activation)*  
🔑 NCREC License #XXXXXX
