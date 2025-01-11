import type { Signal } from "@preact/signals-react";
import { useCallback, useEffect, useRef } from "react";
import { RGBToHSL, type HSLColor } from "../lib/color-conversions";

type Props = {
  baseColor: Signal<HSLColor>;
  marker: Signal<{ x: number; y: number }>;
};

const DEBOUNCE_DELAY = 100;

function useColorPicker({ baseColor, marker }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPixelColor = useCallback((canvas: HTMLCanvasElement, x: number, y: number): HSLColor => {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get canvas context");

    const pixelData = context.getImageData(x, y, 1, 1).data;
    return RGBToHSL({ red: pixelData[0], green: pixelData[1], blue: pixelData[2] });
  }, []);

  const handlePickColor = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      try {
        baseColor.value = getPixelColor(canvas, x, y);
        marker.value = { x, y };
      } catch (error) {
        console.error("Error picking color:", error);
      }
    },
    [baseColor, getPixelColor, marker]
  );

  const drawColorSpace = useCallback((canvas: HTMLCanvasElement, saturationValue: number) => {
    const context = canvas.getContext("2d");
    if (!context) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    for (let row = 0; row < canvasHeight; row++) {
      const gradient = context.createLinearGradient(0, row, canvasWidth, row);
      const lightness = 100 - (row / canvasHeight) * 100;

      for (let col = 0; col < canvasWidth; col++) {
        const hue = (col / canvasWidth) * 360;
        gradient.addColorStop(col / canvasWidth, `hsl(${hue}, ${saturationValue}%, ${lightness}%)`);
      }

      context.fillStyle = gradient;
      context.fillRect(0, row, canvasWidth, 1);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const debounceTimer = setTimeout(() => {
      drawColorSpace(canvas, baseColor.value.saturation);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimer);
  }, [baseColor, drawColorSpace]);

  return { canvasRef, handlePickColor };
}

export { useColorPicker };
