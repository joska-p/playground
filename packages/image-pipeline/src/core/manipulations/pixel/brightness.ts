import { definePixel } from "../../manipulation-factories";

export const brightness = definePixel<{ value?: number }>(
  "brightness",
  ({ options, red, green, blue, alpha }) => {
    const value = options.value ?? 1;
    return [red * value, green * value, blue * value, alpha];
  }
);
