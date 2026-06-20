precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;

varying vec2 vUv;

float getState(vec2 uv) {
  float raw = texture2D(gridTexture, uv).r;
  return raw * 255.0;
}

void main() {
  float raw = texture2D(gridTexture, vUv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  vec2 off = texelSize;

  float tl = getState(vUv + vec2(-off.x, -off.y));
  float t  = getState(vUv + vec2(0.0, -off.y));
  float tr = getState(vUv + vec2(off.x, -off.y));
  float l  = getState(vUv + vec2(-off.x, 0.0));
  float r  = getState(vUv + vec2(off.x, 0.0));
  float bl = getState(vUv + vec2(-off.x, off.y));
  float b  = getState(vUv + vec2(0.0, off.y));
  float br = getState(vUv + vec2(off.x, off.y));

  float gx = -tl - 2.0 * l - bl + tr + 2.0 * r + br;
  float gy = -tl - 2.0 * t - tr + bl + 2.0 * b + br;

  float edge = sqrt(gx * gx + gy * gy);
  edge = clamp(edge, 0.0, 1.0);

  vec3 edgeColor = vec3(0.0, 1.0, 0.0);
  vec3 color = mix(base, edgeColor, edge * 0.8);

  gl_FragColor = vec4(color, 1.0);
}
