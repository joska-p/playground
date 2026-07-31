import { createShaderUniformBuilder, type Point2D } from '../math/transforms';
import { createQuadPipeline, type QuadPipeline } from './createQuadPipeline';
import {
  createWebGLContext,
  type WebGLContext,
  type WebGLContextAttributes
} from './createWebGLContext';

export type CreateShaderRunnerProps = {
  fragmentShader: string;
  canvas: HTMLCanvasElement;
  dpr?: number | undefined;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export type ShaderRunner = {
  ctx: WebGLContext;
  pipeline: QuadPipeline;
  readonly context: WebGL2RenderingContext;
  readonly canvas: HTMLCanvasElement;
  resize(width: number, height: number, newDpr?: number): void;
  setMouse(pixel: Point2D): void;
  render(): void;
  dispose(): void;
};

export function createShaderRunner({
  fragmentShader,
  canvas,
  dpr = Math.min(window.devicePixelRatio, 2),
  webGLContextAttributes: webGlContextAttributes
}: CreateShaderRunnerProps): ShaderRunner {
  const ctx = createWebGLContext({ canvas, dpr, webGlContextAttributes });
  const { clientWidth, clientHeight } = canvas;
  const builder = createShaderUniformBuilder(clientWidth, clientHeight, dpr);

  const pipeline = createQuadPipeline(ctx.gl, builder);
  pipeline.compileFragmentShader(fragmentShader);

  const currentSource = fragmentShader;

  const offContextLost = ctx.onContextLost(() => {
    // preventDefault is handled by createWebGLContext; nothing else to do on loss
  });
  const offContextRestored = ctx.onContextRestored(() => {
    ctx.reinitialize();
    pipeline.reinitialize(currentSource);
  });

  let mousePx: Point2D = { x: 0, y: 0 };

  return {
    ctx,
    pipeline,

    get context(): WebGL2RenderingContext {
      return ctx.gl;
    },

    get canvas(): HTMLCanvasElement {
      return canvas;
    },

    resize(width: number, height: number, newDpr = window.devicePixelRatio): void {
      ctx.resize(width, height, newDpr);
      pipeline.updateUniformBuilder(createShaderUniformBuilder(width, height, newDpr));
    },

    setMouse(pixel: Point2D): void {
      mousePx = pixel;
    },

    render(): void {
      pipeline.render(mousePx);
    },

    dispose(): void {
      offContextLost();
      offContextRestored();
      pipeline.dispose();
    }
  };
}
