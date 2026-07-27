#version 300 es
precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;

in vec2 vUv;
out vec4 fragColor;

void main() {
  float raw = texture(gridTexture, vUv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  fragColor = vec4(base, 1.0);
}
