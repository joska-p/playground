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

/**
 * Shader uniform values produced from canvas size + mouse state.
 *
 * - `uniformResolution` — buffer pixels `[w*dpr, h*dpr]`
 * - `uniformAspectRatio` — cssW/cssH
 * - `uniformMouse` — normalized UV, origin top-left, y-down (0..1), same space as `vUv`
 */
export type ShaderUniformValues = {
  uniformResolution: [number, number];
  uniformAspectRatio: number;
  uniformMouse: [number, number];
};

export function createScreenToCanvas(canvasElementBounds: CanvasElementBounds) {
  return (vector: Point2D): Point2D => ({
    x: vector.x - canvasElementBounds.left,
    y: vector.y - canvasElementBounds.top
  });
}

export function createCanvasToNormalized(canvasWidth: number, canvasHeight: number) {
  return (vector: Point2D): Point2D => ({
    x: vector.x / canvasWidth,
    y: vector.y / canvasHeight
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
    const column = Math.floor(d.x);
    const row = Math.floor(d.y);
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

export function createShaderUniformBuilder(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio: number
) {
  /**
   * `mouseNormalizedUV` is normalized UV, origin top-left, y-down (0..1) —
   * the same space as `vUv`. Convert pointer coordinates before calling.
   */
  return (mouseNormalizedUV?: Point2D): ShaderUniformValues => ({
    uniformResolution: [cssWidth * devicePixelRatio, cssHeight * devicePixelRatio],
    uniformAspectRatio: cssWidth / cssHeight,
    uniformMouse: mouseNormalizedUV ? [mouseNormalizedUV.x, mouseNormalizedUV.y] : [0, 0]
  });
}

export function generateGLSLFragment(options?: {
  inputSpace?: 'canvas' | 'normalized' | 'webgl';
  flipVertically?: boolean;
  correctAspectRatio?: boolean;
}): string {
  const inputSpace = options?.inputSpace ?? 'normalized';
  const flipVertically = options?.flipVertically ?? false;
  const correctAspectRatio = options?.correctAspectRatio ?? false;

  const lines: string[] = [];

  if (inputSpace === 'canvas') {
    lines.push('vec2 uv = gl_FragCoord.xy / uniformResolution;');
    if (flipVertically) {
      lines.push('uv.y = 1.0 - uv.y;');
    }
  } else if (inputSpace === 'webgl') {
    lines.push('vec2 uv = vUv * 2.0 - 1.0;');
    if (flipVertically) {
      lines.push('uv.y = -uv.y;');
    }
  } else {
    lines.push('vec2 uv = vUv;');
    if (flipVertically) {
      lines.push('uv.y = 1.0 - uv.y;');
    }
  }

  if (correctAspectRatio) {
    lines.push('uv.x *= uniformResolution.x / uniformResolution.y;');
  }

  return lines.join('\n');
}
