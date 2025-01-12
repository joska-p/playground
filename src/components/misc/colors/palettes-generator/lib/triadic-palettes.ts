import type { HSLColor } from "./color-conversions";

function triadicPalettes({ hue, saturation, lightness }: HSLColor, length: number): HSLColor[] {
  const palette: HSLColor[] = [];
  const angle = 120; // Angle for triadic colors is 120.

  for (let i = -Math.floor(length / 2); i <= Math.floor(length / 2); i++) {
    const newHue = (hue + (i * angle + (Math.random() * 100 - 50)) + 360) % 360; // Wrap around hue. And add a small variation to the angle
    palette.push({
      hue: newHue,
      saturation,
      lightness,
    });
  }

  return palette;
}

export { triadicPalettes };
