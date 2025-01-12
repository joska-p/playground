import type { HSLColor } from "./color-conversions";

function analogousPalettes({ hue, saturation, lightness }: HSLColor, length: number): HSLColor[] {
  const palette: HSLColor[] = [];
  const angle = 30; // Angle for analogous colors

  for (let i = -Math.floor(length / 2); i <= Math.floor(length / 2); i++) {
    const newHue = (hue + (i * angle + (Math.random() * 100 - 50)) + 360) % 360; // Wrap around hue
    palette.push({
      hue: newHue,
      saturation,
      lightness,
    });
  }

  return palette;
}

export { analogousPalettes };
