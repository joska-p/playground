export type WebGLContextAttributes = {
  alpha?: boolean;
  antialias?: boolean;
  premultipliedAlpha?: boolean;
};

export type CreateWebGLContextConfig = {
  canvas: HTMLCanvasElement;
  dpr?: number | undefined;
  webGlContextAttributes?: WebGLContextAttributes | undefined;
};

export type WebGLContext = {
  gl: WebGL2RenderingContext;
  applyDPR(): void;
  reinitialize(): void;
  resize(width?: number, height?: number, dpr?: number): void;
  readonly drawingBufferWidth: number;
  readonly drawingBufferHeight: number;
  viewport(): void;
  clear(r?: number, g?: number, b?: number, a?: number): void;
  onContextLost(handler: () => void): () => void;
  onContextRestored(handler: () => void): () => void;
};

export function createWebGLContext({
  canvas,
  dpr,
  webGlContextAttributes
}: CreateWebGLContextConfig): WebGLContext {
  let currentDpr = dpr ?? Math.min(window.devicePixelRatio, 2);

  const gl = canvas.getContext('webgl2', {
    alpha: webGlContextAttributes?.alpha ?? true,
    antialias: webGlContextAttributes?.antialias ?? false,
    premultipliedAlpha: webGlContextAttributes?.premultipliedAlpha ?? true
  });

  if (!gl) throw new Error('WebGL2 not supported');

  const applyDPR = (): void => {
    const w = canvas.clientWidth * currentDpr;
    const h = canvas.clientHeight * currentDpr;
    canvas.width = w;
    canvas.height = h;
  };

  // Initial sizing
  applyDPR();

  return {
    gl,

    applyDPR,

    reinitialize(): void {
      applyDPR();
    },

    resize(width?: number, height?: number, dpr?: number): void {
      if (dpr !== undefined) currentDpr = dpr;
      if (width !== undefined && height !== undefined) {
        canvas.width = Math.round(width * currentDpr);
        canvas.height = Math.round(height * currentDpr);
      } else {
        applyDPR();
      }
    },

    get drawingBufferWidth(): number {
      return gl.drawingBufferWidth;
    },

    get drawingBufferHeight(): number {
      return gl.drawingBufferHeight;
    },

    viewport(): void {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    },

    clear(r = 0, g = 0, b = 0, a = 1): void {
      gl.clearColor(r, g, b, a);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },

    onContextLost(handler: () => void): () => void {
      const listener = (e: Event) => {
        e.preventDefault();
        handler();
      };
      canvas.addEventListener('webglcontextlost', listener);
      return () => {
        canvas.removeEventListener('webglcontextlost', listener);
      };
    },

    onContextRestored(handler: () => void): () => void {
      canvas.addEventListener('webglcontextrestored', handler);
      return () => {
        canvas.removeEventListener('webglcontextrestored', handler);
      };
    }
  };
}
