const setupCanvas = (canvas: HTMLCanvasElement, containerSize: { width: number; height: number }) => {
  canvas.width = containerSize.width;
  canvas.height = containerSize.height;
};

const calculateValueScale = (sequence: number[], canvasWidth: number): number => {
  const valueMin = Math.min(...sequence);
  const valueMax = Math.max(...sequence);
  return canvasWidth / (valueMax - valueMin);
};

const drawSequence = (context: CanvasRenderingContext2D, sequence: number[], valueScale: number) => {
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
};

const draw = (canvas: HTMLCanvasElement, sequence: number[], containerSize: { width: number; height: number }) => {
  if (!canvas.parentElement) return;

  setupCanvas(canvas, containerSize);
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const valueScale = calculateValueScale(sequence, canvas.width);

  context.save();
  context.translate(0, canvas.height / 2);
  context.strokeStyle = "currentColor";
  context.lineWidth = 1;

  drawSequence(context, sequence, valueScale);

  context.restore();
};

export { draw };
