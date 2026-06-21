precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec2 texelSize;

varying vec2 vUv;

vec3 getColor(vec2 uv) {
  float raw = texture2D(gridTexture, uv).r;
  int state = int(raw * 255.0 + 0.5);
  return stateColors[state];
}

void main() {
  vec2 off = texelSize * 2.0;

  vec3 color = vec3(0.0);
  color += getColor(vUv + vec2(-off.x, -off.y)) * 0.0625;
  color += getColor(vUv + vec2(0.0, -off.y)) * 0.125;
  color += getColor(vUv + vec2(off.x, -off.y)) * 0.0625;
  color += getColor(vUv + vec2(-off.x, 0.0)) * 0.125;
  color += getColor(vUv) * 0.25;
  color += getColor(vUv + vec2(off.x, 0.0)) * 0.125;
  color += getColor(vUv + vec2(-off.x, off.y)) * 0.0625;
  color += getColor(vUv + vec2(0.0, off.y)) * 0.125;
  color += getColor(vUv + vec2(off.x, off.y)) * 0.0625;

  gl_FragColor = vec4(color, 1.0);
}
