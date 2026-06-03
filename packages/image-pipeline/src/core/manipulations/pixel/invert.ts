import { definePixel } from "../../manipulation-factories";

export const invert = definePixel({
  id: "invert",
  execute: ({ red, green, blue, alpha }) => [255 - red, 255 - green, 255 - blue, alpha],
  ui: {
    name: "Invert",
    description: "Inverts all color channels.",
    defaultArgs: {},
    argDefinitions: [],
  },
});
