import type { Palette } from "../core/initialPalette";
import { getRandom } from "./getRandom";

function generateTileColors(palette: Palette): [string, string, string, string, string] {
  const paletteKeys = Object.keys(palette) as (keyof Palette)[];
  return Array.from({ length: 5 }, () => palette[getRandom(paletteKeys)]) as [
    string,
    string,
    string,
    string,
    string,
  ];
}

export { generateTileColors };
