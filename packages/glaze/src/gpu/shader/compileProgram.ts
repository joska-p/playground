/**
 * Default vertex shader: three vertices rasterizing the whole viewport, with `vUv` in 0..1.
 */
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

export interface UniformEntry {
    location: WebGLUniformLocation;
    type: number;
    size: number;
}

/**
 * A uniform value. A `WebGLTexture` binds the texture to the next available texture unit and sets
 * the sampler to that unit.
 */
export type UniformValue = number | number[] | Float32Array | Int32Array | WebGLTexture;

export interface CompiledShaderProgram {
    program: WebGLProgram;
    uniforms: Map<string, UniformEntry>;
}

function withVersionDirective(source: string): string {
    const stripped = source.replace(/^\uFEFF/, '').replace(/^\s*#version\s+\d+\s+\w+\s*/m, '');
    return `#version 300 es\n${stripped}`;
}

/**
 * Compiles and links a fragment + vertex shader pair, injecting the `#version 300 es` directive if
 * absent. Throws with the driver log on any failure; the returned map holds the active uniforms.
 * @param gl The WebGL2 context.
 * @param fragmentSource The fragment shader source; the version directive is optional.
 * @param vertexSource The vertex shader source; defaults to `FULLSCREEN_TRIANGLE`.
 * @returns The linked program and its uniform locations.
 */
export function compileProgram(
    gl: WebGL2RenderingContext,
    fragmentSource: string,
    vertexSource: string = FULLSCREEN_TRIANGLE
): CompiledShaderProgram {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) throw new Error('Glaze: shader "vertex" creation failed');
    gl.shaderSource(vertexShader, withVersionDirective(vertexSource));
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(vertexShader);
        gl.deleteShader(vertexShader);
        throw new Error(`Glaze: shader "vertex" compile failed: ${String(log)}`);
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
        gl.deleteShader(vertexShader);
        throw new Error('Glaze: shader "fragment" creation failed');
    }
    gl.shaderSource(fragmentShader, withVersionDirective(fragmentSource));
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(fragmentShader);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        throw new Error(`Glaze: shader "fragment" compile failed: ${String(log)}`);
    }

    const program = gl.createProgram();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- lib.dom types createProgram() as non-null, but the WebGL spec allows null on failure
    if (!program) {
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        throw new Error('Glaze: shader "link" program creation failed');
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        throw new Error(`Glaze: shader "link" compile failed: ${String(log)}`);
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

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
