import Image from "next/image";
import Link from "next/link";
import { SpinningVinyl } from "@/components/site/SpinningVinyl";

// Top bar that sits over the hero video: wordmark + spinning vinyl on the left,
// location stamp on the right. White artwork reads cleanly over the dark scrim.
export function HeroBar() {
  return (
    <header className="flex items-center justify-between px-6 pt-7 sm:px-10">
      <Link href="/" className="flex items-center gap-4" aria-label="nopointmusic — home">
        <Image
          src="/logos/text-logo-white.png"
          alt="nopointmusic"
          width={140}
          height={71}
          preload
          className="h-9 w-auto"
        />
        <SpinningVinyl size={34} />
      </Link>
      <p className="text-right font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.3em] text-white/70">
        based in vancouver
        <br />
        est. 2024
      </p>
    </header>
  );
}
