import type { Paths } from '../../core/drawing.types.ts';

const getMinMax = (paths: Paths) => {
  let xMin = +Infinity;
  let xMax = -Infinity;
  let yMin = +Infinity;
  let yMax = -Infinity;
  for (const path of paths) {
    for (const [X, Y] of path) {
      xMin = Math.min(xMin, X);
      xMax = Math.max(xMax, X);
      yMin = Math.min(yMin, Y);
      yMax = Math.max(yMax, Y);
    }
  }
  return { xMin, xMax, yMin, yMax };
};

const drawSample = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  paths: Paths
) => {
  const { width, height } = canvas;
  const { canvasWidth, canvasHeight } =
    width > height
      ? { canvasWidth: width, canvasHeight: width }
      : { canvasWidth: height, canvasHeight: height };
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const { xMin, xMax, yMin, yMax } = getMinMax(paths);
  const sampleWidth = (Math.abs(xMax) + Math.abs(xMin)) / 2;
  const sampleHeight = (Math.abs(yMax) + Math.abs(yMin)) / 2;
  const maxLength = Math.max(sampleWidth, sampleHeight);

  const scaleX = canvasWidth / maxLength / 2;
  const scaleY = canvasHeight / maxLength / 2;

  ctx.save();
  ctx.scale(scaleX, scaleY);
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'transparent ';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();

  for (const path of paths) {
    for (let i = 1; i < path.length; i++) {
      const Xprev = path[i - 1][0];
      const Yprev = path[i - 1][1];
      const X = path[i][0];
      const Y = path[i][1];
      ctx.moveTo(Xprev, Yprev);
      ctx.lineTo(X, Y);
    }
  }
  ctx.stroke();
  ctx.restore();
};

export { drawSample };
