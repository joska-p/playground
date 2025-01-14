export interface RGBColor {
  red: number;
  green: number;
  blue: number;
}
export interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

export function RGBToHSL({ red, green, blue }: RGBColor): HSLColor {
  const normalizedRed = red / 255;
  const normalizedGreen = green / 255;
  const normalizedBlue = blue / 255;
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const delta = max - min;
  let hue;
  let saturation;

  if (max === min) {
    hue = 0;
  } else if (normalizedRed === max) {
    hue = (normalizedGreen - normalizedBlue) / delta;
  } else if (normalizedGreen === max) {
    hue = 2 + (normalizedBlue - normalizedRed) / delta;
  } else if (normalizedBlue === max) {
    hue = 4 + (normalizedRed - normalizedGreen) / delta;
  } else {
    hue = 0;
  }

  hue = Math.min(hue * 60, 360);

  if (hue < 0) {
    hue += 360;
  }

  const lightness = (min + max) / 2;

  if (max === min) {
    saturation = 0;
  } else if (lightness <= 0.5) {
    saturation = delta / (max + min);
  } else {
    saturation = delta / (2 - max - min);
  }

  return {
    hue: Math.round(hue),
    saturation: Math.round(saturation * 100),
    lightness: Math.round(lightness * 100),
  };
}

export function HSLToRGB({ hue, saturation, lightness }: HSLColor): RGBColor {
  const normalizedHue = hue / 360;
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;
  let t2;
  let t3;
  let val;

  if (normalizedSaturation === 0) {
    val = normalizedLightness * 255;
    return { red: val, green: val, blue: val };
  }

  if (normalizedLightness < 0.5) {
    t2 = normalizedLightness * (1 + normalizedSaturation);
  } else {
    t2 = normalizedLightness + normalizedSaturation - normalizedLightness * normalizedSaturation;
  }

  const t1 = 2 * normalizedLightness - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    t3 = normalizedHue + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return { red: Math.round(rgb[0]), green: Math.round(rgb[1]), blue: Math.round(rgb[2]) };
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
