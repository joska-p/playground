export type GridCellCoordinates = {
  column: number;
  row: number;
  index: number;
};

export type Point2D = {
  x: number;
  y: number;
};

export function createWorldToGrid(gridColumns: number, gridRows: number) {
  return (vector: Point2D): GridCellCoordinates => {
    const column = Math.max(0, Math.min(gridColumns - 1, Math.floor(vector.x)));
    const row = Math.max(0, Math.min(gridRows - 1, Math.floor(vector.y)));
    return { column, row, index: row * gridColumns + column };
  };
}

export function gridToWorld(cellCoordinates: { column: number; row: number }): Point2D {
  return {
    x: cellCoordinates.column + 0.5,
    y: cellCoordinates.row + 0.5
  };
}

export function createCanvasToGrid(
  cols: number,
  rows: number,
  boundsWidth: number,
  boundsHeight: number,
  fit: 'fill' | 'contain' | 'cover' = 'fill'
) {
  const scaleX = boundsWidth / cols;
  const scaleY = boundsHeight / rows;
  let scale: number;
  if (fit === 'contain') {
    scale = Math.min(scaleX, scaleY);
  } else if (fit === 'cover') {
    scale = Math.max(scaleX, scaleY);
  } else {
    scale = 1;
  }

  const offsetX = (boundsWidth - cols * scale) / 2;
  const offsetY = (boundsHeight - rows * scale) / 2;

  const worldToGrid = createWorldToGrid(cols, rows);

  return (point: { x: number; y: number }) => {
    const worldX = (point.x - offsetX) / scale;
    const worldY = (point.y - offsetY) / scale;
    return worldToGrid({ x: worldX, y: worldY });
  };
}

export function eventToGridPoint(
  e: { clientX: number; clientY: number },
  canvas: HTMLCanvasElement,
  cols: number,
  rows: number
) {
  const bounds = canvas.getBoundingClientRect();
  const localX = e.clientX - bounds.left;
  const localY = e.clientY - bounds.top;

  const canvasToGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
  return canvasToGrid({ x: localX, y: localY });
}
