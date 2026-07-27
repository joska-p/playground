export type WebGLContextConfig = {
  canvas: HTMLCanvasElement;
  dpr?: number;
  alpha?: boolean;
  antialias?: boolean;
  premultipliedAlpha?: boolean;
}

export class WebGLContext {
  readonly gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private dpr: number;

  constructor(config: WebGLContextConfig) {
    this.canvas = config.canvas;
    this.dpr = config.dpr ?? Math.min(window.devicePixelRatio, 2);

    const gl = config.canvas.getContext('webgl2', {
      alpha: config.alpha ?? true,
      antialias: config.antialias ?? false,
      premultipliedAlpha: config.premultipliedAlpha ?? true
    });

    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;

    this.applyDPR();
  }

  applyDPR(): void {
    const w = this.canvas.clientWidth * this.dpr;
    const h = this.canvas.clientHeight * this.dpr;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  resize(dpr?: number): void {
    if (dpr !== undefined) this.dpr = dpr;
    this.applyDPR();
  }

  get drawingBufferWidth(): number {
    return this.gl.drawingBufferWidth;
  }

  get drawingBufferHeight(): number {
    return this.gl.drawingBufferHeight;
  }

  viewport(): void {
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
  }

  clear(r = 0, g = 0, b = 0, a = 1): void {
    const gl = this.gl;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  onContextLost(handler: () => void): void {
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      handler();
    });
  }

  onContextRestored(handler: () => void): void {
    this.canvas.addEventListener('webglcontextrestored', () => {
      handler();
    });
  }
}
