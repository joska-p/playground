import { HSLToRGB } from "./colorConversions.js";

/**
 * Draws a hue/lightness color space at the given saturation onto the provided canvas context.
 * - hue: left->right (0..360)
 * - lightness: top->bottom (100..0)
 */
export function drawColorSpace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  saturation: number
) {
  const imageData = context.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const hue = (x / width) * 360;
      const lightness = 100 - (y / height) * 100;
      const rgb = HSLToRGB({ hue, saturation, lightness });
      const idx = (y * width + x) * 4;
      data[idx] = rgb.red;
      data[idx + 1] = rgb.green;
      data[idx + 2] = rgb.blue;
      data[idx + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);
}

/**
 * Read pixel color from canvas context at device coordinates.
 * Returns an HSL object.
 */
export function readHslFromCanvas(
  context: CanvasRenderingContext2D,
  px: number,
  py: number,
  width: number,
  height: number
) {
  const clampedX = Math.max(0, Math.min(width - 1, Math.round(px)));
  const clampedY = Math.max(0, Math.min(height - 1, Math.round(py)));
  const pixel = context.getImageData(clampedX, clampedY, 1, 1).data;
  const red = pixel[0] ?? 0;
  const green = pixel[1] ?? 0;
  const blue = pixel[2] ?? 0;
  // Convert RGB back to HSL using project util (we avoid circular import by returning RGB)
  return { red, green, blue };
}
