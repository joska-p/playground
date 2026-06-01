import { definePixel } from "../../manipulation-factories";

export const invert = definePixel("invert", (_, r, g, b, a) => [255 - r, 255 - g, 255 - b, a]);
