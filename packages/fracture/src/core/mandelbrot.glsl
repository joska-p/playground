#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 c = (vUv - 0.5) * 3.0 - vec2(0.5, 0.0);
  vec2 z = vec2(0.0);
  bool diverged = false;

  for (int i = 0; i < 100; i++) {
    vec2 zSquared = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y);
    z = zSquared + c;

    if (dot(z, z) > 4.0) {
      diverged = true;
      break;
    }
  }

  float isInside = diverged ? 0.0 : 1.0;
  fragColor = vec4(vec3(isInside), 1.0);
}
