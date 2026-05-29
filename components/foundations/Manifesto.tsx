// Long-form manifesto, set as an editorial spread: a sticky meta rail of the
// collective's facts on the left, the prose in a comfortable measure on the
// right. Words are No Point's own (from their Instagram statements). One brass
// pull quote rhythm, the red accent spent once (the closing line).

const FACTS: readonly { label: string; value: string }[] = [
  { label: "The ethos", value: "Art for art" },
  { label: "Spaces", value: "Platform 9 · NOP Studios" },
  { label: "A year in", value: "90+ events" },
  { label: "Based", value: "Vancouver · 2024" },
];

export function Manifesto() {
  return (
    <div className="mt-14 pb-8 lg:mt-20">
      <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink/15 pt-7 lg:block lg:space-y-7 lg:sticky lg:top-32">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-base text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <article className="lg:col-span-8">
          <p className="text-2xl leading-snug text-ink sm:text-[1.7rem] sm:leading-[1.3]">
            <span className="float-left mr-3 mt-1 text-7xl font-black leading-[0.7] text-ink">
              A
            </span>
            lgorithms decide what you hear. Art became a fast consumption
            product, and everything starts to sound the same: safe,
            predictable, forgettable.
          </p>

          <blockquote className="my-12 border-l-2 border-brass pl-6 text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">
            People show up to post a story, not to feel the moment.
          </blockquote>

          <div className="space-y-6 text-lg leading-[1.75] text-ink-soft">
            <p>
              No Point Music exists for those who still want to be present -
              spaces where the energy is real and the music does the talking. We
              put out music that exists because it needs to, not because it fits
              a playlist formula. Every night we build comes down to one thing:
              human connection.
            </p>

            <p>
              Between the big headliners there are countless artists with a
              sound and a story worth hearing, but nowhere to tell it. The No
              Point Music Radio Show gives them that stage.
            </p>

            <p>
              So we opened our doors: <span className="text-ink">Platform 9</span>{" "}
              and <span className="text-ink">NOP Studios</span>. We took an old
              warehouse and built everything from the ground up. No big budgets,
              just big dreams and hard work. A year in, Platform 9 has hosted
              more than 90 events across a wide range of genres.
            </p>
          </div>

          <blockquote className="my-12 border-l-2 border-brass pl-6 text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">
            For the creators who feel all of this, our doors are open. Here your
            art isn&apos;t a product. It&apos;s a statement.
          </blockquote>

          <p className="flex items-baseline gap-3 font-mono text-sm uppercase tracking-[0.25em] text-ink">
            <span className="h-2 w-2 shrink-0 translate-y-[1px] rounded-full bg-accent" />
            AI might take over the world, but it can never replace real
            connection.
          </p>
        </article>
      </div>
    </div>
  );
}
