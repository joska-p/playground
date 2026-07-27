import type { Point2D, ShaderUniformValues } from '../math/transforms';

const FULLSCREEN_TRIANGLE = `
precision highp float;
out vec2 vUv;
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  vUv = pos[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

export class QuadPipeline {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private uniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues;
  private uniforms = new Map<string, WebGLUniformLocation>();

  constructor(
    gl: WebGL2RenderingContext,
    uniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues
  ) {
    this.gl = gl;
    this.uniformBuilder = uniformBuilder;
  }

  compileFragmentShader(fragmentSource: string): boolean {
    const gl = this.gl;

    const vs = this.compileShader(gl.VERTEX_SHADER, FULLSCREEN_TRIANGLE);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) return false;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return false;
    }

    this.program = program;
    this.uniforms.clear();

    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) {
        const loc = gl.getUniformLocation(program, info.name);
        if (loc) this.uniforms.set(info.name, loc);
      }
    }

    return true;
  }

  render(mousePx?: Point2D): void {
    const gl = this.gl;
    if (!this.program) return;

    gl.useProgram(this.program);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const uniforms = this.uniformBuilder(mousePx);

    const resLoc = this.uniforms.get('uniformResolution') ?? this.uniforms.get('u_resolution');
    if (resLoc) gl.uniform2f(resLoc, ...uniforms.uniformResolution);

    const aspectLoc = this.uniforms.get('uniformAspectRatio') ?? this.uniforms.get('u_aspect');
    if (aspectLoc) gl.uniform1f(aspectLoc, uniforms.uniformAspectRatio);

    const mouseLoc = this.uniforms.get('uniformMouse') ?? this.uniforms.get('u_mouse');
    if (mouseLoc) gl.uniform2f(mouseLoc, ...uniforms.uniformMouse);

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

  /**
   * Upload arbitrary uniforms to the current program.
   * Dispatches to uniform1f / uniform2fv / uniform3fv / uniform4fv based on value shape.
   * Call this inside an onBeforeRender callback, before pipeline.render().
   */
  setUniforms(uniforms: Record<string, number | number[]>): void {
    const { gl } = this;
    if (!this.program) return;
    gl.useProgram(this.program);
    for (const [name, value] of Object.entries(uniforms)) {
      const loc = this.uniforms.get(name);
      if (loc === undefined) continue;
      if (typeof value === 'number') {
        gl.uniform1f(loc, value);
      } else if (value.length === 2) {
        gl.uniform2fv(loc, value as [number, number]);
      } else if (value.length === 3) {
        gl.uniform3fv(loc, value as [number, number, number]);
      } else if (value.length === 4) {
        gl.uniform4fv(loc, value as [number, number, number, number]);
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
