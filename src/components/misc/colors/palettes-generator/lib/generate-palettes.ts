interface HSLColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

interface RGBColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

// Helper function to convert HSL to RGB
function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  // Calculate the chroma of the color. Chroma is the perceived brightness of the color.
  // It is calculated as the product of the saturation and the absolute value of 2 * lightness - 1
  // This makes sense because when saturation is 0, chroma is 0, and when lightness is 0 or 1, chroma is 0.
  // Otherwise, chroma grows as saturation grows and lightness moves away from 0.5.
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;

  // Calculate the hue prime, which is the hue value shifted into the range 0-2.
  // This is done to make the math easier.
  const huePrime = (hue * 6) % 2;

  // Calculate the x value, which is the chroma value times 1 - |huePrime - 1|.
  // This is used to calculate the red and green values of the color.
  const x = chroma * (1 - Math.abs(huePrime - 1));

  // Calculate the m value, which is the lightness minus the chroma divided by 2.
  // This is used to calculate the red, green and blue values of the color.
  const m = lightness - chroma / 2;

  // Calculate the red, green and blue values of the color.
  let red, green, blue;

  // If the hue is in the range 0-60, then the red value is the chroma, the green value is the x value and the blue value is 0.
  if (hue < 1 / 6) {
    red = chroma;
    green = x;
    blue = 0;
  }
  // If the hue is in the range 60-120, then the red value is the x value, the green value is the chroma and the blue value is 0.
  else if (hue < 2 / 6) {
    red = x;
    green = chroma;
    blue = 0;
  }
  // If the hue is in the range 120-180, then the red value is 0, the green value is the chroma and the blue value is the x value.
  else if (hue < 3 / 6) {
    red = 0;
    green = chroma;
    blue = x;
  }
  // If the hue is in the range 180-240, then the red value is 0, the green value is the x value and the blue value is the chroma.
  else if (hue < 4 / 6) {
    red = 0;
    green = x;
    blue = chroma;
  }
  // If the hue is in the range 240-300, then the red value is the x value, the green value is 0 and the blue value is the chroma.
  else if (hue < 5 / 6) {
    red = x;
    green = 0;
    blue = chroma;
  }
  // If the hue is in the range 300-360, then the red value is the chroma, the green value is 0 and the blue value is the x value.
  else {
    red = chroma;
    green = 0;
    blue = x;
  }

  // Finally, return the red, green and blue values as an array.
  // Add the m value to each value to get the final color.
  return [red + m, green + m, blue + m];
}

function HSLPaletteToRGB(palette: HSLColor[]): RGBColor[] {
  return palette.map(({ h, s, l }) => {
    const rgb = hslToRgb(h / 360, s / 100, l / 100);
    return { r: rgb[0] * 255, g: rgb[1] * 255, b: rgb[2] * 255 };
  });
}

function generateAnalogousPalette(baseColor: HSLColor, length: number): RGBColor[] {
  const { h, s, l } = baseColor;
  const step = 30; // degrees
  const colors = Array.from({ length }, (_, i) => ({ h: (h + i * step) % 360, s, l }));
  return HSLPaletteToRGB(colors);
}

function generateComplementaryPalette(baseColor: HSLColor, length: number): RGBColor[] {
  const { h, s, l } = baseColor;
  const complementaryH = (h + 180) % 360;
  const colors = Array.from({ length }, () => ({ h: complementaryH, s, l }));
  return HSLPaletteToRGB(colors);
}

function generateTriadicPalette(baseColor: HSLColor, length: number): RGBColor[] {
  const { h, s, l } = baseColor;
  const triadicStep = 120; // degrees
  const colors = Array.from({ length }, (_, i) => ({ h: (h + i * triadicStep) % 360, s, l }));
  return HSLPaletteToRGB(colors);
}

function generateColorPalette(
  baseColor: HSLColor,
  length: number,
  paletteType: "analogous" | "complementary" | "triadic"
): RGBColor[] {
  const { h, s, l } = baseColor;

  if (paletteType === "analogous") return generateAnalogousPalette({ h, s, l }, length);
  if (paletteType === "complementary") return generateComplementaryPalette({ h, s, l }, length);
  return generateTriadicPalette({ h, s, l }, length);
}

export { generateColorPalette };

// Example usage:
// const baseColor: HSLColor = { h: 240, s: 100, l: 50 };
// const paletteLength = 5;
// const paletteType = "analogous";

// const palette = generateColorPalette(baseColor, paletteLength, paletteType);
// console.log(palette);
