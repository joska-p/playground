import type { ShaderTemplate } from '../../types';

const DirectNoiseTemplate: ShaderTemplate = {
  name: 'direct-noise',
  weight: 0.6,
  generate: ({ spaceBlock, uniqueInjectedCode, palette }) => `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec2 vUv;
    ${uniqueInjectedCode}

    void main() {
      vec2 uv = (vUv - 0.5) * 2.0;

      // Run space transforms to warp the coordinates
      ${spaceBlock}

      // Use noise directly instead of an SDF shape
      float n = noise2d(uv * 2.0 + vec2(u_time * 0.2));

      // Color path: Map noise directly to palette
      vec3 col = ${palette.a} + ${palette.b} * cos(6.28318 * (${palette.c} * (n + u_time * 0.1) + ${palette.d}));

      gl_FragColor = vec4(col, 1.0);
    }
  `
};

export { DirectNoiseTemplate };
