#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D u_state;
uniform vec2 u_mouse;
uniform float u_brushSize;
uniform float u_value;
uniform vec2 u_resolution;

void main() {
  vec4 current = texture(u_state, vUv);
  vec2 diff = (vUv - u_mouse) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float dist = length(diff);

  if (dist < u_brushSize) {
    float normalized = u_value / 255.0;
    fragColor = vec4(normalized, normalized, normalized, 1.0);
  } else {
    fragColor = current;
  }
}
