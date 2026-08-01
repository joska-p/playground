#version 300 es
precision highp float;

// Lighting
uniform float u_sunAngle;   // e.g. 2.35 (top-left angle)
uniform float u_bumpHeight;   // e.g. 15.0
uniform float u_ambient;      // e.g. 0.3

// Color & Palette
uniform float u_hueShift;     // e.g. 0.0
uniform float u_hueFrequency; // e.g. 0.1
uniform float u_chromaScale;  // e.g. 0.05

uniform vec2 u_panOffset;
uniform float u_zoom;
in vec2 vUv;
out vec4 fragColor;

// -----------------------------------------------------------------
// 1. OKLCH to RGB Converter (Your existing function)
// -----------------------------------------------------------------
vec3 oklchToRgb(vec3 oklch) {
    float L = oklch.x;
    float C = oklch.y;
    float h = oklch.z;

    float a = C * cos(h);
    float b = C * sin(h);

    float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    float s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    float l = l_ * l_ * l_;
    float m = m_ * m_ * m_;
    float s = s_ * s_ * s_;

    vec3 linearRgb;
    linearRgb.r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    linearRgb.g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    linearRgb.b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

    vec3 lowPart = linearRgb * 12.92;
    vec3 highPart = 1.055 * pow(max(linearRgb, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;

    vec3 rgb = mix(highPart, lowPart, lessThanEqual(linearRgb, vec3(0.0031308)));
    return clamp(rgb, 0.0, 1.0);
}

// -----------------------------------------------------------------
// 2. Mandelbrot Helper: Returns (Smooth Iterations, Final Z Magnitude)
// -----------------------------------------------------------------
vec2 getMandelbrotData(vec2 uvCoord, int maxIter) {
    vec2 uv = (uvCoord - 0.5) / u_zoom + 0.5 + u_panOffset;
    vec2 c = (uv - 0.5) * 3.0 - vec2(0.5, 0.0);
    vec2 z = vec2(0.0);

    bool diverged = false;
    int iterationCount = 0;

    for (int i = 0; i < maxIter; i++) {
        vec2 zSquared = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y);
        z = zSquared + c;

        if (dot(z, z) > 4.0) {
            diverged = true;
            iterationCount = i;
            break;
        }
    }

    if (!diverged) {
        return vec2(0.0, 0.0); // Inside the set
    }

    // Continuous smooth iteration math
    float log_zn = log(dot(z, z)) / 2.0;
    float nu = log(log_zn / log(2.0)) / log(2.0);
    float smooth_i = float(iterationCount) + 1.0 - nu;

    return vec2(smooth_i, length(z));
}

// -----------------------------------------------------------------
// 3. Main Shader Execution
// -----------------------------------------------------------------
void main() {
  // 1. Dynamic iteration count
  int maxIterations = int(100.0 + log(max(1.0, u_zoom)) * 50.0);

  // Step size for sampling neighbor pixels
  vec2 eps = vec2(0.001 / u_zoom, 0.0);

  // Sample current pixel height (h0)
  vec2 data0 = getMandelbrotData(vUv, maxIterations);
  float h0 = data0.x;

  if (h0 == 0.0) {
    // Point is inside the Mandelbrot Set
    fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  // Sample neighboring heights
  float hX = getMandelbrotData(vUv + eps.xy, maxIterations).x;
  float hY = getMandelbrotData(vUv + eps.yx, maxIterations).x;

  // -----------------------------------------------------------------
  // 2. 3D Normal Mapping with Uniforms
  // -----------------------------------------------------------------
  // Replaced hardcoded '15.0' with u_bumpHeight
  vec3 normal = normalize(vec3(h0 - hX, h0 - hY, eps.x * u_bumpHeight));

  // Calculate dynamic light direction from u_sunAngle
  // (Converts 2D angle into a 3D unit vector for the sun)
  vec3 lightDir = normalize(vec3(cos(u_sunAngle), sin(u_sunAngle), 1.0));

  // Calculate diffuse & apply u_ambient
  float diffuse = max(0.0, dot(normal, lightDir));
  float lightIntensity = clamp(u_ambient + diffuse * (1.0 - u_ambient), 0.0, 1.0);

  // -----------------------------------------------------------------
  // 3. OKLCH Color Space with Uniforms
  // -----------------------------------------------------------------
  float baseRate = log(max(1.0, h0)) / log(float(maxIterations));

  // Lightness: scales directly with 3D light intensity
  float L = clamp(baseRate * lightIntensity, 0.0, 1.0);

  // Chroma: multiplied by u_chromaScale (replaces hardcoded 0.05)
  float C = clamp(log(max(1.0, data0.y)) * u_chromaScale, 0.0, 0.3);

  // Hue: u_hueFrequency controls cycle density, u_hueShift offsets the wheel
  float h = mod(h0 * u_hueFrequency + u_hueShift, 2.0 * 3.14159265);

  // Convert OKLCH -> RGB output
  fragColor = vec4(oklchToRgb(vec3(L, C, h)), 1.0);
}
