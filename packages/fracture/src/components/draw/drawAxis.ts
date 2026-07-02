import type { StageContext } from '../../core/StageContext';

type LayerProps = {
  ctx: CanvasRenderingContext2D;
  stage: StageContext;
};

function drawAxis({ ctx, stage }: LayerProps) {
  ctx.save();
  ctx.strokeStyle = 'currentColor'; // Inherits text color from Tailwind
  ctx.lineWidth = 1;
  ctx.beginPath();

  // --- Draw X-Axis (The line where Y = 0) ---
  // We find the screen Y position for math Y = 0.
  // The line spans the entire width of the canvas (from screen X = 0 to screen X = stage.width).
  const { sy: xAxisY } = stage.toScreen2D(0, 0);
  ctx.moveTo(0, xAxisY);
  ctx.lineTo(stage.width, xAxisY);

  // --- Draw Y-Axis (The line where X = 0) ---
  // We find the screen X position for math X = 0.
  // The line spans the entire height of the canvas (from screen Y = 0 to screen Y = stage.height).
  const { sx: yAxisX } = stage.toScreen2D(0, 0);
  ctx.moveTo(yAxisX, 0);
  ctx.lineTo(yAxisX, stage.height);

  ctx.stroke();
  ctx.restore();
}

