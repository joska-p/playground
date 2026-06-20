precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;
uniform float time;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  float raw = texture2D(gridTexture, vUv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  float t = sin(time * 0.4) * 0.5 + 0.5;
  float noise = hash(floor(vUv * 40.0 + time * 0.1));
  float dissolve = smoothstep(t - 0.1, t + 0.1, noise);

  vec3 edgeColor = vec3(1.0, 0.4, 0.0);
  vec3 color = mix(edgeColor, base, dissolve);

  gl_FragColor = vec4(color, 1.0);
}
