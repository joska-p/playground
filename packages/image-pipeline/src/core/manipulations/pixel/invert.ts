import { definePixel } from "../../manipulation-factories";

export const invert = definePixel(
  "invert",
  ({ red, green, blue, alpha }) => [
    255 - red,
    255 - green,
    255 - blue,
    alpha,
  ],
  {
    name: "Invert",
    description: "Inverts all color channels.",
    defaultArgs: {},
    argDefinitions: [],
  }
);
