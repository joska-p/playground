import { defineWhole } from "../../manipulation-factories";

export const rotate90Cw = defineWhole({
  id: "rotate-90cw",
  execute: ({ imageData }) => {
    const { width, height, data } = imageData;
    const out = new ImageData(height, width);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const source = (y * width + x) * 4;
        const destinationIndex = (x * height + (height - 1 - y)) * 4;
        out.data[destinationIndex] = data[source] ?? 0;
        out.data[destinationIndex + 1] = data[source + 1] ?? 0;
        out.data[destinationIndex + 2] = data[source + 2] ?? 0;
        out.data[destinationIndex + 3] = data[source + 3] ?? 255;
      }
    }
    return out;
  },
  ui: {
    name: "Rotate 90° CW",
    description: "Rotates the image 90 degrees clockwise.",
    defaultArgs: {},
    argDefinitions: [],
  },
});
