import { definePixel } from "../../manipulation-factories";

export const sepia = definePixel("sepia", ({ red, green, blue, alpha }) => [
  red * 0.393 + green * 0.769 + blue * 0.189,
  red * 0.349 + green * 0.686 + blue * 0.168,
  red * 0.272 + green * 0.534 + blue * 0.131,
  alpha,
]);
