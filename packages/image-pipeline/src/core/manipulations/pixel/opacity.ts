import { definePixel } from "../../manipulation-factories";

export const opacity = definePixel<{ value?: number }>(
  "opacity",
  ({ options, red, green, blue, alpha }) => {
    const value = options.value ?? 1;
    return [red, green, blue, alpha * value];
  }
);
