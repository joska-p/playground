import { ResizeOptions } from "./types";

/** Bilinear interpolation resize. Returns a new ImageData. */
export function resizeImageData(src: ImageData, targetW: number, targetH: number): ImageData {
  const srcW = src.width;
  const srcH = src.height;

  if (targetW === srcW && targetH === srcH) return src;

  const dest = new ImageData(targetW, targetH);
  const srcData = src.data;
  const destData = dest.data;

  const xRatio = srcW / targetW;
  const yRatio = srcH / targetH;

  for (let y = 0; y < targetH; y++) {
    for (let x = 0; x < targetW; x++) {
      const srcX = x * xRatio;
      const srcY = y * yRatio;

      const x0 = Math.floor(srcX);
      const y0 = Math.floor(srcY);
      const x1 = Math.min(x0 + 1, srcW - 1);
      const y1 = Math.min(y0 + 1, srcH - 1);

      const xFrac = srcX - x0;
      const yFrac = srcY - y0;

      const i00 = (y0 * srcW + x0) * 4;
      const i10 = (y0 * srcW + x1) * 4;
      const i01 = (y1 * srcW + x0) * 4;
      const i11 = (y1 * srcW + x1) * 4;

      const destIdx = (y * targetW + x) * 4;

      for (let c = 0; c < 4; c++) {
        const top = srcData[i00 + c] * (1 - xFrac) + srcData[i10 + c] * xFrac;
        const bot = srcData[i01 + c] * (1 - xFrac) + srcData[i11 + c] * xFrac;
        destData[destIdx + c] = Math.round(top * (1 - yFrac) + bot * yFrac);
      }
    }
  }

  return dest;
}

/** Compute target dimensions from ResizeOptions. Returns null if no resize needed. */
export function computeTargetDimensions(
  srcW: number,
  srcH: number,
  opts: ResizeOptions
): { width: number; height: number } | null {
  let targetW: number;
  let targetH: number;

  if ("maxPixels" in opts && opts.maxPixels != null) {
    const pixels = srcW * srcH;
    if (pixels <= opts.maxPixels) return null;
    const scale = Math.sqrt(opts.maxPixels / pixels);
    targetW = Math.max(1, Math.round(srcW * scale));
    targetH = Math.max(1, Math.round(srcH * scale));
  } else if ("width" in opts && opts.width != null && "height" in opts && opts.height != null) {
    const fit = opts.fit ?? "fill";
    if (fit === "fill") {
      targetW = opts.width;
      targetH = opts.height;
    } else if (fit === "contain") {
      const scale = Math.min(opts.width / srcW, opts.height / srcH);
      targetW = Math.round(srcW * scale);
      targetH = Math.round(srcH * scale);
    } else {
      // cover
      const scale = Math.max(opts.width / srcW, opts.height / srcH);
      targetW = Math.round(srcW * scale);
      targetH = Math.round(srcH * scale);
    }
  } else if ("width" in opts && opts.width != null) {
    const scale = opts.width / srcW;
    targetW = opts.width;
    targetH = Math.max(1, Math.round(srcH * scale));
  } else if ("height" in opts && opts.height != null) {
    const scale = opts.height / srcH;
    targetH = opts.height;
    targetW = Math.max(1, Math.round(srcW * scale));
  } else {
    return null;
  }

  if (targetW === srcW && targetH === srcH) return null;
  return { width: targetW, height: targetH };
}
