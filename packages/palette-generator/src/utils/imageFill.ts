import { oklabTo8bit } from "./oklab";

/**
 * Fill an ImageData buffer with an OKLab fixed-L slice.
 * - imgData.width/height = internal pixel buffer size (e.g., displayPx * dpr)
 * - mapping: x -> a in [-aRange, +aRange], y -> b in [+bRange, -bRange] (top = +b)
 * - uses provided oklabTo8bit for color conversion
 */
export function fillOKLabSliceImageData(
  imgData: ImageData,
  params: { L: number; aRange: number; bRange: number },
  oklabFn: (L: number, a: number, b: number) => [number, number, number] = oklabTo8bit
) {
  const { L, aRange, bRange } = params;
  const w = imgData.width;
  const h = imgData.height;
  const data = imgData.data;

  for (let y = 0; y < h; y++) {
    // compute b such that top row => +bRange, bottom => -bRange
    const b = bRange * (((h - 1 - y) / (h - 1)) * 2 - 1);
    for (let x = 0; x < w; x++) {
      const a = aRange * ((x / (w - 1)) * 2 - 1);
      const [r, g, bl] = oklabFn(L, a, b);
      const idx = (y * w + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = bl;
      data[idx + 3] = 255;
    }
  }
}
