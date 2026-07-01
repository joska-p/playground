import { cosinePalette } from '../../shaders/modules/effects/cosinePalette';
import { repeatSpace } from '../../shaders/modules/space/repeatSpace';

const fragmentShader = `
  uniform float u_time;
  varying vec2 vUv;

  // --- INJECTING DETACHED MODULES ---
  ${repeatSpace.code}
  ${cosinePalette.code}

  void main() {
    vec2 uv = vUv - 0.5;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    // Defining the palette magic numbers
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    // Layering loop
    for (float i = 0.0; i < 3.0; i++) {
        // Use our modular space modifier
        uv = repeatSpace(uv, 1.5);

        float d_space = length(uv);
        d_space *= exp(-length(uv0));

        // Compute neon waves
        float wave = sin(d_space * 8.0 + u_time);
        wave = abs(wave);
        wave = 0.02 / wave;

        // Use our modular color palette
        vec3 col = cosinePalette(length(uv0) + i * 0.4 + u_time * 0.4, a, b, c, d);

        finalColor += col * wave;
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
 `;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv; // Three.js injects 'uv' automatically as an attribute
    gl_Position = vec4(position, 1.0); // Map vertex to clip coordinates
  }
`;

const foldedSpace = {
  fragmentShader,
  vertexShader
};

export { foldedSpace };
