import { createShaderUniformBuilder, type Point2D } from '../math/transforms';
import { createQuadPipeline } from './createQuadPipeline';
import { createWebGLContext } from './createWebGLContext';
import type { WebGLContextAttributes } from './createWebGLContext';

export type CreateShaderRunnerProps = {
  fragmentShader: string;
  canvas: HTMLCanvasElement;
  dpr?: number | undefined;
  webGLContextAttributes?: WebGLContextAttributes | undefined;
};

export type ShaderRunner = ReturnType<typeof createShaderRunner>;

export function createShaderRunner({
  fragmentShader,
  canvas,
  dpr = window.devicePixelRatio,
  webGLContextAttributes: webGlContextAttributes
}: CreateShaderRunnerProps) {
  const ctx = createWebGLContext({ canvas, dpr, webGlContextAttributes });
  const { clientWidth, clientHeight } = canvas;
  const builder = createShaderUniformBuilder(clientWidth, clientHeight, dpr);

  const pipeline = createQuadPipeline(ctx.gl, builder);
  pipeline.compileFragmentShader(fragmentShader);

  let mousePx: Point2D = { x: 0, y: 0 };

  return {
    ctx,
    pipeline,

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
      pipeline.dispose();
    }
  };
}
