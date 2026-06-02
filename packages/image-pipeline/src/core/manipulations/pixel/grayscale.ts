import { definePixel } from "../../manipulation-factories";

export const grayscale = definePixel({
  id: "grayscale",
  execute: ({ red, green, blue, alpha }) => {
    const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    return [luminance, luminance, luminance, alpha];
  },
  ui: {
    name: "Grayscale",
    description: "Converts the image to grayscale using luminance weighting.",
    defaultArgs: {},
    argDefinitions: [],
  },
});
