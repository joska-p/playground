import type { HSLColor } from "../utils/colorConversions.js";

type Palette = HSLColor[];
type BaseColor = HSLColor & { location: { x: number; y: number } };

const DEBOUNCE_DELAY = 100;

const initialBaseColor: BaseColor = {
  hue: 180,
  saturation: 100,
  lightness: 50,
  location: { x: 184, y: 184 },
};

export type { Palette, BaseColor };
export { DEBOUNCE_DELAY, initialBaseColor };
