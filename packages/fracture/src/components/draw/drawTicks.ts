import type { StageContext } from '../../core/StageContext';

type TicksConfig = {
  ctx: CanvasRenderingContext2D;
  stage: StageContext;
  stepX: number; // Interval in math units for X ticks (e.g., 1.0)
  stepY: number; // Interval in math units for Y ticks (e.g., 0.5)
};

function drawTicks({ ctx, stage, stepX, stepY }: TicksConfig) {
  ctx.save();
  ctx.strokeStyle = 'currentColor';
  ctx.lineWidth = 1;
  ctx.beginPath();

  const tickSize = 5; // How many pixels wide/tall the tick line is
  const { sx: originX, sy: originY } = stage.toScreen2D(0, 0);

  // --- 1. Draw X-Axis Ticks (Vertical lines moving along the X axis) ---
  // Math loop: start from the first step greater than xMin, stop at xMax
  const startX = Math.ceil(stage.view.xMin / stepX) * stepX;
  for (let x = startX; x <= stage.view.xMax; x += stepX) {
    if (x === 0) continue; // Skip the origin intersection

    const { sx } = stage.toScreen2D(x, 0);

    // Draw the tick mark intersecting the X-axis line
    ctx.moveTo(sx, originY - tickSize);
    ctx.lineTo(sx, originY + tickSize);
  }

  // --- 2. Draw Y-Axis Ticks (Horizontal lines moving up/down the Y axis) ---
  const startY = Math.ceil(stage.view.yMin / stepY) * stepY;
  for (let y = startY; y <= stage.view.yMax; y += stepY) {
    if (y === 0) continue; // Skip the origin intersection

    const { sy } = stage.toScreen2D(0, y);

    // Draw the tick mark intersecting the Y-axis line
    ctx.moveTo(originX - tickSize, sy);
    ctx.lineTo(originX + tickSize, sy);
  }

  ctx.stroke();
  ctx.restore();
}

export { drawTicks };
