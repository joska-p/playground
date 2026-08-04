import { lerp } from './scalar';

/** A 2D point or displacement. Plain object so it survives worker/GPU crossing. */
export type Vec2 = { x: number; y: number };

export const vec = (x: number, y: number): Vec2 => ({ x, y });

/** `a + b` — curried so it composes left-to-right: `addVec(a)(b)`. */
export const addVec = (a: Vec2) => (b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });

/** `a - b`. */
export const subVec = (a: Vec2) => (b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });

/** Scale a vector by `s`. */
export const mulVec = (s: number) => (v: Vec2): Vec2 => ({ x: v.x * s, y: v.y * s });

/** Euclidean length. */
export const lenVec = (v: Vec2): number => Math.hypot(v.x, v.y);

/** Distance between two points. */
export const distVec = (a: Vec2) => (b: Vec2): number => Math.hypot(a.x - b.x, a.y - b.y);

/** Unit vector; returns the zero vector for a zero-length input. */
export const normVec = (v: Vec2): Vec2 => {
  const length = lenVec(v);
  return length === 0 ? { x: 0, y: 0 } : mulVec(1 / length)(v);
};

/** Dot product. */
export const dotVec = (a: Vec2) => (b: Vec2): number => a.x * b.x + a.y * b.y;

/** Component-wise linear interpolation. */
export const lerpVec = (a: Vec2) => (b: Vec2) => (t: number): Vec2 => ({
  x: lerp(a.x)(b.x)(t),
  y: lerp(a.y)(b.y)(t),
});
