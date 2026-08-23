import type { UniformEntry, UniformValue } from './compileProgram';
import type { Camera, Point2D } from '../../core/Camera';

function isWebGLTextureValue(
    gl: WebGL2RenderingContext,
    value: UniformValue
): value is WebGLTexture {
    return value instanceof WebGLTexture && gl.isTexture(value);
}

function setUniformValue(
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

/**
 * Uploads uniforms; names with no matching active uniform are silently ignored, so one map can feed
 * programs with different uniform sets.
 */
export function setUniforms(
    gl: WebGL2RenderingContext,
    uniforms: Map<string, UniformEntry>,
    values: Record<string, UniformValue>,
    nextTextureUnit?: () => number
): void {
    // `for...in` walks the keys directly: same order, no intermediate entries array per frame.
    for (const name in values) {
        const entry = uniforms.get(name);

        if (entry === undefined) continue;

        setUniformValue(gl, entry, values[name], nextTextureUnit);
    }
}

const U_RESOLUTION = [0, 0];
const U_MOUSE = [0, 1];
const U_CAMERA = [0, 0, 1];

/** One object + three arrays for the whole process; `createStandardUniformValues` rewrites them. */
const STANDARD_UNIFORM_VALUES: Record<string, UniformValue> = {
    u_resolution: U_RESOLUTION,
    u_aspect: 0,
    u_mouse: U_MOUSE,
    u_camera: U_CAMERA,
    u_dpr: 0,
    u_time: 0,
    u_clockTime: 0
};

/**
 * Stamps the standard per-frame uniforms (`u_resolution`, `u_aspect`, `u_mouse`, `u_camera`,
 * `u_dpr`, `u_time`, `u_clockTime`) into a shared object — zero allocation per frame. Consume it
 * synchronously: the next call overwrites it. Omitted inputs fall back to neutral defaults.
 */
export function createStandardUniformValues(
    width: number,
    height: number,
    dpr: number,
    mouse?: Point2D,
    camera?: Camera,
    time?: number,
    clockTime?: number
): Record<string, UniformValue> {
    U_RESOLUTION[0] = width * dpr;
    U_RESOLUTION[1] = height * dpr;
    STANDARD_UNIFORM_VALUES['u_aspect'] = height > 0 ? width / height : 0;

    if (mouse === undefined) {
        U_MOUSE[0] = 0;
        U_MOUSE[1] = 1;
    } else {
        U_MOUSE[0] = width > 0 ? mouse.x / width : 0;
        U_MOUSE[1] = 1 - mouse.y / height;
    }

    if (camera === undefined) {
        U_CAMERA[0] = 0;
        U_CAMERA[1] = 0;
        U_CAMERA[2] = 1;
    } else {
        U_CAMERA[0] = camera.x;
        U_CAMERA[1] = camera.y;
        U_CAMERA[2] = camera.zoom;
    }

    STANDARD_UNIFORM_VALUES['u_dpr'] = dpr;
    STANDARD_UNIFORM_VALUES['u_time'] = time ?? 0;
    STANDARD_UNIFORM_VALUES['u_clockTime'] = clockTime ?? time ?? 0;

    return STANDARD_UNIFORM_VALUES;
}
