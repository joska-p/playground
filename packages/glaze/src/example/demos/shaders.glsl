precision mediump float;

out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_aspect;
uniform vec3 u_camera; // [x, y, zoom]
uniform vec2 u_mouse;
uniform float u_dpr;
uniform float u_time;

// --- GLSL Noise functions (Perlin/Simplex derived) ---
// Note: We need some noise code since it's not built-in.
// A common fast 2D gradient noise implementation.

vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float noise2d(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(
            dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
            dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)),
            u.x
        ),
        mix(
            dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)),
            u.x
        ),
        u.y
    );
}

// Fractal Brownian Motion (accumulating layers of noise)
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(
         0.8,  0.6,
        -0.6,  0.8
    ); // Rotation matrix for smoothness
    for (int i = 0; i < 6; i++) {
        v += a * noise2d(p);
        p = m * p * 2.1; // Scale frequency up
        a *= 0.5; // Scale amplitude down
    }
    return v * 0.5 + 0.5; // Normalize height range [0.0..1.0]
}

// Define specific elevation color bands for the topo map
vec3 getTopoColor(float height) {
    // 0.0 (Ocean) -> 0.3 (Coast) -> 0.5 (Plains) -> 0.7 (Hills) -> 1.0 (Snow Cap)
    vec3 color;
    if (height < 0.3) {
        color = mix(vec3(0.0, 0.15, 0.5), vec3(0.0, 0.6, 0.9), smoothstep(0.0, 0.3, height)); // Ocean
    } else if (height < 0.5) {
        color = mix(vec3(0.9, 0.9, 0.6), vec3(0.3, 0.7, 0.3), smoothstep(0.3, 0.5, height)); // Beach/Plain
    } else if (height < 0.7) {
        color = mix(vec3(0.3, 0.7, 0.3), vec3(0.6, 0.5, 0.3), smoothstep(0.5, 0.7, height)); // Plains/Forest
    } else if (height < 0.9) {
        color = mix(vec3(0.6, 0.5, 0.3), vec3(0.4, 0.4, 0.4), smoothstep(0.7, 0.9, height)); // Hills/Rock
    } else {
        color = mix(vec3(0.4, 0.4, 0.4), vec3(0.98, 1.0, 1.0), smoothstep(0.9, 1.0, height)); // Mountain/Snow
    }
    return color;
}

void main() {
    // 1. Normalized Screen Coordinates
    vec2 st = gl_FragCoord.xy / u_resolution.xy - 0.5;
    st.x *= u_aspect;

    // 2. Camera Transform (Matches JS screenToWorld exact formula: (screen - camera) / zoom)
    vec2 uv = (st - u_camera.xy) / u_camera.z;

    // 3. Generate Heightmap using FBM Noise
    // We add u_time only to slowly shift the underlying terrain seed over time (animation)
    float height = fbm(uv * 1.5 + u_time * 0.01);

    // 4. Extract Topographic Contours (Nodal lines at specific heights)
    float numContours = 20.0;
    float contourFrequency = height * numContours;

    // Create sharp anti-aliased lines where the fractional part of frequency resets
    // min() keeps lines consistent when zooming.
    float lineSmoothness = fwidth(contourFrequency);
    float contours =
        1.0 -
        smoothstep(0.0, 0.05 + lineSmoothness * 2.0, abs(fract(contourFrequency - 0.5) - 0.5));

    // 5. Apply Colors and Blend
    vec3 baseMap = getTopoColor(height);

    // Dark contours for elevation, light contours for snow
    vec3 contourColor = height > 0.9 ? vec3(0.8) : vec3(0.1, 0.1, 0.1);

    vec3 finalColor = mix(baseMap, contourColor, contours * 0.4);

    fragColor = vec4(finalColor, 1.0);
}
