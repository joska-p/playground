import { FBOManager } from './FBOManager';

const FULLSCREEN_TRIANGLE = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  vUv = pos[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

type UniformEntry = {
  loc: WebGLUniformLocation;
  type: GLenum;
  size: number;
};

type ProgramEntry = {
  program: WebGLProgram;
  uniforms: Map<string, UniformEntry>;
};

type UniformValue = number | readonly number[] | Int32Array | Float32Array;

function compileShader(gl: WebGL2RenderingContext, fragmentSource: string): ProgramEntry | null {
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

  const uniforms = new Map<string, UniformEntry>();
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < numUniforms; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) {
      const loc = gl.getUniformLocation(program, info.name);
      if (loc) {
        const entry: UniformEntry = { loc, type: info.type, size: info.size };
        const baseName = info.name.replace(/\[0\]$/, '');
        uniforms.set(baseName, entry);
        if (baseName !== info.name) uniforms.set(info.name, entry);
      }
    }
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  return { program, uniforms };
}

export class GPGPUPipeline {
  private gl: WebGL2RenderingContext;
  private fbo: FBOManager;
  private programs = new Map<string, ProgramEntry>();
  private activeName: string | null = null;
  private defaultShader: string;

  constructor(gl: WebGL2RenderingContext, width: number, height: number, defaultShader: string) {
    this.gl = gl;
    this.defaultShader = defaultShader;
    this.fbo = new FBOManager(gl, width, height);
  }

  compile(): boolean {
    return this.addProgram('default', this.defaultShader);
  }

  addProgram(name: string, fragmentSource: string): boolean {
    const entry = compileShader(this.gl, fragmentSource);
    if (!entry) return false;
    this.programs.set(name, entry);
    return true;
  }

  useProgram(name: string): void {
    const entry = this.programs.get(name);
    if (!entry) return;
    this.activeName = name;
    this.gl.useProgram(entry.program);
  }

  setUniforms(uniforms: Record<string, UniformValue>): void;
  setUniforms(name: string, value: UniformValue): void;
  setUniforms(nameOrUniforms: string | Record<string, UniformValue>, value?: UniformValue): void {
    const entry = this.activeName ? this.programs.get(this.activeName) : undefined;
    if (!entry) return;

    if (typeof nameOrUniforms === 'string') {
      if (value === undefined) return;
      this.setUniform(entry, nameOrUniforms, value);
    } else {
      for (const key of Object.keys(nameOrUniforms)) {
        const v = nameOrUniforms[key];
        if (v === undefined) continue;
        this.setUniform(entry, key, v);
      }
    }
  }

  private setUniform(entry: ProgramEntry, name: string, value: UniformValue): void {
    const gl = this.gl;
    const info = entry.uniforms.get(name);
    if (!info) return;

    const type = info.type;

    if (value instanceof Int32Array) {
      gl.uniform1iv(info.loc, value);
    } else if (value instanceof Float32Array) {
      gl.uniform1fv(info.loc, value);
    } else if (typeof value === 'number') {
      if (type === gl.FLOAT) {
        gl.uniform1f(info.loc, value);
      } else {
        gl.uniform1i(info.loc, value);
      }
    } else {
      const a = value[0] as number;
      const b = value[1] as number;
      const c = value[2] as number;
      const d = value[3] as number;
      const isInt =
        type === gl.INT_VEC2 ||
        type === gl.INT_VEC3 ||
        type === gl.INT_VEC4 ||
        type === gl.BOOL_VEC2 ||
        type === gl.BOOL_VEC3 ||
        type === gl.BOOL_VEC4;
      switch (value.length) {
        case 1:
          gl.uniform1f(info.loc, a);
          break;
        case 2:
          if (isInt) {
            gl.uniform2i(info.loc, a, b);
          } else {
            gl.uniform2f(info.loc, a, b);
          }
          break;
        case 3:
          if (isInt) {
            gl.uniform3i(info.loc, a, b, c);
          } else {
            gl.uniform3f(info.loc, a, b, c);
          }
          break;
        case 4:
          if (isInt) {
            gl.uniform4i(info.loc, a, b, c, d);
          } else {
            gl.uniform4f(info.loc, a, b, c, d);
          }
          break;
        default:
          gl.uniform1fv(info.loc, value);
          break;
      }
    }
  }

  step(): void {
    const { gl } = this;
    const entry = this.activeName ? this.programs.get(this.activeName) : undefined;
    if (!entry) return;

    this.fbo.bindWrite();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.fbo.getReadTexture());

    const stateEntry = entry.uniforms.get('u_state');
    if (stateEntry) {
      gl.uniform1i(stateEntry.loc, 0);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    this.fbo.unbind();
    this.fbo.swap();
  }

  init(data: Uint8Array): void {
    const gl = this.gl;
    const rgba = new Uint8Array(data.length * 4);
    for (let i = 0; i < data.length; i++) {
      const cellState = data[i] ?? 0;
      const j = i * 4;
      rgba[j] = cellState;
      rgba[j + 1] = 0;
      rgba[j + 2] = 0;
      rgba[j + 3] = 255;
    }

    const updateTex = (tex: WebGLTexture) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        this.fbo.width,
        this.fbo.height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        rgba
      );
    };

    updateTex(this.fbo.getReadTexture());
    updateTex(this.fbo.getWriteTexture());
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
    for (const [, entry] of this.programs) {
      this.gl.deleteProgram(entry.program);
    }
    this.programs.clear();
  }
}
