#version 300 es
precision highp float;

uniform vec2 u_panOffset;
uniform float u_zoom;
in vec2 vUv;
out vec4 fragColor;

void main() {
  int maxIterations = 100;
  int iterationCount = 0;
  vec2 uv = (vUv - 0.5) / u_zoom + 0.5 + u_panOffset;
  vec2 c = (uv - 0.5) * 3.0 - vec2(0.5, 0.0);
  vec2 z = vec2(0.0);
  bool diverged = false;
  float colorValue = 0.0;

  for (int i = 0; i < maxIterations; i++) {
    vec2 zSquared = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y);
    z = zSquared + c;

    if (dot(z, z) > 4.0) {
      diverged = true;
      iterationCount = i;
      break;
    };
  };

  if ( diverged) {
    float log_zn = log(dot(z,z))/2.0;
    float nu = log(log_zn/log(2.0))/log(2.0);
    float smooth_i = float(iterationCount) + 1.0 - nu;

    colorValue = log(smooth_i)/log(float(maxIterations));
  }

  fragColor = vec4(colorValue,colorValue,colorValue, 1.0);
}
