#version 300 es
precision highp float;

in vec2 vUv;
out float fragColor;

uniform sampler2D u_state;
uniform vec2 u_gridSize;

// Conway's Game of Life (B3/S23)
// Birth: exactly 3 live neighbors
// Survive: 2 or 3 live neighbors

void main() {
  vec2 texel = 1.0 / u_gridSize;

  ivec2 grid = ivec2(floor(vUv * u_gridSize));
  int alive = 0;

  // Count Moore neighbors (toroidal wrap)
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      if (dx == 0 && dy == 0) continue;
      vec2 uv = vUv + vec2(float(dx), float(dy)) * texel;
      uv = fract(uv); // toroidal wrap
      float cell = texture(u_state, uv).r;
      if (cell > 0.5) alive++;
    }
  }

  float current = texture(u_state, vUv).r;

  if (current > 0.5) {
    // Alive — survive with 2 or 3 neighbors, else die
    fragColor = (alive == 2 || alive == 3) ? 1.0 : 0.0;
  } else {
    // Dead — birth with exactly 3 neighbors
    fragColor = (alive == 3) ? 1.0 : 0.0;
  }
}
