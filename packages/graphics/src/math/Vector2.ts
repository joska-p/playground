export type Vector2Like = {
  x: number;
  y: number;
};

export class Vector2 implements Vector2Like {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static from(v: Vector2Like): Vector2 {
    return new Vector2(v.x, v.y);
  }

  set(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  copy(v: Vector2Like): this {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(v: Vector2Like): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2Like): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(s: number): this {
    this.x *= s;
    this.y *= s;
    return this;
  }

  length(): number {
    return Math.hypot(this.x, this.y);
  }

  normalize(): this {
    const len = this.length();
    if (len > 0) {
      this.x /= len;
      this.y /= len;
    }
    return this;
  }

  dot(v: Vector2Like): number {
    return this.x * v.x + this.y * v.y;
  }

  lerp(v: Vector2Like, t: number): this {
    this.x += (v.x - this.x) * t;
    this.y += (v.y - this.y) * t;
    return this;
  }

  toArray(): [number, number] {
    return [this.x, this.y];
  }
}
