import { createShaderUniformBuilder, type Point2D } from '../math/transforms';
import { QuadPipeline } from './QuadPipeline';
import { WebGLContext } from './WebGLContext';

export class ShaderRunner {
  readonly ctx: WebGLContext;
  readonly pipeline: QuadPipeline;
  private rafId = 0;
  private mousePx: Point2D = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement, fragmentShader: string, dpr = window.devicePixelRatio) {
    this.ctx = new WebGLContext({ canvas, dpr });
    const { clientWidth, clientHeight } = canvas;
    const builder = createShaderUniformBuilder(clientWidth, clientHeight, dpr);

    this.pipeline = new QuadPipeline(this.ctx.gl, builder);
    this.pipeline.compileFragmentShader(fragmentShader);
  }

  resize(width: number, height: number, dpr = window.devicePixelRatio): void {
    this.ctx.resize(width, height, dpr);
    this.pipeline.updateUniformBuilder(createShaderUniformBuilder(width, height, dpr));
  }

  setMouse(pixel: Point2D): void {
    this.mousePx = pixel;
  }

  start(onFrame?: (time: number) => void): void {
    const loop = () => {
      const time = performance.now() / 1000;
      onFrame?.(time);
      this.pipeline.render(this.mousePx);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop(): void {
    cancelAnimationFrame(this.rafId);
  }

  dispose(): void {
    this.stop();
    this.pipeline.dispose();
  }
}
