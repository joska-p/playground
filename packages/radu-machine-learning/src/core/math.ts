function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function invLerp(a: number, b: number, v: number) {
  return (v - a) / (b - a);
}

function remap(oldA: number, oldB: number, newA: number, newB: number, v: number) {
  return lerp(newA, newB, invLerp(oldA, oldB, v));
}

export { invLerp, lerp, remap };
