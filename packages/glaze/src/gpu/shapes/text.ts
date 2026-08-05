import type { Point2D } from '../../core/coords/camera';
import type { TextStyle } from '../../cpu/shapes/types';
import type { UniformValue } from '../shader/compileProgram';
import { colorArray } from './color';

export const DEFAULT_FONT_FAMILY = 'sans-serif';

const MAX_TEXT_CACHE = 128;
const TEXT_SCALE = 2;

export const textFragmentSource = /* glsl */ `
precision highp float;
in vec2 vUv;
out vec4 out_color;
uniform vec2 u_resolution;
uniform vec3 u_camera;
uniform float u_dpr;
uniform vec2 u_position;
uniform vec2 u_size;
uniform sampler2D u_texture;
uniform vec4 u_color;

vec2 world() {
  vec2 frag = vUv * u_resolution;
  vec2 device = vec2(frag.x, u_resolution.y - frag.y);
  vec2 css = device / u_dpr;
  return (css - u_camera.xy) / u_camera.z;
}

void main() {
  vec2 w = world();
  vec2 local = (w - u_position) / u_size;
  if (local.x < 0.0 || local.x > 1.0 || local.y < 0.0 || local.y > 1.0) {
    out_color = vec4(0.0);
    return;
  }
  float a = texture(u_texture, local).a;
  out_color = vec4(u_color.rgb, u_color.a * a);
}
`.trim();

export type TextRaster = {
        texture: WebGLTexture;
        width: number;
        height: number;
};

export type TextRasterizer = {
        get(text: string, font: string, size: number): TextRaster;
        clear(): void;
        destroy(): void;
};

export function createTextRasterizer(gl: WebGL2RenderingContext): TextRasterizer {
        const textCanvas = document.createElement('canvas');
        const textContextRaw = textCanvas.getContext('2d');
        if (!textContextRaw) throw new Error('Glaze: offscreen text canvas unavailable');
        const textContext: CanvasRenderingContext2D = textContextRaw;
        const cache = new Map<string, TextRaster>();

        const get = (text: string, font: string, size: number): TextRaster => {
                const key = `${text}|${font}`;
                const cached = cache.get(key);
                if (cached) {
                        cache.delete(key);
                        cache.set(key, cached);
                        return cached;
                }
                textContext.font = font;
                const width = Math.ceil(textContext.measureText(text).width);
                const height = Math.ceil(size * 1.4);
                textCanvas.width = Math.max(1, Math.round(width * TEXT_SCALE));
                textCanvas.height = Math.max(1, Math.round(height * TEXT_SCALE));
                textContext.setTransform(TEXT_SCALE, 0, 0, TEXT_SCALE, 0, 0);
                textContext.clearRect(0, 0, width, height);
                textContext.font = font;
                textContext.fillStyle = '#ffffff';
                textContext.textAlign = 'left';
                textContext.textBaseline = 'alphabetic';
                textContext.fillText(text, 0, size);

                const texture = gl.createTexture();
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- lib.dom types createTexture() as non-null, but the WebGL spec allows null on failure
                if (!texture) throw new Error('Glaze: text texture allocation failed');
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                const entry: TextRaster = { texture, width, height };
                cache.set(key, entry);
                if (cache.size > MAX_TEXT_CACHE) {
                        const oldest = cache.keys().next().value;
                        if (oldest !== undefined) {
                                const stale = cache.get(oldest);
                                if (stale) gl.deleteTexture(stale.texture);
                                cache.delete(oldest);
                        }
                }
                return entry;
        };

        const clear = (): void => {
                for (const entry of cache.values()) gl.deleteTexture(entry.texture);
                cache.clear();
        };

        return { get, clear, destroy: clear };
}

export function textUniforms(
        position: Point2D,
        width: number,
        height: number,
        size: number,
        texture: WebGLTexture,
        style: TextStyle
): Record<string, UniformValue> {
        return {
                u_position: [position.x, position.y - size],
                u_size: [width, height],
                u_texture: texture,
                u_color: colorArray(style.fill ?? '#ffffff')
        };
}
