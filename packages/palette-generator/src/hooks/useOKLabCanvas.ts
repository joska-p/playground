import { useCallback, useRef } from "react";
import { configureCanvasForDPR, clientToInternalPixel } from "../utils/canvasDpr";
import { fillOKLabSliceImageData } from "../utils/imageFill";
import { oklabTo8bit } from "../utils/color-utils";

type Params = {
  lightness: number;
  displaySize: number; // CSS pixels
  aRange: number;
  bRange: number;
};

export type CssResult = { oklab: string; hex: string; rgb: [number, number, number] } | null;

function useOKLabCanvas({ lightness, displaySize, aRange, bRange }: Params) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const renderOKLabSlice = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = configureCanvasForDPR(canvas, displaySize);
    if (!ctx) return;
    const internalSize = canvas.width;
    const img = ctx.createImageData(internalSize, internalSize);
    fillOKLabSliceImageData(img, { lightness, aRange, bRange }, oklabTo8bit);
    ctx.putImageData(img, 0, 0);
  }, [lightness, displaySize, aRange, bRange]);

  const getColorAtClientPosition = useCallback(
    (ev: MouseEvent | { clientX: number; clientY: number }): CssResult => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const pos = clientToInternalPixel(ev.clientX, ev.clientY, canvas);
      if (!pos) return null;
      const { xInternal, yInternal } = pos;
      const size = canvas.width; // internal size
      const a = aRange * ((xInternal / (size - 1)) * 2 - 1);
      const b = bRange * (((size - 1 - yInternal) / (size - 1)) * 2 - 1);
      const [r, g, bl] = oklabTo8bit(lightness, a, b);
      const hex = "#" + [r, g, bl].map((v) => v.toString(16).padStart(2, "0")).join("");
      const cssOklab = `oklab(${lightness.toFixed(3)} ${a.toFixed(3)} ${b.toFixed(3)})`;
      return { oklab: cssOklab, hex, rgb: [r, g, bl] };
    },
    [lightness, aRange, bRange]
  );

  return { canvasRef, renderOKLabSlice, getColorAtClientPosition };
}

export { useOKLabCanvas };
