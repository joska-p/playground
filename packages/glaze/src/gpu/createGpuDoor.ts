import { createFrameLoop, type FrameCallback } from '../core/createFrameLoop';
import { defaultCamera, type Camera, type Point2D } from '../core/coords/camera';
import { createInputStore, type InputStore } from '../cpu/input';
import type { DrawStyle, Rect, TextStyle } from '../cpu/shapes/types';
import { createProgram as createShaderProgram, type Program } from './shader/createProgram';
import type { UniformValue } from './shader/compileProgram';
import { createStandardUniformValues } from './shader/setUniforms';
import { circleFragmentSource, circleUniforms } from './shapes/circle';
import { lineFragmentSource, lineUniforms } from './shapes/line';
import { rectFragmentSource, rectUniforms } from './shapes/rect';
import { createTextRasterizer, DEFAULT_FONT_FAMILY, textFragmentSource, textUniforms, type TextRasterizer } from './shapes/text';

export type GpuDoorConfig = {
  canvas: HTMLCanvasElement;
  camera?: Camera;
  dpr?: number;
};

export type GpuFrameContext = {
  readonly time: number;
  readonly deltaTime: number;
  readonly frameCount: number;
  readonly camera: Camera;
  readonly input: InputStore;
  readonly width: number;
  readonly height: number;
  readonly dpr: number;
};

export type GpuDraw = (context: GpuFrameContext) => void;

export type GpuDoor = {
  readonly canvas: HTMLCanvasElement;
  readonly gl: WebGL2RenderingContext;
  readonly camera: Camera;
  readonly input: InputStore;
  readonly isRunning: boolean;
  createProgram(fragmentSource: string, vertexSource?: string): Program;
  renderProgram(program: Program): void;
  drawCircle(center: Point2D, radius: number, style: DrawStyle): void;
  drawRect(rect: Rect, style: DrawStyle): void;
  drawLine(a: Point2D, b: Point2D, style: DrawStyle): void;
  drawText(text: string, position: Point2D, style: TextStyle): void;
  clear(r?: number, g?: number, b?: number, a?: number): void;
  setDraw(draw: GpuDraw | null): void;
  subscribe(draw: GpuDraw): () => void;
  destroy(): void;
};

export function createGpuDoor(config: GpuDoorConfig): GpuDoor {
  const canvas = config.canvas;
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) throw new Error('Glaze: WebGL2 not supported');
  const camera: Camera = config.camera ?? defaultCamera();
  const dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
  const input = createInputStore();
  const loop = createFrameLoop();
  const programs = new Set<Program>();
  const subscribers = new Set<GpuDraw>();
  const shapePrograms = new Map<string, Program>();
  let draw: GpuDraw | null = null;
  let textRasterizer: TextRasterizer | null = null;
  let frameCount = 0;
  let currentTime = 0;
  let cssWidth = 0;
  let cssHeight = 0;
  let lost = false;
  let rendererAttached = false;
  let unsubscribeRenderer: (() => void) | null = null;

  const resize = (): void => {
    cssWidth = Math.max(1, canvas.clientWidth);
    cssHeight = Math.max(1, canvas.clientHeight);
    const deviceWidth = Math.round(cssWidth * dpr);
    const deviceHeight = Math.round(cssHeight * dpr);
    if (canvas.width !== deviceWidth) canvas.width = deviceWidth;
    if (canvas.height !== deviceHeight) canvas.height = deviceHeight;
    gl.viewport(0, 0, deviceWidth, deviceHeight);
  };

  const configureState = (): void => {
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  };

  const clear = (r = 0, g = 0, b = 0, a = 1): void => {
    if (lost) return;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  const renderProgram = (program: Program): void => {
    if (lost) return;
    program.setUniforms(createStandardUniformValues(cssWidth, cssHeight, dpr, input.pointer, camera, currentTime));
    program.render();
  };

  const getShapeProgram = (key: string, fragmentSource: string): Program => {
    const cached = shapePrograms.get(key);
    if (cached) return cached;
    const program = createShaderProgram(gl, fragmentSource);
    programs.add(program);
    shapePrograms.set(key, program);
    return program;
  };

  const renderShape = (program: Program, uniforms: Record<string, UniformValue>): void => {
    if (lost) return;
    program.setUniforms(uniforms);
    renderProgram(program);
  };

  const onContextLost = (event: Event): void => {
    event.preventDefault();
    lost = true;
  };

  const onContextRestored = (): void => {
    lost = false;
    configureState();
    resize();
    textRasterizer?.clear();
    for (const program of programs) program.reinitialize();
  };

  const onFrame: FrameCallback = (time, deltaTime): void => {
    resize();
    frameCount++;
    currentTime = time;
    const frameContext: GpuFrameContext = {
      time,
      deltaTime,
      frameCount,
      camera,
      input,
      width: cssWidth,
      height: cssHeight,
      dpr
    };
    const current = draw;
    if (current) current(frameContext);
    for (const subscriber of subscribers) subscriber(frameContext);
    input.endFrame();
  };

  const startRendering = (): void => {
    if (rendererAttached) return;
    input.attach(canvas);
    unsubscribeRenderer = loop.subscribe(onFrame);
    rendererAttached = true;
  };

  const stopRendering = (): void => {
    if (!rendererAttached) return;
    unsubscribeRenderer?.();
    unsubscribeRenderer = null;
    input.detach();
    rendererAttached = false;
  };

  configureState();
  resize();
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);

  return {
    canvas,
    gl,
    camera,
    input,

    get isRunning(): boolean {
      return loop.isRunning;
    },

    createProgram(fragmentSource: string, vertexSource?: string): Program {
      const program = createShaderProgram(gl, fragmentSource, vertexSource);
      programs.add(program);
      return program;
    },

    renderProgram,

    drawCircle(center: Point2D, radius: number, style: DrawStyle): void {
      renderShape(getShapeProgram('circle', circleFragmentSource), circleUniforms(center, radius, style));
    },

    drawRect(rect: Rect, style: DrawStyle): void {
      renderShape(getShapeProgram('rect', rectFragmentSource), rectUniforms(rect, style));
    },

    drawLine(a: Point2D, b: Point2D, style: DrawStyle): void {
      if (a.x === b.x && a.y === b.y) return;
      renderShape(getShapeProgram('line', lineFragmentSource), lineUniforms(a, b, style));
    },

    drawText(text: string, position: Point2D, style: TextStyle): void {
      if (lost || text.length === 0) return;
      const rasterizer = textRasterizer ??= createTextRasterizer(gl);
      const size = style.fontSize ?? 16;
      const font = `${String(size)}px ${style.fontFamily ?? DEFAULT_FONT_FAMILY}`;
      const { texture, width, height } = rasterizer.get(text, font, size);
      renderShape(getShapeProgram('text', textFragmentSource), textUniforms(position, width, height, size, texture, style));
    },

    clear,

    setDraw(fn: GpuDraw | null): void {
      draw = fn;
      if (fn && subscribers.size === 0) startRendering();
      else if (!fn && subscribers.size === 0) stopRendering();
    },

    subscribe(fn: GpuDraw): () => void {
      subscribers.add(fn);
      startRendering();
      return () => {
        subscribers.delete(fn);
        if (subscribers.size === 0 && draw === null) stopRendering();
      };
    },

    destroy(): void {
      stopRendering();
      loop.dispose();
      input.destroy();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      for (const program of programs) program.destroy();
      programs.clear();
      shapePrograms.clear();
      textRasterizer?.destroy();
      textRasterizer = null;
      subscribers.clear();
      draw = null;
    }
  };
}
