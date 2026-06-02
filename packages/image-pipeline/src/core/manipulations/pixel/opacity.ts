import { definePixel } from "../../manipulation-factories";

export const opacity = definePixel<{ value?: number }>(
  "opacity",
  ({ options, red, green, blue, alpha }) => {
    const value = options.value ?? 1;
    return [red, green, blue, alpha * value];
  },
  {
    name: "Opacity",
    description: "Adjusts the opacity (alpha channel).",
    defaultArgs: { value: 1 },
    argDefinitions: [{ key: "value", label: "Value", min: 0, max: 1, step: 0.05 }],
  }
);
