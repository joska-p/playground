/** Returns the CSS custom property name for a community (wraps at 24 palette slots). */
export function communityColorVar(communityId: number): string {
  return `--color-palette-${communityId % 24}`;
}

/** Returns the Tailwind CSS variable reference for use in className. */
export function communityColorClass(communityId: number): string {
  return `var(--color-palette-${communityId % 24})`;
}
