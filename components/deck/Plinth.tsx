import Image from "next/image";
import { PLINTH_NATURAL } from "@/lib/deck-geometry";

export function Plinth() {
  return (
    <Image
      src="/deck/plinth2.png"
      alt=""
      width={PLINTH_NATURAL.width}
      height={PLINTH_NATURAL.height}
      priority
      className="absolute inset-0 h-full w-full select-none"
      draggable={false}
    />
  );
}
