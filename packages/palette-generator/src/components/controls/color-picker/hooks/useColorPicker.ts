import { useCallback, useRef } from "react";
import { configureCanvasForDPR, clientToInternalPixel } from "../../../../utils/canvasDpr";
import { fillSliceImageData } from "../../../../utils/imageFill";
import { oklabToPickResult, oklchToPickResult } from "../../../../utils/color-utils";
import type { PickResult } from "../../../../utils/color-utils";
import type { ColorSpaceDef } from "../../../../utils/colorspaces";

export type { PickResult };

/**
 * Maps a [0,1] canvas position to a colorspace axis value.
 *
 * For oklab: axis is symmetric around 0, so we map to [-range, +range].
 * For oklch chroma: always positive, map to [0, max].
 * For oklch hue: always positive, map to [0, 360].
 *
 * The convention used here: xRangeKey / yRangeKey store the *maximum* value
 * in their domain. For signed axes (oklab a/b) the canvas centre = 0.
 * For unsigned axes (oklch chroma, hue) we map [0..max] across the full canvas.
 */
function mapAxis(pixelPos: number, totalPixels: number, rangeMax: number, signed: boolean): number {
  const t = pixelPos / (totalPixels - 1); // 0..1
  return signed ? rangeMax * (t * 2 - 1) : rangeMax * t;
}

export function useColorPicker(
  colorSpace: ColorSpaceDef,
  params: Record<string, number>,
  displaySize: number
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { xRangeKey, yRangeKey, lightnessKey, toRGB, id } = colorSpace;

  // oklch axes are unsigned; oklab axes are signed
  const xSigned = id === "oklab";
  const ySigned = id === "oklab";

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ctx.setTransform is set inside configureCanvasForDPR.
    // createImageData uses the physical backing-store size (canvas.width/height)
    // because putImageData ignores the CSS transform.
    const ctx = configureCanvasForDPR(canvas, displaySize);
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);

    fillSliceImageData(img, (x, y) => {
      const xVal = mapAxis(x, w, params[xRangeKey]!, xSigned);
      // y=0 is top of canvas; we flip so y=0 → max, y=h-1 → min (or 0 for unsigned)
      const yVal = mapAxis(h - 1 - y, h, params[yRangeKey]!, ySigned);
      return toRGB(params[lightnessKey]!, xVal, yVal);
    });

    // putImageData always writes to physical pixel (0,0), ignoring the transform
    ctx.putImageData(img, 0, 0);
  }, [params, displaySize, xSigned, ySigned, toRGB, lightnessKey, xRangeKey, yRangeKey]);

  const getColorAtClientPosition = useCallback(
    (ev: MouseEvent | { clientX: number; clientY: number }): PickResult | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const pos = clientToInternalPixel(ev.clientX, ev.clientY, canvas);
      if (!pos) return null;

      const { xInternal, yInternal } = pos;
      const w = canvas.width;
      const h = canvas.height;

      const lightness = params[lightnessKey]!;
      const xVal = mapAxis(xInternal, w, params[xRangeKey]!, xSigned);
      const yVal = mapAxis(h - 1 - yInternal, h, params[yRangeKey]!, ySigned);

      // xVal/yVal map to (a, b) for oklab and (chroma, hue) for oklch
      return id === "oklab"
        ? oklabToPickResult(lightness, xVal, yVal)
        : oklchToPickResult(lightness, xVal, yVal);
    },
    [params, id, xSigned, ySigned, lightnessKey, xRangeKey, yRangeKey]
  );

  return { canvasRef, render, getColorAtClientPosition };
}
