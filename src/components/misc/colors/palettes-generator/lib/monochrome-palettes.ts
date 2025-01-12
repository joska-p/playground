import type { HSLColor } from "./color-conversions";

function monochromePalettes(
  { hue, saturation, lightness }: HSLColor,
  paletteLength: number
): HSLColor[] {
  const palette: Array<HSLColor> = [];

  // Calculate the step size for hue variation
  const stepSize = 360 / paletteLength;

  for (let i = 0; i < paletteLength; i++) {
    // Calculate the new hue by adding the step size
    const currentHue = (hue + i * stepSize) % 360;

    // Push the new color into the palette
    palette.push({
      hue: currentHue,
      saturation: saturation,
      lightness: lightness,
    });
  }

  return palette;
}

export { monochromePalettes };
