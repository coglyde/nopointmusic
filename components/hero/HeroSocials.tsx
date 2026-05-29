import { SOCIALS } from "@/lib/social";
import { BRAND_ICONS, PRIMARY_SOCIALS } from "@/components/social/brandIcons";

// Minimal social icons pinned to the hero's bottom-left, mirroring the theme
// switcher on the bottom-right. White over the dark footage, brightening on
// hover, no theme dependence since the hero is always dark.
export function HeroSocials() {
  return (
    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-5 sm:left-10">
      {PRIMARY_SOCIALS.map((label) => {
        const social = SOCIALS.find((s) => s.label === label);
        if (!social) return null;
        return (
          <a
            key={label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="block h-[18px] w-[18px] text-white/55 transition-colors duration-200 hover:text-white"
          >
            {BRAND_ICONS[label]}
          </a>
        );
      })}
    </div>
  );
}
