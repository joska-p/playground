const COLOR_NEGATIVE: [number, number, number] = [55, 48, 163];
const COLOR_ZERO: [number, number, number] = [11, 13, 16];
const COLOR_POSITIVE: [number, number, number] = [240, 169, 58];

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function valueToRGB(value: number): [number, number, number] {
    const t = Math.max(-1, Math.min(1, value));
    if (t < 0) {
        const p = t + 1;
        return [
            lerp(COLOR_NEGATIVE[0], COLOR_ZERO[0], p),
            lerp(COLOR_NEGATIVE[1], COLOR_ZERO[1], p),
            lerp(COLOR_NEGATIVE[2], COLOR_ZERO[2], p)
        ];
    }
    const p = t;
    return [
        lerp(COLOR_ZERO[0], COLOR_POSITIVE[0], p),
        lerp(COLOR_ZERO[1], COLOR_POSITIVE[1], p),
        lerp(COLOR_ZERO[2], COLOR_POSITIVE[2], p)
    ];
}

function toGLSLVec3([r, g, b]: [number, number, number]): string {
    return `vec3(${(r / 255).toFixed(4)}, ${(g / 255).toFixed(4)}, ${(b / 255).toFixed(4)})`;
}

/**
 * Same mapping as valueToRGB, generated into GLSL so the GPU preview matches the CPU one.
 * The mix() calls duplicate the lerp() calls above — keep both in sync.
 */
export function colormapGLSL(): string {
    return `
vec3 valueToColor(float value) {
  float t = clamp(value, -1.0, 1.0);
  vec3 negative = ${toGLSLVec3(COLOR_NEGATIVE)};
  vec3 zero = ${toGLSLVec3(COLOR_ZERO)};
  vec3 positive = ${toGLSLVec3(COLOR_POSITIVE)};
  if (t < 0.0) {
    return mix(negative, zero, t + 1.0);
  }
  return mix(zero, positive, t);
}`;
}
