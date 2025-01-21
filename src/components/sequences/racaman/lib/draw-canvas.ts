import { findBiggestInterval } from "@/lib/math";

function setupCanvas(canvas: HTMLCanvasElement, containerSize: { width: number; height: number }) {
  canvas.width = containerSize.width;
  canvas.height = containerSize.height;
}

function calculateValueScale(
  sequence: number[],
  containerSize: { width: number; height: number }
): number {
  const maxWith = containerSize.width;
  const maxHeight = containerSize.height;
  const width = Math.min(Math.max(...sequence), maxWith); // The max x value is determined by the biggest number in the sequence
  const height = Math.min(findBiggestInterval(sequence), maxHeight); // The max y value is determined by the biggest interval between two conscutive numbers in the sequence
  const horizontalScale = maxWith / width;
  const verticalScale = maxHeight / height;
  return horizontalScale < verticalScale ? horizontalScale : verticalScale; // Return the smaller scale to feet the sequence in the screen
}

function drawSequence(context: CanvasRenderingContext2D, sequence: number[], valueScale: number) {
  sequence.forEach((value, index) => {
    if (index > 0) {
      const previousValue = sequence[index - 1];
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

function draw(
  canvas: HTMLCanvasElement,
  sequence: number[],
  containerSize: { width: number; height: number }
) {
  if (!canvas.parentElement) return;

  setupCanvas(canvas, containerSize);
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const valueScale = calculateValueScale(sequence, containerSize);

  context.save();
  context.translate(0, canvas.height / 2);
  context.strokeStyle = "currentColor";
  context.lineWidth = 1;

  drawSequence(context, sequence, valueScale);

  context.restore();
}

export { draw };
