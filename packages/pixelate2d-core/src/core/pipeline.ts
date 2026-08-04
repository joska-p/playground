import { type Size, type Vec2, identity2d } from '@repo/pixelate2d-math';
import type { Camera, Color, FrameCallback, FrameContext, RenderDriver } from './types';

/**
 * Curried drawing primitives. Every signature reads left-to-right as
 * **Style → Geometry → Target → Driver**, and each prefix can be partially
 * applied once and reused across frames.
 */

/** `drawCircle(color)(radius)(position)(driver)` */
export const drawCircle =
  (color: Color) =>
  (radius: number) =>
  (position: Vec2) =>
  (driver: RenderDriver): void => {
    driver.drawCircle({ fill: color }, position, radius, identity2d());
  };

/** `drawRect(color)({ w, h })(position)(driver)` */
export const drawRect =
  (color: Color) =>
  (dimensions: Size) =>
  (position: Vec2) =>
  (driver: RenderDriver): void => {
    driver.drawRectangle({ fill: color }, { x: position.x, y: position.y, w: dimensions.w, h: dimensions.h }, identity2d());
  };

/** `drawLine(color)(width)(from)(to)(driver)` */
export const drawLine =
  (color: Color) =>
  (width: number) =>
  (from: Vec2) =>
  (to: Vec2) =>
  (driver: RenderDriver): void => {
    driver.drawPath({ stroke: color, lineWidth: width }, [from, to], { closed: false, fill: false, stroke: true }, identity2d());
  };

/** `drawText(text)(color)(size)(position)(driver)` */
export const drawText =
  (text: string) =>
  (color: Color) =>
  (size: number) =>
  (position: Vec2) =>
  (driver: RenderDriver): void => {
    driver.drawText({ fill: color, fontSize: size }, text, position, identity2d());
  };

/** `fillPath(color)(points)(driver)` — closed, filled polygon. */
export const fillPath =
  (color: Color) =>
  (points: readonly Vec2[]) =>
  (driver: RenderDriver): void => {
    driver.drawPath({ fill: color }, points, { closed: true, fill: true, stroke: false }, identity2d());
  };

/** `strokePath(color)(width)(points)(driver)` — open polyline. */
export const strokePath =
  (color: Color) =>
  (width: number) =>
  (points: readonly Vec2[]) =>
  (driver: RenderDriver): void => {
    driver.drawPath({ stroke: color, lineWidth: width }, points, { closed: false, fill: false, stroke: true }, identity2d());
  };

/**
 * Run a render callback under a temporary camera, restoring the driver's
 * previous viewport afterwards: `withCamera(camera)(draw)(driver, context)`.
 */
export const withCamera =
  (camera: Camera) =>
  (draw: FrameCallback) =>
  (driver: RenderDriver, context: FrameContext): void => {
    const previous = driver.camera;
    driver.camera = camera;
    try {
      draw(driver, context);
    } finally {
      driver.camera = previous;
    }
  };
