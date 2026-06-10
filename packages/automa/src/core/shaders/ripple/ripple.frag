precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform float time;
uniform vec2 mouse;

varying vec2 vUv;

void main() {
  float raw = texture2D(gridTexture, vUv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  float dist = distance(vUv, mouse);
  float ripple = sin(dist * 40.0 - time * 3.0) * 0.5 + 0.5;
  float falloff = 1.0 - smoothstep(0.0, 0.6, dist);
  float intensity = ripple * falloff * 0.4;

  gl_FragColor = vec4(base + intensity * vec3(1.0, 0.8, 0.6), 1.0);
}
