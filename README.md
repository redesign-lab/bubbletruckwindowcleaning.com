# Bubble Truck Window Cleaning — Premium Homepage Redesign (Demo)

A fast, modern, GitHub Pages–ready redesign of the Bubble Truck Window Cleaning homepage — a real local business serving King and Pierce Counties, Washington, USA.

> **Demo notice:** This is an unofficial redesign concept built for evaluation. It is not the live business website. Meta robots are set to `noindex, nofollow` so it does not compete with the original site in search results.

## Live original site
https://www.bubbletruckwindowcleaning.com/

## What's inside
- `index.html` — the complete single-page homepage
- `css/style.css` — design system + all styles (CSS variables, responsive, 701 lines)
- `js/script.js` — mobile nav, Google-reviews carousel, animated stats, back-to-top (vanilla JS, no dependencies)
- `assets/logo/` — original brand mark (background removed) + favicons
- `assets/images/` — optimized photography (hero, services, real business van & owner photos)
- `.nojekyll` — GitHub Pages compatibility

## Sections (same sections & copy as the original homepage)
1. Top utility bar (address · 24/7 · three phone lines)
2. Sticky header with primary navigation + Free Estimate CTA
3. Hero — "Serving King and Pierce Counties — WE LOVE PETS!" + Instant Estimate / Book Online Now
4. Professional Services — Window Cleaning · Gutter Cleaning · Christmas Lights
5. Google Reviews — 226 reviews, 5★ (genuine, verified via Trustindex)
6. From the Blog — three latest posts (original thumbnails)
7. Trusted in King and Pierce Counties for 25+ Years — Why Choose Us · By the Numbers · Stephanie B. testimonial
8. Washington State Business License showcase (original license document, hotlinked)
9. Need an Estimate? — quote CTA + full contact details + service areas
10. Footer + legal links (Privacy · SMS/Marketing · Terms)
11. Floating call button (desktop) + sticky Call/Estimate action bar (mobile)

## Brand system extracted from the original business
- **Colors:** `#0163ad` (brand blue) · `#f55ed4` (signature pink) · `#0e2a3d` (deep navy) · `#f6b93b` (review stars)
- **Type:** Montserrat (display/buttons) + Open Sans (body)
- **Logo:** original "Adam & Kelly" squeegee artwork, background removed for flexible placement
- **Photography:** original business photos (van, owner Adam) + professional generated imagery where originals were insufficient (AI imagery is decorative; never presented as customer projects)

## Run locally
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deployment (GitHub Pages)
Repository Settings → Pages → Deploy from branch → `main` (or the working branch) → `/ (root)`. The included `.nojekyll` keeps paths intact. All asset paths are relative.

## Notes & honesty policy
- Nav/CTA links point to the real business pages on the live domain (internal pages are out of scope for this homepage-only redesign).
- The estimate CTAs open the business's real ResponsiBid booking lightbox.
- The Washington Business License image is displayed from the original site's media library (binary could not be mirrored in this environment); if it fails to load, an on-page fallback card is shown instead.
- Blog thumbnails are hotlinked original images with local fallbacks.
- No business information was invented; review text and star ratings are reproduced from the original homepage.
