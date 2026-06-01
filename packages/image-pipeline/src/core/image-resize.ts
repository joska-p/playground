import type { ResizeOptions } from "./image-pipeline.types";

/** Bilinear interpolation resize. Returns a new ImageData. */
export function resizeImageData(src: ImageData, targetW: number, targetH: number) {
  const { width: srcW, height: srcH, data: srcData } = src;
  if (targetW === srcW && targetH === srcH) return src;

  const dest = new ImageData(targetW, targetH);
  const { data: destData } = dest;
  const xRatio = srcW / targetW, yRatio = srcH / targetH;

  for (let y = 0; y < targetH; y++) {
    for (let x = 0; x < targetW; x++) {
      const srcX = x * xRatio, srcY = y * yRatio;
      const x0 = Math.floor(srcX), y0 = Math.floor(srcY);
      const x1 = Math.min(x0 + 1, srcW - 1), y1 = Math.min(y0 + 1, srcH - 1);
      const xFrac = srcX - x0, yFrac = srcY - y0;

      const i00 = (y0 * srcW + x0) * 4, i10 = (y0 * srcW + x1) * 4;
      const i01 = (y1 * srcW + x0) * 4, i11 = (y1 * srcW + x1) * 4;
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
export function computeTargetDimensions(srcW: number, srcH: number, options: ResizeOptions) {
  let tw: number, th: number;

  if ("maxPixels" in options && options.maxPixels) {
    const p = srcW * srcH;
    if (p <= options.maxPixels) return null;
    const s = Math.sqrt(options.maxPixels / p);
    tw = Math.max(1, Math.round(srcW * s));
    th = Math.max(1, Math.round(srcH * s));
  } else if ("width" in options && options.width && "height" in options && options.height) {
    const fit = options.fit ?? "fill";
    if (fit === "fill") { tw = options.width; th = options.height; }
    else {
      const s = fit === "contain" 
        ? Math.min(options.width / srcW, options.height / srcH)
        : Math.max(options.width / srcW, options.height / srcH);
      tw = Math.round(srcW * s); th = Math.round(srcH * s);
    }
  } else if ("width" in options && options.width) {
    tw = options.width; th = Math.max(1, Math.round(srcH * (options.width / srcW)));
  } else if ("height" in options && options.height) {
    th = options.height; tw = Math.max(1, Math.round(srcW * (options.height / srcH)));
  } else return null;

  return (tw === srcW && th === srcH) ? null : { width: tw, height: th };
}
