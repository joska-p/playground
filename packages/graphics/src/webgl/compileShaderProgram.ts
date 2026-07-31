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
  return source.startsWith('#version 300 es') ? source : `#version 300 es\n${source}`;
}

export function compileShaderProgram(
  gl: WebGL2RenderingContext,
  fragmentSource: string,
  vertexSource: string = FULLSCREEN_TRIANGLE
): CompiledShaderProgram {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  if (!vs) throw new Error('shader "vertex" creation failed');
  gl.shaderSource(vs, withVersionDirective(vertexSource));
  gl.compileShader(vs);

  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(vs);
    gl.deleteShader(vs);
    throw new Error(`shader "vertex" compile failed: ${String(log)}`);
  }

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fs) {
    gl.deleteShader(vs);
    throw new Error('shader "fragment" creation failed');
  }
  gl.shaderSource(fs, withVersionDirective(fragmentSource));
  gl.compileShader(fs);

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    throw new Error(`shader "fragment" compile failed: ${String(log)}`);
  }

  const program = gl.createProgram();

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    throw new Error(`shader "link" compile failed: ${String(log)}`);
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
        uniforms.set(baseName, { location: loc, type: info.type, size: info.size });
      }
    }
  }

  return { program, uniforms };
}

function isWebGLTextureValue(
  gl: WebGL2RenderingContext,
  value: UniformValue
): value is WebGLTexture {
  return value instanceof WebGLTexture && gl.isTexture(value);
}

export function setUniformValue(
  gl: WebGL2RenderingContext,
  entry: UniformEntry,
  value: UniformValue,
  nextTextureUnit?: () => number
): void {
  const { location, type } = entry;

  if (isWebGLTextureValue(gl, value)) {
    const unit = nextTextureUnit ? nextTextureUnit() : 0;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, value);
    gl.uniform1i(location, unit);
    return;
  }

  switch (type) {
    case gl.FLOAT:
      if (typeof value === 'number') gl.uniform1f(location, value);
      else gl.uniform1fv(location, value as Float32List);
      break;
    case gl.INT:
    case gl.BOOL:
    case gl.SAMPLER_2D:
      if (typeof value === 'number') gl.uniform1i(location, value);
      else gl.uniform1iv(location, value as Int32List);
      break;
    case gl.FLOAT_VEC2:
      gl.uniform2fv(location, value as Float32List);
      break;
    case gl.FLOAT_VEC3:
      gl.uniform3fv(location, value as Float32List);
      break;
    case gl.FLOAT_VEC4:
      gl.uniform4fv(location, value as Float32List);
      break;
    case gl.INT_VEC2:
    case gl.BOOL_VEC2:
      gl.uniform2iv(location, value as Int32List);
      break;
    case gl.INT_VEC3:
    case gl.BOOL_VEC3:
      gl.uniform3iv(location, value as Int32List);
      break;
    case gl.INT_VEC4:
    case gl.BOOL_VEC4:
      gl.uniform4iv(location, value as Int32List);
      break;
    case gl.FLOAT_MAT2:
      gl.uniformMatrix2fv(location, false, value as Float32List);
      break;
    case gl.FLOAT_MAT3:
      gl.uniformMatrix3fv(location, false, value as Float32List);
      break;
    case gl.FLOAT_MAT4:
      gl.uniformMatrix4fv(location, false, value as Float32List);
      break;
  }
}
