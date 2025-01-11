import { type HSLColor } from "./color-conversions";

export function monochromeColorScheme(baseColor: HSLColor, length: number): HSLColor[] {
  const colors = Array.from({ length }, (_, i) => {
    const hueJump = 360 / length;
    const hue = baseColor.hue + i * hueJump;
    const saturation = baseColor.saturation;
    const lightness = baseColor.lightness;
    return { hue, saturation, lightness };
  });
  return colors;
}
