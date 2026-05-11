import { useCallback, useRef } from "react";
import { configureCanvasForDPR, clientToInternalPixel } from "../utils/canvasDpr";
import { fillOKLchSliceImageData } from "../utils/imageFill";
import { oklchTo8bit } from "../utils/oklch-to-srgb";

type Params = {
  lightness: number;
  displaySize: number; // CSS pixels
  chroma: number;
  hueDegrees: number;
};

export type CssResult = { oklab: string; hex: string; rgb: [number, number, number] } | null;

function useOKLchCanvas({ lightness, displaySize, chroma, hueDegrees }: Params) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const renderOKLchSlice = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = configureCanvasForDPR(canvas, displaySize);
    if (!ctx) return;
    const internalSize = canvas.width;
    const img = ctx.createImageData(internalSize, internalSize);
    fillOKLchSliceImageData(img, { lightness, chroma, hueDegrees }, oklchTo8bit);
    ctx.putImageData(img, 0, 0);
  }, [lightness, displaySize, chroma, hueDegrees]);

  const getColorAtClientPosition = useCallback(
    (ev: MouseEvent | { clientX: number; clientY: number }): CssResult => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const pos = clientToInternalPixel(ev.clientX, ev.clientY, canvas);
      if (!pos) return null;
      const { xInternal, yInternal } = pos;
      const size = canvas.width; // internal size
      const a = chroma * ((xInternal / (size - 1)) * 2 - 1);
      const b = hueDegrees * (((size - 1 - yInternal) / (size - 1)) * 2 - 1);
      const [r, g, bl] = oklchTo8bit(lightness, a, b);
      const hex = "#" + [r, g, bl].map((v) => v.toString(16).padStart(2, "0")).join("");
      const cssOklab = `oklab(${lightness.toFixed(3)} ${a.toFixed(3)} ${b.toFixed(3)})`;
      return { oklab: cssOklab, hex, rgb: [r, g, bl] };
    },
    [lightness, chroma, hueDegrees]
  );

  return { canvasRef, renderOKLchSlice, getColorAtClientPosition };
}

export { useOKLchCanvas };
