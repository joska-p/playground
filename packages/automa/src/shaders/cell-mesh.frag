precision mediump float;

uniform sampler2D gridTexture;
uniform vec3 aliveColor;
uniform vec3 glowColor;
uniform vec3 deadColor;
uniform vec2 texelSize;
varying vec2 vUv;

void main() {
  float center = texture2D(gridTexture, vUv).r;

  float glow = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      if (x == 0 && y == 0) continue;
      vec2 offset = vec2(float(x), float(y)) * texelSize;
      glow += texture2D(gridTexture, vUv + offset).r;
    }
  }
  glow = glow / 8.0;

  vec3 base = center > 0.5 ? aliveColor : deadColor;
  vec3 glowContrib = glow * glowColor * 0.35;
  float alpha = center > 0.5 ? 1.0 : 0.6;
  vec3 finalColor = mix(base, base + glowContrib, alpha);

  gl_FragColor = vec4(finalColor, 1.0);
}
