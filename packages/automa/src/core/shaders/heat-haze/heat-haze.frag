precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform float time;

varying vec2 vUv;

void main() {
  vec2 offset = vec2(
    sin(vUv.y * 60.0 + time * 2.0) * 0.005,
    cos(vUv.x * 60.0 + time * 1.7) * 0.005
  );
  vec2 uv = vUv + offset;

  float raw = texture2D(gridTexture, uv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  gl_FragColor = vec4(base, 1.0);
}
