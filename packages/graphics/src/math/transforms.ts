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

export type ShaderUniformValues = {
  uniformResolution: [number, number];
  uniformAspectRatio: number;
  uniformMouse: [number, number];
};

export type GridCellCoordinates = {
  column: number;
  row: number;
  index: number;
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

export function createDataToCanvas(
  dataDomainBounds: DataDomainBounds,
  canvasWidth: number,
  canvasHeight: number,
  aspectFitMode: AspectFitMode = 'contain',
  paddingFraction = 0
) {
  const dataWidth = dataDomainBounds.xMax - dataDomainBounds.xMin;
  const dataHeight = dataDomainBounds.yMax - dataDomainBounds.yMin;
  const paddedWidth = canvasWidth * (1 - paddingFraction * 2);
  const paddedHeight = canvasHeight * (1 - paddingFraction * 2);

  let scale: number;
  switch (aspectFitMode) {
    case 'contain':
      scale = Math.min(paddedWidth / dataWidth, paddedHeight / dataHeight);
      break;
    case 'cover':
      scale = Math.max(paddedWidth / dataWidth, paddedHeight / dataHeight);
      break;
    case 'fill':
    case 'none':
    default:
      scale = 1;
      break;
  }

  const offsetX = (canvasWidth - dataWidth * scale) / 2 - dataDomainBounds.xMin * scale;
  const offsetY = (canvasHeight - dataHeight * scale) / 2 - dataDomainBounds.yMin * scale;

  return (vector: Point2D): Point2D => ({
    x: vector.x * scale + offsetX,
    y: vector.y * scale + offsetY
  });
}

export function createCanvasToData(
  dataDomainBounds: DataDomainBounds,
  canvasWidth: number,
  canvasHeight: number,
  aspectFitMode: AspectFitMode = 'contain',
  paddingFraction = 0
) {
  const dataWidth = dataDomainBounds.xMax - dataDomainBounds.xMin;
  const dataHeight = dataDomainBounds.yMax - dataDomainBounds.yMin;
  const paddedWidth = canvasWidth * (1 - paddingFraction * 2);
  const paddedHeight = canvasHeight * (1 - paddingFraction * 2);

  let scale: number;
  switch (aspectFitMode) {
    case 'contain':
      scale = Math.min(paddedWidth / dataWidth, paddedHeight / dataHeight);
      break;
    case 'cover':
      scale = Math.max(paddedWidth / dataWidth, paddedHeight / dataHeight);
      break;
    case 'fill':
    case 'none':
    default:
      scale = 1;
      break;
  }

  const offsetX = (canvasWidth - dataWidth * scale) / 2 - dataDomainBounds.xMin * scale;
  const offsetY = (canvasHeight - dataHeight * scale) / 2 - dataDomainBounds.yMin * scale;

  return (vector: Point2D): Point2D => ({
    x: (vector.x - offsetX) / scale,
    y: (vector.y - offsetY) / scale
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

export function createShaderUniformBuilder(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio: number
) {
  return (mouseBufferPixel?: Point2D): ShaderUniformValues => ({
    uniformResolution: [cssWidth * devicePixelRatio, cssHeight * devicePixelRatio],
    uniformAspectRatio: cssWidth / cssHeight,
    uniformMouse: mouseBufferPixel ? [mouseBufferPixel.x, mouseBufferPixel.y] : [0, 0]
  });
}

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

export function createCanvasToGrid(
  cols: number,
  rows: number,
  boundsWidth: number,
  boundsHeight: number,
  fit: 'fill' | 'contain' | 'cover' = 'fill'
) {
  const canvasToData = createCanvasToData(
    { xMin: 0, xMax: cols, yMin: 0, yMax: rows },
    boundsWidth,
    boundsHeight,
    fit
  );
  const worldToGrid = createWorldToGrid(cols, rows);

  return (point: { x: number; y: number }) => {
    const dataPoint = canvasToData(point);
    return worldToGrid(dataPoint);
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
