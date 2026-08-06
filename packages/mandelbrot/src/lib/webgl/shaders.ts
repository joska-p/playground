/**
 * GLSL sources for the perturbation-theory Mandelbrot renderer (WebGL2 / GLSL ES 3.00).
 *
 * Strategy
 * --------
 * The CPU hands us a high-precision *reference orbit* (Z_0, Z_1, ...) stored as
 * an RG32F texture. Each pixel only iterates the small delta δ from that
 * reference:  δ_{n+1} = 2·Z_n·δ_n + δ_n² + δc.
 *
 * Two tricks keep this accurate and deep:
 *  1. δ is carried in emulated double precision ("double-single", a vec2 of
 *     hi/lo floats). Naive single-float perturbation suffers catastrophic
 *     cancellation → visible glitches; df32 largely removes them.
 *  2. Zhuoran *rebasing*: whenever the full value |Z+δ| drops below |δ| (or we
 *     run past the end of the reference), we reset δ to the full value and
 *     restart the reference index. This lets a single reference cover the whole
 *     screen without glitch blobs.
 *
 * Depth cues:
 *  - Derivative dz/dc gives a Distance Estimate (crisp glowing border) AND a
 *    surface normal for directional lighting (embossed 3D relief).
 *
 * Color: log-scaled smooth iteration count mapped through OKLCH (perceptual),
 * converted to sRGB entirely in-shader — no color library.
 */

export const VERTEX_SRC = /* glsl */ `
    #version 300 es
    in vec2 aPos;
    void main() {
        gl_Position = vec4(aPos, 0.0, 1.0);
    }
`;

export const FRAGMENT_SRC = /* glsl */ `
    #version 300 es
    precision highp float;
    precision highp int;

    out vec4 fragColor;

    uniform vec2 uResolution;
    uniform float uSpacing; // complex units per device pixel (real, tiny)
    uniform vec2 uRefOffset; // (viewCenter - refCenter) in complex units
    uniform int uMaxIter;
    uniform sampler2D uRef; // reference orbit, RG = (Zx, Zy)
    uniform int uRefWidth;
    uniform int uRefCount;

    // look controls
    uniform float uColorFreq;
    uniform float uColorOffset;
    uniform float uLightAngle;
    uniform float uLightHeight;
    uniform float uGlow;
    uniform float uChroma;
    uniform float uBaseL;

    const float BAILOUT = 1024.0;

    /* ---------- double-single (df32) arithmetic ---------- */
    vec2 dsAdd(vec2 a, vec2 b) {
        float s = a.x + b.x;
        float bb = s - a.x;
        float err = a.x - (s - bb) + (b.x - bb);
        err += a.y + b.y;
        float hi = s + err;
        return vec2(hi, err - (hi - s));
    }
    vec2 twoProduct(float a, float b) {
        float p = a * b;
        float split = 4097.0; // 2^12 + 1
        float ca = split * a;
        float ah = ca - (ca - a);
        float al = a - ah;
        float cb = split * b;
        float bh = cb - (cb - b);
        float bl = b - bh;
        float err = ah * bh - p + ah * bl + al * bh + al * bl;
        return vec2(p, err);
    }
    vec2 dsMul(vec2 a, vec2 b) {
        vec2 p = twoProduct(a.x, b.x);
        p.y += a.x * b.y + a.y * b.x;
        float hi = p.x + p.y;
        return vec2(hi, p.y - (hi - p.x));
    }

    /* ---------- complex df ---------- */
    struct cdf {
        vec2 re;
        vec2 im;
    };
    cdf cAdd(cdf a, cdf b) {
        return cdf(dsAdd(a.re, b.re), dsAdd(a.im, b.im));
    }
    cdf cMul(cdf a, cdf b) {
        vec2 re = dsAdd(dsMul(a.re, b.re), -dsMul(a.im, b.im));
        vec2 im = dsAdd(dsMul(a.re, b.im), dsMul(a.im, b.re));
        return cdf(re, im);
    }

    vec2 fetchRef(int i) {
        int x = i % uRefWidth;
        int y = i / uRefWidth;
        return texelFetch(uRef, ivec2(x, y), 0).rg;
    }

    /* ---------- OKLCH -> sRGB (no dependencies) ---------- */
    vec3 oklabToLinear(vec3 lab) {
        float l_ = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
        float m_ = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
        float s_ = lab.x - 0.0894841775 * lab.y - 1.291485548 * lab.z;
        float l = l_ * l_ * l_;
        float m = m_ * m_ * m_;
        float s = s_ * s_ * s_;
        return vec3(
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
        );
    }
    vec3 oklchToSrgb(float L, float C, float H) {
        vec3 lab = vec3(L, C * cos(H), C * sin(H));
        vec3 lin = clamp(oklabToLinear(lab), 0.0, 1.0);
        vec3 lo = 12.92 * lin;
        vec3 hi = 1.055 * pow(lin, vec3(1.0 / 2.4)) - 0.055;
        return mix(hi, lo, step(lin, vec3(0.0031308)));
    }

    void main() {
        vec2 p = gl_FragCoord.xy - 0.5 * uResolution; // centered, +y up
        float dcx = p.x * uSpacing + uRefOffset.x;
        float dcy = p.y * uSpacing + uRefOffset.y;
        cdf dc = cdf(vec2(dcx, 0.0), vec2(dcy, 0.0));

        cdf dz = cdf(vec2(0.0), vec2(0.0));
        int m = 0;
        vec2 der = vec2(0.0);
        float zx = 0.0,
            zy = 0.0,
            mag2 = 0.0;
        bool escaped = false;
        int n = 0;

        for (int iter = 0; iter < 100000; iter++) {
            if (iter >= uMaxIter) break;
            n = iter;

            vec2 Zr = fetchRef(m);
            zx = Zr.x + dz.re.x;
            zy = Zr.y + dz.im.x;
            mag2 = zx * zx + zy * zy;
            if (mag2 > BAILOUT) {
                escaped = true;
                break;
            }

            // derivative: der_{n+1} = 2 z_n der_n + 1
            der = 2.0 * vec2(zx * der.x - zy * der.y, zx * der.y + zy * der.x) + vec2(1.0, 0.0);

            // advance delta: δ = 2 Z_m δ + δ² + δc
            cdf twoZ = cdf(vec2(2.0 * Zr.x, 0.0), vec2(2.0 * Zr.y, 0.0));
            dz = cAdd(cAdd(cMul(twoZ, dz), cMul(dz, dz)), dc);
            m++;

            // rebasing test against the new full value
            vec2 Zr2 = fetchRef(m);
            float fzx = Zr2.x + dz.re.x;
            float fzy = Zr2.y + dz.im.x;
            float fmag2 = fzx * fzx + fzy * fzy;
            float dmag2 = dz.re.x * dz.re.x + dz.im.x * dz.im.x;
            if (fmag2 < dmag2 || m >= uRefCount - 1) {
                dz = cdf(vec2(fzx, 0.0), vec2(fzy, 0.0));
                m = 0;
            }
        }

        if (!escaped) {
            // interior: near-black with a faint cool tint
            fragColor = vec4(oklchToSrgb(0.04, 0.015, 4.2), 1.0);
            return;
        }

        // smooth (fractional) iteration count
        float logZn = 0.5 * log(mag2);
        float nu = log(logZn / log(2.0)) / log(2.0);
        float sn = float(n) + 1.0 - nu;

        // distance estimate in pixels (crisp filaments / border glow)
        float absz = sqrt(mag2);
        float absder = max(length(der), 1e-20);
        float dePx = absz * log(absz) / absder / max(uSpacing, 1e-38);

        // surface normal from u = z / der -> directional lighting (embossed relief)
        float d2 = max(dot(der, der), 1e-20);
        vec2 u = vec2(zx * der.x + zy * der.y, zy * der.x - zx * der.y) / d2;
        u = normalize(u);
        vec2 light = vec2(cos(uLightAngle), sin(uLightAngle));
        float diff = clamp((dot(u, light) + uLightHeight) / (1.0 + uLightHeight), 0.0, 1.0);

        // log-scaled coloring through OKLCH (detail lives near the border).
        // sqrt(sn) spreads bands more evenly than raw n; log keeps deep detail lively.
        float t = log(sn + 1.0) * 0.5 + sqrt(sn) * 0.02;
        float hue = t * uColorFreq * 0.55 + uColorOffset * 6.2831853;

        // Directional lighting drives brightness (embossed 3D relief). diff is the
        // dominant term so slopes read as light/shadow rather than flat bands.
        float shade = 0.28 + 0.72 * diff; // 0.28..1.0
        float L = clamp(uBaseL * shade, 0.0, 0.98);
        float C = uChroma * (0.55 + 0.45 * shade); // desaturate the shadows a touch

        // Border glow via distance estimate: a thin bright rim right on the set edge,
        // NOT a wash over the whole exterior.
        float rim = uGlow * exp(-dePx * 1.4);
        L = mix(L, min(0.985, L + 0.5), rim);
        C = mix(C, C * 1.3, rim);

        fragColor = vec4(oklchToSrgb(L, C, hue), 1.0);
    }
`;
