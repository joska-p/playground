const defaultPalette = {
  "--color-0": "#333333",
  "--color-1": "#555555",
  "--color-2": "#777777",
  "--color-3": "#999999",
  "--color-4": "#bbbbbb",
} as const;

export type Palette = Record<keyof typeof defaultPalette, string>;

const initialPalette = defaultPalette;

export { initialPalette };
