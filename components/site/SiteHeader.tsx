import Image from "next/image";
import Link from "next/link";
import { SpinningVinyl } from "@/components/site/SpinningVinyl";

// Fixed, always-visible top bar: bigger wordmark on the left, a large vinyl
// centered (spins as you scroll), location stamp on the right. The frosted dark
// backdrop keeps the white artwork legible over both the hero video and the
// lighter content below.
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-md">
      <div className="grid grid-cols-3 items-center px-6 py-3 sm:px-10">
        <Link
          href="/"
          aria-label="nopointmusic — home"
          className="justify-self-start"
        >
          <Image
            src="/logos/text-logo-white.png"
            alt="nopointmusic"
            width={280}
            height={142}
            preload
            className="h-12 w-auto sm:h-16"
          />
        </Link>

        <div className="justify-self-center">
          <SpinningVinyl size={56} />
        </div>

        <p className="hidden justify-self-end text-right font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.3em] text-white/70 sm:block">
          based in vancouver
          <br />
          est. 2024
        </p>
      </div>
    </header>
  );
}
