import type { Camera, Mat2D, Rect, Vec2 } from '@repo/pixelate2d-math';
import type { InputStore } from '../engine/input';

export type { Camera, Mat2D, Rect, Vec2 };

/** Any CSS color string understood by the browser. */
export type Color = string;

/** Shared by `drawRectangle`, `drawCircle`, and `drawPath`. */
export type DrawStyle = {
  fill?: Color;
  stroke?: Color;
  lineWidth?: number;
};

/** Text-specific style on top of the shared shape style. */
export type TextStyle = {
  fill?: Color;
  stroke?: Color;
  lineWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
  baseline?: 'alphabetic' | 'top' | 'middle' | 'bottom';
};

/** Controls whether a path is filled, stroked, and/or closed. */
export type PathOptions = {
  closed?: boolean;
  fill?: boolean;
  stroke?: boolean;
};

/** Where the engine measures size from: the canvas CSS box or the window. */
export type ResizeStrategy = 'canvas' | 'window';

/**
 * Backend-agnostic drawing surface. `clear` plus four primitives is the whole
 * contract — CPU and GPU implementations both satisfy it, so a render pipeline
 * written against this interface runs unchanged on either driver.
 */
export type RenderDriver = {
  readonly kind: 'cpu' | 'gpu';
  readonly canvas: HTMLCanvasElement;
  /** World → screen viewport applied to every draw call. */
  camera: Camera;
  clear(color: Color): void;
  drawRectangle(style: DrawStyle, rect: Rect, transform?: Mat2D): void;
  drawCircle(style: DrawStyle, center: Vec2, radius: number, transform?: Mat2D): void;
  drawText(style: TextStyle, text: string, position: Vec2, transform?: Mat2D): void;
  drawPath(style: DrawStyle, points: readonly Vec2[], options?: PathOptions, transform?: Mat2D): void;
  destroy(): void;
};

/** Per-frame data handed to render callbacks. */
export type FrameContext = {
  readonly driver: RenderDriver;
  /** Seconds since the previous frame (clamped to 100 ms). */
  readonly deltaTime: number;
  /** Seconds since the engine started. */
  readonly time: number;
  readonly frameCount: number;
  /** Smoothed frames-per-second estimate. */
  readonly fps: number;
  readonly input: InputStore;
  readonly camera: Camera;
  /** Canvas CSS width in pixels. */
  readonly width: number;
  /** Canvas CSS height in pixels. */
  readonly height: number;
  readonly dpr: number;
};

/** The shape of every render callback: `(driver, context) => void`. */
export type FrameCallback = (driver: RenderDriver, context: FrameContext) => void;
