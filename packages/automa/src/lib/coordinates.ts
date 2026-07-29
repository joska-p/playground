import { createCanvasToData, type Point2D } from '@repo/graphics/math/transforms';

export type GridCell = {
  column: number;
  row: number;
  index: number;
};

export type { Point2D };

export function createWorldToGrid(cols: number, rows: number) {
  return (p: Point2D) => ({
    column: Math.max(0, Math.min(cols - 1, Math.floor(p.x))),
    row: Math.max(0, Math.min(rows - 1, Math.floor(p.y))),
    index: Math.floor(p.y) * cols + Math.floor(p.x)
  });
}

export function gridToWorld(cell: { column: number; row: number }): Point2D {
  return { x: cell.column + 0.5, y: cell.row + 0.5 };
}

export function createCanvasToGrid(
  cols: number,
  rows: number,
  boundsWidth: number,
  boundsHeight: number,
  fit: 'fill' | 'contain' | 'cover' = 'contain'
) {
  const toData = createCanvasToData(
    { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
    boundsWidth,
    boundsHeight,
    fit
  );
  return (p: Point2D) => {
    const d = toData(p);
    return {
      column: Math.floor(d.x),
      row: Math.floor(d.y),
      index: Math.floor(d.y) * cols + Math.floor(d.x)
    };
  };
}

export function eventToGridPoint(
  e: { clientX: number; clientY: number },
  canvas: HTMLCanvasElement,
  cols: number,
  rows: number,
  interaction?: { pan: Point2D; zoom: number }
) {
  const bounds = canvas.getBoundingClientRect();
  let localX = e.clientX - bounds.left;
  let localY = bounds.height - (e.clientY - bounds.top);

  if (interaction) {
    const cx = bounds.width / 2;
    const cy = bounds.height / 2;
    localX = (localX - cx) / interaction.zoom + cx - interaction.pan.x;
    localY = (localY - cy) / interaction.zoom + cy - interaction.pan.y;
  }

  const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
  return toGrid({ x: localX, y: localY });
}
