// Small, dependency-free date formatters. ISO strings in, gallery-grade labels
// out. Parsed as UTC noon so the displayed day never drifts by timezone.

function atUtcNoon(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

// "18 Apr 2026"
export function formatDate(iso: string): string {
  return atUtcNoon(iso).toLocaleDateString("en-CA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "2026.04", mono metadata stamp.
export function formatStamp(iso: string): string {
  const d = atUtcNoon(iso);
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${d.getUTCFullYear()}.${month}`;
}

// True if the date is today or later (UTC day granularity).
export function isUpcoming(iso: string): boolean {
  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  return atUtcNoon(iso).getTime() >= today;
}
