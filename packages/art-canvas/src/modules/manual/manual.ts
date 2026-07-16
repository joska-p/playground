const fragmentShader = `
  precision highp float;

  // Uniforms & Varyings matching your setup
  uniform float uDivisions;
  uniform float uChroma;
  uniform float uLightness;
  uniform float uTime;

  in vec2 vUv;


  #define PI 3.141592653589793

  // -----------------------------------------------------------------------------
  // Pure OKLCH to sRGB Pipeline
  // -----------------------------------------------------------------------------
  vec3 oklchToRgb(vec3 oklch) {
      float L = oklch.x;
      float C = oklch.y;
      float h = oklch.z; // Assumed to be in radians [0, 2*PI]

      // 1. Convert OKLCH to OKLab (Polar to Cartesian coords)
      float a = C * cos(h);
      float b = C * sin(h);

      // 2. OKLab to LMS cone space
      float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      float s_ = L - 0.0894841775 * a - 1.2914855480 * b;

      // 3. Undo the cube root non-linearity
      float l = l_ * l_ * l_;
      float m = m_ * m_ * m_;
      float s = s_ * s_ * s_;

      // 4. Transform LMS to Linear sRGB
      vec3 linearRgb;
      linearRgb.r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
      linearRgb.g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
      linearRgb.b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

      // 5. Apply sRGB gamma correction (Linear RGB -> standard sRGB)
      // Using standard branchless GLSL selection for performance
      vec3 lowPart = linearRgb * 12.92;
      vec3 highPart = 1.055 * pow(max(linearRgb, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055;

      vec3 rgb = mix(highPart, lowPart, lessThanEqual(linearRgb, vec3(0.0031308)));

      // Clamp values safely into valid [0.0, 1.0] viewport space
      return clamp(rgb, 0.0, 1.0);
  }

  // -----------------------------------------------------------------------------
  // Main execution pass
  // -----------------------------------------------------------------------------
  void main() {
      // Column Logic: Compute normalized discrete IDs per column block
      float columnId = floor(vUv.x * uDivisions);
      float normalizedId = columnId / (uDivisions - 1.0 == 0.0 ? 1.0 : uDivisions - 1.0);
      bool isTop = vUv.y > 0.5;

      // Define constant target properties for Lightness and Chroma
      float targetLightness = uLightness;
      float targetChroma = uChroma;
      float t_time = uTime;

      // Map normalized column positions across a complete wheel cycle
      float hueRadians = normalizedId * 2.0 * PI;

      // Execute color conversion
      vec3 finalColor = oklchToRgb(vec3(targetLightness, targetChroma, hueRadians));

      // Return final computed pixel state
      if (isTop) {
        pc_fragColor = vec4(0.0, 0.0, 0.0, 1.0);
      } else {
        pc_fragColor = vec4(finalColor, 1.0);
      }
  }
 `;

const vertexShader = `
  // 1. The variable we want to share with the fragment shader
  out vec2 vUv;

  void main() {
    // 2. Assign the incoming uv data to our varying variable
    vUv = uv;

    gl_Position = vec4(position, 1.0);
  }
`;

const manual = {
  fragmentShader,
  vertexShader
};

export { manual };
