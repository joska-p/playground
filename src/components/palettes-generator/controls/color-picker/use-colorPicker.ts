import { useEffect, useRef } from "react";
import { RGBToHSL, type HSLColor } from "../../lib/color-conversions";
import { usePaletteContext } from "../../palette-context";

const getPixelColor = (canvas: HTMLCanvasElement, x: number, y: number): HSLColor => {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get canvas context");

  const pixelData = context.getImageData(x, y, 1, 1).data;
  return RGBToHSL({ red: pixelData[0], green: pixelData[1], blue: pixelData[2] });
};

const drawColorSpace = ({
  canvas,
  saturation,
}: {
  canvas: HTMLCanvasElement;
  saturation: number;
}) => {
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
};

const DEBOUNCE_DELAY = 100;

function useColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { baseColor, setBaseColor } = usePaletteContext();

  const handlePickColor = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    try {
      setBaseColor({ ...getPixelColor(canvas, x, y), location: { x, y } });
    } catch (error) {
      if (error instanceof Error) throw new Error("Could not get pixel color", error);
      throw error;
    }
  };

  const handleSaturationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseColor({ ...baseColor, saturation: Number(event.target.value) });
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      drawColorSpace({ canvas, saturation: baseColor.saturation });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounce);
  }, [baseColor.saturation]);

  return { canvasRef, baseColor, handlePickColor, handleSaturationChange };
}

export { useColorPicker };
