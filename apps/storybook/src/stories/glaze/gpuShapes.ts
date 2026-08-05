import type { GpuDoor } from '@repo/glaze/gpu/createGpuDoor';

export type GpuShapeResults = {
  circle: boolean;
  rect: boolean;
  line: boolean;
  text: boolean;
  samples: Record<string, [number, number, number, number]>;
  textCoverage: number;
};

const readPixel = (
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  dpr: number,
  x: number,
  y: number
): [number, number, number, number] => {
  const pixel = new Uint8Array(4);
  gl.readPixels(Math.round(x * dpr), Math.round(height * dpr - 1 - y * dpr), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
  return [pixel[0] ?? 0, pixel[1] ?? 0, pixel[2] ?? 0, pixel[3] ?? 0];
};

const isRed = (pixel: readonly number[]): boolean => pixel[0] > 150 && pixel[0] > pixel[1] + 50 && pixel[0] > pixel[2] + 50;
const isGreen = (pixel: readonly number[]): boolean => pixel[1] > 150 && pixel[1] > pixel[0] + 50 && pixel[1] > pixel[2] + 50;
const isBlue = (pixel: readonly number[]): boolean => pixel[2] > 150 && pixel[2] > pixel[0] + 50 && pixel[2] > pixel[1] + 50;
const isDark = (pixel: readonly number[]): boolean => pixel[0] < 40 && pixel[1] < 40 && pixel[2] < 40;

export function verifyGpuShapes(door: GpuDoor, width: number, height: number, dpr: number): GpuShapeResults {
  const gl = door.gl;
  const sample = (x: number, y: number): [number, number, number, number] =>
    readPixel(gl, width, height, dpr, x, y);

  const circleCenter = sample(200, 150);
  const circleInside = sample(200, 100);
  const circleBackground = sample(20, 150);
  const circle = isRed(circleCenter) && isRed(circleInside) && isDark(circleBackground);

  const rectCenter = sample(90, 75);
  const rectCorner = sample(40, 40);
  const rectBackground = sample(380, 150);
  const rect = isGreen(rectCenter) && isGreen(rectCorner) && isDark(rectBackground);

  const lineCenter = sample(115, 260);
  const lineBackground = sample(10, 260);
  const line = isBlue(lineCenter) && isDark(lineBackground);

  let textCoverage = 0;
  for (let x = 215; x <= 340; x++) {
    for (let y = 55; y <= 95; y++) {
      const pixel = sample(x, y);
      const luminance = 0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2];
      if (luminance > 0.5 * 255) textCoverage++;
    }
  }
  const text = textCoverage >= 20;

  return {
    circle,
    rect,
    line,
    text,
    samples: {
      circleCenter,
      circleInside,
      circleBackground,
      rectCenter,
      rectCorner,
      rectBackground,
      lineCenter,
      lineBackground
    },
    textCoverage
  };
}
