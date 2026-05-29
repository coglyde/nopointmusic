# nopointmusic

A site for a Vancouver-based music label / venue. Events, releases, radio shows, art happenings - treated as art, not commerce. Inspired by Keinemusik's restraint.

## Vision

> The site is a deck.

The homepage is one persistent piece of UI: a luxury walnut-and-brass turntable on a cream background. The vinyl carries the engraved logo. The tonearm is the navigation - clicking a section lifts the arm, swings it to that groove, drops it. The metaphor stays consistent across the whole product.

This is "art for art." Most music sites are dark, loud, and built around the next sale. This one is quiet, confident, and built around being a beautiful object.

## Goals (from kickoff)

- Song releases - surface what's out, link to streaming.
- Upcoming events - each with an outbound ticket link (we don't sell directly).
- Past events - auto-archived to a separate section (B-side metaphor).
- Radio shows - outbound YouTube links per broadcast.
- Merchandise - outbound to wherever they sell (Shopify / Big Cartel / etc.).

## Non-goals

- Direct ticket sales.
- E-commerce / checkout for merch (v1).
- A user account system, login, accounts.
- A music bed / autoplay audio. Sound is gestural only - no soundtrack.

## Pages

| Route | Purpose |
|---|---|
| `/` | The deck. Hero / nav. |
| `/music` | Releases - sleeve stack, links to streaming. |
| `/events` | A-side: upcoming with ticket links. B-side: past archive. |
| `/radio` | Broadcasts - outbound YouTube links. |
| `/foundations` | Manifesto / about. Hand-drawn, scanned-feeling. |
| `/merch` | Products as 12" sleeves, outbound to seller. |

## Mood board

- [keinemusik.com](https://keinemusik.com/) - restraint, sand-tones, hand-marks.
- [noartmusic.com](https://www.noartmusic.com/) - minimal corner-set type, generous empty space.
- [actaccordingly.nl](https://www.actaccordingly.nl/) - Amsterdam scene reference (different city, similar restraint).

## Aesthetic direction

- **Background** - cream / bone (`#efeae0`), not black. Confidence comes from the empty space.
- **Type** - currently Geist (placeholder). Final pairing: hand-drawn wordmark + a precise mono for labels + a quiet neutral sans for body. Small sizes, generous tracking.
- **Reserved accent** - brand red (`#e51b18`) for selection and live indicators only. Pulled from their poster series. Scarcity = power.
- **Brass** - present in the deck assets, used sparingly elsewhere.
- **Material warmth** - slight film grain, paper texture, micro registration offset on labels (later).

## Sound (gestural only)

No music bed, no autoplay, no soundtrack. Sound is reserved for interaction feedback - a small library that triggers on user gesture, then returns to silence:

- needle drop (on nav select)
- tonearm lift / swing click
- scratch (only when user drags the arm)
- sleeve slide (when pulling a release / event sleeve)
- paper rustle (page transition)

Howler is installed; not yet wired.

## Interaction model

- **Disc rotates on scroll.** No idle spin. As the user scrolls, the disc rotates proportionally. Speed knob (33 / 45) changes the scroll-to-rotation ratio.
- **Tonearm parks at rest** off-disc to the lower-right when nothing is selected.
- **Hover nav item** → arm peeks ~25% toward that groove. Stable base - peeking different items doesn't drift.
- **Leave nav** → arm settles at active groove (or rest if none).
- **Click nav** → arm fully swings to that groove, then routes after the swing animation completes.
- **Drag arm** → free scratch interaction with real momentum (planned, not built yet).
- **Speed knob** → click toggles 33 ↔ 45.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React 19) on Vercel.
- **Tailwind CSS 4** with custom theme tokens in `app/globals.css`.
- **GSAP** (rotation, swing, drag-to-scratch later via `Draggable`).
- **Howler.js** for the small SFX library.
- **No CMS** - content lives in TS files. Add Sanity / Notion API later when content needs non-developer editing.
- **No commerce** - every "buy" or ticket is an outbound link.

## Asset pipeline

The deck is composed of three custom asset layers in `public/deck/`:

1. **`vinyl.png`** - black record with the brand engraved as machined silver inlay across the playable surface. Logo is the official wordmark.
2. **`plinth.png`** - silver titanium turntable base with warm yellow gold hardware: platter well, tonearm mount, recessed 33/45 dial.
3. **`arm.png`** - yellow gold S-shaped tonearm with diamond stylus headshell. Pivot at top-center.

All three composited at runtime as separate transformable layers. Sizes and positions live in `lib/deck-geometry.ts`. Production reference for reproducing the look lives in `docs/prompts/`.

## Geometry (single source of truth: `lib/deck-geometry.ts`)

All coordinates are percentages of the plinth container, so the deck scales fluidly with viewport.

- `PLATTER` - center + diameter of the vinyl well. Vinyl is positioned absolutely at this center.
- `ARM_MOUNT` - center of the brass tonearm pivot on the plinth. The arm element's pivot lands here.
- `ARM_PIVOT_IN_IMAGE` - where the pivot sits inside `arm.png` (used for `transform-origin` and the offset translate).
- `ARM_LENGTH_PCT` - height of the arm image as % of plinth width. Aspect ratio is preserved.
- `SPEED_KNOB` - center of the 33/45 control on the plinth.
- `ARM_ANGLE` - discrete angles per state: `rest`, plus one per nav groove.

Tuning these is iterative - eyeball, screenshot, adjust.

## File layout

Per the project's SRP rules: small focused files, narrow hooks, one concern per module.

```
app/
  layout.tsx                  Root html, fonts, body bg
  globals.css                 Cream theme, design tokens
  page.tsx                    Home - mounts the Deck
  music/page.tsx              ─┐
  events/page.tsx              │
  radio/page.tsx               │ Section stubs
  foundations/page.tsx         │
  merch/page.tsx              ─┘
components/
  deck/
    Deck.tsx                  Composes layers + wires hooks
    Plinth.tsx                Static plinth image
    Vinyl.tsx                 Vinyl image (rotated by hook)
    Tonearm.tsx               Arm image (rotated by hook)
    NavLabels.tsx             Five nav buttons
    SpeedKnob.tsx             33/45 toggle
  section/
    SectionShell.tsx          Cream layout for stub pages
hooks/
  useDiscRotation.ts          Scroll → rotation
  useTonearm.ts               Rest / peek / swing
  useSpeedKnob.ts             33 ↔ 45 toggle
lib/
  deck-geometry.ts            All positions and angles
  deck-routes.ts              Nav items (label, href, groove)
public/
  deck/{plinth,vinyl,arm}.png
```

## Current prototype scope

Working today (with caveats):

- Three-layer composition renders.
- Disc spins on scroll (after this iteration).
- Speed knob toggles 33 ↔ 45.
- Nav hover peeks the arm; click swings + routes.
- Five stub pages resolve.

## Known issues / next iterations

**Alignment (open)**
- Arm image is currently oversized vs. the plinth's brass mount. Needs `ARM_LENGTH_PCT` reduction.
- Arm pivot doesn't perfectly land on the plinth's brass mount circle. Tune `ARM_MOUNT` constants.
- Vinyl has slight cream gap inside the platter well. Tune `PLATTER` center/diameter.

**Polish (planned)**
- Lift-arc-drop motion on swing (currently just rotates flat).
- Drag-to-scratch with momentum on the arm.
- Needle-drop SFX wired via Howler.
- Persistent deck across routes (route-group layout) so it stays mounted on navigation.
- Idle "butler" behavior - slow trace if the user hasn't moved in 20s.

**Content (planned)**
- Real engraved-vinyl asset using actual nopointmusic wordmark (current is placeholder direction).
- Hand-drawn wordmark file.
- Real release / event / radio data.

**Polish (further out)**
- B-side flip for events archive.
- Sleeve stack interaction for releases and merch.
- Mobile language - tonearm doesn't translate to thumb; needs a separate gesture model.
- Accessibility parallel - keyboard / screen-reader navigation that isn't an afterthought.

## Reference prompts (for re-generating assets)

The prompts used to generate `vinyl.png`, `plinth.png`, `arm.png` are kept in `docs/prompts/` so the look-and-feel can be regenerated consistently if assets need changes.
