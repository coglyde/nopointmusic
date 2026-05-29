# Feature: The Record Player

> Status: proposed / design
> Owner: TBD
> Surface: `/music`

## 1. The idea in one line

Clicking a release loads its record onto a real turntable on the page: the vinyl
glides onto the platter, the tonearm swings over and drops, the disc spins up,
and the track starts playing. Stopping lifts the arm and lets the platter coast
down. The site stops being a list of links and becomes the object it keeps
talking about: "a directory and an object, not a checkout."

This is the payoff for the turntable art we already built (and deliberately
parked): `Deck`, `Plinth`, `Vinyl`, `Tonearm`, `SpeedKnob`, plus the
`useTonearm` / `useDiscRotation` / `useSpeedKnob` hooks and `deck-geometry`.

## 2. Why it is worth building

- It is the single most on-brand interaction the site can have. The whole
  identity (spinning vinyl in the nav, "art for art", the deck metaphor) points
  here.
- It is memorable and shareable in a way a streaming-link list never is.
- The hard part (a geometrically accurate, animatable turntable) is already
  done and sitting in `components/deck/`.

It is also a "huge feature" because doing it well touches audio playback,
licensing, an animation state machine, mobile fallbacks, and accessibility. This
doc scopes it so it can ship in phases instead of as one risky push.

## 3. UX narrative (the choreography)

Default state: the deck sits center/right, platter empty (or holding the last
played record), arm at rest. A shelf of releases sits to the left.

On selecting a release:

1. `cue` - the chosen cover/disc animates from its shelf position onto the
   platter (shared-element / FLIP transition), settling at platter center.
2. `arm-down` - the tonearm swings from its rest post to the outer groove and
   lowers (reuse `useTonearm.swingTo`). A soft needle-drop sound is optional.
3. `play` - the platter spins up to 33 (or 45) rpm and audio begins. Rotation is
   driven continuously while playing (not by scroll, unlike the old homepage
   use of `useDiscRotation`).
4. `tracking` - as the track progresses, the arm creeps inward toward the label,
   mapping playback progress to arm angle. This is the detail that sells it.
5. On end or stop: `arm-up` (arm lifts and returns), platter coasts down, audio
   stops. On switching to another record while one plays: lift, eject current,
   then run the cue sequence for the new one.

Idle delight (optional, later): if nothing is selected, the platter holds a
"now spinning" featured record at a slow idle, or shows the engraved-vinyl
fallback art.

## 4. Audio strategy (the real fork)

The catalogue currently only links out to streaming. Real playback needs a
source. Options, with the tradeoffs:

| Option | Playback | Auth/cost | Control fidelity | Fit |
| --- | --- | --- | --- | --- |
| A. Hosted preview clips (~30-60s, our own masters) in `/public` or Blob, played via `howler`/`<audio>` | Short preview | None | Full (currentTime drives the arm) | Best for v1 |
| B. SoundCloud Widget API (hidden iframe, driven by JS) | Full track | None (public) | Good (play/pause/seek + position events) | Best "full track, no hosting" |
| C. Spotify Web Playback SDK | Full track | Per-visitor Premium + OAuth | Good | Too gated for a public site |
| D. Bandcamp embed | Clip/full | None | Low (limited API) | Fallback only |

Recommendation: **A for v1** (precise control makes the arm-tracking animation
trivially accurate and works for every visitor with zero auth), then **B as an
upgrade** for full-length playback without hosting or licensing friction, since
the label already uses SoundCloud. They can coexist: a release can carry a
`previewSrc` (A) and/or a `soundcloudUrl` (B), and the player prefers whichever
is present.

`howler` (already a dependency) is the right wrapper for A: it normalizes
autoplay, gives us `seek()`/`duration()`/`on('end')`, and handles the iOS
unlock-on-gesture quirk. The click that selects a record IS the user gesture, so
autoplay policies are satisfied.

### Data model change

Extend `Release` in `lib/content/releases.ts`:

```ts
export type Release = {
  // ...existing fields...
  previewSrc?: string;     // /audio/np004.mp3 (option A)
  soundcloudUrl?: string;  // https://soundcloud.com/.../track (option B)
  durationSec?: number;    // optional, for arm-tracking before metadata loads
};
```

A release with neither stays a pure link-out row (graceful: no play affordance,
just StreamLinks). Nothing breaks if the label has not provided audio yet.

## 5. Architecture

Reuse the parked deck pieces; add an orchestration layer. Keep files small and
single-responsibility (one concern each).

```
app/music/page.tsx
  -> RecordPlayerStage            (client; lays out shelf + deck, owns selection)
       -> ReleaseShelf            (the list/grid of selectable records)
            -> ShelfRecord        (one record on the shelf; the FLIP source)
       -> RecordPlayer            (the deck + transport; the FLIP target)
            -> Deck/Plinth/Vinyl/Tonearm/SpeedKnob   (existing)
            -> TransportControls  (play/pause/stop/seek, rpm toggle)
            -> NowPlaying         (title/artist/catalogue + StreamLinks)

hooks/
  useRecordPlayer.ts   (the state machine: state + selected + transitions)
  usePlaybackAudio.ts  (howler lifecycle: load/play/pause/seek/position/onend)
  useArmTracking.ts    (maps playback progress -> tonearm angle each frame)
  (existing) useTonearm, useDiscRotation->useSpinWhilePlaying, useSpeedKnob

lib/
  deck-geometry.ts     (existing; source of platter center + arm pivot/length)
  player-machine.ts    (pure transition table, easy to unit test)
```

Note: `useDiscRotation` currently spins on scroll. The player needs a
"spin continuously while playing" variant; factor the rotation driver so the
record-player uses a time/rpm driver, leaving the scroll driver for the nav
vinyl. Same component, different driver (the `SpinningVinyl` split we already
have is the precedent).

## 6. State machine

Keep it explicit so the animation and audio never desync.

```
idle -> cueing        (user selects a record)
cueing -> armingDown  (record seated on platter)
armingDown -> playing (arm reaches groove + audio starts)
playing <-> paused    (transport)
playing -> stopping   (track ends or user stops)
paused  -> stopping
stopping -> ejecting  (arm lifted, platter coasting)
ejecting -> idle
any -> cueing         (selecting a different record; runs eject first)
```

`player-machine.ts` holds this as a pure function `(state, event) -> state`.
`useRecordPlayer` wires it to GSAP timelines and the audio hook. Each transition
owns one timeline so interrupts (rapid switching) can kill/replace cleanly.

## 7. Animation choreography

- Use GSAP (already a dependency). One master timeline per transition.
- The record "fly to platter" is a shared-element move: measure the shelf
  record's rect and the platter target rect (from `deck-geometry.PLATTER`), then
  animate a floating clone with FLIP. On arrival, mount the real `Vinyl` on the
  platter and remove the clone.
- Arm motion reuses `useTonearm.swingTo(groove)` / `settleAt`. The grooves map
  to: outer groove (track start), inner (track end). We can interpolate the arm
  angle between those two for `tracking`.
- Platter spin: a continuous rotation tween while `playing`, paused/resumed with
  the audio. Speed = rpm (33 default, 45 optional via the existing `SpeedKnob`).
- All animation is transform-only (`rotate`, `translate`, `scale`) with
  `will-change: transform` for 60fps. No layout-thrash properties.

## 8. Playback <-> motion sync

- `usePlaybackAudio` exposes `position` (seconds) and `duration`.
- `useArmTracking` maps `position/duration` to an arm angle between the outer and
  inner groove constants, updating via a single rAF (do not setState per frame;
  write the transform directly, the pattern already used in `usePointerFollow`).
- Pausing audio pauses the platter tween and freezes the arm. Seeking (if we
  expose a scrubber) moves the arm to the matching angle.

## 9. Layout

- Desktop: two columns. Left = `ReleaseShelf` (scannable list, catalogue +
  title + artist + format). Right = `RecordPlayer` (deck large, transport +
  NowPlaying beneath). The deck is the hero.
- Mobile: stacked. Deck on top (smaller), shelf below. The fly-to-platter
  animation degrades to a quick fade/scale onto the platter (less travel).
- Keep within the existing `PageShell` (sticky header, cream theme, footer).

## 10. Accessibility and ethos

- The whole thing must work as a plain, operable music control, not just eye
  candy. Real `<button>` transport controls with labels; the deck is decoration
  layered on top.
- `prefers-reduced-motion`: skip the fly-in and arm choreography; just swap the
  record and play. Audio still works; the platter can hold static or spin
  slowly.
- Keyboard: shelf items are buttons; space/enter selects; transport is
  focusable; arrow keys can seek.
- Respect the "links out" ethos: `NowPlaying` always shows `StreamLinks` so the
  preview is a taster that points to the real streaming home. The player is a
  taster and an object, still not a checkout.
- Audio never autoplays without the user's click. Default muted-safe: start at a
  sensible volume, expose a mute.

## 11. Performance

- Lazy-load audio: only fetch a clip when its record is selected (howler
  `preload: false`, or construct on select).
- Keep clips small (128-160kbps MP3, 30-60s -> ~0.5-1MB each).
- One rAF loop for arm tracking; transform-only tweens; pause tweens when the
  tab is hidden (`visibilitychange`).
- Code-split the player off the rest of the route so the deck + GSAP only load
  on `/music`.

## 12. Edge cases

- Rapid record switching: every transition timeline is interruptible; selecting
  B while A plays runs eject(A) then cue(B). Guard with the state machine.
- Audio load failure / offline: fall back to the animation-only "spinning" state
  and surface StreamLinks; never leave the arm stuck mid-air.
- iOS autoplay: satisfied by the selecting tap; still call `howler` unlock on
  first gesture.
- No audio source on a release: render it as a link-out row with no play button.
- Reduced data / mobile: consider not auto-fetching the clip until a second tap
  ("tap to load").

## 13. Phasing

- **Phase 1 - The deck plays (visual + preview audio).** Bring the deck onto
  `/music`, wire select -> cue -> arm-down -> spin -> play with hosted preview
  clips (option A). Transport: play/pause/stop. This is the demoable wow moment.
- **Phase 2 - Tracking + transport polish.** Arm tracks progress, rpm toggle via
  `SpeedKnob`, scrubber, volume/mute, idle "now spinning" state.
- **Phase 3 - Full tracks via SoundCloud (option B).** Hidden widget driven by
  the same state machine; prefer full track when present, else preview.
- **Phase 4 - Delight + a11y hardening.** Needle-drop SFX (toggleable), reduced
  -motion path, keyboard/scrubber, share "now playing".

## 14. What the label needs to provide

- Per release: either a short preview clip (their own master, 30-60s) for
  `/public/audio/`, or a public SoundCloud track URL.
- Cover art per release for the disc/label face (already supported via
  `Release.cover`; falls back to engraved vinyl).

## 15. Open questions

- Preview clips vs full SoundCloud for launch? (Affects Phase 1 scope.)
- One deck that swaps records, or a "stack" you can queue? (v1: one deck.)
- 33 vs 45 default, and do we expose the speed toggle in v1?
- Does selecting a record deep-link (`/music?play=NP004`) for sharing?

---

### Appendix: reusable assets already in the repo

- `components/deck/Deck.tsx`, `Plinth.tsx`, `Vinyl.tsx`, `Tonearm.tsx`,
  `SpeedKnob.tsx`
- `hooks/useTonearm.ts` (`swingTo`, `peekFrom`, `settleAt`),
  `useDiscRotation.ts`, `useSpeedKnob.ts`
- `lib/deck-geometry.ts` (`PLATTER`, `ARM_MOUNT`, `ARM_PIVOT_IN_IMAGE`,
  `ARM_LENGTH_PCT`, `PLINTH_ASPECT`, `GrooveTarget`)
- `public/deck/` art (`vinyl.png`, `plinth1.png`, `plinth2.png`, `arm.png`)
