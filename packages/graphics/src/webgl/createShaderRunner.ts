import { createShaderUniformBuilder, type Point2D } from '../math/transforms';
import { createQuadPipeline } from './createQuadPipeline';
import { createWebGLContext } from './createWebGLContext';

export type ShaderRunnerConfig = {
  canvas: HTMLCanvasElement;
  fragmentShader: string;
  dpr?: number | undefined;
};

export type ShaderRunner = ReturnType<typeof createShaderRunner>;

export function createShaderRunner({
  canvas,
  fragmentShader,
  dpr = window.devicePixelRatio
}: ShaderRunnerConfig) {
  const ctx = createWebGLContext({ canvas, dpr });
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
