export type Point = {
  x: number;
  y: number;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DomainBounds = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type FitMode = 'contain' | 'cover' | 'fill' | 'none';

export type ViewportConfig = {
  cssWidth: number;
  cssHeight: number;
  dpr: number;
};

export type ShaderUniforms = {
  u_resolution: [number, number];
  u_aspect: number;
  u_mouse: [number, number];
};

export class SpaceMapper {
  private cssWidth: number;
  private cssHeight: number;
  private dpr: number;

  constructor(config: ViewportConfig) {
    this.cssWidth = config.cssWidth;
    this.cssHeight = config.cssHeight;
    this.dpr = config.dpr;
  }

  screenToUV(point: Point, rect?: DOMRect): Point {
    const r =
      rect ?? ({ left: 0, top: 0, width: this.cssWidth, height: this.cssHeight } as DOMRect);
    return {
      x: (point.x - r.left) / r.width,
      y: (point.y - r.top) / r.height
    };
  }

  uvToNDC(uv: Point): Point {
    return { x: uv.x * 2 - 1, y: uv.y * 2 - 1 };
  }

  ndcToBuffer(ndc: Point): Point {
    return {
      x: ((ndc.x + 1) / 2) * this.cssWidth * this.dpr,
      y: ((ndc.y + 1) / 2) * this.cssHeight * this.dpr
    };
  }

  screenToBuffer(point: Point, rect?: DOMRect): Point {
    const uv = this.screenToUV(point, rect);
    const ndc = this.uvToNDC(uv);
    return this.ndcToBuffer(ndc);
  }

  bufferToNDC(bufferPx: Point): Point {
    return {
      x: (bufferPx.x / (this.cssWidth * this.dpr)) * 2 - 1,
      y: (bufferPx.y / (this.cssHeight * this.dpr)) * 2 - 1
    };
  }

  dataToScreen(
    dataPoint: Point,
    dataBounds: DomainBounds,
    fitMode: FitMode = 'contain',
    padding = 0
  ): Point {
    const dataW = dataBounds.xMax - dataBounds.xMin;
    const dataH = dataBounds.yMax - dataBounds.yMin;
    const padW = this.cssWidth * (1 - padding * 2);
    const padH = this.cssHeight * (1 - padding * 2);

    let scale: number;
    switch (fitMode) {
      case 'contain':
        scale = Math.min(padW / dataW, padH / dataH);
        break;
      case 'cover':
        scale = Math.max(padW / dataW, padH / dataH);
        break;
      case 'fill':
        scale = 1;
        break;
      case 'none':
        scale = 1;
        break;
    }

    const offsetX = (this.cssWidth - dataW * scale) / 2 - dataBounds.xMin * scale;
    const offsetY = (this.cssHeight - dataH * scale) / 2 - dataBounds.yMin * scale;

    return {
      x: dataPoint.x * scale + offsetX,
      y: dataPoint.y * scale + offsetY
    };
  }

  screenToData(
    screenPoint: Point,
    dataBounds: DomainBounds,
    fitMode: FitMode = 'contain',
    padding = 0
  ): Point {
    const dataW = dataBounds.xMax - dataBounds.xMin;
    const dataH = dataBounds.yMax - dataBounds.yMin;
    const padW = this.cssWidth * (1 - padding * 2);
    const padH = this.cssHeight * (1 - padding * 2);

    let scale: number;
    switch (fitMode) {
      case 'contain':
        scale = Math.min(padW / dataW, padH / dataH);
        break;
      case 'cover':
        scale = Math.max(padW / dataW, padH / dataH);
        break;
      case 'fill':
        scale = 1;
        break;
      case 'none':
        scale = 1;
        break;
    }

    const offsetX = (this.cssWidth - dataW * scale) / 2 - dataBounds.xMin * scale;
    const offsetY = (this.cssHeight - dataH * scale) / 2 - dataBounds.yMin * scale;

    return {
      x: (screenPoint.x - offsetX) / scale,
      y: (screenPoint.y - offsetY) / scale
    };
  }

  worldToGrid(
    worldPoint: Point,
    cols: number,
    rows: number
  ): { col: number; row: number; index: number } {
    const col = Math.max(0, Math.min(cols - 1, Math.floor(worldPoint.x)));
    const row = Math.max(0, Math.min(rows - 1, Math.floor(worldPoint.y)));
    return { col, row, index: row * cols + col };
  }

  gridToWorld(col: number, row: number, _cols: number, _rows: number): Point {
    return {
      x: col + 0.5,
      y: row + 0.5
    };
  }

  toGLSLFragment(options?: {
    inputSpace?: 'uv' | 'ndc' | 'pixel';
    yFlip?: boolean;
    aspectCorrect?: boolean;
  }): string {
    const inputSpace = options?.inputSpace ?? 'uv';
    const yFlip = options?.yFlip ?? false;
    const aspectCorrect = options?.aspectCorrect ?? false;

    const lines: string[] = [];

    if (inputSpace === 'uv') {
      lines.push('vec2 uv = vUv;');
      if (yFlip) lines.push('uv.y = 1.0 - uv.y;');
    } else if (inputSpace === 'ndc') {
      lines.push('vec2 uv = vUv * 2.0 - 1.0;');
      if (yFlip) lines.push('uv.y = -uv.y;');
    } else {
      lines.push('vec2 uv = gl_FragCoord.xy / u_resolution;');
      if (yFlip) lines.push('uv.y = 1.0 - uv.y;');
    }

    if (aspectCorrect) {
      lines.push('uv.x *= u_resolution.x / u_resolution.y;');
    }

    return lines.join('\n');
  }

  getShaderUniforms(mouseBufferPx?: Point): ShaderUniforms {
    return {
      u_resolution: [this.cssWidth * this.dpr, this.cssHeight * this.dpr],
      u_aspect: this.cssWidth / this.cssHeight,
      u_mouse: mouseBufferPx ? [mouseBufferPx.x, mouseBufferPx.y] : [0, 0]
    };
  }

  resize(config: Partial<ViewportConfig>): void {
    if (config.cssWidth !== undefined) this.cssWidth = config.cssWidth;
    if (config.cssHeight !== undefined) this.cssHeight = config.cssHeight;
    if (config.dpr !== undefined) this.dpr = config.dpr;
  }

  getBufferSize(): Point {
    return { x: this.cssWidth * this.dpr, y: this.cssHeight * this.dpr };
  }

  getCSSSize(): Point {
    return { x: this.cssWidth, y: this.cssHeight };
  }
}
