#version 300 es
precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform vec2 uniformResolution;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = vUv;

  float gridAspect = texelSize.y / texelSize.x;
  float canvasAspect = uniformResolution.x / uniformResolution.y;

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

  float raw = texture(gridTexture, uv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  fragColor = vec4(base, 1.0);
}
