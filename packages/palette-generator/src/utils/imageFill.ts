import { oklabTo8bit } from "./oklab-to-srgb";
import { oklchTo8bit } from "./oklch-to-srgb";

/**
 * Fill an ImageData buffer with an OKLab fixed-L slice.
 * - imgData.width/height = internal pixel buffer size (e.g., displayPx * dpr)
 * - mapping: x -> a in [-aRange, +aRange], y -> b in [+bRange, -bRange] (top = +b)
 * - uses provided oklabTo8bit for color conversion
 */
function fillOKLabSliceImageData(
  imgData: ImageData,
  params: { lightness: number; aRange: number; bRange: number },
  oklabFn: (lightness: number, a: number, b: number) => [number, number, number] = oklabTo8bit
) {
  const { lightness, aRange, bRange } = params;
  const width = imgData.width;
  const height = imgData.height;
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    // compute b such that top row => +bRange, bottom => -bRange
    const b = bRange * (((height - 1 - y) / (height - 1)) * 2 - 1);
    for (let x = 0; x < width; x++) {
      const a = aRange * ((x / (width - 1)) * 2 - 1);
      const [r, g, bl] = oklabFn(lightness, a, b);
      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = bl;
      data[idx + 3] = 255;
    }
  }
}

function fillOKLchSliceImageData(
  imgData: ImageData,
  params: { lightness: number; chroma: number; hueDegrees: number },
  oklchFn: (
    lightness: number,
    chroma: number,
    hueDegrees: number
  ) => [number, number, number] = oklchTo8bit
) {
  const { lightness, chroma, hueDegrees } = params;
  const width = imgData.width;
  const height = imgData.height;
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, bl] = oklchFn(lightness, chroma, hueDegrees);
      const idx = (y * width + x) * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = bl;
      data[idx + 3] = 255;
    }
  }
}

export { fillOKLabSliceImageData, fillOKLchSliceImageData };
