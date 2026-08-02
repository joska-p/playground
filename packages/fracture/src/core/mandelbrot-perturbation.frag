#version 300 es
precision highp float;

// Reference-orbit data texture (one RG texel per iteration: Xn = (Xr, Xi))
uniform sampler2D u_orbit;
uniform int u_orbitLength; // loop bound == orbit texture width
uniform int u_referenceIterations; // reference escape index; the loop stops here

// Fractal
uniform float u_interiorScale;
uniform float u_pixelEps;

// Lighting
uniform float u_sunAngle;
uniform float u_bumpHeight;
uniform float u_ambient;

// Color & Palette
uniform float u_hueShift;
uniform float u_hueFrequency;
uniform float u_chromaScale;

// View
uniform float u_zoom;
in vec2 vUv;
out vec4 fragColor;

// ---------------------------------------------------------------------------
// OKLCH → RGB
// ---------------------------------------------------------------------------
vec3 oklchToRgb(vec3 oklch) {
  float L = oklch.x;
  float C = oklch.y;
  float h = oklch.z;

  float a = C * cos(h);
  float b = C * sin(h);

  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.291485548 * b;

  float l = l_ * l_ * l_;
  float m = m_ * m_ * m_;
  float s = s_ * s_ * s_;

  vec3 linearRgb;
  linearRgb.r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  linearRgb.g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  linearRgb.b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  vec3 lowPart = linearRgb * 12.92;
  vec3 highPart = 1.055 * pow(max(linearRgb, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;

  vec3 rgb = mix(highPart, lowPart, lessThanEqual(linearRgb, vec3(0.0031308)));
  return clamp(rgb, 0.0, 1.0);
}

// ---------------------------------------------------------------------------
// Returns (continuous height, secondary magnitude)
// ---------------------------------------------------------------------------
vec2 getMandelbrotData(vec2 uvCoord) {
  // Per-pixel offset from the reference point (the view center). The center
  // itself never reaches the GPU — it lives entirely inside the orbit texture.
  vec2 d = (uvCoord - 0.5) * (3.0 / u_zoom);

  vec2 dz = vec2(0.0, 0.0);
  float minMod2 = 1e20;
  float mod2 = 0.0;
  bool diverged = false;
  int iterationCount = 0;

  // High bailout (256²) for smoother nu, matching the double-single renderer.
  for (int i = 0; i < u_orbitLength; i++) {
    if (i >= u_referenceIterations) break; // no orbit data past the reference escape

    // Xᵢ (stored before the update on the CPU)
    vec2 Xn = texelFetch(u_orbit, ivec2(i, 0), 0).rg;

    // Perturbation recurrence (K.I. Martin):
    //   dz_{i+1} = 2·Xᵢ·dzᵢ + dzᵢ² + d
    float r = 2.0 * Xn.x * dz.x - 2.0 * Xn.y * dz.y + dz.x * dz.x - dz.y * dz.y + d.x;
    float im = 2.0 * Xn.x * dz.y + 2.0 * Xn.y * dz.x + 2.0 * dz.x * dz.y + d.y;
    dz = vec2(r, im);

    // Recover the true pixel orbit at step i+1:
    //   Z_{i+1} = X_{i+1} + dz_{i+1}
    // When the next reference point is available we fetch it;
    // otherwise (last step) we fall back to the just-computed Xn + dz
    // (still accurate enough for the bail-out test).
    vec2 zFull;
    if (i + 1 < u_referenceIterations) {
      vec2 Xnext = texelFetch(u_orbit, ivec2(i + 1, 0), 0).rg;
      zFull = Xnext + dz;
    } else {
      zFull = Xn + dz; // last available reference point
    }

    mod2 = dot(zFull, zFull);
    minMod2 = min(minMod2, mod2);

    if (mod2 > 65536.0) {
      diverged = true;
      iterationCount = i;
      break;
    }
  }

  if (diverged) {
    // Hardware log2 is much faster than log(x)/log(2)
    float log_zn = log2(mod2) * 0.5; // log2(|z|)
    float nu = log2(log_zn);
    float smooth_i = float(iterationCount) + 1.0 - nu;

    return vec2(smooth_i, mod2);
  } else {
    float conv = -0.5 * log2(minMod2 + 1e-24) * 0.69314718056 * u_interiorScale;

    return vec2(conv, minMod2);
  }
}

// ---------------------------------------------------------------------------
// Main (identical to the DS shader's main)
// ---------------------------------------------------------------------------
void main() {
  float pixelEps = u_pixelEps;

  // --- Evaluate the fractal ONLY ONCE per pixel ---
  vec2 data0 = getMandelbrotData(vUv);
  float h0 = data0.x;

  // --- Reconstruct normals analytically via screen-space derivatives ---
  vec2 dU = dFdx(vUv);
  vec2 dV = dFdy(vUv);
  float det = dU.x * dV.y - dU.y * dV.x;

  float dhdu = 0.0;
  float dhdv = 0.0;
  if (abs(det) > 1e-9) {
    float dhdx = dFdx(h0);
    float dhdy = dFdy(h0);
    dhdu = (dhdx * dV.y - dhdy * dU.y) / det;
    dhdv = (dU.x * dhdy - dV.x * dhdx) / det;
  }

  float heightScale = u_bumpHeight / max(u_zoom, 1.0);

  vec3 normal = normalize(vec3(-dhdu * heightScale, -dhdv * heightScale, pixelEps));

  vec3 lightDir = normalize(vec3(cos(u_sunAngle), sin(u_sunAngle), 1.0));
  float diffuse = max(0.0, dot(normal, lightDir));
  float lightIntensity = clamp(u_ambient + diffuse * (1.0 - u_ambient), 0.0, 1.0);

  // -----------------------------------------------------------------
  // Color
  // -----------------------------------------------------------------
  float baseRate = log2(max(1.0, h0)) / log2(float(u_orbitLength));

  float L = clamp(baseRate * lightIntensity, 0.0, 1.0);

  float C;
  if (data0.y < 4.0) {
    // Interior
    C = clamp(h0 * 0.08 * u_chromaScale, 0.0, 0.35);
  } else {
    // Exterior: log2(sqrt(x)) = 0.5 * log2(x)
    C = clamp(0.5 * log2(max(1.0, data0.y)) * 0.69314718 * u_chromaScale, 0.0, 0.3);
  }

  float h = mod(h0 * u_hueFrequency + u_hueShift, 6.28318530718);

  fragColor = vec4(oklchToRgb(vec3(L, C, h)), 1.0);
}
