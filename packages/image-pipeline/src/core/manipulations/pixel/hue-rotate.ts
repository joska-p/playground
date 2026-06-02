import { definePixel } from "../../manipulation-factories";

export const hueRotate = definePixel<{ degrees?: number }>({
  id: "hue-rotate",
  execute: ({ options, red, green, blue, alpha }) => {
    const degrees = options.degrees ?? 0;
    const angle = (degrees * Math.PI) / 180;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const s3 = Math.sqrt(1 / 3);
    const base = (1 - cosA) / 3;
    const newRed = red * (cosA + base) + green * (base - s3 * sinA) + blue * (base + s3 * sinA);
    const newGreen = red * (base + s3 * sinA) + green * (cosA + base) + blue * (base - s3 * sinA);
    const newBlue = red * (base - s3 * sinA) + green * (base + s3 * sinA) + blue * (cosA + base);
    return [newRed, newGreen, newBlue, alpha];
  },
  ui: {
    name: "Hue Rotate",
    description: "Rotates hues by an angle in degrees.",
    defaultArgs: { degrees: 0 },
    argDefinitions: [{ key: "degrees", label: "Degrees", min: 0, max: 360, step: 1 }],
  },
});
