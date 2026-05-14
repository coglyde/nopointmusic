# nopointmusic.com — Digital Presence Approach

*Draft v4. Slide-style deck — each `---` divider = one slide. Export to Keynote / Figma / PowerPoint when ready.*

---

## Slide 1 — Cover

**NOPOINTMUSIC**

Digital Presence Approach

2026

---

## Slide 2 — Content

A brief overview of what we'll go through:

- The Vision
- Site Map
- Per-Page Scope
- Backend & Media Storage
- E-commerce Setup
- SEO Strategy
- Process
- Breakdown
- Cost
- vs Website Builders
- Add-ons

---

## Slide 3 — The Vision

**Home** — A working turntable. Top-down view of a luxury silver-and-gold plinth with a brass tonearm. The vinyl carries the nopointmusic logo engraved as machined silver inlay. It spins on scroll. The tonearm is the navigation: hover a section, the arm peeks toward it; click, the arm swings and the page routes.

**Everything else** — Quiet, gallery-grade pages. Cream background. Restrained typography. Generous whitespace. Small mono labels for metadata. Brand red (`#e51b18`, from their poster series) reserved for accents.

The whole site treats every event, release, and broadcast as art. It links out to streaming and YouTube — and sells merch directly, no platform middleman.

---

## Slide 4 — Site Map

Eight pages total.

```
/                  Home — the deck
/music             Releases
/events            Upcoming + Past
/radio             Broadcasts
/foundations       Manifesto / about
/merch             Products (with direct checkout)
/blog              Blog index
/blog/[article]    Blog article template
```

Plus a branded 404.

---

## Slide 5 — Per-Page Scope (1/2)

**Home**
- The deck hero (vinyl, plinth, tonearm).
- Scroll-driven vinyl rotation.
- Hover-peek + click-swing navigation.
- 33/45 speed knob.
- Below-fold: intro paragraph, latest event teaser, latest release, latest broadcast.

**Music**
- Vertical list of releases.
- Per release: cover, title, artist, release date, streaming links (Spotify, Apple, SoundCloud).
- Newest first.

**Events**
- Two sections on one page: Upcoming and Past.
- Per event: date, title, artists, venue, short description, outbound ticket link (upcoming) or photo gallery (past).
- Past events auto-archive after their date passes.
- Photo galleries auto-populate from uploaded photos.

**Radio**
- List of broadcasts.
- Per broadcast: episode number/title, date, short description, outbound YouTube link.

---

## Slide 6 — Per-Page Scope (2/2)

**Foundations**
- Manifesto / about. Long-form typeset content.
- Mission, values, hand-drawn-feeling aesthetic.

**Merch**
- Product grid with image, title, description, price.
- **Direct checkout via Stripe** (no platform middleman).
- Per product: variants (size/color), quantity, add to cart.
- Cart drawer + secure hosted checkout.
- Order confirmation email automation.

**Blog Index**
- Reverse-chronological article list with cover, title, date, excerpt, read-time.

**Blog Article**
- Reusable template, reading-optimized typography.
- Headings, pull quotes, embedded images, related-posts strip.

**404**
- Branded not-found extending the deck aesthetic.

---

## Slide 7 — Backend & Media Storage

Two real questions: where do the photos and videos live, and how do they get there without you needing a developer every time?

**Media storage: AWS S3 + CloudFront CDN**

- S3 holds all event photos, release covers, blog images, product images.
- CloudFront delivers them globally with low latency.
- Industry-standard, predictable pricing, scales to virtually any archive size.
- Storage cost: ~$0.023/GB/month. Bandwidth: ~$0.085/GB. A typical small music site runs $5–15/month.

**Upload automation: per-event folder → site auto-updates**

- Drag-and-drop event photos into an admin panel.
- System uploads to S3 under a structured path (e.g. `/events/2026-05-11-event-name/`).
- Site reads new photos on next page load — no manual republish, no developer involvement.
- Same flow for release artwork, blog images, merch product photos.

**Alternative (lower setup, slightly less control):** Cloudinary (managed image CDN with automatic optimization + free tier covering ~25GB). We can choose during discovery.

---

## Slide 8 — E-commerce Setup (Merch)

Selling merch directly — not redirecting to Bandcamp / Big Cartel / Shopify — saves real money over time and keeps the brand experience cohesive.

**What's included:**

- Stripe Checkout integration (PCI-compliant hosted checkout — no card data ever touches the site).
- Product catalog with variants (size, color, quantity).
- Cart + checkout flow built into the existing aesthetic.
- Order webhook + database — every order recorded.
- Email automation (Resend) — order confirmation + shipping notification, branded templates.
- Admin: orders view where you can mark fulfilled, see customer info, export to CSV.

**Why this beats Shopify long-term:**

| | Setup | Monthly platform fee | Per-transaction |
|---|---|---|---|
| Shopify Basic (with Shopify Payments) | $0 | $39 | 2.9% + $0.30 |
| Shopify Basic (external processor) | $0 | $39 | 2.9% + $0.30 **+ 2% Shopify cut** |
| Custom (this proposal) | included | **$0** | 2.9% + $0.30 (just Stripe) |

Stripe's per-transaction fees are the same everywhere — that's not where you save. **You save the $39/month platform fee Shopify charges just to exist on their system.**

- Shopify monthly: $39 × 12 = **$468/year** in platform fees alone.
- Custom: **$0/year** in platform fees. Same Stripe fees on top.

If you use an external payment processor on Shopify, Shopify takes an additional 2% on every order. Custom: no middleman, ever — just Stripe.

After 5 years, the e-commerce piece alone has saved at least $2,340 in platform fees — more if order volume grows.

---

## Slide 9 — SEO Strategy

**Technical SEO (one-time setup)**
- XML sitemap, `robots.txt`, canonical tags.
- Schema.org structured data: `MusicGroup`, `Event`, `BlogPosting`, `Product`.
- Open Graph + Twitter card metadata for every route.
- Performance budget that keeps Lighthouse >90.

**Per-page SEO (every page individually optimized)**
- Title tag, meta description, heading hierarchy, alt text.
- Internal linking patterns to spread authority across sections.
- URL slug discipline.

**Content SEO (the four initial articles)**
- Human-written, on-brand long-form (~600 words each).
- Each targets a real query around Vancouver electronic music / scene / artists.
- Genuine editorial value, no keyword stuffing.

---

## Slide 10 — Process

**1. Discovery** — Kickoff call. Brand alignment, content inventory, sitemap lock.

**2. Direction** — Type system, color, asset prompts. Two production-fidelity static frames before code.

**3. Build** — Deck hero, then sections in parallel. Backend + admin alongside.

**4. Polish** — Cross-browser, accessibility, performance. Two revision rounds.

**5. Launch** — Deploy to Vercel, content seeded, four blog articles published, Stripe live mode enabled.

**6. Handover** — Walk-through call + written guide on the admin editor and upload workflows.

**7. Post-launch (30 days)** — Bug fixes and small adjustments included.

---

## Slide 11 — Breakdown (1/3) · Hero & Site Pages

| Item | Qty | Price/Qty | Description |
|---|---|---|---|
| Discovery & Strategy | 1 | $200 | Kickoff, content audit, sitemap lock, brand alignment. |
| Brand Guidelines (Colors, Typography) | 1 | $350 | Type system, color palette, accent rules. |
| Asset Pipeline (Vinyl, Plinth, Tonearm) | 1 | $500 | AI-generated assets, iterative prompting, masking, transparent PNGs. |
| **Custom Deck Hero Interaction** | 1 | **$1,800** | Bespoke top-down turntable: scroll-spun vinyl, hover-peek + click-swing tonearm, 33/45 speed knob, accessibility parallel, mobile fallback. *The differentiator.* |
| Home Page Layout | 1 | $300 | Layout, hero placement, intro section, latest-content teasers, footer. |
| Music Page | 1 | $300 | Releases list with cover, title, artist, release date, streaming links. |
| Events Page | 1 | $400 | Two sections: upcoming with outbound ticket links + auto-archiving past with photo galleries. |
| Radio Page | 1 | $300 | List of broadcasts with episode info and outbound YouTube links. |
| Foundations Page | 1 | $300 | Manifesto / about. Long-form typeset content. |
| Merch Page UI | 1 | $400 | Product grid, variant selectors, cart drawer. *(Stripe integration in next breakdown.)* |
| 404 Page | 1 | $100 | Branded not-found extending the deck aesthetic. |

Subtotal: **$4,950**

---

## Slide 12 — Breakdown (2/3) · Backend, Media, E-commerce

| Item | Qty | Price/Qty | Description |
|---|---|---|---|
| AWS S3 + CloudFront Setup | 1 | $300 | Bucket structure, CDN configuration, security policies. |
| Event Photo Upload Automation | 1 | $400 | Folder-based upload → site auto-displays. Same flow for release covers and blog images. |
| Stripe Checkout Integration | 1 | $400 | Hosted checkout, payment processing, secure card handling. |
| Order Webhook + Database | 1 | $300 | Capture order events, persist to Postgres (events / orders / products / blog). |
| Order Confirmation Email Automation | 1 | $200 | Resend integration, branded order confirmation + shipping notification templates. |
| Admin: Orders Dashboard | 1 | $300 | Fulfillment view, order detail, mark-as-shipped, CSV export. |
| Admin: Content Editor (CMS) | 1 | $600 | Edit events, releases, broadcasts, blog posts, products — no developer needed. |
| Blog Index + Article Template | 1 | $400 | Reusable blog architecture, index view, article reading layout. |
| Initial Blog Articles | 4 | $125 | Human-written, on-brand, SEO-aware (~600 words each). |

Subtotal: **$3,000**

---

## Slide 13 — Breakdown (3/3) · SEO, Performance, Launch

| Item | Qty | Price/Qty | Description |
|---|---|---|---|
| Technical SEO Setup | 1 | $400 | Sitemap, robots, schema.org structured data, OG cards, canonical tags. |
| Per-Page SEO Optimization | 9 | $50 | Title, meta description, heading structure, alt text — every page individually tuned. |
| Google Analytics Integration | 1 | $150 | Configuration, event tracking, dashboard. |
| Google Search Console Integration | 1 | $150 | Verification, sitemap submission, performance monitoring. |
| Performance + Accessibility + Cross-Browser Pass | 1 | $400 | Lighthouse 90+/100, reduced-motion support, Safari/Firefox/Chrome testing. |
| Training & Handover | 1 | $200 | Walk-through call + written guide for the admin editor and upload workflows. |
| Deploy & Environment Setup | 1 | $100 | Vercel deploy, SSL, environment configuration (you already own the domain). |

Subtotal: **$1,850**

---

## Slide 14 — Total Cost

The honest market price for everything in this proposal:

### **$9,800 one-time**
or
### **$2,450 / month × 4 months**

### Plus baseline **$30 / month** hosting & admin
*(Vercel Pro + CMS access — covers Vercel + a small AWS bill. May increase modestly with storage / bandwidth growth — typically still under $50/month for a site at this scale.)*

---

## Slide 15 — vs. Website Builders

What it would cost to do this on a builder, and what gets lost. Builder prices as of 2026 (verified on each platform).

| Platform | Monthly | Setup | What gets lost |
|---|---|---|---|
| [Wix Business + Commerce](https://www.wix.com/plans) | $44 | $0 | Templated. Famously slow load times — bad for SEO and user experience. 100 GB media cap. |
| [Squarespace Commerce](https://www.squarespace.com/pricing) | $45 | $0 | Templated. Locked into their cart + design system. |
| [Webflow](https://webflow.com/pricing) (Workspace + Ecommerce Site) | $60+ | $0 | Needs two plans (Workspace + Site). More flexible than Wix/Squarespace, but still template-driven. Can't do the deck hero. |
| [Framer](https://www.framer.com/pricing) | $41 | $0 | Beautiful, but template-based. You're picking from the same library everyone else is. |
| Shopify Basic | $39 | $0 | Pure e-commerce, design limited to themes. 2% extra fee if you don't use Shopify Payments. |
| **Custom (this proposal)** | **$30 baseline + AWS** | **$9,800** | **None — bespoke and yours, forever.** |

### Transaction fees — the part nobody puts on their pricing page

On top of Stripe's standard fees (2.9% + $0.30), most builders take their own cut:

- **Shopify Basic** — extra **2%** if you don't use Shopify Payments.
- **Webflow Standard** — extra **2%** on every transaction.
- **Wix** — extra fees on external providers; lower with Wix Payments but still platform-dependent.
- **Squarespace Commerce** — no extra fee on the Commerce plan, but locked into their cart.
- **Custom (this proposal)** — **just Stripe's standard fees. Nothing on top. No middleman.**

At 100 orders/year × $40 avg, a 2% extra fee costs you **$80/year forever**. Doesn't sound like much until it's been ten years.

### The math after 5 years

| | Setup | 5 × monthly | Total |
|---|---|---|---|
| Average builder (~$45/M) | $0 | $2,700 | **$2,700** |
| Custom (this proposal) | $9,800 | $1,800 | **$11,600** |

**Builders are cheaper in raw dollars. They produce a different product.** The custom site is:

- **A site no one else has** — the deck hero is a portfolio piece, not a template.
- **Yours forever** — you own the code. If you ever want to move hosts, change developers, or take it offline, you can. No platform can hold the site hostage.
- **No lock-in** — every part is replaceable. Stripe, Resend, Vercel, AWS — all swappable for alternatives without rebuilding. Builders make leaving expensive on purpose.
- **Faster** — no theme bloat, just what you actually need.
- **Lower per-transaction** — Stripe's standard fees, nothing on top.
- **Designed to grow** — adding pages, sections, or features doesn't require a plan upgrade.

For a label whose whole proposition is "art for art," a templated site is a contradiction. The math says save the money; the brand says don't.

---

## Slide 16 — Friend Rate

Because this is a friend project, the build is offered at:

### **$1,000 total for the site**

Flexible payment — pick what works for you:
- **Pay in full** at kickoff
- **$250/month × 4 months**
- **$83/month × 12 months**

No interest, no late fees if a month slips.

### Plus **$30 / month baseline** for hosting & admin
*(real recurring cost — Vercel + AWS + CMS. May increase modestly as the media library grows. Always transparent — you'll see the actual AWS bill.)*

The discount comes off price, not scope. You get the full $9,800 build for $1,000. The hosting is the actual cost of running it.

---

## Slide 17 — Add-Ons (Optional, Post-Launch)

| Option | Price | What's included |
|---|---|---|
| **Maintenance** | $100/M | Security updates, dependency upgrades, minor content tweaks, small fixes (up to 1 hour/month). |
| **SEO Growth** | $300–500/M | Ongoing keyword research, monthly article (1× ~600w), backlink outreach, performance tracking. |
| **Custom Polish Package** | $500 one-time | The deferred deck features: drag-to-scratch with momentum + SFX library + idle animations. |
| **Per-Event Sleeve Artwork** | $50/sleeve | Custom commissioned artwork for individual events. À la carte. |
| **Additional Blog Articles** | $125/each | Beyond the initial 4. Same standard. |
| **Email Marketing Setup (Resend/Loops)** | $400 one-time | Newsletter form + automation when needed. |

---

## Slide 18 — Timeline

**6–7 weeks wall-clock** at sustainable pace.

| Week | Focus |
|---|---|
| 1 | Discovery, direction, asset prompts approved. |
| 2 | Deck hero refined (already prototyped). |
| 3 | Music + Events sections. AWS + media pipeline. |
| 4 | Radio + Foundations + Merch UI. Stripe integration. |
| 5 | Admin CMS. Blog architecture + 4 articles. |
| 6 | SEO, performance, accessibility, cross-browser. Polish. |
| 7 | Content seeded, deploy, launch, training handover. |

A 12-month friend payment plan doesn't affect the build timeline.

---

## Slide 19 — Next Steps

1. Walk through this together — mark anything that doesn't fit.
2. Confirm scope + payment plan.
3. One-page agreement (scope, payments, IP = client owns the site, portfolio + Awwwards submission rights reserved).
4. Kickoff.

---

## Slide 20 — Thank You

**nopointmusic** × Vancouver

---

---

## Internal-only notes *(remove before sending)*

### How this maps to a normal $2,500 site

Standard $2,500 starter buys ~5 pages, brand-lite, basic SEO, deploy + handover. This proposal adds:

| Line | Price | Why it's here |
|---|---|---|
| Custom Deck Hero | $1,800 | The differentiator. Without this, this is a $4K site. |
| Stripe + Order Backend | $1,200 | E-commerce isn't "add to cart button" — it's webhooks, DB, email automation, admin. |
| AWS Media + Upload Automation | $700 | Real backend so client can manage photos without you. |
| Admin CMS | $600 | Real work, invisible until they see how easy editing is. |
| Blog Architecture + 4 Articles | $900 | Distinct deliverable, often forgotten in scoping. |
| Technical + Per-Page SEO | $850 | Itemized so it's concrete value, not a vague "SEO" line. |

Together = **$6,050** above the $2,500 baseline. That's how we get to $9,800.

### Reduction ladder for future clients who balk

- Drop Stripe + e-commerce backend → save $1,200 (merch becomes outbound links).
- Drop AWS upload automation → save $700 (you upload for them).
- Drop admin CMS → save $600 (content stays in code).
- Drop blog + 4 articles → save $900.
- Drop deck hero → save $1,800 (and you've lost the project's reason for being).
- Floor with deck + 5 sections + SEO basics + simple hosting: ≈ **$5,500**.

### Friend pricing logic

- $1,000 / $9,800 = ~90% off market. Generous gift. Make sure they know.
- The $30/M hosting is real. Vercel Pro is $20/M, AWS for a small site runs $5–15/M, CMS (if Sanity Growth) is $10/M. You're not making margin on it.
- **Be transparent about variable AWS:** if their event archive blows up (1000+ photos), bandwidth costs rise. Set expectation now.

### Backend stack we'll likely settle on

- **Hosting:** Vercel (Pro plan, ~$20/M).
- **Media:** AWS S3 + CloudFront. Cheap, predictable, industry-standard.
- **Database:** Vercel Postgres or Neon (free tier covers early traffic, easy migration later).
- **CMS / admin UI:** Either Sanity (managed) or a custom Next.js admin route (more control, no third-party dependency).
- **Email:** Resend (free tier 100/day, $20/M for 50K).
- **Payments:** Stripe (no monthly fee, 2.9% + $0.30 per transaction).

If you want zero ongoing third-party subscriptions: skip Sanity, build the admin in Next.js. Slightly more upfront work, baked into the $600 line item.

### Walkthrough script (what to say)

- "This is what we'd quote a stranger — $9,800."
- "Because it's you — $1,000 total. Pay in full, 4 months, or 12 months — your call."
- "Plus $30/month for hosting. That's the real cost of running it — Vercel + AWS. It might go up a bit if your photo archive grows, I'll always show you the actual bill."
- "Everything in the add-ons list is genuinely optional — pick when you actually want it, not now."

### What to lock in writing before kickoff

- Portfolio rights + Awwwards submission rights.
- Payment cadence and what triggers each milestone.
- What counts as "in scope" if scope creep appears (this doc is the spec).
- Late-payment: no fees, but the build pauses if a month is missed for >30 days.
- Asset ownership: client owns the site code + content. Reserved rights as agreed.
