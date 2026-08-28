import { cn } from '@repo/tlc/lib/cn';
import { useEffect, useRef, type HTMLAttributes } from 'react';

const VERTEX_SRC = `#version 300 es
const vec2 POSITIONS[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);
void main() {
  gl_Position = vec4(POSITIONS[gl_VertexID], 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_seed;
uniform float u_scale;
uniform float u_bands;
uniform vec3 u_colorCold;
uniform vec3 u_colorHot;
uniform float u_hotRadius;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * valueNoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float banded(vec2 uv) {
  float n = fbm(uv * u_scale + u_seed);
  return floor(n * u_bands) / u_bands;
}

float edgeDetect(vec2 uv, float spread) {
  vec2 texel = spread / u_resolution;
  float sum = 0.0;
  sum += banded(uv + texel * vec2(-1.0, -1.0));
  sum += banded(uv + texel * vec2(0.0, -1.0));
  sum += banded(uv + texel * vec2(1.0, -1.0));
  sum += banded(uv + texel * vec2(-1.0, 0.0));
  sum += banded(uv + texel * vec2(0.0, 0.0)) * -8.0;
  sum += banded(uv + texel * vec2(1.0, 0.0));
  sum += banded(uv + texel * vec2(-1.0, 1.0));
  sum += banded(uv + texel * vec2(0.0, 1.0));
  sum += banded(uv + texel * vec2(1.0, 1.0));
  return abs(sum);
}

void main() {
  vec2 fragPx = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 uv = fragPx / u_resolution;

  float sharp = edgeDetect(uv, 1.0);
  float bloom = edgeDetect(uv, 4.0);
  float edge = clamp(sharp + bloom * 0.6, 0.0, 1.0);

  float distToMouse = length(fragPx - u_mouse);
  float hot = 1.0 - smoothstep(0.0, u_hotRadius, distToMouse);

  vec3 color = mix(u_colorCold, u_colorHot, hot);
  fragColor = vec4(color, edge);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);

    if (!shader) throw new Error('Failed to create shader');

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);

        gl.deleteShader(shader);
        throw new Error(`Shader compile error: ${String(info)}`);
    }

    return shader;
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram {
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);

    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);

        gl.deleteProgram(program);
        throw new Error(`Program link error: ${String(info)}`);
    }

    return program;
}

function parseRgb(
    value: string | null,
    fallback: [number, number, number]
): [number, number, number] {
    if (!value) return fallback;

    const parts = value.split(',').map((v) => parseFloat(v.trim()));

    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return fallback;

    return [parts[0], parts[1], parts[2]];
}

const MAX_DPR = 1.5;

interface EdgeFieldCanvasProps extends HTMLAttributes<HTMLCanvasElement> {
    colorCold?: string;
    colorHot?: string;
    scale?: number;
    bands?: number;
    hotRadius?: number;
    seed?: number;
}

export function EdgeFieldCanvas({
    className,
    colorCold = '0.86,0.78,0.35',
    colorHot = '0.55,0.85,0.62',
    scale = 6,
    bands = 8,
    hotRadius = 440,
    seed = 11,
    ...props
}: EdgeFieldCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGL2RenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
    const rafIdRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const gl = canvas.getContext('webgl2', {
            alpha: true,
            antialias: false,
            premultipliedAlpha: true
        });

        if (!gl) {
            console.warn('WebGL2 unavailable, skipping render.');

            return;
        }

        glRef.current = gl;
        programRef.current = createProgram(gl);
        gl.useProgram(programRef.current);

        uniformsRef.current = {
            resolution: gl.getUniformLocation(programRef.current, 'u_resolution'),
            time: gl.getUniformLocation(programRef.current, 'u_time'),
            mouse: gl.getUniformLocation(programRef.current, 'u_mouse'),
            seed: gl.getUniformLocation(programRef.current, 'u_seed'),
            scale: gl.getUniformLocation(programRef.current, 'u_scale'),
            bands: gl.getUniformLocation(programRef.current, 'u_bands'),
            colorCold: gl.getUniformLocation(programRef.current, 'u_colorCold'),
            colorHot: gl.getUniformLocation(programRef.current, 'u_colorHot'),
            hotRadius: gl.getUniformLocation(programRef.current, 'u_hotRadius')
        };

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        const applyAttributes = () => {
            if (!gl || !programRef.current) return;

            gl.useProgram(programRef.current);
            const cc = parseRgb(colorCold, [0.86, 0.78, 0.35]);
            const ch = parseRgb(colorHot, [0.55, 0.85, 0.62]);

            gl.uniform3fv(uniformsRef.current.colorCold, cc);
            gl.uniform3fv(uniformsRef.current.colorHot, ch);
            gl.uniform1f(uniformsRef.current.scale, scale);
            gl.uniform1f(uniformsRef.current.bands, bands);
            gl.uniform1f(uniformsRef.current.hotRadius, hotRadius);
            gl.uniform1f(uniformsRef.current.seed, seed);
        };

        const resize = () => {
            if (!gl) return;

            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            const width = Math.floor(window.innerWidth * dpr);
            const height = Math.floor(window.innerHeight * dpr);

            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleContextLost = (e: Event) => {
            e.preventDefault();
            cancelAnimationFrame(rafIdRef.current);
        };

        applyAttributes();
        resize();

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        canvas.addEventListener('webglcontextlost', handleContextLost);

        startTimeRef.current = performance.now();

        const frame = (now: number) => {
            const gl = glRef.current;

            if (!gl || !programRef.current) return;

            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

            gl.uniform2f(uniformsRef.current.resolution, canvas.width, canvas.height);
            gl.uniform1f(uniformsRef.current.time, (now - startTimeRef.current) / 1000);
            gl.uniform2f(
                uniformsRef.current.mouse,
                mouseRef.current.x * dpr,
                mouseRef.current.y * dpr
            );

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            rafIdRef.current = requestAnimationFrame(frame);
        };

        rafIdRef.current = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(rafIdRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('webglcontextlost', handleContextLost);

            if (gl && programRef.current) gl.deleteProgram(programRef.current);

            glRef.current = null;
            programRef.current = null;
        };
    }, [colorCold, colorHot, scale, bands, hotRadius, seed]);

    return (
        <canvas
            ref={canvasRef}
            className={cn('fixed inset-0 h-full w-full', className)}
            {...props}
        />
    );
}
