#!/usr/bin/env node
// Post-deploy smoke check. Hits the key routes against a base URL and asserts
// each returns HTTP 200 and contains an expected content marker. Run this against
// the Vercel PREVIEW url before promoting to production; on failure the pipeline
// auto-rolls-back instead of shipping a broken page.
//
// Usage:
//   node scripts/smoke.mjs https://my-preview.vercel.app
//   SMOKE_URL=https://... node scripts/smoke.mjs

const base = (process.argv[2] || process.env.SMOKE_URL || "").replace(/\/$/, "");

if (!base) {
  console.error("smoke: no base URL. Pass it as an arg or set SMOKE_URL.");
  process.exit(2);
}

// route -> a string that must appear in the returned HTML. "No Point" is in the
// sitewide metadata/footer, so every page should contain it; per-route markers
// catch a page rendering the wrong content.
const ROUTES = [
  { path: "/", marker: "No Point" },
  { path: "/events", marker: "Events" },
  { path: "/music", marker: "No Point" },
  { path: "/merch", marker: "No Point" },
  { path: "/radio", marker: "No Point" },
  { path: "/foundations", marker: "No Point" },
];

const TIMEOUT_MS = 15000;

async function check({ path, marker }) {
  const url = base + path;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return { path, ok: false, reason: `HTTP ${res.status}` };
    const body = await res.text();
    if (!body.includes(marker)) {
      return { path, ok: false, reason: `missing marker "${marker}"` };
    }
    return { path, ok: true };
  } catch (err) {
    return { path, ok: false, reason: err.name === "AbortError" ? "timeout" : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

const results = await Promise.all(ROUTES.map(check));
const failed = results.filter((r) => !r.ok);

for (const r of results) {
  console.log(`  ${r.ok ? "ok " : "FAIL"}  ${r.path}${r.ok ? "" : "  (" + r.reason + ")"}`);
}

if (failed.length > 0) {
  console.error(`\nsmoke: ${failed.length}/${results.length} route(s) failed against ${base}`);
  process.exit(1);
}

console.log(`\nsmoke: all ${results.length} routes healthy against ${base}`);
