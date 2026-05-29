type Props = {
  // Two-digit section index, e.g. "01".
  index: string;
  // Mono kicker, e.g. "Releases".
  kicker: string;
  // Display title, large.
  title: string;
  // Optional lede paragraph.
  lede?: string;
};

// The masthead block at the top of each section: a small indexed kicker, a big
// quiet title, and an optional lede. Generous top space - the page should open
// with air, per the design brief.
export function PageIntro({ index, kicker, title, lede }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10 sm:pt-28">
      <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
        <span className="tabular-nums text-accent">{index}</span>
        <span className="h-px w-8 bg-ink/20" />
        <span>{kicker}</span>
      </div>

      <h1 className="mt-5 text-4xl font-black uppercase leading-[1.02] tracking-[-0.02em] text-ink sm:text-6xl">
        {title}
      </h1>

      {lede ? (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
