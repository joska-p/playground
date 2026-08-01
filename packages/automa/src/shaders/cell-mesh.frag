#version 300 es
precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform vec2 u_resolution;
uniform vec2 u_panOffset;
uniform float u_zoom;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = vUv;

  uv = (uv - 0.5) / u_zoom + 0.5;
  uv -= u_panOffset;

  float gridAspect = texelSize.y / texelSize.x;
  float canvasAspect = u_resolution.x / u_resolution.y;

  vec2 gridSizeInUv = vec2(
    min(1.0, gridAspect / canvasAspect),
    min(1.0, canvasAspect / gridAspect)
  );
  vec2 gridOffsetInUv = (1.0 - gridSizeInUv) / 2.0;

  uv = (uv - gridOffsetInUv) / gridSizeInUv;

  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Sample both state (Red) and heat/age (Green)
  vec4 texel = texture(gridTexture, uv);
  float raw = texel.r;
  float age = texel.g;

  int state = int(raw * 255.0 + 0.5);

  // Base color from your stateColors array (state 0 = dead background)
  vec3 base = stateColors[state];

  // If the cell is dead (state 0), render the trail color using the Green channel!
  if (state == 0 && age > 0.0) {
    vec3 trailColor = vec3(0.0, 0.5, 0.8); // Custom fading glow color
    base = mix(base, trailColor, age * 0.6); // Blend gently with background
  }

  fragColor = vec4(base, 1.0);
}
