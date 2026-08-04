import { clamp } from './scalar';
import { distVec, type Vec2 } from './vec2';

/** Dimensions without an origin. */
export type Size = { w: number; h: number };

/** Axis-aligned rectangle. */
export type Rect = { x: number; y: number; w: number; h: number };

/** Circle described by center + radius. */
export type Circle = { center: Vec2; radius: number };

/** Point-in-rectangle test (inclusive). */
export const pointInRect = (p: Vec2) => (rect: Rect): boolean =>
  p.x >= rect.x && p.x <= rect.x + rect.w && p.y >= rect.y && p.y <= rect.y + rect.h;

/** Point-in-circle test (inclusive). */
export const pointInCircle = (p: Vec2) => (circle: Circle): boolean => distVec(p)(circle.center) <= circle.radius;

/** Axis-aligned overlap test. */
export const rectsOverlap = (a: Rect) => (b: Rect): boolean =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

export { clamp };
