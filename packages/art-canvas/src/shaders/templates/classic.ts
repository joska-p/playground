import type { ShaderTemplate } from '../../types';

const ClassicTemplate: ShaderTemplate = {
  name: 'classic',
  weight: 1.0,
  generate: ({ complexity, spaceBlock, shapeBlock, palette, uniqueInjectedCode }) => `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec2 vUv;
    ${uniqueInjectedCode}

    void main() {
      vec2 uv = (vUv - 0.5) * 2.0;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);
      float totalWeight = 0.0;

      vec3 a = ${palette.a}; vec3 b = ${palette.b}; vec3 c = ${palette.c}; vec3 d = ${palette.d};

      for (float i = 0.0; i < ${complexity + 1}.0; i += 1.0) {
        uv = uv0;
        ${spaceBlock}
        ${shapeBlock}

        float interest = 1.0 - smoothstep(0.0, 0.5, abs(dist));
        float t = abs(sin(dist * 8.0 - u_time * 1.5)) + i * 0.2 + u_time * 0.04;

        vec3 col = a + b * cos(6.28318 * (c * t + d));
        finalColor += col * interest;
        totalWeight += interest;
      }

      if (totalWeight > 0.0) finalColor /= totalWeight;

      vec3 bg = vec3(0.02, 0.01, 0.04);
      vec3 color = mix(bg, finalColor, smoothstep(0.0, 0.3, length(finalColor)));
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

export { ClassicTemplate };
