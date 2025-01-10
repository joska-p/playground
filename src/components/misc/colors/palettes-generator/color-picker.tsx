import { useEffect, useRef } from "react";
import type { HSLColor } from "./lib/color-conversions";
import { RGBToHSL } from "./lib/color-conversions";

type Props = {
  saturation?: number;
  setBaseColor: (color: HSLColor) => void;
};

export function ColorPicker({ saturation, setBaseColor }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const handlePickColor = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (ref.current) {
      const x = event.pageX - event.currentTarget.offsetLeft;
      const y = event.pageY - event.currentTarget.offsetTop;
      const hslColor = getPixelColor(ref.current, x, y);
      setBaseColor(hslColor);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (ref.current) {
        drawColorSpace(ref.current, saturation);
      }
    }, 100);
    return () => clearTimeout(debounce);
  }, [saturation]);

  return <canvas ref={ref} width={300} height={300} onClick={handlePickColor} />;
}

function drawColorSpace(canvas: HTMLCanvasElement, saturation = 100) {
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  // draw a 2d representation of the color space using hue and lightness, keeping saturation at 100% if not specified
  const width = canvas.width;
  const height = canvas.height;

  // for each row we need a linear gradient from left to right from hue 0 to 360 with a lightness of 100% ,lowering the lightness by 1% for each row
  for (let i = 0; i < height; i++) {
    const gradient = context.createLinearGradient(0, i, width, i);
    for (let j = 0; j < width; j++) {
      const hue = (j / width) * 360;
      const lightness = 100 - (i / height) * 100;
      gradient.addColorStop(j / width, `hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    context.fillStyle = gradient;
    context.fillRect(0, i, width, 1);
  }
  return context;
}

function getPixelColor(canvas: HTMLCanvasElement, x: number, y: number) {
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const pixelData = context.getImageData(x, y, 1, 1).data;
  const rgbColor = {
    red: pixelData[0],
    green: pixelData[1],
    blue: pixelData[2],
  };
  return RGBToHSL(rgbColor);
}
