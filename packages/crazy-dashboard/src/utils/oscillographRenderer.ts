interface DrawGridOptions {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  spacing?: number;
  color?: string;
  lineWidth?: number;
}

interface DrawWaveformOptions {
  ctx: CanvasRenderingContext2D;
  entries: Array<{ value: number; index: number }>;
  maxDataPoints: number;
  centerY: number;
  width: number;
  color?: string;
  lineWidth?: number;
}

/**
 * Draw oscilloscope-style grid lines on canvas.
 */
function drawGrid({
  ctx,
  width,
  height,
  spacing = 20,
  color = "#333",
  lineWidth = 0.5,
}: DrawGridOptions): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  for (let i = 0; i < height; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }
  for (let i = 0; i < width; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
}

/**
 * Draw waveform from circular buffer entries.
 */
function drawWaveform({
  ctx,
  entries,
  maxDataPoints,
  centerY,
  width,
  color = "#33ff33",
  lineWidth = 2,
}: DrawWaveformOptions): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  for (let i = 0; i < entries.length; i++) {
    const x = (i / maxDataPoints) * width;
    const y = centerY - entries[i]!.value;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
}

export { drawGrid, drawWaveform };
