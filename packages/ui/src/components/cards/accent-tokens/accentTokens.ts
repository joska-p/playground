/**
 * Convenience shortcuts for the `accent` prop CardLink (and everything
 * built on it) accepts. These are the "built-in variants" — but the
 * component itself never validates against this list. Pass any CSS
 * value, including your own `"var(--category-generative)"`, and it
 * works exactly the same way. This object exists purely so you don't
 * have to remember/retype `var(--...)` for the tokens this design
 * system already ships.
 */
export const accentTokens = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  warning: 'var(--warning)',
  destructive: 'var(--destructive)',
  red: 'var(--red)',
  green: 'var(--green)',
  yellow: 'var(--yellow)',
  blue: 'var(--blue)',
  purple: 'var(--purple)',
  aqua: 'var(--aqua)',
  orange: 'var(--orange)'
} as const;

export type AccentToken = keyof typeof accentTokens;
