import type { ShaderModule } from '../types';

export const surfaceLighting: ShaderModule = {
  name: 'surfaceLighting',
  category: 'effects',
  code: `
    // Estimates the 3D surface normal vector from a 2D field using central differences
    vec3 calculateNormal(vec2 uv, float dist, float scale) {
        vec2 eps = vec2(0.01, 0.0);
        // Sample surrounding distances to see which way the field slopes
        float dx = dist - length(uv + eps.xy);
        float dy = dist - length(uv + eps.yx);
        return normalize(vec3(dx, dy, 0.05)); // 0.05 controls the "height" or bumpiness
    }
  `,
  getCall: ({ uv }) => `vec3 normal = calculateNormal(${uv}, dist, 1.0);`
};
