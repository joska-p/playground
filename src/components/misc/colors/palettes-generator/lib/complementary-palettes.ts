import type { HSLColor } from "./color-conversions";

function complementaryPalettes(
  { hue, saturation, lightness }: HSLColor,
  length: number
): HSLColor[] {
  const palette: Array<HSLColor> = [];

  // Calculate the step size for hue variation
  const stepSize = 360 / length;

  for (let i = -Math.floor(length / 2); i <= Math.floor(length / 2); i++) {
    // Calculate the new hue by adding the step size
    const currentHue = (hue + (i * stepSize + (Math.random() * 100 - 50))) % 360;

    // Push the new color into the palette
    palette.push({
      hue: currentHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

export { complementaryPalettes };
