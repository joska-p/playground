export type Point2D = { x: number; y: number };
export type GridCell = { column: number; row: number; index: number };
export type Camera = { x: number; y: number; zoom: number };

type DataFit = { scaleX: number; scaleY: number; offsetX: number; offsetY: number };

// 'contain' fit of the data domain (0..cols, 0..rows) inside the canvas box.
function computeContainFit(
    dataWidth: number,
    dataHeight: number,
    canvasWidth: number,
    canvasHeight: number
): DataFit {
    if (dataWidth <= 0 || dataHeight <= 0 || canvasWidth <= 0 || canvasHeight <= 0) {
        return { scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 };
    }
    const scale = Math.min(canvasWidth / dataWidth, canvasHeight / dataHeight);
    return {
        scaleX: scale,
        scaleY: scale,
        offsetX: (canvasWidth - dataWidth * scale) / 2,
        offsetY: (canvasHeight - dataHeight * scale) / 2
    };
}

export function createCanvasToData(
    cols: number,
    rows: number,
    canvasWidth: number,
    canvasHeight: number
) {
    const fit = computeContainFit(cols, rows, canvasWidth, canvasHeight);
    return (vector: Point2D): Point2D => ({
        x: (vector.x - fit.offsetX) / fit.scaleX,
        y: (vector.y - fit.offsetY) / fit.scaleY
    });
}

export function createCanvasToGrid(
    cols: number,
    rows: number,
    boundsWidth: number,
    boundsHeight: number
) {
    const toData = createCanvasToData(cols, rows, boundsWidth, boundsHeight);
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

export function createWorldToGrid(cols: number, rows: number): (world: Point2D) => GridCell {
    return (world: Point2D) => {
        const column = Math.max(0, Math.min(cols - 1, Math.floor(world.x)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(world.y)));
        return { column, row, index: row * cols + column };
    };
}

export function gridToWorld(cell: { column: number; row: number }): Point2D {
    return { x: cell.column + 0.5, y: cell.row + 0.5 };
}

export function eventToGridPoint(
    e: { clientX: number; clientY: number },
    canvas: HTMLCanvasElement,
    cols: number,
    rows: number,
    interaction?: Camera
) {
    const bounds = canvas.getBoundingClientRect();
    let localX = e.clientX - bounds.left;
    let localY = e.clientY - bounds.top;

    // Inverse of the shader's camera transform: world = (screen - camera) / zoom.
    if (interaction) {
        localX = (localX - interaction.x) / interaction.zoom;
        localY = (localY - interaction.y) / interaction.zoom;
    }

    const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
    return toGrid({ x: localX, y: localY });
}
