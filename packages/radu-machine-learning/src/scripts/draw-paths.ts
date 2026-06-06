import type { CanvasRenderingContext2D } from 'canvas';

export type Paths = [number, number][][];

type DrawPathsProps = {
  ctx: CanvasRenderingContext2D;
  paths: Paths;
  lineWidth?: number;
  color?: string;
};

function drawPaths({
  ctx,
  paths,
  lineWidth = 2,
  color = '#888888',
}: DrawPathsProps) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  paths.forEach((path) => {
    if (path.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);

    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i][0], path[i][1]);
    }

    ctx.stroke();
  });
}

export { drawPaths };
