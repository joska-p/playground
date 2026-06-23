varying vec2 vUv;
uniform sampler2D uGridTexture;
uniform vec2 uTexelSize;

void main() {
  float currentState = texture2D(uGridTexture, vUv).r;

  // 1. Calculate average neighborhood density (values between 0.0 and 1.0)
  float neighborSum = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      if (x == 0 && y == 0) continue;
      vec2 offset = vec2(float(x), float(y)) * uTexelSize;
      neighborSum += texture2D(uGridTexture, vUv + offset).r;
    }
  }
  float avgNeighbors = neighborSum / 8.0;

  // 2. Define continuous transition thresholds
  // Instead of sharp boundaries, we define ranges where cells love to live.
  float nextState = currentState;

  // Rule analogy:
  // If neighborhood density is in the "sweet spot", increase state value.
  // If it's too empty (underpopulation) or too full (overpopulation), decrease it.
  if (avgNeighbors >= 0.15 && avgNeighbors <= 0.45) {
    nextState += 0.08; // Smooth birth/growth
  } else {
    nextState -= 0.03; // Smooth decay
  }

  // 3. Keep values firmly inside the [0.0, 1.0] color boundary
  nextState = clamp(nextState, 0.0, 1.0);

  gl_FragColor = vec4(vec3(nextState), 1.0);
}
