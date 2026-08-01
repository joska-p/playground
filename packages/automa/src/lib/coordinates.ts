import {
  createCanvasToData,
  createWorldToGrid,
  gridToWorld,
  type GridCell,
  type Point2D
} from '@repo/graphics/2d/transforms';

export { createWorldToGrid, gridToWorld };
export type { GridCell, Point2D };

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
    const d = toData({ x: p.x, y: boundsHeight - p.y });
    return {
      column: Math.floor(d.x),
      row: Math.floor(d.y),
      // Deliberate: keep automa's unclamped index. The lib's createWorldToGrid
      // clamps to grid bounds; automa intentionally reports out-of-bounds cells.
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
  let localY = e.clientY - bounds.top;

  if (interaction) {
    const cx = bounds.width / 2;
    const cy = bounds.height / 2;
    localX = (localX - cx) / interaction.zoom + cx - interaction.pan.x;
    localY = (localY - cy) / interaction.zoom + cy - interaction.pan.y;
  }

  const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
  return toGrid({ x: localX, y: localY });
}
