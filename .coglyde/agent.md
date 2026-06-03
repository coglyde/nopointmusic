# Coglyde content agent playbook — No Point Music

You are the content agent for the No Point Music site. A client request arrives as
a GitHub issue labeled `content-request` (plain English, sometimes with an attached
image). Your job: make the smallest correct edit to the content data, pass every
guardrail, and open a PR that auto-merges on green. Then the site deploys itself.

This file is the source of truth for *how* to make changes. Read it fully before editing.

## Golden rules

1. **Touch content data only, unless the request clearly asks for more.** Almost
   every request is a data edit under `lib/content/` or `lib/social.ts`. Do not
   refactor, restyle, or change components/pages unless explicitly asked.
2. **Brand voice (hard rule): never use em dashes (`—`) or `" - "` hyphen-dashes**
   in any copy or comment. Restructure with periods, commas, colons, or a `·`
   separator. `scripts/brand-lint.mjs` enforces this and will fail your PR.
3. **Match the surrounding voice.** No Point is a Vancouver underground collective:
   anti-algorithm, human connection, no headliner billing, the music does the
   talking. 90+ nights at Platform 9 and NOP Studios. Keep copy spare and confident,
   not markety. Mirror the tone of existing entries.
4. **Keep the types intact.** Every file exports a `type` and a `readonly` array.
   Your edit must still satisfy TypeScript. Don't add fields that aren't in the type.
5. **Run all guardrails before opening the PR** (see Workflow). Never push an edit
   that doesn't build, typecheck, lint, and pass brand-lint.
6. **When the request is ambiguous, pick the most conservative interpretation** and
   note your assumption in the PR description. Do not invent facts (dates, prices,
   links). If a required field is missing, leave the optional ones off rather than
   guessing.

## Where each content type lives

| Request is about… | File | Exported array | Item type |
|---|---|---|---|
| Events / nights | `lib/content/events.ts` | `EVENTS` | `NpEvent` |
| Music / releases | `lib/content/releases.ts` | `RELEASES` | `Release` |
| Merch / products | `lib/content/products.ts` | `PRODUCTS` | `Product` |
| Radio shows + video sets/recaps | `lib/content/youtube.ts` | `VIDEOS` | `Video` |
| Instagram feed tiles | `lib/content/instagram.ts` | `POSTS` | `InstagramPost` |
| Social links, email, location | `lib/social.ts` | `SOCIALS`, `EMAIL`, … | `SocialLink` |

Pure helpers (do not duplicate): `lib/youtube.ts` (thumbnail/embed/watch URL builders),
`lib/format.ts` (`isUpcoming(iso)` and date formatting).

## Events — `lib/content/events.ts`

```ts
type NpEvent = {
  slug: string;          // url-safe, lowercase-kebab, unique. Derive from title.
  title: string;
  date: string;          // ISO "YYYY-MM-DD". DRIVES A-side/B-side automatically.
  venue: string;
  city: string;          // usually "Vancouver"
  lineup: readonly string[];
  description: string;
  ticket?: string;       // outbound ticket link. UPCOMING nights only.
  videoId?: string;      // YouTube id of the captured set/recap. PAST nights.
};
```

**A-side / B-side is automatic, do not sort or move entries by hand.** The page
splits `EVENTS` with `isUpcoming(e.date)` (`lib/format.ts`): a future date renders as
an upcoming night (A-side), a past date flips to past nights (B-side). So:

- **Adding an upcoming night:** give it a future `date` and a `ticket` link. Omit
  `videoId`. It appears under upcoming automatically.
- **A night that already happened:** past `date`. Add `videoId` (see YouTube rule)
  if there's a captured set/recap; the past-night card then shows a playable thumbnail.

`slug` is derived from the title (e.g. "Summer Session 2" → `summer-session-2`) and
must be unique in the array.

## Music releases — `lib/content/releases.ts`

```ts
type StreamingService = "Spotify" | "Apple Music" | "Bandcamp" | "SoundCloud";
type Release = {
  catalogue: string;     // "NP005" — increment from the current highest
  title: string;
  artist: string;
  releasedOn: string;    // ISO date, used for display + sort
  format: string;        // "Single" | "EP" | "VA" | "Mix"
  cover?: string;        // "/releases/<file>" — see Images. Omit for vinyl fallback.
  links: Partial<Record<StreamingService, string>>; // only the services that exist
};
```

Newest first; the page renders in array order, so add new releases at the **top**.
Only include streaming links you were given. Use the exact `StreamingService` keys.

## Merch — `lib/content/products.ts`

```ts
type Product = {
  slug: string;          // lowercase-kebab, unique
  name: string;
  price: string;         // free text incl. currency, e.g. "$40 CAD"
  detail: string;        // short material/edition note; use "·" as separator
  image?: string;        // "/merch/<file>" — see Images. Omit if none.
  href?: string;         // outbound store link. Omit for sold-out/coming.
  soldOut?: boolean;     // true marks it sold out
};
```

Common quick requests: **mark sold out** → set `soldOut: true` and remove `href`.
**Restock** → set `soldOut: false` (or remove it) and restore `href`. **Price change**
→ edit the `price` string. Remember `·` not `-` in `detail`.

## Radio + video — `lib/content/youtube.ts`

```ts
type VideoKind = "radio" | "set" | "recap";
type Video = {
  id: string;            // the YouTube video id (see YouTube rule)
  title: string;
  artist: string;
  kind: VideoKind;       // "radio" -> /radio; "set" -> home shuffle; "recap"
  date: string;          // ISO date of broadcast/night, newest first
  venue?: string;
  presentedBy?: string;  // radio sponsor, optional
};
```

`RADIO_SHOWS` and `CAPTURES` are derived from `VIDEOS` by `kind` + date, automatically.
Add the new video to `VIDEOS` with the right `kind` and it appears in the right place.

## Instagram — `lib/content/instagram.ts`

```ts
type InstagramPost = {
  url: string;           // the post/reel URL the tile opens
  src?: string;          // "/feed/<file>.jpg" saved image; omit to auto-pull
  type?: "image" | "video" | "carousel";
  alt?: string;
};
```

Prefer a saved `src` under `/public/feed/` for reliable loading. The bulk path is
the maintainer running `node scripts/igsync.mjs`; for a one-off add, append an entry.

## YouTube rule (important)

The client will paste a **link**, never an id. Extract the 11-char video id and store
only the id:

- `https://www.youtube.com/watch?v=ABC123xyz00` → `ABC123xyz00`
- `https://youtu.be/ABC123xyz00` → `ABC123xyz00`
- `https://www.youtube.com/embed/ABC123xyz00` → `ABC123xyz00`

**Do not store thumbnails or embed URLs.** Everything (thumbnail, hi-res fallback,
watch link, embed) is derived from the id by `lib/youtube.ts`. For a past event with
a captured video, set `videoId`. For the radio/video catalogue, set `id`.

## Images

Images are committed to `/public` and referenced with a root-absolute path (no
`/public` prefix in the value):

| Type | Folder | Field value example |
|---|---|---|
| Release cover | `public/releases/` | `cover: "/releases/np005.jpg"` |
| Merch shot | `public/merch/` | `image: "/merch/hoodie.jpg"` |
| Instagram tile | `public/feed/` | `src: "/feed/01.jpg"` |

When a request includes an attached image: save it to the right folder with a
descriptive lowercase filename, then point the field at `/<folder>/<file>`. If no
image is provided, omit the optional field (releases fall back to engraved vinyl).

## Workflow for every request

1. Read the issue. Identify which file(s) and the smallest edit that satisfies it.
2. Create a branch: `content/<issue-number>-<short-slug>`.
3. Make the edit. Save any attached image to the correct `/public` folder.
4. Run guardrails locally and fix anything red:
   ```
   npm run build
   npm run typecheck
   npm run lint
   node scripts/brand-lint.mjs
   ```
5. Commit. End the commit message with the co-author trailer used in this repo.
6. Open a PR referencing the issue (`Closes #<n>`). In the body, summarize what you
   changed and any assumptions. CI (`.github/workflows/checks.yml`) re-runs the
   guardrails; on green the PR auto-merges.
7. Deploy via `node scripts/deploy.mjs`: it builds a preview, smoke-checks it,
   promotes that exact build to production, smoke-checks prod, and auto-rolls-back
   on failure. (Set `VERCEL_AUTOMATION_BYPASS_SECRET` so the preview smoke can read
   the protected preview URL.)
8. Comment the result back on the issue (PR link + live status).

## When NOT to auto-ship

If the request needs net-new design/components, deletes real content, or you cannot
satisfy the types without guessing facts, open the PR as a **draft** and flag it for
human review instead of auto-merging. Better a held PR than a wrong live edit.
