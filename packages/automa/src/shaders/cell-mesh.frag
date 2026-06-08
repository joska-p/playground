precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 stateColors[8];
uniform vec3 glowColor;
uniform vec2 texelSize;
varying vec2 vUv;

void main() {
  float raw = texture2D(gridTexture, vUv).r;
  int state = int(raw * 255.0 + 0.5);
  vec3 base = stateColors[state];

  float glow = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      if (x == 0 && y == 0) continue;
      vec2 offset = vec2(float(x), float(y)) * texelSize;
      float nRaw = texture2D(gridTexture, vUv + offset).r;
      float nState = nRaw * 255.0;
      glow += (nState > 0.5 && nState < 1.5) ? 1.0 : 0.0;
    }
  }
  glow = glow / 8.0;

  vec3 glowContrib = glow * glowColor * 0.35;

  gl_FragColor = vec4(base + glowContrib, 1.0);
}
