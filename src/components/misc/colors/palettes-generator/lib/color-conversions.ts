export type RGBColor = { red: number; green: number; blue: number };
export type HSLColor = { hue: number; saturation: number; lightness: number };

export function RGBToHSL({ red, green, blue }: RGBColor): HSLColor {
  // Normalize RGB values to the range [0, 1]
  const redNormalized = red / 255;
  const greenNormalized = green / 255;
  const blueNormalized = blue / 255;

  // Find the minimum and maximum RGB values
  const min = Math.min(redNormalized, greenNormalized, blueNormalized);
  const max = Math.max(redNormalized, greenNormalized, blueNormalized);

  // Calculate the delta between the maximum and minimum RGB values
  const delta = max - min;

  // Initialize HSL values
  let hue = 0;
  let saturation = 0;
  const lightness = (max + min) / 2;

  // Calculate the hue
  if (delta !== 0) {
    if (max === redNormalized) {
      hue = (greenNormalized - blueNormalized) / delta;
    } else if (max === greenNormalized) {
      hue = 2 + (blueNormalized - redNormalized) / delta;
    } else {
      hue = 4 + (redNormalized - greenNormalized) / delta;
    }
    hue *= 60;
    if (hue < 0) {
      hue += 360;
    }
  }

  // Calculate the saturation
  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
  }

  // Return the HSL values as an object
  return {
    hue: Math.round(hue),
    saturation: Math.round(saturation * 100),
    lightness: Math.round(lightness * 100),
  };
}

export function HSLToRGB({ hue, saturation, lightness }: HSLColor): RGBColor {
  // Calculate the chroma of the color. Chroma is the perceived brightness of the color.
  // It is calculated as the product of the saturation and the absolute value of 2 * lightness - 1
  // This makes sense because when saturation is 0, chroma is 0, and when lightness is 0 or 1, chroma is 0.
  // Otherwise, chroma grows as saturation grows and lightness moves away from 0.5.
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;

  // Calculate the hue prime, which is the hue value shifted into the range 0-2.
  // This is done to make the math easier.
  const huePrime = (hue / 60) % 6;

  // Calculate the x value, which is the chroma value times 1 - |huePrime - 1|.
  // This is used to calculate the red and green values of the color.
  const intermediateValue = chroma * (1 - Math.abs((huePrime % 2) - 1));

  // Calculate the m value, which is the lightness minus the chroma divided by 2.
  // This is used to calculate the red, green and blue values of the color.
  const midpointValue = lightness - chroma / 2;

  // Initialize the red, green and blue components of the color. These will be modified
  // based on the hue value.
  let redComponent = 0,
    greenComponent = 0,
    blueComponent = 0;

  // If the hue is in the range 0-60, then the red value is the chroma, the green value is the x value and the blue value is 0.
  if (huePrime >= 0 && huePrime < 1) {
    redComponent = chroma;
    greenComponent = intermediateValue;
  }
  // If the hue is in the range 60-120, then the red value is the x value, the green value is the chroma and the blue value is 0.
  else if (huePrime >= 1 && huePrime < 2) {
    redComponent = intermediateValue;
    greenComponent = chroma;
  }
  // If the hue is in the range 120-180, then the red value is 0, the green value is the chroma and the blue value is the x value.
  else if (huePrime >= 2 && huePrime < 3) {
    greenComponent = chroma;
    blueComponent = intermediateValue;
  }
  // If the hue is in the range 180-240, then the red value is 0, the green value is the x value and the blue value is the chroma.
  else if (huePrime >= 3 && huePrime < 4) {
    greenComponent = intermediateValue;
    blueComponent = chroma;
  }
  // If the hue is in the range 240-300, then the red value is the x value, the green value is 0 and the blue value is the chroma.
  else if (huePrime >= 4 && huePrime < 5) {
    redComponent = intermediateValue;
    blueComponent = chroma;
  }
  // If the hue is in the range 300-360, then the red value is the chroma, the green value is 0 and the blue value is the x value.
  else if (huePrime >= 5 && huePrime < 6) {
    redComponent = chroma;
    blueComponent = intermediateValue;
  }

  // Return the RGB values. Each component is the sum of the midpoint value and the component value.
  return {
    red: (redComponent + midpointValue) * 255,
    green: (greenComponent + midpointValue) * 255,
    blue: (blueComponent + midpointValue) * 255,
  };
}

export function RGBToHex({ red, green, blue }: RGBColor): string {
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}

export function HSLToHex({ hue, saturation, lightness }: HSLColor): string {
  const { red, green, blue } = HSLToRGB({ hue, saturation, lightness });
  return RGBToHex({ red, green, blue });
}

export function hexToRGB(hex: string): RGBColor {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return { red, green, blue };
}

export function hexToHSL(hex: string): HSLColor {
  const { red, green, blue } = hexToRGB(hex);
  return RGBToHSL({ red, green, blue });
}
