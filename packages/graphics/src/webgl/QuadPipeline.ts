import type { Point, SpaceMapper } from '../math/SpaceMapper';

const FULLSCREEN_TRIANGLE = `#version 300 es
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
  private mapper: SpaceMapper;
  private uniforms = new Map<string, WebGLUniformLocation>();

  constructor(gl: WebGL2RenderingContext, mapper: SpaceMapper) {
    this.gl = gl;
    this.mapper = mapper;
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

  render(mousePx?: Point): void {
    const gl = this.gl;
    if (!this.program) return;

    gl.useProgram(this.program);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const uniforms = this.mapper.getShaderUniforms(mousePx);

    const resLoc = this.uniforms.get('u_resolution');
    if (resLoc) gl.uniform2f(resLoc, ...uniforms.u_resolution);

    const aspectLoc = this.uniforms.get('u_aspect');
    if (aspectLoc) gl.uniform1f(aspectLoc, uniforms.u_aspect);

    const mouseLoc = this.uniforms.get('u_mouse');
    if (mouseLoc) gl.uniform2f(mouseLoc, ...uniforms.u_mouse);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  dispose(): void {
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }
}
