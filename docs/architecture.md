# Architecture Decisions - nopointmusic.com

**Purpose:** a reference doc for every backend / admin / infrastructure choice on this project. Each section explains *what we need*, *what the alternatives are*, *what we recommend and why*, and *how we'd migrate later* if we outgrow a choice.

Designed to be skimmable. Each decision has a TL;DR at the top.

---

## 0. Goals & Constraints

Before any individual decision, the constraints that shape all of them:

- **Small team running the site.** 1–3 people uploading content. Not 50 marketers.
- **Growing media archive.** Hundreds-to-thousands of event photos over time, plus release covers, blog images, product shots.
- **Content frequency.** A few events per month, occasional releases, weekly-ish blog and radio. Not high volume.
- **Performance matters.** Award-tier ambition - Lighthouse must stay >90 even as the photo archive grows.
- **No platform lock-in.** Every piece should be replaceable. If we leave Vercel, Cloudinary, Payload, anything - the site keeps working with another provider after a migration.
- **Predictable costs.** The client should see a baseline hosting figure (~$30/M) and understand what makes it vary.
- **Reusable patterns.** This stack should work for other clients we build similar sites for.
- **DX matters as much as cost.** Cheaper-but-painful tools cost more in our time than the savings.

---

## 1. What we're storing and serving - by content type

A walk-through of each content type the site holds, so the storage decisions later are grounded.

### Events
- **Fields:** id, slug, title, date, status (upcoming / past, auto-flips after date), venue, location, artists[], description, ticket link (upcoming only), hero image, photo gallery (past only).
- **Volume:** maybe 20–50 events per year. Each past event = 20–100 photos.
- **Operations:** create, edit, delete (soft - archive flag, never destroy data), upload-photos-to-gallery.
- **Read pattern:** events page lists all; individual event pages load on demand.

### Music releases
- **Fields:** id, slug, title, artist, release date, cover image, streaming links {spotify, apple, bandcamp, ...}, description.
- **Volume:** ~10–20 per year.
- **Operations:** create, edit, delete (soft).
- **Read pattern:** music page lists all.

### Radio broadcasts
- **Fields:** id, slug, episode number, title, date, description, YouTube link, thumbnail.
- **Volume:** ~50 per year (weekly cadence).
- **Operations:** create, edit, delete (soft).
- **Read pattern:** radio page lists all.

### Blog posts
- **Fields:** id, slug, title, date, author, cover image, content (markdown/rich-text), excerpt, tags[].
- **Volume:** 4 initial + a few per month after.
- **Operations:** create, draft, publish, edit, delete (soft).
- **Read pattern:** index lists, individual articles, related posts strip.

### Merch products
- **Fields:** id, slug, title, description, images[], variants[{size, color, stripe_price_id, inventory}], base price, status (active/sold-out/archived).
- **Volume:** ~10–30 products.
- **Operations:** create, edit, mark sold-out, archive.
- **Read pattern:** merch page lists active products; product detail loads on demand.

### Orders
- **Fields:** id, stripe_session_id, customer_email, line_items[], total, status (pending/paid/shipped/refunded), shipping_address, created_at.
- **Volume:** scales with merch success - assume 50–500 per year initially.
- **Operations:** auto-created from Stripe webhook, manually marked-as-shipped via admin.
- **Read pattern:** admin only.

---

## 2. Image hosting

### TL;DR
**Recommended: Cloudinary (free tier).** Migrate to AWS S3 + CloudFront only if we exceed Cloudinary's free quota (which won't happen for years at this scale).

### What we need
- Reliable storage for thousands of images over time.
- A CDN to serve them globally with low latency.
- Automatic format conversion (AVIF / WebP for modern browsers).
- Responsive variants (small thumbnail for index pages, full size for detail).
- A drag-and-drop upload flow for the admin.
- Predictable cost that we can show the client.
- A clear migration path if costs blow up.

### Options compared

| Option | Free tier | Paid pricing | Setup time | DX | When it's right |
|---|---|---|---|---|---|
| **Cloudinary** | 25 GB storage / 25 GB bandwidth / 25K transforms per month | Plus: $89/M, scales from there | ~2 hours | Best - URL-based transforms, responsive variants automatic, drag-drop widget built-in | Free tier covers small-medium sites for years. DX wins until you're huge. |
| **AWS S3 + CloudFront** | None (always pay-as-you-go) | $0.023/GB storage, $0.085/GB bandwidth | ~1 day (IAM, bucket policies, distribution, invalidation) | Medium - you write all the optimization yourself | When cost predictability matters more than DX, or at large scale. |
| **Cloudflare R2 + Images** | R2: 10 GB / month free. Images: paid only | R2: $0.015/GB. Images: $5/M base + $1/100k requests | ~4 hours | Good - newer, growing community | When you want zero egress fees and don't mind two services. |
| **Vercel Blob** | 1 GB free | $0.15/GB storage, $0.10/GB bandwidth | ~30 minutes | Excellent - drop-in `put()` / `get()` | When you want everything on Vercel. Expensive at scale. |
| **UploadThing** | 2 GB free | $10/M for 100 GB Plus tier | ~30 minutes | Excellent - built for Next.js | When you want the fastest Next.js integration. Pricier than Cloudinary at scale. |

### Why Cloudinary

1. **Free tier is generous enough that this client won't hit it for years.** 25 GB of optimized images = ~10K photos at typical sizes. Their event archive will take a long time to get there.
2. **Image optimization is the actual hard problem we're solving** - generating AVIF/WebP variants, responsive sizes, art-directed crops. Cloudinary does all of this with URL parameters. S3 doesn't; we'd have to bake our own pipeline.
3. **Drag-and-drop upload widget is a one-line integration.** S3 requires building or buying an uploader.
4. **CDN is fast everywhere.** Backed by major CDNs (Akamai / Fastly underneath).
5. **Easy to leave.** If we ever outgrow it, every image has a public URL we can re-host. Migration is a script, not a rewrite.

### What we lose vs AWS S3

- **Cost predictability** - Cloudinary's "credits" model is opaque if you're not paying attention. We mitigate this by setting up a billing alert at, say, $20/M.
- **At very high scale**, S3 is cheaper per GB. Doesn't matter until many TBs.

### Migration path

If we ever exceed Cloudinary's comfortable usage:
1. Spin up an S3 bucket + CloudFront distribution.
2. Run a one-time copy script (`rclone` or a simple loop using both providers' APIs).
3. Swap the `CMS_IMAGE_BASE_URL` env var.
4. Done. URLs remain stable if we mirror the same path structure.

This migration is ~1 day of work. We don't need to predict it now.

---

## 3. Video hosting

### TL;DR
**Recommended: YouTube (embed).** Free, infinite, has the world's best video CDN. Use Vimeo Pro ($20/M) only if YouTube branding becomes a brand problem.

### What we need
- Reliable playback for occasional event recaps and performance clips.
- Radio broadcasts are already on YouTube.
- A clean embed that fits the site's aesthetic.

### Options compared

| Option | Cost | Setup | When right |
|---|---|---|---|
| **YouTube (public / unlisted)** | $0 | 1 minute | Default. Radio shows already live here. No reason to move. |
| **Vimeo Pro** | $20/M | 30 minutes | If YouTube branding feels off-brand and budget allows. |
| **Cloudflare Stream** | $5/1000 mins stored + $1/1000 delivered | ~2 hours | When you need adaptive bitrate + full control + no third-party logo. |
| **Self-host (S3 + CloudFront)** | Storage cheap, bandwidth $$$ | ~2 days | Only when you have a real reason - DRM, custom analytics, brand control. Almost never the right call. |

### Why YouTube

The radio show already lives there. Search traffic. Algorithm. Subscribers. No reason to fragment.

For event recaps: YouTube unlisted + embed. The unlisted videos won't appear in search but anyone with the link (or the embed) can play. Clean.

### What we lose

- **YouTube branding on the player.** This is the actual reason people leave YouTube.
- **Their algorithm can pause your video to suggest related content.** Mitigated with `rel=0` and modest UI.
- **Ads on public videos** (unless you pay for YouTube Premium as a viewer).

### Migration path

Embeds are URLs. Replacing YouTube with Vimeo or Cloudflare Stream later = swap URLs. Hours, not days.

---

## 4. Database

### TL;DR
**Recommended: Neon (managed Postgres) + Drizzle ORM.** Free tier covers this site for years. Easy to migrate to any Postgres host later.

### What we need
- Structured storage for events, releases, broadcasts, blog posts, products, orders.
- Relational - releases have artists, events have galleries, orders have line items.
- Serverless-friendly (Vercel's runtime is serverless).
- Free at this scale.
- Standard SQL so we can move providers any time.

### Options compared

| Option | Free tier | DX | When right |
|---|---|---|---|
| **Neon (Postgres)** | 500 MB / 100 compute hours per month | Excellent - branch databases, instant provisioning | Default. Standard Postgres, easy to leave. |
| **Vercel Postgres** | Same Neon underneath, free tier 60 hours | Excellent - auto-configured if hosting on Vercel | Identical to Neon. Pick this if you want everything on one bill. |
| **Supabase** | 500 MB DB + 1 GB storage + auth | Excellent, but more surface area | When you also need auth + storage + realtime in one tool. |
| **Turso (libSQL/SQLite at edge)** | 9 GB / month | Good | When you need ultra-low-latency reads everywhere. Overkill here. |
| **PlanetScale** | None as of 2024 | Good | Skip - no free tier anymore. |

### Why Neon

- **Free tier handles years of this site.** ~5 entity types, low write volume, low read volume against the DB (most reads hit the cache layer).
- **Branch databases for development.** Spin up a branch DB for staging in a click.
- **Just Postgres.** No vendor magic. Move to RDS / Supabase / DigitalOcean Managed Postgres any time.
- **Serverless connection pooling built in** - works clean with Vercel's request-per-function model.

### ORM choice: Drizzle

- TypeScript-first schema.
- Lightweight (no separate process like Prisma's query engine).
- SQL-like API - readable.
- Easy migrations.

Prisma is the alternative; we'd use Prisma only if the team is more comfortable with it. Drizzle is the modern pick.

### Migration path

Postgres is Postgres. `pg_dump` from Neon, `pg_restore` to any other Postgres host. ~30 minutes.

---

## 5. CMS / admin dashboard

This is the biggest architectural decision in the project. The client needs to add events, releases, broadcasts, blog posts, and products themselves.

### TL;DR
**Recommended: Payload CMS v3, integrated into the Next.js app at `/admin`.** Free forever, self-hosted, generates a beautiful admin UI from our schema. Handles auth, image uploads, drafts, publishing, all the CRUD operations needed.

### What we need

The client must be able to, without writing code:

- Add / edit / delete a blog post (with cover image, rich-text body).
- Add / edit / archive an event (date, title, artists, venue, description, photos).
- Add photos to an event's gallery (drag-and-drop).
- Add / edit / archive a music release (cover, streaming links).
- Add / edit / archive a radio broadcast (YouTube link, description).
- Add / edit / archive a merch product (images, variants, price).
- See incoming orders, mark them as shipped.
- Preview content before publishing.
- Log in securely.

### Options compared

| Option | Cost | Self-hosted? | Setup | When right |
|---|---|---|---|---|
| **Payload CMS v3** | Free (self-hosted) | Yes - lives in our Next.js app | 1–2 days | Default for agency-built sites. Free forever, no per-client SaaS bill. |
| **Sanity** | Free for 3 users / 10K docs. $99/M Growth above that. | No (managed) | 4 hours | When content modeling is complex and the SaaS cost is fine. |
| **Decap CMS** (was Netlify CMS) | Free | Yes (Git-based) | 4 hours | Lightweight blogs only. Bad for image-heavy content like events. |
| **Strapi** | Free (self-hosted) | Yes | 1 day | Mature but heavier than Payload. Older patterns. |
| **Custom admin in Next.js** | Free | Yes | 1 week+ | When we want 100% control of the UI. Most work. |
| **Notion API as CMS** | Free | No | 1 day | Cute for personal sites. Not for client-managed CMS. |

### Why Payload CMS v3

1. **Free forever.** No SaaS fee creeping up over time. Important for an agency reusing this stack across clients.
2. **Lives in the Next.js app.** Mounted at `/admin`. Shares the same database, same deployment, same domain. No second service to operate.
3. **Generates a polished admin UI from our schema.** Defines collections in TypeScript; Payload renders forms, lists, drafts, image uploads, relationships.
4. **Image uploads built-in.** Configurable to push uploads to Cloudinary / S3 / Vercel Blob. We pick at config time.
5. **Auth built-in.** Email + password, optional 2FA. Roles (admin, editor).
6. **Drafts and publishing.** Built into every collection. Client can save drafts and publish when ready.
7. **TypeScript types auto-generated** from the schema, so the front-end has type-safe reads.

### What we lose vs Sanity

- Sanity has a slicker custom-Studio experience for very complex content modeling.
- Sanity's image CDN is excellent (but we're using Cloudinary anyway).
- Payload is younger; community is smaller but growing fast.

### Why not custom

A custom admin is 1 week of work minimum. Payload gives us 90% of that for free in a few days of config. We'd only build custom if the client needed a uniquely tailored editing experience - which they don't. Standard CRUD with image uploads is what Payload does best.

### Admin operations the client will actually do

The schema we'll define in Payload:

```
Collections:
  events            (CRUD, photo gallery, status field)
  releases          (CRUD, cover, streaming links)
  broadcasts        (CRUD, YouTube link, thumbnail)
  blog_posts        (CRUD, drafts, rich-text body, cover)
  products          (CRUD, variants, images, stripe sync)
  orders            (read-only from webhook, status updatable)
  media             (built-in - every uploaded image / file)
  users             (admin accounts)
```

Each collection's admin UI is generated automatically. Adding a new event = click "Events" → "Create" → fill the form → upload photos → save. ~30 seconds.

### Migration path

Payload data lives in our Postgres. If we ever leave Payload:
- Schema is just SQL tables - readable directly.
- Migrate to another CMS (Strapi, custom admin) by mapping tables.
- Image URLs are stable (Cloudinary / S3 / wherever we configured).

We're never trapped. The Postgres DB is the source of truth.

---

## 6. Upload workflow - admin vs Google Drive vs hybrid

The client mentioned the option of dropping photos into Google Drive and having them sync. Let's actually think about this.

### TL;DR
**Recommended: in-admin drag-and-drop.** Reliable, fast, in-band. Google Drive sync sounds friendly but is fragile in practice.

### What we'd want from each path

**Path A - Drag-and-drop in admin (Payload)**
1. Client logs into `/admin`.
2. Clicks an event → "Upload to gallery" → drags 50 photos.
3. Payload streams them to Cloudinary, records URLs in the DB.
4. Site rebuilds the event page (ISR on-demand revalidation).
5. Photos appear on the public site within seconds.

**Path B - Google Drive folder sync**
1. Client creates a folder in Drive named `2026-05-08-event-name/` and drops photos in.
2. A scheduled job (every 10 minutes, or a Drive change webhook) detects new files.
3. Job downloads each file, uploads to Cloudinary, creates / updates the event entry in the DB.
4. Site picks up the change on next ISR cycle.

**Path C - Hybrid**
1. Admin has a "Connect Google Drive" button.
2. Client picks a folder in a Google Drive picker UI.
3. System imports all files from that folder on-demand.

### Options compared

| Path | Setup work | Failure modes | Client friction | Recommended? |
|---|---|---|---|---|
| **A - In-admin drag-drop** | Low (built into Payload) | Upload fails → client sees error immediately and retries. | Low - one tool for everything. | **Yes.** |
| **B - Drive sync** | High (Drive API auth, webhooks, refresh tokens, conflict resolution) | Token expires silently. Files rename / move and break the link. Slug collisions. Quota limits. | Low - they use Drive (familiar). | No. |
| **C - Drive picker** | Medium (Drive picker API, OAuth, on-demand import) | OAuth flow friction. Token refresh. | Medium - picker on every import. | Maybe - only if client really pushes for it. |

### Why drag-and-drop wins

**Reliability.** Drive sync sounds great until a refresh token expires and 200 photos didn't sync and nobody noticed for two weeks. With drag-and-drop, the moment the upload fails, the client sees it.

**Speed.** Direct upload to Cloudinary is faster than Drive → server → Cloudinary.

**Fewer auth boundaries.** No Google OAuth, no token refresh, no Drive API quota considerations.

**Familiar enough.** Modern clients are comfortable with drag-drop in a web admin - it's the standard interaction in every tool they already use.

### When to revisit

If the client *really* wants Drive-based workflow later - say a photographer dumps photos into a shared Drive after every event - we can add path C (admin "Import from Drive" button) as a future add-on. Pricing: ~$300 one-time. We don't need to build it now.

---

## 7. Authentication (admin only)

### TL;DR
**Recommended: Payload's built-in auth.** Email + password + optional 2FA. Zero third-party dependency.

### What we need

Admin-only login. 1–5 users (client + maybe team). No public-facing accounts. No "sign in with Google" demands.

### Options compared

| Option | Cost | When right |
|---|---|---|
| **Payload built-in** | Free | Default - we're already running Payload. |
| **Clerk** | Free up to 10K MAU | When we need social login / magic links / pre-built UI. |
| **Auth.js (NextAuth)** | Free | When we're building custom admin (not using Payload). |
| **Lucia Auth** | Free | When we want code-first, full control, custom admin. |

Payload's built-in auth includes:
- Email + password with secure hashing.
- Email verification.
- Password reset flow.
- Roles (admin, editor) - restrict who can do what.
- Optional 2FA (TOTP).

That's everything we need.

---

## 8. Email (transactional + order confirmations)

### TL;DR
**Recommended: Resend.** Free 100/day. React Email templates. Modern API.

### What we need

- Order confirmation emails (customer + admin notification).
- Shipping notification emails.
- Future: newsletter / mailing list welcome.
- Branded templates (cream + restrained type matching the site).

### Options compared

| Option | Free tier | Cost above | When right |
|---|---|---|---|
| **Resend** | 100/day, 3K/month | $20/M for 50K | Default. React Email integration is a delight. |
| **Postmark** | None | $15/M for 10K | When you need ultra-high deliverability for transactional. |
| **SendGrid** | 100/day forever | $20/M for 50K | Legacy choice. Older API. |
| **AWS SES** | 62K/month free if sent from EC2 | $0.10 per 1000 | Cheapest at scale. More setup. |

Resend wins on DX - React Email lets us write email templates as React components with the same Tailwind classes we use on the site. Brand consistency for free.

---

## 9. Payments

### TL;DR
**Stripe.** Direct integration via Stripe Checkout (hosted) for v1. No middleman.

### What we need

- PCI-compliant checkout (we don't want card data touching our servers).
- Variants / inventory (small).
- Webhooks to capture order events.
- A way for clients to swap providers later (unlikely but possible).

Stripe's `Checkout` hosted flow is the easiest secure option:
- Client clicks "Buy" → redirects to Stripe-hosted checkout → returns to success page.
- Stripe handles card entry, 3DS, fraud detection, taxes.
- Webhook fires on payment success → our server creates an order record.

**Fees:** 2.9% + $0.30 per transaction in the US. Nothing on top.

**Setup:** ~1 day for Stripe Checkout + webhook + order creation.

### Alternatives considered

- **Stripe Elements (custom UI)** - more design control, more PCI surface area, not worth it here.
- **Lemon Squeezy** - handles tax automatically (VAT, sales tax) at the cost of higher fees (5% + $0.50). Worth considering only if international sales scale up.
- **Paddle** - merchant of record (they handle tax). Similar to Lemon Squeezy.

Stick with Stripe direct unless tax compliance becomes painful.

---

## 10. Hosting

### TL;DR
**Vercel.** Hobby tier (free) covers low traffic. Move to Pro ($20/M per user) when needed.

### What we need

- Edge-rendered Next.js (App Router).
- Generous bandwidth.
- Easy environment variable management.
- Preview deployments for every push.

### Vercel Hobby vs Pro

| | Hobby (free) | Pro ($20/M per user) |
|---|---|---|
| Bandwidth | 100 GB / month | 1 TB / month |
| Build time | 6000 min / month | 24000 min / month |
| Team members | 1 | Unlimited |
| Commercial use | ❌ (technically against ToS) | ✅ |
| Custom domain | ✅ | ✅ |

Important: **Vercel Hobby is non-commercial only**. For a client project, we need Pro. So baseline hosting includes Vercel Pro = $20/M.

### Alternatives

- **Netlify** - same model, similar pricing, slightly worse Next.js DX.
- **Cloudflare Pages** - cheap and fast, but Next.js full features (App Router server components, ISR) less mature.
- **Self-host on a VPS (Hetzner, DigitalOcean)** - cheaper at scale (~$5/M) but ops overhead. Not worth it unless we have a real reason.

---

## 11. Recommended stack - summary

| Layer | Pick | Why | Monthly cost |
|---|---|---|---|
| Framework | Next.js 16 (App Router) | Already prototyped here | $0 |
| Hosting | Vercel Pro | Commercial use, generous bandwidth | $20 |
| Database | Neon (Postgres) | Free tier covers years, easy to leave | $0 |
| ORM | Drizzle | TypeScript-first, lightweight | $0 |
| CMS / admin | Payload CMS v3 | Free, self-hosted, generates admin UI from schema | $0 |
| Image hosting | Cloudinary | Free 25 GB, best image optimization | $0 |
| Video hosting | YouTube (embed) | Free, infinite, brand already there | $0 |
| Auth (admin) | Payload built-in | No third-party | $0 |
| Payments | Stripe Checkout | Standard fees, no middleman | $0 (2.9% + $0.30 per sale) |
| Email | Resend | Free 100/day, React Email | $0 |
| Analytics | Vercel Analytics + GA | Vercel free privacy-friendly + classic GA | $0 |

**Baseline monthly: $20** (Vercel Pro only).

We charge the client **$30/M** to cover Vercel + buffer for the inevitable small upgrades (Cloudinary if it ever crosses the line, Resend at higher email volume, etc.). That margin disappears if anything in the stack moves to a paid tier.

### When costs would rise

- **Cloudinary** → paid at 25 GB / 25 GB bandwidth. ~5 years away at this scale.
- **Vercel** → only if bandwidth exceeds 1 TB / month. Won't happen.
- **Neon** → only if compute hours exceed 100 / month. Won't happen.
- **Resend** → only if more than 3000 emails / month. Could happen if newsletter takes off.

If two of these tip into paid at once, baseline could move from $30 → $50/month. We tell the client this upfront and show them the bill when it happens.

---

## 12. What this stack does *not* lock us into

The principle behind every choice: every piece can be swapped.

| If we leave | What we do |
|---|---|
| Vercel | Deploy the Next.js app anywhere (Cloudflare, Railway, Hetzner, AWS Amplify). |
| Neon | `pg_dump` → restore to any Postgres host. |
| Payload | Postgres is our source of truth; migrate to Strapi / custom admin by reading the same tables. |
| Cloudinary | Image URLs are public. Script-copy to S3 + CloudFront in an afternoon. |
| YouTube | Embeds are URLs. Swap to Vimeo / Stream by changing URLs. |
| Stripe | Webhooks and orders live in our DB; swap to PayPal / Paddle by reimplementing the checkout flow. |
| Resend | Email templates are React components; swap to Postmark / SES by changing the send function. |

No piece can hold the project hostage. That's the difference vs. building on Wix / Squarespace / Shopify.

---

## 13. First-year cost projection (real numbers)

Assuming the client runs the site as described (a few events per month, a release every couple of months, occasional merch):

| Item | Year 1 cost |
|---|---|
| Vercel Pro | $240 |
| Domain | $0 (client already owns) |
| Neon Postgres | $0 (free tier) |
| Cloudinary | $0 (free tier) |
| YouTube | $0 |
| Payload CMS | $0 |
| Stripe fees | varies (2.9% + $0.30 per order) |
| Resend | $0 (free tier) |
| **Total fixed hosting** | **$240** ($20/M) |
| **What we charge client** | **$360** ($30/M) |

The $10/M margin covers:
- Occasional billing alerts triggering small overages.
- Time we spend on routine maintenance not covered by an explicit retainer.
- A buffer for the day Resend / Cloudinary / etc tip into paid.

### Year 5 projection (with growth)

If the site grows significantly (frequent events, busy archive, active merch):
- Cloudinary: maybe $25/M.
- Vercel: still Pro $20/M (unlikely to exceed bandwidth at this site type).
- Resend: maybe $20/M if newsletter scales.
- Neon: still free or $19/M Launch tier.

**Year 5 baseline could be $50–80/M.** We tell the client this is a realistic ceiling for a successful site.

---

## 14. What this means for the proposal

This doc justifies these line items in `proposal.md`:

| Proposal line | Architecture decision |
|---|---|
| AWS S3 + CloudFront Setup ($300) | **Now recommended Cloudinary ($150 setup)** - drop the line by half. |
| Event Photo Upload Automation ($400) | In Payload, this is essentially configuration ($200). |
| Stripe Checkout Integration ($400) | Confirmed - Stripe Checkout + webhook is ~1 day. |
| Order Webhook + Database ($300) | Confirmed - Drizzle schema + webhook handler. |
| Order Confirmation Email ($200) | Resend + React Email - confirmed. |
| Admin: Orders Dashboard ($300) | Payload generates this for free; budget covers customizing the columns / actions. |
| Admin: Content Editor / CMS ($600) | Payload config + collection definitions - confirmed, justified. |

**Net effect on proposal pricing:**

The architecture has us using Cloudinary instead of S3 + CloudFront. Cheaper to set up. The "AWS upload automation" line ($300 + $400 = $700) becomes a single "Media storage + admin upload integration" line at maybe $400.

That's $300 to remove or redeploy in the proposal. Options:
1. **Drop it** - total moves from $9,800 to $9,500.
2. **Redeploy** to add the "Import from Google Drive" optional feature as a stub for v2.
3. **Keep as buffer** - clients usually find one or two surprises that need that budget.

Recommend option 1 or 3. Don't open the Drive-sync door yet - it's a v2 conversation.

---

## 15. Open questions to confirm in discovery

Before we lock the stack:

1. **Cloudinary vs S3?** Default is Cloudinary. Client only needs to know we're using "a managed image CDN with automatic optimization." If they have an AWS preference for any reason, we can switch.
2. **Vercel team or client team?** Do we deploy to our agency's Vercel org and grant the client access, or set up a Vercel team in their name from day one? Affects billing transparency.
3. **Branded admin URL?** `nopointmusic.com/admin` vs `admin.nopointmusic.com`. Recommend the path-based one for simplicity.
4. **2FA requirement on admin accounts?** Yes - non-negotiable for any account that can publish on the public site.
5. **Multi-user from day one?** How many admin accounts? Client + 1 helper, or just client?
6. **Newsletter - yes or later?** Affects whether we set up Resend audiences + signup form in v1 or v2.
7. **Email sending domain?** Need to set up DNS (DKIM, SPF) on `nopointmusic.com` so order emails don't go to spam. Quick win in discovery.
