/**
 * WebGL2 renderer for the perturbation Mandelbrot shader.
 *
 * Owns the GL context, the full-screen triangle, the reference-orbit texture,
 * and the uniform plumbing. Pure rendering — all math/precision decisions live
 * in the shader and the CPU-side reference computation.
 */

import { VERTEX_SRC, FRAGMENT_SRC } from './shaders';

export type LookParams = {
    colorFreq: number;
    colorOffset: number;
    lightAngle: number;
    lightHeight: number;
    glow: number;
    chroma: number;
    baseL: number;
};

export type FrameParams = {
    spacing: number;
    refOffsetX: number;
    refOffsetY: number;
    maxIter: number;
} & LookParams;

const REF_TEX_WIDTH = 2048;

export class MandelbrotRenderer {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram;
    private refTex: WebGLTexture;
    private refWidth = REF_TEX_WIDTH;
    private refCount = 0;
    private u: Record<string, WebGLUniformLocation | null> = {};

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl2', {
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance'
        });
        if (!gl) {
            throw new Error('WebGL2 is not available in this browser.');
        }
        this.gl = gl;

        this.program = this.buildProgram(VERTEX_SRC, FRAGMENT_SRC);
        gl.useProgram(this.program);

        // Full-screen triangle.
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(this.program, 'aPos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        // Reference orbit texture.
        const tex = gl.createTexture();
        if (!tex) throw new Error('Failed to create reference texture.');
        this.refTex = tex;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Cache uniform locations.
        for (const name of [
            'uResolution',
            'uSpacing',
            'uRefOffset',
            'uMaxIter',
            'uRef',
            'uRefWidth',
            'uRefCount',
            'uColorFreq',
            'uColorOffset',
            'uLightAngle',
            'uLightHeight',
            'uGlow',
            'uChroma',
            'uBaseL'
        ]) {
            this.u[name] = gl.getUniformLocation(this.program, name);
        }
        gl.uniform1i(this.u.uRef, 0);
    }

    private buildProgram(vsSrc: string, fsSrc: string): WebGLProgram {
        const gl = this.gl;
        const vs = this.compile(gl.VERTEX_SHADER, vsSrc);
        const fs = this.compile(gl.FRAGMENT_SHADER, fsSrc);
        const program = gl.createProgram();
        if (!program) throw new Error('Failed to create GL program.');
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const log = gl.getProgramInfoLog(program);
            throw new Error('Program link failed: ' + log);
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return program;
    }

    private compile(type: number, src: string): WebGLShader {
        const gl = this.gl;
        const shader = gl.createShader(type);
        if (!shader) throw new Error('Failed to create shader.');
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error('Shader compile failed: ' + log);
        }
        return shader;
    }

    /** Upload a new reference orbit (interleaved x,y float pairs). */
    setReference(data: Float32Array, count: number) {
        const gl = this.gl;
        this.refCount = count;
        const width = REF_TEX_WIDTH;
        const height = Math.max(1, Math.ceil(count / width));
        this.refWidth = width;

        // Pad to width*height texels (RG = 2 floats each).
        const padded = new Float32Array(width * height * 2);
        padded.set(data.subarray(0, count * 2));

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.refTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, width, height, 0, gl.RG, gl.FLOAT, padded);
    }

    resize(widthPx: number, heightPx: number) {
        const canvas = this.gl.canvas as HTMLCanvasElement;
        if (canvas.width !== widthPx || canvas.height !== heightPx) {
            canvas.width = widthPx;
            canvas.height = heightPx;
        }
        this.gl.viewport(0, 0, widthPx, heightPx);
    }

    render(params: FrameParams) {
        const gl = this.gl;
        const canvas = gl.canvas as HTMLCanvasElement;
        gl.useProgram(this.program);
        gl.uniform2f(this.u.uResolution, canvas.width, canvas.height);
        gl.uniform1f(this.u.uSpacing, params.spacing);
        gl.uniform2f(this.u.uRefOffset, params.refOffsetX, params.refOffsetY);
        gl.uniform1i(this.u.uMaxIter, params.maxIter);
        gl.uniform1i(this.u.uRefWidth, this.refWidth);
        gl.uniform1i(this.u.uRefCount, this.refCount);
        gl.uniform1f(this.u.uColorFreq, params.colorFreq);
        gl.uniform1f(this.u.uColorOffset, params.colorOffset);
        gl.uniform1f(this.u.uLightAngle, params.lightAngle);
        gl.uniform1f(this.u.uLightHeight, params.lightHeight);
        gl.uniform1f(this.u.uGlow, params.glow);
        gl.uniform1f(this.u.uChroma, params.chroma);
        gl.uniform1f(this.u.uBaseL, params.baseL);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    dispose() {
        const gl = this.gl;
        gl.deleteTexture(this.refTex);
        gl.deleteProgram(this.program);
    }
}
