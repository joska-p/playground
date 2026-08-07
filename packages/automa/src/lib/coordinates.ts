import { screenToWorld, type Camera } from '@repo/glaze/core/coords/camera';

export type Point2D = { x: number; y: number };
export type GridCell = { column: number; row: number; index: number };

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
        // Flip Y to match the display: the grid texture stores row 0 at the
        // bottom (gl_FragCoord is Y-up), so canvas-top ↔ high row.
        const d = toData({ x: p.x, y: boundsHeight - p.y });
        return {
            column: Math.floor(d.x),
            row: Math.floor(d.y),
            // Deliberate: keep automa's unclamped index. Bounds checks happen in the caller.
            index: Math.floor(d.y) * cols + Math.floor(d.x)
        };
    };
}

export function eventToGridPoint(
    e: { clientX: number; clientY: number },
    canvas: HTMLCanvasElement,
    cols: number,
    rows: number,
    camera?: Camera
): GridCell {
    const bounds = canvas.getBoundingClientRect();
    const toWorld = screenToWorld(camera ?? { x: 0, y: 0, zoom: 1 });
    const world = toWorld({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    const toGrid = createCanvasToGrid(cols, rows, bounds.width, bounds.height);
    return toGrid(world);
}
