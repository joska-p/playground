import { FBOManager } from './FBOManager';

const FULLSCREEN_TRIANGLE = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  vUv = pos[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

type ShaderCompileResult = {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation>;
};

function compileShader(
  gl: WebGL2RenderingContext,
  fragmentSource: string
): ShaderCompileResult | null {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  if (!vs) return null;
  gl.shaderSource(vs, FULLSCREEN_TRIANGLE);
  gl.compileShader(vs);

  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    gl.deleteShader(vs);
    return null;
  }

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fs) return null;
  gl.shaderSource(fs, fragmentSource);
  gl.compileShader(fs);

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }

  const uniforms = new Map<string, WebGLUniformLocation>();
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < numUniforms; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) {
      const loc = gl.getUniformLocation(program, info.name);
      if (loc) uniforms.set(info.name, loc);
    }
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  return { program, uniforms };
}

export class GPGPUPipeline {
  private gl: WebGL2RenderingContext;
  private fbo: FBOManager;
  private program: WebGLProgram | null = null;
  private uniforms = new Map<string, WebGLUniformLocation>();
  private simShader: string;

  constructor(gl: WebGL2RenderingContext, width: number, height: number, simShader: string) {
    this.gl = gl;
    this.simShader = simShader;
    this.fbo = new FBOManager(gl, width, height);
  }

  compile(): boolean {
    const result = compileShader(this.gl, this.simShader);
    if (!result) return false;
    this.program = result.program;
    this.uniforms = result.uniforms;
    return true;
  }

  step(): void {
    const { gl } = this;
    if (!this.program) return;

    this.fbo.bindWrite();
    gl.useProgram(this.program);

    const stateLoc = this.uniforms.get('u_state');
    if (stateLoc) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.fbo.getReadTexture());
      gl.uniform1i(stateLoc, 0);
    }

    const gridSizeLoc = this.uniforms.get('u_gridSize');
    if (gridSizeLoc) {
      gl.uniform2f(gridSizeLoc, this.fbo.width, this.fbo.height);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.fbo.unbind();
    this.fbo.swap();
  }

  getStateTexture(): WebGLTexture {
    return this.fbo.getReadTexture();
  }

  get width(): number {
    return this.fbo.width;
  }

  get height(): number {
    return this.fbo.height;
  }

  resize(width: number, height: number): void {
    this.fbo.resize(width, height);
  }

  destroy(): void {
    this.fbo.destroy();
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }
}
