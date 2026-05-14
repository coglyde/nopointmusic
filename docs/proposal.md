# nopointmusic.com — Digital Presence Approach

*Footer on every slide: `Coglyde · 2026` (bottom-left) · page number (bottom-center) · `2026` (bottom-right). Mirrors the Coglyde sales deck template.*

---

## Slide 1 — Cover

NOPOINTMUSIC

**COGLYDE**

Digital Presence Approach

2026

`Coglyde · 2026`

---

## Slide 2 — Content

- The Vision
- Site Map
- Per-Page Scope
- Backend & Media Storage
- E-commerce Setup
- SEO Strategy
- Process
- Breakdown
- Cost
- vs. Website Builders
- Add-ons

`Coglyde · 2026`

---

## Slide 3 — The Vision

**Home — the deck.** Top-down luxury turntable. Silver plinth, brass tonearm, vinyl engraved with the nopointmusic logo. Vinyl spins on scroll. Tonearm is the navigation — hover peeks, click swings and routes. 33/45 speed knob.

**Everything else.** Cream background. Restrained typography. Generous whitespace. Mono metadata labels. Brand red `#e51b18` reserved for accents.

Art for art. Every event, release, and broadcast treated as art. Outbound to streaming, YouTube, and tickets. Merch sells direct via Stripe.

`Coglyde · 2026`

---

## Slide 4 — Site Map

```
/                  Home — the deck
/music             Releases
/events            Upcoming + Past
/radio             Broadcasts
/foundations       Manifesto / about
/merch             Products (direct checkout)
/blog              Blog index
/blog/[article]    Blog article
```

Plus a branded 404.

`Coglyde · 2026`

---

## Slide 5 — Per-Page Scope (1/2)

**Home**
- The deck hero
- Scroll-driven vinyl rotation
- Hover-peek + click-swing nav
- 33/45 speed knob
- Below-fold: intro, latest event, latest release, latest broadcast

**Music**
- Vertical list of releases
- Per release: cover, title, artist, release date, streaming links (Spotify, Apple, SoundCloud)
- Newest first

**Events**
- Upcoming + Past on one page
- Per event: date, title, artists, venue, description, ticket link or photo gallery
- Past events auto-archive
- Galleries auto-populate from uploads

**Radio**
- List of broadcasts
- Per broadcast: episode info, date, description, YouTube link

`Coglyde · 2026`

---

## Slide 6 — Per-Page Scope (2/2)

**Foundations**
- Manifesto / about
- Long-form typeset content

**Merch**
- Product grid
- Direct checkout via Stripe
- Variants (size, color, quantity)
- Cart drawer + hosted checkout
- Order confirmation emails

**Blog Index**
- Reverse-chronological article list
- Cover, title, date, excerpt, read-time

**Blog Article**
- Reusable template, reading-optimized
- Headings, pull quotes, embedded images, related posts

**404**
- Branded not-found

`Coglyde · 2026`

---

## Slide 7 — Backend & Media Storage

**Media — AWS S3 + CloudFront CDN**
- Event photos, release covers, blog images, product shots
- Global delivery via CloudFront
- $0.023/GB storage, $0.085/GB bandwidth
- Typical small-site cost: $5–15 / month

**Upload Workflow**
- Drag-and-drop in admin
- Auto-uploaded to S3 under structured paths (`/events/{slug}/...`)
- Site auto-updates on next load
- Same flow for releases, blog, products

**Alternative:** Cloudinary (managed CDN, ~25 GB free tier). Decided in discovery.

`Coglyde · 2026`

---

## Slide 8 — E-commerce Setup (Merch)

**Included**
- Stripe Checkout (hosted, PCI-compliant)
- Product catalog with variants
- Cart drawer + checkout flow
- Order webhook + database
- Branded order + shipping email automation (Resend)
- Admin orders dashboard with CSV export

**vs. Shopify**

| Platform | Setup | Monthly | Per-transaction |
|---|---|---|---|
| Shopify Basic (Shopify Payments) | $0 | $39 | 2.9% + $0.30 |
| Shopify Basic (external processor) | $0 | $39 | 2.9% + $0.30 **+ 2% Shopify cut** |
| Custom (this proposal) | included | **$0** | 2.9% + $0.30 (Stripe only) |

Shopify platform fees: $468 / year. Custom: $0 / year.

5-year saving on platform fees: **$2,340+**.

`Coglyde · 2026`

---

## Slide 9 — SEO Strategy

**Technical (one-time setup)**
- XML sitemap, robots.txt, canonical tags
- Schema.org: MusicGroup, Event, BlogPosting, Product
- Open Graph + Twitter cards on every route
- Lighthouse > 90 performance budget

**Per-page (every page individually)**
- Title tag, meta description
- Heading hierarchy, alt text
- Internal linking
- URL slug discipline

**Content (4 initial articles)**
- Human-written, ~600 words each
- Targeted to real Vancouver electronic music queries
- Editorial value, no keyword stuffing

`Coglyde · 2026`

---

## Slide 10 — Process

1. **Discovery** — Kickoff, brand alignment, content inventory, sitemap lock.
2. **Direction** — Type system, color, asset prompts, two production-fidelity static frames.
3. **Build** — Deck hero, then sections in parallel. Backend + admin alongside.
4. **Polish** — Cross-browser, accessibility, performance. Two revision rounds.
5. **Launch** — Deploy, content seeded, 4 blog articles, Stripe live mode.
6. **Handover** — Walk-through call + written guide.
7. **Post-launch (30 days)** — Bug fixes + small adjustments included.

`Coglyde · 2026`

---

## Slide 11 — Breakdown (1/3) · Hero & Site Pages

| Item | Qty | Price/Qty | Description |
|---|---|---|---|
| Discovery & Strategy | 1 | $200 | Kickoff, content audit, sitemap lock, brand alignment. |
| Brand Guidelines (Colors, Typography) | 1 | $350 | Type system, color palette, accent rules. |
| Custom Asset Production (Vinyl, Plinth, Tonearm) | 1 | $900 | Multiple art direction rounds — vinyl engraving studies, plinth material and finish exploration (silver titanium with yellow gold accents), tonearm color matching across the set, retouching, production-ready masters. |
| **Custom Deck Hero Interaction** | 1 | **$1,800** | Bespoke top-down turntable: scroll-spun vinyl, hover-peek + click-swing tonearm, 33/45 speed knob, accessibility parallel, mobile fallback. |
| Home Page Layout | 1 | $300 | Layout, hero placement, intro section, latest-content teasers, footer. |
| Music Page | 1 | $300 | Releases list with cover, title, artist, release date, streaming links. |
| Events Page | 1 | $400 | Upcoming with ticket links + auto-archiving past with photo galleries. |
| Radio Page | 1 | $300 | List of broadcasts with episode info and YouTube links. |
| Foundations Page | 1 | $300 | Manifesto / about. Long-form typeset content. |
| Merch Page UI | 1 | $400 | Product grid, variant selectors, cart drawer. |
| 404 Page | 1 | $100 | Branded not-found. |

Subtotal: **$5,350**

`Coglyde · 2026`

---

## Slide 12 — Breakdown (2/3) · Backend, Media, E-commerce

| Item | Qty | Price/Qty | Description |
|---|---|---|---|
| AWS S3 + CloudFront Setup | 1 | $300 | Bucket structure, CDN configuration, security policies. |
| Event Photo Upload Automation | 1 | $400 | Folder-based upload → site auto-displays. Same flow for releases, blog, products. |
| Stripe Checkout Integration | 1 | $400 | Hosted checkout, payment processing, secure card handling. |
| Order Webhook + Database | 1 | $300 | Capture order events, persist to Postgres. |
| Order Confirmation Email Automation | 1 | $200 | Resend + React Email — order confirmation + shipping notification. |
| Admin: Orders Dashboard | 1 | $300 | Fulfillment view, order detail, mark-as-shipped, CSV export. |
| Admin: Content Editor (CMS) | 1 | $600 | Edit events, releases, broadcasts, blog posts, products. |
| Blog Index + Article Template | 1 | $400 | Reusable architecture, index view, article reading layout. |
| Initial Blog Articles | 4 | $125 | Human-written, on-brand, ~600 words each. |

Subtotal: **$3,000**

`Coglyde · 2026`

---

## Slide 13 — Breakdown (3/3) · SEO, Performance, Launch

| Item | Qty | Price/Qty | Description |
|---|---|---|---|
| Technical SEO Setup | 1 | $400 | Sitemap, robots, schema, OG cards, canonical tags. |
| Per-Page SEO Optimization | 9 | $50 | Title, meta description, heading structure, alt text. |
| Google Analytics Integration | 1 | $150 | Configuration, event tracking, dashboard. |
| Google Search Console Integration | 1 | $150 | Verification, sitemap submission, performance monitoring. |
| Performance + Accessibility + Cross-Browser | 1 | $400 | Lighthouse 90+/100, reduced-motion support, multi-browser testing. |
| Training & Handover | 1 | $200 | Walk-through call + written guide. |
| Deploy & Environment Setup | 1 | $100 | Vercel deploy, SSL, environment configuration. |

Subtotal: **$1,850**

`Coglyde · 2026`

---

## Slide 14 — Total Cost

### **$10,200 one-time**
or
### **$2,550 / month × 4 months**

**Plus $30 / month hosting & admin**
- Vercel Pro + CMS access
- May increase modestly with storage / bandwidth growth
- Typically under $50 / month at this scale

`Coglyde · 2026`

---

## Slide 15 — vs. Website Builders

2026 pricing, verified on each platform.

| Platform | Monthly |
|---|---|
| [Wix Business + Commerce](https://www.wix.com/plans) | $44 |
| [Squarespace Commerce](https://www.squarespace.com/pricing) | $45 |
| [Webflow](https://webflow.com/pricing) (Workspace + Site) | $60+ |
| [Framer](https://www.framer.com/pricing) | $41 |
| Shopify Basic | $39 |
| **Custom (this proposal)** | **$30 + AWS** |

**Transaction fees on top of Stripe's standard 2.9% + $0.30:**
- Shopify Basic (external processor): +2%
- Webflow Standard: +2%
- Wix (external providers): variable
- Custom: nothing — just Stripe

**5-year math (monthly only)**

| | Monthly × 60 |
|---|---|
| Average builder (~$45/M) | **$2,700** |
| Custom (this proposal) | **$1,800** |

**What the custom site gets you that builders can't**
- A site no one else has — the deck hero is a portfolio piece, not a template.
- Yours forever — own the code, take it anywhere, no lock-in.
- Faster — no theme bloat.
- Lower per-transaction — Stripe only, no platform cut.
- Designed to grow — pages and features don't require a plan upgrade.

`Coglyde · 2026`

---

## Slide 16 — Add-Ons (Optional)

| Option | Price | Included |
|---|---|---|
| Maintenance | $100 / M | Security updates, dependency upgrades, minor content tweaks, small fixes (up to 1 hr/month). |
| SEO Growth | $300–500 / M | Keyword research, monthly article (~600 words), backlink outreach, performance tracking. |
| Per-Event Sleeve Artwork | $50 / sleeve | Custom commissioned artwork. |
| Additional Blog Articles | $125 / each | Same standard as the initial 4. |
| Email Marketing Setup | $400 one-time | Newsletter form + automation (Resend / Loops). |

`Coglyde · 2026`

---

## Slide 17 — Timeline

**6–7 weeks wall-clock.**

| Week | Focus |
|---|---|
| 1 | Discovery, direction, asset prompts approved. |
| 2 | Deck hero refined. |
| 3 | Music + Events sections. AWS + media pipeline. |
| 4 | Radio + Foundations + Merch UI. Stripe integration. |
| 5 | Admin CMS. Blog architecture + 4 articles. |
| 6 | SEO, performance, accessibility, cross-browser. Polish. |
| 7 | Content seeded, deploy, launch, training handover. |

`Coglyde · 2026`

---

## Slide 18 — Next Steps

1. Walk through this together, mark anything that doesn't fit.
2. Confirm scope + payment plan.
3. One-page agreement (scope, payments, IP, portfolio rights).
4. Kickoff.

`Coglyde · 2026`

---

## Slide 19 — Thank You

**nopointmusic × Coglyde**

`Coglyde · 2026`
