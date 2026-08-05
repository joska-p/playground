import type { Camera, Point2D } from '../../core/coords/camera';
import type { UniformEntry, UniformValue } from './compileProgram';

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

export function setUniforms(
  gl: WebGL2RenderingContext,
  uniforms: Map<string, UniformEntry>,
  values: Record<string, UniformValue>,
  nextTextureUnit?: () => number
): void {
  for (const [name, value] of Object.entries(values)) {
    const entry = uniforms.get(name);
    if (entry === undefined) continue;
    setUniformValue(gl, entry, value, nextTextureUnit);
  }
}

export function createStandardUniformValues(
  width: number,
  height: number,
  dpr: number,
  mouse?: Point2D,
  camera?: Camera,
  time?: number
): Record<string, UniformValue> {
  return {
    u_resolution: [width * dpr, height * dpr],
    u_aspect: height > 0 ? width / height : 0,
    u_mouse: mouse === undefined ? [0, 1] : [width > 0 ? mouse.x / width : 0, 1 - mouse.y / height],
    u_camera: camera === undefined ? [0, 0, 1] : [camera.x, camera.y, camera.zoom],
    u_dpr: dpr,
    u_time: time ?? 0
  };
}
