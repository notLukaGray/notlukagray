import type { HeroProject } from "@/core/lib/globals";

/** Wrap index into [0, length). */
export function wrapIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  if (index < 0) {
    return ((index % length) + length) % length;
  }
  if (index >= length) {
    return index % length;
  }
  return index;
}

/** Opacity for carousel position 0-6 (center=3). */
export function getHeroCarouselOpacity(position: number): number {
  const opacities = [0, 0.2, 0.4, 0.8, 0.4, 0.2, 0];
  return opacities[position] ?? 0;
}

export function getProjectUrl(project: HeroProject): string {
  return `/work/${project.slug}`;
}

/** Background color for carousel placeholder (hue shifts by index). */
export function getCarouselPlaceholderBg(activeIndex: number): string {
  return `hsl(${(activeIndex * 45) % 360}, 20%, 10%)`;
}
