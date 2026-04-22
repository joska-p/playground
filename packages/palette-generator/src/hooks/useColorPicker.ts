import { useEffect, useRef } from "react";
import type { HSLColor } from "../utils/colorConversions.js";
import { RGBToHSL } from "../utils/colorConversions.js";
import { usePaletteContext } from "../context/paletteContext.js";

/**
 * useColorPicker
 *
 * Centralized React hook for managing a canvas-based color picker.
 * - Lives in `src/hooks/` per the architectural blueprint (React-specific logic).
 * - Depends only on React and project hooks (no DOM manipulation outside effects).
 * - Uses the pure color conversions from `src/utils/colorConversions.ts`.
 *
 * Returns:
 * - canvasRef: ref to attach to the <canvas> element
 * - baseColor: current selected color (from PaletteContext)
 * - handlePickColor: click handler for picking a color on the canvas
 * - handleSaturationChange: input handler for saturation slider
 */
const DEBOUNCE_DELAY = 100;

function getPixelColor(canvas: HTMLCanvasElement, x: number, y: number): HSLColor {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get canvas context");

  const pixelData = context.getImageData(x, y, 1, 1).data;
  return RGBToHSL({
    red: pixelData[0] || 0,
    green: pixelData[1] || 0,
    blue: pixelData[2] || 0,
  });
}

function drawColorSpace({ canvas, saturation }: { canvas: HTMLCanvasElement; saturation: number }) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get canvas context");

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  for (let row = 0; row < canvasHeight; row++) {
    const gradient = context.createLinearGradient(0, row, canvasWidth, row);
    const lightness = 100 - (row / canvasHeight) * 100;

    for (let col = 0; col < canvasWidth; col++) {
      const hue = (col / canvasWidth) * 360;
      gradient.addColorStop(col / canvasWidth, `hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    context.fillStyle = gradient;
    context.fillRect(0, row, canvasWidth, 1);
  }
}

function useColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { baseColor, setBaseColor } = usePaletteContext();

  function handlePickColor(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    try {
      const picked = getPixelColor(canvas, x, y);
      setBaseColor({ ...picked, location: { x, y } });
    } catch (err) {
      // Surface a helpful error while preserving the original message
      const msg = err instanceof Error ? err.message : String(err ?? "unknown error");
      throw new Error(`Could not get pixel color: ${msg}`);
    }
  }

  function handleSaturationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBaseColor({ ...baseColor, saturation: Number(event.target.value) });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      drawColorSpace({ canvas, saturation: baseColor.saturation });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [baseColor.saturation]);

  return { canvasRef, baseColor, handlePickColor, handleSaturationChange };
}

export { useColorPicker };
