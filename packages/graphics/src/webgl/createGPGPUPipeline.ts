import { createFBOManager, type FBOManager } from './createFBOManager';

const FULLSCREEN_TRIANGLE = /* glsl */ `
  #version 300 es
  precision highp float;
  out vec2 vUv;
  void main() {
    vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
    vUv = pos[gl_VertexID] * 0.5 + 0.5;
    gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
  }
`.trim();

type UniformEntry = {
  loc: WebGLUniformLocation;
  type: GLenum;
  size: number;
};

type ProgramEntry = {
  program: WebGLProgram;
  uniforms: Map<string, UniformEntry>;
};

export type UniformValue = number | readonly number[] | Int32Array | Float32Array;

function compileShader(gl: WebGL2RenderingContext, fragmentSource: string): ProgramEntry | null {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  if (!vs) return null;
  gl.shaderSource(vs, FULLSCREEN_TRIANGLE);
  gl.compileShader(vs);

  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compile error:', gl.getShaderInfoLog(vs));
    gl.deleteShader(vs);
    return null;
  }

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fs) return null;
  gl.shaderSource(fs, fragmentSource);
  gl.compileShader(fs);

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('Fragment shader compile error:', gl.getShaderInfoLog(fs));
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }

  const program = gl.createProgram();

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
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

export type GPGPUPipeline = {
  readonly width: number;
  readonly height: number;
  readonly fbo: FBOManager;
  compile(): void;
  addProgram(name: string, fragmentSource: string): void;
  useProgram(name: string): void;
  setUniforms(uniforms: Record<string, UniformValue>): void;
  setUniforms(name: string, value: UniformValue): void;
  step(): void;
  init(data: Uint8Array): void;
  getStateTexture(): WebGLTexture;
  resize(width: number, height: number): void;
  destroy(): void;
};

export function createGPGPUPipeline(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  defaultShader: string
): GPGPUPipeline {
  const fbo = createFBOManager(gl, width, height);
  const programs = new Map<string, ProgramEntry>();
  let activeName: string | null = null;

  const emptyVao = gl.createVertexArray();

  const setUniform = (entry: ProgramEntry, name: string, value: UniformValue): void => {
    const info = entry.uniforms.get(name);
    if (!info) return;

    const loc = info.loc;
    const type = info.type;

    switch (type) {
      case gl.FLOAT:
        if (typeof value === 'number') gl.uniform1f(loc, value);
        else gl.uniform1fv(loc, value as Float32Array);
        break;
      case gl.FLOAT_VEC2:
        gl.uniform2fv(loc, value as Float32Array | number[]);
        break;
      case gl.FLOAT_VEC3:
        gl.uniform3fv(loc, value as Float32Array | number[]);
        break;
      case gl.FLOAT_VEC4:
        gl.uniform4fv(loc, value as Float32Array | number[]);
        break;
      case gl.INT:
      case gl.BOOL:
      case gl.SAMPLER_2D:
        if (typeof value === 'number') gl.uniform1i(loc, value);
        else gl.uniform1iv(loc, value as Int32Array);
        break;
      case gl.INT_VEC2:
      case gl.BOOL_VEC2:
        gl.uniform2iv(loc, value as Int32Array | number[]);
        break;
      case gl.INT_VEC3:
      case gl.BOOL_VEC3:
        gl.uniform3iv(loc, value as Int32Array | number[]);
        break;
      case gl.INT_VEC4:
      case gl.BOOL_VEC4:
        gl.uniform4iv(loc, value as Int32Array | number[]);
        break;
      case gl.FLOAT_MAT2:
        gl.uniformMatrix2fv(loc, false, value as Float32Array | number[]);
        break;
      case gl.FLOAT_MAT3:
        gl.uniformMatrix3fv(loc, false, value as Float32Array | number[]);
        break;
      case gl.FLOAT_MAT4:
        gl.uniformMatrix4fv(loc, false, value as Float32Array | number[]);
        break;
    }
  };

  const addProgram = (name: string, fragmentSource: string): void => {
    const entry = compileShader(gl, fragmentSource);
    if (!entry) throw new Error(`Failed to compile shader program "${name}"`);
    programs.set(name, entry);
  };

  return {
    fbo,

    get width(): number {
      return fbo.width;
    },

    get height(): number {
      return fbo.height;
    },

    compile(): void {
      addProgram('default', defaultShader);
    },

    addProgram,

    useProgram(name: string): void {
      const entry = programs.get(name);
      if (!entry) throw new Error(`Program "${name}" not found`);
      activeName = name;
      gl.useProgram(entry.program);
    },

    setUniforms(nameOrUniforms: string | Record<string, UniformValue>, value?: UniformValue): void {
      const entry = activeName ? programs.get(activeName) : undefined;
      if (!entry) throw new Error('No active program');

      if (typeof nameOrUniforms === 'string') {
        if (value === undefined) return;
        setUniform(entry, nameOrUniforms, value);
      } else {
        for (const key of Object.keys(nameOrUniforms)) {
          const v = nameOrUniforms[key];
          if (v === undefined) continue;
          setUniform(entry, key, v);
        }
      }
    },

    step(): void {
      const entry = activeName ? programs.get(activeName) : undefined;
      if (!entry) throw new Error('No active program');

      fbo.bindWrite();

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fbo.getReadTexture());

      const stateEntry = entry.uniforms.get('u_state');
      if (stateEntry) {
        gl.uniform1i(stateEntry.loc, 0);
      }

      gl.bindVertexArray(emptyVao);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      fbo.unbind();
      fbo.swap();
    },

    init(data: Uint8Array): void {
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
          fbo.width,
          fbo.height,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          rgba
        );
      };

      updateTex(fbo.getReadTexture());
      updateTex(fbo.getWriteTexture());
    },

    getStateTexture(): WebGLTexture {
      return fbo.getReadTexture();
    },

    resize(newWidth: number, newHeight: number): void {
      fbo.resize(newWidth, newHeight);
    },

    destroy(): void {
      fbo.destroy();
      gl.deleteVertexArray(emptyVao);
      for (const [, entry] of programs) {
        gl.deleteProgram(entry.program);
      }
      programs.clear();
    }
  };
}
