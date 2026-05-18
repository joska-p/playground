import Color from "colorjs.io";

export type PickResult = {
  lab: Color;
  lch: Color;
  hsl: Color;
  rgb: Color;
};

function lobToRgb({ lightness, a, b }: { lightness: number; a: number; b: number }): Color {
  const color = new Color(`lab(${lightness}% ${a} ${b})`);
  return color.to("srgb");
}

function labToPickResult({
  lightness,
  a,
  b,
}: {
  lightness: number;
  a: number;
  b: number;
}): PickResult {
  const color = new Color(`lab(${lightness}% ${a} ${b})`);

  return {
    lab: color,
    lch: color.to("lch"),
    hsl: color.to("hsl"),
    rgb: color.to("srgb"),
  };
}

function lchToRgb({
  lightness,
  chroma,
  hue,
}: {
  lightness: number;
  chroma: number;
  hue: number;
}): Color {
  const color = new Color(`lch(${lightness}% ${chroma} ${hue})`);
  return color.to("srgb");
}

function lchToPickResult({
  lightness,
  chroma,
  hue,
}: {
  lightness: number;
  chroma: number;
  hue: number;
}): PickResult {
  const color = new Color(`lch(${lightness}% ${chroma} ${hue})`);

  return {
    lab: color.to("lab"),
    lch: color,
    hsl: color.to("hsl"),
    rgb: color.to("srgb"),
  };
}

function hslToRgb({
  hue,
  saturation,
  lightness,
}: {
  hue: number;
  saturation: number;
  lightness: number;
}): Color {
  const color = new Color(`hsl(${hue} ${saturation} ${lightness})`);
  return color.to("srgb");
}

function hslToPickResult({
  hue,
  saturation,
  lightness,
}: {
  hue: number;
  saturation: number;
  lightness: number;
}): PickResult {
  const color = new Color(`hsl(${hue} ${saturation} ${lightness})`);

  return {
    lab: color.to("lab"),
    lch: color.to("lch"),
    hsl: color,
    rgb: color.to("srgb"),
  };
}

function rgbToRgb({ red, green, blue }: { red: number; green: number; blue: number }): Color {
  return new Color(`rgb(${red} ${green} ${blue})`);
}

function rgbToPickResult({
  red,
  green,
  blue,
}: {
  red: number;
  green: number;
  blue: number;
}): PickResult {
  const color = rgbToRgb({ red, green, blue });

  return {
    lab: color.to("lab"),
    lch: color.to("lch"),
    hsl: color.to("hsl"),
    rgb: color.to("srgb"),
  };
}

export {
  lobToRgb,
  labToPickResult,
  lchToRgb,
  lchToPickResult,
  hslToRgb,
  hslToPickResult,
  rgbToRgb,
  rgbToPickResult,
};
