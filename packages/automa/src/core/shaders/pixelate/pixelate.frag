precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform float time;

varying vec2 vUv;

void main() {
  float levels = 10.0 + sin(time * 0.5) * 6.0;
  vec2 uv = floor(vUv * levels) / levels;
  float raw = texture2D(gridTexture, uv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  gl_FragColor = vec4(base, 1.0);
}
