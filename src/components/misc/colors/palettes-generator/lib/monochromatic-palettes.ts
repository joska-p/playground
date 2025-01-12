import type { HSLColor } from "./color-conversions";

function monochromaticPalettes(
  { hue, saturation, lightness }: HSLColor,
  length: number
): HSLColor[] {
  const palette: Array<HSLColor> = [];

  // Calculate the step size for hue variation
  const stepSize = 100 / length;

  // To avoid full black or full white the lightness range should be between 5 and 95: totaly abritrary
  const min = 5;
  const max = 95;

  for (let i = -Math.floor(length / 2); i <= Math.floor(length / 2); i++) {
    // Calculate the new hue by adding the step size
    const currenLightness = (lightness + (i * stepSize + (Math.random() * 100 - 50))) % 100;
    const currenLightnessClamped = Math.min(Math.max(currenLightness, min), max);
    // Push the new color into the palette
    palette.push({
      hue,
      saturation,
      lightness: currenLightnessClamped,
    });
  }

  return palette.sort((a, b) => a.lightness - b.lightness);
}

export { monochromaticPalettes };
