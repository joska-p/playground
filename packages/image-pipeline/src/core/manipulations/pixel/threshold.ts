import { definePixel } from "../../manipulation-factories";

export const threshold = definePixel<{ threshold?: number }>(
  "threshold",
  ({ options, red, green, blue, alpha }) => {
    const threshold = options.threshold ?? 128;
    const l = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const v = l >= threshold ? 255 : 0;
    return [v, v, v, alpha];
  }
);
