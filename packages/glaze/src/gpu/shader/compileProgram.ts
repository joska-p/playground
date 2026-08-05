export const FULLSCREEN_TRIANGLE = /* glsl */ `
  #version 300 es
  precision highp float;
  out vec2 vUv;
  void main() {
    vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
    vUv = pos[gl_VertexID] * 0.5 + 0.5;
    gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
  }
`.trim();

export type UniformEntry = {
        location: WebGLUniformLocation;
        type: number;
        size: number;
};

export type UniformValue = number | number[] | Float32Array | Int32Array | WebGLTexture;

export type CompiledShaderProgram = {
        program: WebGLProgram;
        uniforms: Map<string, UniformEntry>;
};

function withVersionDirective(source: string): string {
        const stripped = source.replace(/^\uFEFF/, '').replace(/^\s*#version\s+\d+\s+\w+\s*/m, '');
        return `#version 300 es\n${stripped}`;
}

export function compileProgram(
        gl: WebGL2RenderingContext,
        fragmentSource: string,
        vertexSource: string = FULLSCREEN_TRIANGLE
): CompiledShaderProgram {
        const vs = gl.createShader(gl.VERTEX_SHADER);
        if (!vs) throw new Error('Glaze: shader "vertex" creation failed');
        gl.shaderSource(vs, withVersionDirective(vertexSource));
        gl.compileShader(vs);

        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
                const log = gl.getShaderInfoLog(vs);
                gl.deleteShader(vs);
                throw new Error(`Glaze: shader "vertex" compile failed: ${String(log)}`);
        }

        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        if (!fs) {
                gl.deleteShader(vs);
                throw new Error('Glaze: shader "fragment" creation failed');
        }
        gl.shaderSource(fs, withVersionDirective(fragmentSource));
        gl.compileShader(fs);

        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
                const log = gl.getShaderInfoLog(fs);
                gl.deleteShader(vs);
                gl.deleteShader(fs);
                throw new Error(`Glaze: shader "fragment" compile failed: ${String(log)}`);
        }

        const program = gl.createProgram();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- lib.dom types createProgram() as non-null, but the WebGL spec allows null on failure
        if (!program) {
                gl.deleteShader(vs);
                gl.deleteShader(fs);
                throw new Error('Glaze: shader "link" program creation failed');
        }

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                const log = gl.getProgramInfoLog(program);
                gl.deleteProgram(program);
                gl.deleteShader(vs);
                gl.deleteShader(fs);
                throw new Error(`Glaze: shader "link" compile failed: ${String(log)}`);
        }

        gl.deleteShader(vs);
        gl.deleteShader(fs);

        const uniforms = new Map<string, UniformEntry>();
        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
        for (let i = 0; i < numUniforms; i++) {
                const info = gl.getActiveUniform(program, i);
                if (info) {
                        const loc = gl.getUniformLocation(program, info.name);
                        if (loc) {
                                const baseName = info.name.replace(/\[0\]$/, '');
                                uniforms.set(baseName, {
                                        location: loc,
                                        type: info.type,
                                        size: info.size
                                });
                        }
                }
        }

        return { program, uniforms };
}
