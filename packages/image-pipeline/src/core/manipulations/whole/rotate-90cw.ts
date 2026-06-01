import { defineWhole } from "../../manipulation-factories";

export const rotate90Cw = defineWhole("rotate-90cw", (_, imageData) => {
  const { width, height, data } = imageData;
  const out = new ImageData(height, width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      const dst = (x * height + (height - 1 - y)) * 4;
      out.data[dst] = data[src] ?? 0;
      out.data[dst + 1] = data[src + 1] ?? 0;
      out.data[dst + 2] = data[src + 2] ?? 0;
      out.data[dst + 3] = data[src + 3] ?? 255;
    }
  }
  return out;
});
