import { definePixel } from "../../manipulation-factories";

export const grayscale = definePixel("grayscale", ({ red, green, blue, alpha }) => {
  const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
  return [luminance, luminance, luminance, alpha];
});
