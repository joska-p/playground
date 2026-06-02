import { definePixel } from "../../manipulation-factories";

export const contrast = definePixel<{ value?: number }>(
  "contrast",
  ({ options, red, green, blue, alpha }) => {
    const value = options.value ?? 1;
    return [
      (red - 128) * value + 128,
      (green - 128) * value + 128,
      (blue - 128) * value + 128,
      alpha,
    ];
  },
  {
    name: "Contrast",
    description: "Adjusts contrast by a factor.",
    defaultArgs: { value: 1 },
    argDefinitions: [{ key: "value", label: "Value", min: 0, max: 3, step: 0.1 }],
  }
);
