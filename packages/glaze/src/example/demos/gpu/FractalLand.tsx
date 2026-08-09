import { GpuCanvas } from '../../../react/GpuCanvas';

const fractalFragmentSource = /* glsl */ `
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;

    uniform vec2 u_resolution;
    uniform float u_dpr;
    uniform vec3 u_camera; // [camera.x, camera.y, camera.zoom]
    uniform float u_time;

    void main() {
        // Screen px -> world px. u_camera is applied automatically every frame,
        // so panning and zooming through the canvas moves through the fractal.
        vec2 css = vUv * (u_resolution / u_dpr);
        vec2 world = (css - u_camera.xy) / u_camera.z;

        // World px -> complex plane.
        vec2 c = world * 0.004 + vec2(-1.45, -0.35);

        vec2 z = vec2(0.0);
        float iter = 0.0;
        for (int i = 0; i < 96; i++) {
            z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            if (dot(z, z) > 4.0) {
                iter = float(i);
                break;
            }
        }

        float t = iter / 96.0;
        vec3 palette = 0.5 + 0.5 * cos(6.28318 * (t * 3.0 + vec3(0.0, 0.33, 0.67)) + u_time * 0.25);
        vec3 color = mix(vec3(0.02, 0.03, 0.06), palette, smoothstep(0.01, 0.05, t));
        out_color = vec4(color, 1.0);
    }
`;

export const fractalLandSnippet = `import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';

const FRAGMENT = /* glsl */ \`
    precision highp float;
    in vec2 vUv;
    out vec4 out_color;
    uniform vec3 u_camera;   // [x, y, zoom] — set automatically every frame
    uniform vec2 u_resolution;
    uniform float u_dpr;

    void main() {
        vec2 css = vUv * (u_resolution / u_dpr);
        vec2 world = (css - u_camera.xy) / u_camera.z; // pan/zoom tracked perfectly
        vec2 c = world * 0.004 + vec2(-1.45, -0.35);

        vec2 z = vec2(0.0);
        float iter = 0.0;
        for (int i = 0; i < 96; i++) {
            z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            if (dot(z, z) > 4.0) { iter = float(i); break; }
        }
        float t = iter / 96.0;
        vec3 color = 0.5 + 0.5 * cos(6.28318 * (t * 3.0 + vec3(0.0, 0.33, 0.67)));
        out_color = vec4(mix(vec3(0.02), color, smoothstep(0.01, 0.05, t)), 1.0);
    }
\`;

// Declarative: no onFrame, no program bookkeeping. Pan/zoom the canvas and
// u_camera pans/zooms the fractal.
export function FractalLand() {
    return (
        <GpuCanvas
            fragmentShader={FRAGMENT}
            className="h-full w-full"
        />
    );
}`;

export function FractalLand() {
    return (
        <GpuCanvas
            fragmentShader={fractalFragmentSource}
            className="h-full w-full"
        />
    );
}
