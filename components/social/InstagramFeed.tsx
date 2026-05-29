import { OutboundLink } from "@/components/ui/OutboundLink";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE,
  POSTS,
} from "@/lib/content/instagram";
import { PostCard } from "./PostCard";

// "From the feed" section: a poster wall of the collective's strongest posts,
// each tile linking out to Instagram. Falls back to a quiet follow strip while
// the curated list is empty, so the section never reads as broken.
export function InstagramFeed() {
  const hasPosts = POSTS.length > 0;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <div className="flex items-baseline gap-3 border-b border-ink/15 pb-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="text-accent">→</span>
        <span>From the feed</span>
        <a
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noreferrer"
          className="ml-auto tracking-[0.18em] transition-colors hover:text-accent"
        >
          {INSTAGRAM_HANDLE}
        </a>
      </div>

      {hasPosts ? (
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {POSTS.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-start gap-5 py-10">
          <p className="max-w-lg text-lg leading-relaxed text-ink">
            The clearest picture of a night is the one taken in the room.
            Photos, clips, and announcements live on Instagram. That&apos;s
            where the collective talks first.
          </p>
          <OutboundLink href={INSTAGRAM_PROFILE}>
            Follow {INSTAGRAM_HANDLE}
          </OutboundLink>
        </div>
      )}
    </section>
  );
}
