import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/section/PageShell";

export const metadata: Metadata = {
  title: "About · No Point Music",
  description:
    "No Point is a Vancouver music collective: 90+ nights at Platform 9 and NOP Studios, built around human connection over the algorithm.",
};

export default function AboutPage() {
  return (
    <PageShell
      index="01"
      kicker="The collective"
      title="About"
      lede="No Point is a Vancouver music collective. We build nights around one thing: people in a room, present, off their phones."
    >
      <div className="grid gap-10 pb-24 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/5">
          <Image
            src="/gentt-nopointmusic-about.jpg"
            alt="No Point Music"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            It started in 2024 with a simple idea: no headliner billing, no
            algorithm deciding what you hear. Just a proper system, a dark room,
            and music that does the talking.
          </p>
          <p>
            Since then it has grown into 90+ nights at Platform 9 and NOP
            Studios, a radio series, and a small catalogue of releases.
            Different rooms, same intent. Connection over clout.
          </p>
          <p>
            We are a crew of DJs, producers, and the people who keep showing up.
            The point was never the point. Come find us on the floor.
          </p>
          <Link
            href="/events"
            className="inline-block pt-2 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink transition-colors hover:text-accent"
          >
            See what&apos;s coming &rarr;
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
