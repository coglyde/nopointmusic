#!/usr/bin/env node
// Brand-voice lint. Fails (exit 1) if any content file contains an em dash or a
// " - " hyphen-dash used as a separator. House rule: restructure with periods,
// commas, colons, or a "·" separator instead. This is the gate that stops the
// content agent (or anyone) from shipping off-brand punctuation.
//
// Run: node scripts/brand-lint.mjs

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Files the content agent edits. Add paths here to widen coverage.
const TARGET_DIRS = ["lib/content"];
const TARGET_FILES = ["lib/social.ts"];

// What we forbid, and the fix to suggest.
const RULES = [
  { name: "em dash", re: /—/g, fix: 'use a period, comma, colon, or "·"' },
  { name: "en dash", re: /–/g, fix: 'use a period, comma, colon, or "·"' },
  {
    name: '" - " hyphen-dash',
    re: / - /g,
    fix: 'restructure, or use "·" as a separator',
  },
];

function collectFiles() {
  const files = [...TARGET_FILES];
  for (const dir of TARGET_DIRS) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      continue; // dir absent is fine
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      if (statSync(full).isFile() && full.endsWith(".ts")) files.push(full);
    }
  }
  return files;
}

const violations = [];

for (const file of collectFiles()) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line)) !== null) {
        violations.push({
          file,
          line: i + 1,
          col: m.index + 1,
          rule: rule.name,
          fix: rule.fix,
          snippet: line.trim().slice(0, 100),
        });
      }
    }
  });
}

if (violations.length === 0) {
  console.log("brand-lint: clean (no em dashes or \" - \" hyphen-dashes)");
  process.exit(0);
}

console.error(`brand-lint: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}:${v.col}  ${v.rule}: ${v.fix}`);
  console.error(`    ${v.snippet}`);
}
console.error(
  '\nHouse rule: no em dashes, no " - ". Restructure with periods/commas/colons or "·".',
);
process.exit(1);
