import { findBiggestInterval } from "./math.js";

function calculateValueScale(
  sequence: number[],
  containerSize: { width: number; height: number },
): number {
  const maxVal = Math.max(...sequence, 0);
  const maxInterval = findBiggestInterval(sequence);

  // Add 5% padding
  const padding = 0.95;
  const horizontalScale = (containerSize.width * padding) / (maxVal || 1);
  const verticalScale = (containerSize.height * padding) / (maxInterval || 1);

  return Math.min(horizontalScale, verticalScale);
}

function drawSequence(
  context: CanvasRenderingContext2D,
  sequence: number[],
  valueScale: number,
) {
  sequence.forEach((value, index) => {
    const previousValue = sequence[index - 1];
    if (index > 0 && previousValue !== undefined) {
      const middleValue = ((previousValue + value) / 2) * valueScale;
      const radius = (Math.abs(value - previousValue) / 2) * valueScale;

      context.beginPath();
      if (index % 2 === 0) {
        context.arc(middleValue, 0, radius, 0, Math.PI);
      } else {
        context.arc(middleValue, 0, radius, Math.PI, 0);
      }
      context.stroke();
    }
  });
}

function draw(canvas: HTMLCanvasElement, sequence: number[]) {
  if (!canvas.parentElement) return;

  const containerSize = {
    width: canvas.parentElement.clientWidth,
    height: canvas.parentElement.clientHeight,
  };
  canvas.width = containerSize.width;
  canvas.height = containerSize.height;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const valueScale = calculateValueScale(sequence, containerSize);

  context.save();

  // Center the drawing
  const maxVal = Math.max(...sequence, 0);
  const offsetX = (containerSize.width - maxVal * valueScale) / 2;
  const offsetY = containerSize.height / 2;

  context.translate(offsetX, offsetY);

  const color = getComputedStyle(canvas).color || "black";
  context.strokeStyle = color;
  context.lineWidth = 1;

  drawSequence(context, sequence, valueScale);

  context.restore();
}

export { draw };
