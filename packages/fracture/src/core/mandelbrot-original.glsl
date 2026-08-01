#version 300 es
precision highp float;

// Fractal
uniform float u_iterationBase;
uniform float u_iterationScale;
uniform float u_iterationCap;
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

// View — the center of the view in the complex plane, split into double-single
// (hi, lo) pairs on the JS side (see `doubleSplit.ts`). Each is a vec2 whose
// two float32s carry ~48 significant bits, so the image stays crisp at zoom
// levels far beyond float32's ~24-bit limit. The zoom itself is a plain float.
uniform vec2 u_centerRe;
uniform vec2 u_centerIm;
uniform float u_zoom;
in vec2 vUv;
out vec4 fragColor;

// ---------------------------------------------------------------------------
// Double-single (DS) arithmetic
//
// A DS value is a pair of floats (hi, lo) that together approximate a double:
//   value ≈ hi + lo,  |lo| ≲ 2⁻²⁴ · |hi|
// hi carries float32's ~24 mantissa bits and lo recovers the next ~24, giving
// ~48 significant bits (~2.8e-15 relative error — about 15 decimal digits).
//
// The view center arrives already split into hi/lo from JS; the per-pixel
// offset is added on top in DS. Everything downstream (bailout, smooth
// iteration, normals, lighting, color) reads only the .x (hi) parts, so the
// precision win is confined to the orbit iteration, where it actually matters.
// ---------------------------------------------------------------------------

// DS value from a single float.
vec2 ds_set(float a) {
  return vec2(a, 0.0);
}

// DS value from an already split hi/lo pair (the view center from JS).
vec2 ds_set2(float hi, float lo) {
  return vec2(hi, lo);
}

// Negate.
vec2 ds_neg(vec2 a) {
  return vec2(-a.x, -a.y);
}

// Error-free float addition (Dekker's TwoSum): returns (s, e) with
// s = fl(a + b) and s + e == a + b exactly. Order-independent.
vec2 ds_twoSum(float a, float b) {
  float s = a + b;
  float bv = s - a;
  float err = a - (s - bv) + (b - bv);
  return vec2(s, err);
}

// DS + DS: error-carrying sum, renormalized into a fresh (hi, lo) pair.
vec2 ds_add(vec2 a, vec2 b) {
  vec2 s = ds_twoSum(a.x, b.x); // sum the high parts, keep the rounding error
  s.y += a.y + b.y; // fold in both low parts
  return ds_twoSum(s.x, s.y); // renormalize
}

// DS - DS.
vec2 ds_sub(vec2 a, vec2 b) {
  return ds_add(a, ds_neg(b));
}

// Split a float into (hi, lo) with a = hi + lo exactly (Dekker), where hi
// keeps the top 13 bits' worth of precision. Requires |a| · 8193 to stay in
// normal float range — true for every value this shader produces.
const float DS_SPLIT = 8193.0; // 2^13 + 1

vec2 ds_split(float a) {
  float t = a * DS_SPLIT;
  float hi = t - (t - a);
  return vec2(hi, a - hi);
}

// Error-free float product: returns (fl(a · b), a · b - fl(a · b)) exactly.
// Uses Dekker splitting rather than `fma` because fused multiply-add is only
// optional on some WebGL drivers.
vec2 ds_prodErr(float a, float b) {
  vec2 as = ds_split(a);
  vec2 bs = ds_split(b);
  float hi = a * b;
  float lo = as.x * bs.x - hi + as.x * bs.y + as.y * bs.x + as.y * bs.y;
  return vec2(hi, lo);
}

// DS * DS.
vec2 ds_mul(vec2 a, vec2 b) {
  vec2 p = ds_prodErr(a.x, b.x); // leading product + exact error
  float lo = p.y + a.x * b.y + a.y * b.x + a.y * b.y; // cross + low·low terms
  return ds_twoSum(p.x, lo);
}

// Complex square in DS: (zr + i·zi)² = (zr² - zi²) + i·(2·zr·zi).
void ds_csquare(vec2 zr, vec2 zi, out vec2 zrOut, out vec2 ziOut) {
  vec2 zrSq = ds_mul(zr, zr);
  vec2 ziSq = ds_mul(zi, zi);
  vec2 zrzi = ds_mul(zr, zi);
  zrOut = ds_sub(zrSq, ziSq);
  ziOut = ds_mul(ds_set(2.0), zrzi);
}

// ---------------------------------------------------------------------------
// OKLCH → RGB (unchanged)
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
// Outside → smooth iteration count
// Inside  → convergence measure (how close the orbit got to 0)
//
// The orbit iteration runs in double-single; only the per-pixel offset from
// the view center is a plain float (it is always tiny, ≤ 1.5 / u_zoom, so
// adding it onto the DS center keeps the full ~48-bit accuracy).
// ---------------------------------------------------------------------------
vec2 getMandelbrotData(vec2 uvCoord, int maxIter) {
  vec2 delta = (uvCoord - 0.5) * (3.0 / u_zoom);

  // c = center + delta, in DS. u_centerRe / u_centerIm carry the hi/lo split
  // of the view center computed in float64 on the JS side.
  vec2 cr = ds_add(ds_set2(u_centerRe.x, u_centerRe.y), ds_set(delta.x));
  vec2 ci = ds_add(ds_set2(u_centerIm.x, u_centerIm.y), ds_set(delta.y));

  // z = 0 + 0i (DS)
  vec2 zr = vec2(0.0, 0.0);
  vec2 zi = vec2(0.0, 0.0);

  float minMod2 = 1e20; // closest approach to origin
  float mod2 = 0.0;
  bool diverged = false;
  int iterationCount = 0;

  for (int i = 0; i < maxIter; i++) {
    // z = z² + c — all in DS
    vec2 zrSq, ziSq;
    ds_csquare(zr, zi, zrSq, ziSq);
    zr = ds_add(zrSq, cr);
    zi = ds_add(ziSq, ci);

    // Bailout & min-distance read the high parts only (float speed).
    mod2 = zr.x * zr.x + zi.x * zi.x;
    minMod2 = min(minMod2, mod2);

    if (mod2 > 4.0) {
      diverged = true;
      iterationCount = i;
      break;
    }
  }

  if (diverged) {
    // classic continuous smooth iteration (uses hi parts)
    float log_zn = log(mod2) * 0.5; // = log(|z|)
    float nu = log(log_zn / log(2.0)) / log(2.0);
    float smooth_i = float(iterationCount) + 1.0 - nu;
    return vec2(smooth_i, length(vec2(zr.x, zi.x)));
  } else {
    // continuous convergence measure (uses hi parts)
    float closest = sqrt(minMod2);
    float conv = -log(closest + 1e-12) * u_interiorScale;
    return vec2(conv, closest);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
void main() {
  int maxIterations = int(u_iterationBase + log(max(1.0, u_zoom)) * u_iterationScale);
  maxIterations = min(maxIterations, int(u_iterationCap));

  // Keep epsilon in UV space (roughly constant in screen pixels)
  // 0.001–0.002 works well; you can expose it later if you want
  float pixelEps = u_pixelEps;
  vec2 eps = vec2(pixelEps, 0.0);

  vec2 data0 = getMandelbrotData(vUv, maxIterations);
  float h0 = data0.x;
  float hX = getMandelbrotData(vUv + eps.xy, maxIterations).x;
  float hY = getMandelbrotData(vUv + eps.yx, maxIterations).x;

  // Critical part: compensate the height differences by zoom
  // so the slope stays roughly the same in world space
  float heightScale = u_bumpHeight / max(u_zoom, 1.0);

  vec3 normal = normalize(
    vec3(
      (h0 - hX) * heightScale,
      (h0 - hY) * heightScale,
      pixelEps // constant z, independent of zoom
    )
  );

  // rest of the lighting & color stays exactly the same
  vec3 lightDir = normalize(vec3(cos(u_sunAngle), sin(u_sunAngle), 1.0));
  float diffuse = max(0.0, dot(normal, lightDir));
  float lightIntensity = clamp(u_ambient + diffuse * (1.0 - u_ambient), 0.0, 1.0);

  // -----------------------------------------------------------------
  // Color
  // -----------------------------------------------------------------
  float baseRate = log(max(1.0, h0)) / log(float(maxIterations));

  // Lightness (already working)
  float L = clamp(baseRate * lightIntensity, 0.0, 1.0);

  // Chroma – different treatment for interior vs exterior
  float C;
  if (data0.y < 2.0) {
    // Interior: use the scaled height (or closest approach)
    // This gives saturated colors that still respond to the chroma slider
    C = clamp(h0 * 0.004 * u_chromaScale * 20.0, 0.0, 0.35);
    // alternative that also looks good:
    // C = clamp( (1.0 / (data0.y + 0.01)) * u_chromaScale * 0.15 , 0.0, 0.35);
  } else {
    // Exterior: original formula
    C = clamp(log(max(1.0, data0.y)) * u_chromaScale, 0.0, 0.3);
  }

  // Hue (same for both)
  float h = mod(h0 * u_hueFrequency + u_hueShift, 6.28318530718);

  fragColor = vec4(oklchToRgb(vec3(L, C, h)), 1.0);
}
