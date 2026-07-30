import type { Point2D, ShaderUniformValues } from '../math/transforms';

const FULLSCREEN_TRIANGLE = /* glsl */ `
  precision highp float;
  out vec2 vUv;
  void main() {
    vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
    vUv = pos[gl_VertexID] * 0.5 + 0.5;
    gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
  }
`;

type UniformEntry = { location: WebGLUniformLocation; type: number; size: number };

export class QuadPipeline {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private uniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues;
  private uniforms = new Map<string, UniformEntry>();

  constructor(
    gl: WebGL2RenderingContext,
    uniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues
  ) {
    this.gl = gl;
    this.uniformBuilder = uniformBuilder;
  }

  compileFragmentShader(fragmentSource: string): void {
    const gl = this.gl;

    const vs = this.compileShader(gl.VERTEX_SHADER, FULLSCREEN_TRIANGLE);
    if (!vs) throw new Error('Failed to compile vertex shader');

    const fs = this.compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!fs) throw new Error('Failed to compile fragment shader');

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      throw new Error(`Program link error: ${String(log)}`);
    }

    this.program = program;
    this.uniforms.clear();

    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) {
        const loc = gl.getUniformLocation(program, info.name);
        if (loc) {
          const entry: UniformEntry = { location: loc, type: info.type, size: info.size };
          this.uniforms.set(info.name, entry);
          // Also register the base name for arrays ("stateColors[0]" → "stateColors")
          const baseName = info.name.replace(/\[0\]$/, '');
          if (baseName !== info.name) this.uniforms.set(baseName, entry);
        }
      }
    }
  }

  render(mousePx?: Point2D): void {
    const gl = this.gl;
    if (!this.program) {
      console.warn('QuadPipeline.render() called with no compiled program');
      return;
    }

    this.nextTextureUnit = 0;
    gl.useProgram(this.program);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const uniforms = this.uniformBuilder(mousePx);

    const resEntry = this.uniforms.get('uniformResolution') ?? this.uniforms.get('u_resolution');
    if (resEntry) gl.uniform2f(resEntry.location, ...uniforms.uniformResolution);

    const aspectEntry = this.uniforms.get('uniformAspectRatio') ?? this.uniforms.get('u_aspect');
    if (aspectEntry) gl.uniform1f(aspectEntry.location, uniforms.uniformAspectRatio);

    const mouseEntry = this.uniforms.get('uniformMouse') ?? this.uniforms.get('u_mouse');
    if (mouseEntry) gl.uniform2f(mouseEntry.location, ...uniforms.uniformMouse);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) return null;

    let finalSource = source;
    if (!source.startsWith('#version 300 es')) {
      finalSource = `#version 300 es\n${source}`;
    }

    gl.shaderSource(shader, finalSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private nextTextureUnit = 0;

  /**
   * Upload arbitrary uniforms to the current program.
   * Supports:
   *   - `number`        → uniform1f
   *   - `number[]`      → uniform2fv / 3fv / 4fv based on length
   *   - `WebGLTexture`  → bound to the next available texture unit; sampler uniform set to that unit
   *
   * Call this inside an onBeforeRender callback, before pipeline.render().
   */
  setUniforms(uniforms: Record<string, number | number[] | WebGLTexture>): void {
    const { gl } = this;
    if (!this.program) {
      console.warn('QuadPipeline.setUniforms() called with no compiled program');
      return;
    }
    gl.useProgram(this.program);
    for (const [name, value] of Object.entries(uniforms)) {
      const entry = this.uniforms.get(name);
      if (entry === undefined) continue;
      const { location: loc, type } = entry;
      if (value instanceof WebGLTexture) {
        const unit = this.nextTextureUnit++;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, value);
        gl.uniform1i(loc, unit);
      } else if (typeof value === 'number') {
        gl.uniform1f(loc, value);
      } else {
        // Dispatch based on the GL type stored at compile time so that
        // arrays of any length (e.g. vec3[8] → 24 floats) are handled correctly.
        const FLOAT_VEC2 = 0x8b50;
        const FLOAT_VEC3 = 0x8b51;
        const FLOAT_VEC4 = 0x8b52;
        if (type === FLOAT_VEC4) gl.uniform4fv(loc, value);
        else if (type === FLOAT_VEC3) gl.uniform3fv(loc, value);
        else if (type === FLOAT_VEC2) gl.uniform2fv(loc, value);
        else gl.uniform1fv(loc, value);
      }
    }
  }

  /**
   * Replace the uniform builder (e.g. after a canvas resize).
   * The next render() call will use the updated resolution / DPR values.
   */
  updateUniformBuilder(builder: (mouseBufferPixel?: Point2D) => ShaderUniformValues): void {
    this.uniformBuilder = builder;
  }

  dispose(): void {
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }
}
