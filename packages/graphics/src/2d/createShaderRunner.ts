import { createShaderUniformBuilder, type Point2D } from './transforms';
import { createQuadPipeline, type QuadPipeline } from './createQuadPipeline';
import { applyStandardUniforms } from '../core/standardUniforms';
import {
  createWebGLContext,
  type WebGLContext,
  type WebGLContextAttributes
} from '../core/createWebGLContext';

export type CreateShaderRunnerProps = {
  fragmentShader: string;
  canvas: HTMLCanvasElement;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export type ShaderRunner = {
  ctx: WebGLContext;
  pipeline: QuadPipeline;
  readonly context: WebGL2RenderingContext;
  readonly canvas: HTMLCanvasElement;
  resize(width: number, height: number): void;
  setMouse(pixel: Point2D): void;
  render(): void;
  dispose(): void;
};

export function createShaderRunner({
  fragmentShader,
  canvas,
  webGLContextAttributes
}: CreateShaderRunnerProps): ShaderRunner {
  const ctx = createWebGLContext({ canvas, webGLContextAttributes });
  const { clientWidth, clientHeight } = canvas;
  let builder = createShaderUniformBuilder(clientWidth, clientHeight);

  const pipeline = createQuadPipeline(ctx.gl);
  pipeline.compileFragmentShader(fragmentShader);

  const offContextLost = ctx.onContextLost(() => {
    // preventDefault is handled by createWebGLContext; nothing else to do on loss
  });
  const offContextRestored = ctx.onContextRestored(() => {
    ctx.reinitialize();
    pipeline.reinitialize();
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

    resize(width: number, height: number): void {
      ctx.resize(width, height);
      builder = createShaderUniformBuilder(width, height);
    },

    setMouse(pixel: Point2D): void {
      mousePx = pixel;
    },

    render(): void {
      applyStandardUniforms(pipeline, builder(mousePx));
      pipeline.render();
    },

    dispose(): void {
      offContextLost();
      offContextRestored();
      pipeline.dispose();
    }
  };
}
