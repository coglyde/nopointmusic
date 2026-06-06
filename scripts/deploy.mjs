#!/usr/bin/env node
// CLI-driven deploy pipeline for the content agent. Safe-by-construction:
// build a preview, smoke it, and only then promote that exact build to
// production. Smoke prod after promotion; roll back automatically if it fails.
//
// The repo must be linked (`vercel link`); the agent runs with the Vercel CLI
// logged in or VERCEL_TOKEN set. Requires `vercel` on PATH.
//
// Usage:
//   node scripts/deploy.mjs              full pipeline (promotes to prod)
//   PREVIEW_ONLY=1 node scripts/deploy.mjs   deploy + smoke a preview, no promote
//   PROD_URL=https://nopointmusic.com node scripts/deploy.mjs   override prod url

import { execFileSync } from "node:child_process";

const PROD_URL = (process.env.PROD_URL || "https://nopointmusic.vercel.app").replace(/\/$/, "");
const PREVIEW_ONLY = process.env.PREVIEW_ONLY === "1";

function vercel(args, { capture = false } = {}) {
  return execFileSync("vercel", [...args, "--yes"], {
    encoding: "utf8",
    // capture stdout (deployment URL) but let stderr stream through
    stdio: capture ? ["inherit", "pipe", "inherit"] : "inherit",
  });
}

function smoke(url) {
  // throws (non-zero exit) if any route is unhealthy
  execFileSync("node", ["scripts/smoke.mjs", url], { stdio: "inherit" });
}

function extractDeploymentUrl(stdout) {
  const matches = stdout.match(/https:\/\/[^\s]+\.vercel\.app/g);
  if (!matches) throw new Error("no deployment URL found in vercel output");
  return matches[matches.length - 1];
}

console.log("1/4  preview deploy");
const previewUrl = extractDeploymentUrl(vercel(["deploy"], { capture: true }));
console.log(`     ${previewUrl}`);

console.log("2/4  smoke preview");
smoke(previewUrl);

if (PREVIEW_ONLY) {
  console.log(`\npreview healthy (PREVIEW_ONLY, not promoting): ${previewUrl}`);
  process.exit(0);
}

console.log("3/4  promote to production");
vercel(["promote", previewUrl]);

console.log("4/4  smoke production");
try {
  smoke(PROD_URL);
} catch {
  console.error("production smoke FAILED, rolling back");
  try {
    vercel(["rollback"]);
    console.error("rolled back to previous production deployment");
  } catch (err) {
    console.error(`rollback ALSO failed, needs a human: ${String(err)}`);
  }
  process.exit(1);
}

console.log(`\ndeployed and healthy: ${PROD_URL}`);
