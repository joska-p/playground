#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform highp sampler2D u_state;
uniform vec2 u_gridSize;
uniform int u_birth[9];
uniform int u_survive[9];
uniform int u_stateCount;

int cellAt(ivec2 coord) {
  ivec2 p = coord;
  p.x = (p.x + int(u_gridSize.x)) % int(u_gridSize.x);
  p.y = (p.y + int(u_gridSize.y)) % int(u_gridSize.y);
  return int(texelFetch(u_state, p, 0).r * 255.0 + 0.5);
}

void main() {
  ivec2 coord = ivec2(gl_FragCoord.xy);
  int current = cellAt(coord);

  int neighbors = 0;
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      if (dx == 0 && dy == 0) continue;
      if (cellAt(coord + ivec2(dx, dy)) > 0) neighbors++;
    }
  }

  float nextState = 0.0;
  if (current == 1) {
    nextState = u_survive[neighbors] != 0 ? 1.0 / 255.0 : u_stateCount > 2 ? 2.0 / 255.0 : 0.0;
  } else if (current > 1) {
    int maxState = u_stateCount - 1;
    nextState = float(current == maxState ? 0 : current + 1) / 255.0;
  } else {
    nextState = u_birth[neighbors] != 0 ? 1.0 / 255.0 : 0.0;
  }

  fragColor = vec4(nextState, nextState, nextState, 1.0);
}
