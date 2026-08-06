import type { ShaderUniformValues } from '../core/standardUniforms';
import { defaultDevicePixelRatio } from '../core/createWebGLContext';

/**
 * Coordinate spaces used by this module
 *
 * screen     – browser viewport, origin top-left, y-down, CSS pixels
 * canvas     – element local, origin top-left, y-down, CSS pixels
 * normalized – 0..1 inside the canvas box, origin top-left, y-down
 * buffer     – drawingBuffer pixels, origin top-left, y-down
 * webgl/vUv  – 0..1 (or -1..1), origin bottom-left, y-up
 * data       – user-defined domain (usually mathematical, y-up)
 */
export type Point2D = {
    x: number;
    y: number;
};

export type CanvasElementBounds = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export type DataDomainBounds = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
};

export type AspectFitMode = 'contain' | 'cover' | 'fill' | 'none';

export type { ShaderUniformValues };

export function createScreenToCanvas(canvasElementBounds: CanvasElementBounds) {
    return (vector: Point2D): Point2D => ({
        x: vector.x - canvasElementBounds.left,
        y: vector.y - canvasElementBounds.top
    });
}

export function createCanvasToNormalized(canvasWidth: number, canvasHeight: number) {
    return (vector: Point2D): Point2D => ({
        x: canvasWidth > 0 ? vector.x / canvasWidth : 0,
        y: canvasHeight > 0 ? vector.y / canvasHeight : 0
    });
}

export function createNormalizedToWebGL(): (vector: Point2D) => Point2D;
export function createNormalizedToWebGL(vector: Point2D): Point2D;
export function createNormalizedToWebGL(vectorOrUndefined?: Point2D) {
    const transform = (vector: Point2D): Point2D => ({
        x: vector.x * 2 - 1,
        y: 1 - vector.y * 2
    });
    if (vectorOrUndefined !== undefined && 'x' in vectorOrUndefined && 'y' in vectorOrUndefined) {
        return transform(vectorOrUndefined);
    }
    return transform;
}

export function createCanvasToBuffer(devicePixelRatio: number) {
    return (vector: Point2D): Point2D => ({
        x: vector.x * devicePixelRatio,
        y: vector.y * devicePixelRatio
    });
}

export function createBufferToCanvas(devicePixelRatio: number) {
    return (vector: Point2D): Point2D => ({
        x: vector.x / devicePixelRatio,
        y: vector.y / devicePixelRatio
    });
}

type DataFit = {
    scaleX: number;
    scaleY: number;
    offsetX: number;
    offsetY: number;
};

function computeDataFit(
    dataDomainBounds: DataDomainBounds,
    canvasWidth: number,
    canvasHeight: number,
    aspectFitMode: AspectFitMode,
    paddingFraction: number
): DataFit {
    if (aspectFitMode === 'none') {
        return { scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 };
    }

    const dataWidth = dataDomainBounds.xMax - dataDomainBounds.xMin;
    const dataHeight = dataDomainBounds.yMax - dataDomainBounds.yMin;
    if (dataWidth <= 0 || dataHeight <= 0 || canvasWidth <= 0 || canvasHeight <= 0) {
        return { scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 };
    }
    const paddedWidth = canvasWidth * (1 - paddingFraction * 2);
    const paddedHeight = canvasHeight * (1 - paddingFraction * 2);

    const uniformScale =
        aspectFitMode === 'contain'
            ? Math.min(paddedWidth / dataWidth, paddedHeight / dataHeight)
            : Math.max(paddedWidth / dataWidth, paddedHeight / dataHeight);

    const scaleX = aspectFitMode === 'fill' ? paddedWidth / dataWidth : uniformScale;
    const scaleY = aspectFitMode === 'fill' ? paddedHeight / dataHeight : uniformScale;

    const offsetX = (canvasWidth - dataWidth * scaleX) / 2 - dataDomainBounds.xMin * scaleX;
    const offsetY = (canvasHeight - dataHeight * scaleY) / 2 - dataDomainBounds.yMin * scaleY;

    return { scaleX, scaleY, offsetX, offsetY };
}

export function createDataToCanvas(
    dataDomainBounds: DataDomainBounds,
    canvasWidth: number,
    canvasHeight: number,
    aspectFitMode: AspectFitMode = 'contain',
    paddingFraction = 0
) {
    const { scaleX, scaleY, offsetX, offsetY } = computeDataFit(
        dataDomainBounds,
        canvasWidth,
        canvasHeight,
        aspectFitMode,
        paddingFraction
    );

    return (vector: Point2D): Point2D => ({
        x: vector.x * scaleX + offsetX,
        y: vector.y * scaleY + offsetY
    });
}

export function createCanvasToData(
    dataDomainBounds: DataDomainBounds,
    canvasWidth: number,
    canvasHeight: number,
    aspectFitMode: AspectFitMode = 'contain',
    paddingFraction = 0
) {
    const { scaleX, scaleY, offsetX, offsetY } = computeDataFit(
        dataDomainBounds,
        canvasWidth,
        canvasHeight,
        aspectFitMode,
        paddingFraction
    );

    return (vector: Point2D): Point2D => ({
        x: (vector.x - offsetX) / scaleX,
        y: (vector.y - offsetY) / scaleY
    });
}

export function createScreenToBuffer(
    canvasElementBounds: CanvasElementBounds,
    devicePixelRatio: number
) {
    const screenToCanvas = createScreenToCanvas(canvasElementBounds);
    const canvasToBuffer = createCanvasToBuffer(devicePixelRatio);
    return (vector: Point2D): Point2D => canvasToBuffer(screenToCanvas(vector));
}

export function createBufferToScreen(
    canvasElementBounds: CanvasElementBounds,
    devicePixelRatio: number
) {
    const bufferToCanvas = createBufferToCanvas(devicePixelRatio);
    return (vector: Point2D): Point2D => {
        const canvasPoint = bufferToCanvas(vector);
        return {
            x: canvasPoint.x + canvasElementBounds.left,
            y: canvasPoint.y + canvasElementBounds.top
        };
    };
}

export function createScreenToNormalized(canvasElementBounds: CanvasElementBounds) {
    const screenToCanvas = createScreenToCanvas(canvasElementBounds);
    const canvasToNormalized = createCanvasToNormalized(
        canvasElementBounds.width,
        canvasElementBounds.height
    );
    return (vector: Point2D): Point2D => canvasToNormalized(screenToCanvas(vector));
}

export function createScreenToNormalizedClamped(canvasElementBounds: CanvasElementBounds) {
    const toNormalized = createScreenToNormalized(canvasElementBounds);
    return (vector: Point2D): Point2D => {
        const n = toNormalized(vector);
        return {
            x: Math.max(0, Math.min(1, n.x)),
            y: Math.max(0, Math.min(1, n.y))
        };
    };
}

export type GridCell = {
    column: number;
    row: number;
    index: number;
};

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

export function createCanvasToGrid(
    cols: number,
    rows: number,
    canvasWidth: number,
    canvasHeight: number,
    fit: AspectFitMode = 'contain'
): (canvas: Point2D) => GridCell {
    const toData = createCanvasToData(
        { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
        canvasWidth,
        canvasHeight,
        fit
    );
    return (canvas: Point2D) => {
        const d = toData(canvas);
        const column = Math.max(0, Math.min(cols - 1, Math.floor(d.x)));
        const row = Math.max(0, Math.min(rows - 1, Math.floor(d.y)));
        return { column, row, index: row * cols + column };
    };
}

export function createScreenToGrid(
    canvasBounds: CanvasElementBounds,
    cols: number,
    rows: number,
    fit: AspectFitMode = 'contain'
): (screen: Point2D) => GridCell {
    const toCanvas = createScreenToCanvas(canvasBounds);
    const toGrid = createCanvasToGrid(cols, rows, canvasBounds.width, canvasBounds.height, fit);
    return (screen: Point2D) => toGrid(toCanvas(screen));
}

export function createShaderUniformBuilder(cssWidth: number, cssHeight: number) {
    const dpr = defaultDevicePixelRatio();
    /**
     * `mouseNormalizedUV` is the pointer normalized against the canvas box:
     * origin top-left, y-down (0..1). The returned `mouse` value is converted
     * to vUv space (origin bottom-left, y-up) so it aligns with the UV that
     * `FULLSCREEN_TRIANGLE` produces.
     */
    return (mouseNormalizedUV?: Point2D): ShaderUniformValues => ({
        resolution: [cssWidth * dpr, cssHeight * dpr],
        aspectRatio: cssHeight > 0 ? cssWidth / cssHeight : 0,
        mouse: mouseNormalizedUV ? [mouseNormalizedUV.x, 1 - mouseNormalizedUV.y] : [0, 1]
    });
}
