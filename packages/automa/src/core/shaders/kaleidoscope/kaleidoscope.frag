precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform float time;

varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float angle = atan(uv.y, uv.x);
  float radius = length(uv);

  float segments = 8.0;
  angle = mod(angle, 6.28318 / segments);
  angle = abs(angle - 3.14159 / segments);

  vec2 mirrored = radius * vec2(cos(angle), sin(angle)) + 0.5;

  float raw = texture2D(gridTexture, mirrored).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  gl_FragColor = vec4(base, 1.0);
}
