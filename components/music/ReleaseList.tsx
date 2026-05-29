import { RELEASES } from "@/lib/content/releases";
import { ReleaseRow } from "./ReleaseRow";

// The full catalogue, newest first, divided by hairlines. Reads the data file
// in array order - the data file is maintained newest-first.
export function ReleaseList() {
  return (
    <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
      {RELEASES.map((release) => (
        <ReleaseRow key={release.catalogue} release={release} />
      ))}
    </div>
  );
}
