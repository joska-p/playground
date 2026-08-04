import { type Camera, type Mat2D, type Rect, type Vec2, cameraMatrix, defaultCamera, identity2d, toMat3 } from '@repo/pixelate2d-math';
import { parseColor } from '../core/color';
import type { Color, DrawStyle, PathOptions, RenderDriver, TextStyle } from '../core/types';

const DEFAULT_FONT_FAMILY = 'sans-serif';
const DEFAULT_STROKE_WIDTH = 1;
const MAX_TEXT_CACHE = 128;
const TEXT_SCALE = 2;

const VERTEX_STRIDE = 6; // x, y, r, g, b, a
const TEXT_STRIDE = 4; // x, y, u, v

const SHAPE_VERTEX_SRC = `#version 300 es
layout(location = 0) in vec2 a_position;
layout(location = 1) in vec4 a_color;
uniform mat3 u_projection;
out vec4 v_color;
void main() {
  vec3 p = u_projection * vec3(a_position, 1.0);
  gl_Position = vec4(p.xy, 0.0, 1.0);
  v_color = a_color;
}`;

const SHAPE_FRAGMENT_SRC = `#version 300 es
precision mediump float;
in vec4 v_color;
out vec4 out_color;
void main() { out_color = v_color; }`;

const TEXT_VERTEX_SRC = `#version 300 es
layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_uv;
uniform mat3 u_projection;
out vec2 v_uv;
void main() {
  vec3 p = u_projection * vec3(a_position, 1.0);
  gl_Position = vec4(p.xy, 0.0, 1.0);
  v_uv = a_uv;
}`;

const TEXT_FRAGMENT_SRC = `#version 300 es
precision mediump float;
in vec2 v_uv;
uniform sampler2D u_texture;
uniform vec4 u_color;
out vec4 out_color;
void main() { out_color = vec4(u_color.rgb, u_color.a * texture(u_texture, v_uv).a); }`;

/** `never`-returning throw so resource guards can use `?? raise(...)`. */
function raise(message: string): never {
  throw new Error(`Pixelate2D: ${message}`);
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type) ?? raise('failed to allocate shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? 'unknown error';
    gl.deleteShader(shader);
    throw new Error(`Pixelate2D: shader compile failed: ${info}`);
  }
  return shader;
}

function compileProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) ?? 'unknown error';
    gl.deleteProgram(program);
    throw new Error(`Pixelate2D: program link failed: ${info}`);
  }
  return program;
}

/** GL 3x3 matrix in column-major order (see {@link toMat3}). */
type Mat3 = readonly [number, number, number, number, number, number, number, number, number];

/** Multiply two 3x3 matrices (column-major), returning a new array. */
function multiplyMat3(a: Mat3, b: Mat3): Mat3 {
  return [
    a[0] * b[0] + a[3] * b[1] + a[6] * b[2],
    a[1] * b[0] + a[4] * b[1] + a[7] * b[2],
    a[2] * b[0] + a[5] * b[1] + a[8] * b[2],
    a[0] * b[3] + a[3] * b[4] + a[6] * b[5],
    a[1] * b[3] + a[4] * b[4] + a[7] * b[5],
    a[2] * b[3] + a[5] * b[4] + a[8] * b[5],
    a[0] * b[6] + a[3] * b[7] + a[6] * b[8],
    a[1] * b[6] + a[4] * b[7] + a[7] * b[8],
    a[2] * b[6] + a[5] * b[7] + a[8] * b[8],
  ];
}

/** Screen space (CSS px, y-down) → NDC. */
function viewportMatrix(width: number, height: number): Mat3 {
  return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
}

function circleRing(cx: number, cy: number, radius: number, segments: number): Vec2[] {
  const points: Vec2[] = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
  }
  return points;
}

export type GpuDriverOptions = {
  antialias?: boolean;
  dpr?: number;
};

/**
 * WebGL2 driver that batches every filled/stroked primitive into a single
 * dynamic vertex buffer and one draw call per frame (text is rasterized to
 * an offscreen canvas and drawn as a textured quad). The API surface is
 * identical to {@link createCpuDriver}.
 */
export function createGpuDriver(canvas: HTMLCanvasElement, options: GpuDriverOptions = {}): RenderDriver {
  const glContext = canvas.getContext('webgl2', { antialias: options.antialias ?? true, alpha: true, premultipliedAlpha: false });
  if (!glContext) throw new Error('Pixelate2D: WebGL2 context unavailable');
  const gl: WebGL2RenderingContext = glContext;
  const dpr = options.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);

  let program: WebGLProgram | null = null;
  let shapeVao: WebGLVertexArrayObject | null = null;
  let shapeBuffer: WebGLBuffer | null = null;
  let projectionLocation: WebGLUniformLocation | null = null;
  let textProgram: WebGLProgram | null = null;
  let textVao: WebGLVertexArrayObject | null = null;
  let textBuffer: WebGLBuffer | null = null;
  let textProjectionLocation: WebGLUniformLocation | null = null;
  let textTextureLocation: WebGLUniformLocation | null = null;
  let textColorLocation: WebGLUniformLocation | null = null;

  let vertices = new Float32Array(4096);
  let vertexCount = 0;
  let batchProjection: Mat3 | null = null;

  const textTextures = new Map<string, { texture: WebGLTexture; width: number; height: number }>();
  const textCanvas = document.createElement('canvas');
  const textContextRaw = textCanvas.getContext('2d');
  if (!textContextRaw) throw new Error('Pixelate2D: offscreen text canvas unavailable');
  const textContext: CanvasRenderingContext2D = textContextRaw;

  let lost = false;
  const camera: Camera = defaultCamera();

  function ensureCapacity(extraVertices: number): void {
    const needed = vertexCount + extraVertices;
    if (needed <= vertices.length) return;
    let size = vertices.length * 2;
    while (size < needed) size *= 2;
    const next = new Float32Array(size);
    next.set(vertices);
    vertices = next;
  }

  function pushVertex(x: number, y: number, r: number, g: number, b: number, a: number): void {
    const i = vertexCount * VERTEX_STRIDE;
    vertices[i] = x;
    vertices[i + 1] = y;
    vertices[i + 2] = r;
    vertices[i + 3] = g;
    vertices[i + 4] = b;
    vertices[i + 5] = a;
    vertexCount++;
  }

  function pushTriangle(p1: Vec2, p2: Vec2, p3: Vec2, color: RGBA4): void {
    pushVertex(p1.x, p1.y, color.r, color.g, color.b, color.a);
    pushVertex(p2.x, p2.y, color.r, color.g, color.b, color.a);
    pushVertex(p3.x, p3.y, color.r, color.g, color.b, color.a);
  }

  function pushQuad(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, color: RGBA4): void {
    pushTriangle(p1, p2, p3, color);
    pushTriangle(p3, p4, p1, color);
  }

  function pushCircleFill(cx: number, cy: number, radius: number, color: RGBA4): void {
    const segments = tessellationFor(radius);
    const center = { x: cx, y: cy };
    const ring = circleRing(cx, cy, radius, segments);
    ensureCapacity(segments * 3);
    for (let i = 0; i < segments; i++) {
      const current = ring[i];
      const next = ring[(i + 1) % segments];
      if (current && next) pushTriangle(center, current, next, color);
    }
  }

  function pushCircleStroke(cx: number, cy: number, radius: number, width: number, color: RGBA4): void {
    const segments = tessellationFor(radius);
    const outer = circleRing(cx, cy, radius + width / 2, segments);
    const inner = circleRing(cx, cy, Math.max(0, radius - width / 2), segments);
    ensureCapacity(segments * 6);
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      const a = outer[i];
      const b = outer[j];
      const c = inner[j];
      const d = inner[i];
      if (a && b && c && d) pushQuad(a, b, c, d, color);
    }
  }

  function pushRectFill(x: number, y: number, w: number, h: number, color: RGBA4): void {
    ensureCapacity(6);
    pushQuad({ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }, color);
  }

  function pushRectStroke(x: number, y: number, w: number, h: number, width: number, color: RGBA4): void {
    const half = width / 2;
    ensureCapacity(24);
    pushQuad({ x, y: y - half }, { x: x + w, y: y - half }, { x: x + w, y: y + half }, { x, y: y + half }, color);
    pushQuad({ x, y: y + h - half }, { x: x + w, y: y + h - half }, { x: x + w, y: y + h + half }, { x, y: y + h + half }, color);
    pushQuad({ x: x - half, y }, { x: x + half, y }, { x: x + half, y: y + h }, { x: x - half, y: y + h }, color);
    pushQuad({ x: x + w - half, y }, { x: x + w + half, y }, { x: x + w + half, y: y + h }, { x: x + w - half, y: y + h }, color);
  }

  function pushPathFill(points: readonly Vec2[], color: RGBA4): void {
    if (points.length < 3) return;
    const first = points[0];
    if (!first) return;
    ensureCapacity((points.length - 2) * 3);
    for (let i = 1; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (a && b) pushTriangle(first, a, b, color);
    }
  }

  function pushPathStroke(points: readonly Vec2[], width: number, color: RGBA4): void {
    ensureCapacity((points.length - 1) * 6);
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const q = points[i + 1];
      if (!p || !q) continue;
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const length = Math.hypot(dx, dy);
      if (length === 0) continue;
      const nx = (-dy / length) * (width / 2);
      const ny = (dx / length) * (width / 2);
      pushQuad({ x: p.x + nx, y: p.y + ny }, { x: q.x + nx, y: q.y + ny }, { x: q.x - nx, y: q.y - ny }, { x: p.x - nx, y: p.y - ny }, color);
    }
  }

  function tessellationFor(radius: number): number {
    return Math.max(12, Math.min(128, Math.round(radius * driver.camera.zoom)));
  }

  function computeProjection(cameraValue: Camera, transform?: Mat2D): Mat3 {
    const cssWidth = canvas.width / dpr;
    const cssHeight = canvas.height / dpr;
    const model = toMat3(transform ?? identity2d());
    const view = toMat3(cameraMatrix(cameraValue));
    return multiplyMat3(viewportMatrix(cssWidth, cssHeight), multiplyMat3(view, model));
  }

  function setBatchProjection(cameraValue: Camera, transform?: Mat2D): void {
    const projection = computeProjection(cameraValue, transform);
    if (batchProjection === null || !sameMat3(batchProjection, projection)) {
      flush();
      batchProjection = projection;
    }
  }

  function flush(): void {
    if (vertexCount === 0 || batchProjection === null) {
      vertexCount = 0;
      batchProjection = null;
      return;
    }
    if (!program || !shapeVao || !shapeBuffer || !projectionLocation) return;
    gl.useProgram(program);
    gl.bindVertexArray(shapeVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.subarray(0, vertexCount * VERTEX_STRIDE), gl.DYNAMIC_DRAW);
    gl.uniformMatrix3fv(projectionLocation, false, batchProjection);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    vertexCount = 0;
    batchProjection = null;
  }

  function sameMat3(a: readonly number[], b: readonly number[]): boolean {
    for (let i = 0; i < 9; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function getTextTexture(text: string, font: string, size: number): { texture: WebGLTexture; width: number; height: number } {
    const key = `${text}|${font}`;
    const cached = textTextures.get(key);
    if (cached) {
      textTextures.delete(key);
      textTextures.set(key, cached);
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
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const entry = { texture, width, height };
    textTextures.set(key, entry);
    if (textTextures.size > MAX_TEXT_CACHE) {
      const oldest = textTextures.keys().next().value;
      if (oldest !== undefined) {
        const stale = textTextures.get(oldest);
        if (stale) gl.deleteTexture(stale.texture);
        textTextures.delete(oldest);
      }
    }
    return entry;
  }

  function initGl(): void {
    program = compileProgram(gl, SHAPE_VERTEX_SRC, SHAPE_FRAGMENT_SRC);
    projectionLocation = gl.getUniformLocation(program, 'u_projection');
    shapeBuffer = gl.createBuffer();
    shapeVao = gl.createVertexArray();
    gl.bindVertexArray(shapeVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, VERTEX_STRIDE * 4, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, VERTEX_STRIDE * 4, 2 * 4);

    textProgram = compileProgram(gl, TEXT_VERTEX_SRC, TEXT_FRAGMENT_SRC);
    textProjectionLocation = gl.getUniformLocation(textProgram, 'u_projection');
    textTextureLocation = gl.getUniformLocation(textProgram, 'u_texture');
    textColorLocation = gl.getUniformLocation(textProgram, 'u_color');
    textBuffer = gl.createBuffer();
    textVao = gl.createVertexArray();
    gl.bindVertexArray(textVao);
    gl.bindBuffer(gl.ARRAY_BUFFER, textBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, TEXT_STRIDE * 4, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, TEXT_STRIDE * 4, 2 * 4);
    gl.bindVertexArray(null);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  function destroyGl(): void {
    if (program) gl.deleteProgram(program);
    if (textProgram) gl.deleteProgram(textProgram);
    if (shapeBuffer) gl.deleteBuffer(shapeBuffer);
    if (textBuffer) gl.deleteBuffer(textBuffer);
    if (shapeVao) gl.deleteVertexArray(shapeVao);
    if (textVao) gl.deleteVertexArray(textVao);
    for (const entry of textTextures.values()) gl.deleteTexture(entry.texture);
    textTextures.clear();
    program = null;
    textProgram = null;
    shapeBuffer = null;
    textBuffer = null;
    shapeVao = null;
    textVao = null;
    vertices = new Float32Array(4096);
    vertexCount = 0;
    batchProjection = null;
  }

  const onContextLost = (event: Event): void => {
    event.preventDefault();
    lost = true;
  };
  const onContextRestored = (): void => {
    lost = false;
    initGl();
  };

  initGl();
  canvas.addEventListener('webglcontextlost', onContextLost, false);
  canvas.addEventListener('webglcontextrestored', onContextRestored, false);

  // Inner functions read `driver.camera` so the engine can swap the active
  // viewport between frames.
  const driver: RenderDriver = {
    kind: 'gpu',
    canvas,
    camera,

    clear(color: Color): void {
      flush();
      if (lost) return;
      const rgba = parseColor(color);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(rgba.r, rgba.g, rgba.b, rgba.a);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },

    drawRectangle(style: DrawStyle, rect: Rect, transform?: Mat2D): void {
      if (lost) return;
      setBatchProjection(driver.camera, transform);
      if (style.fill !== undefined) {
        const color = parseColor(style.fill);
        pushRectFill(rect.x, rect.y, rect.w, rect.h, color);
      }
      if (style.stroke !== undefined) {
        const color = parseColor(style.stroke);
        pushRectStroke(rect.x, rect.y, rect.w, rect.h, style.lineWidth ?? DEFAULT_STROKE_WIDTH, color);
      }
    },

    drawCircle(style: DrawStyle, center: Vec2, radius: number, transform?: Mat2D): void {
      if (lost) return;
      setBatchProjection(driver.camera, transform);
      if (style.fill !== undefined) {
        pushCircleFill(center.x, center.y, radius, parseColor(style.fill));
      }
      if (style.stroke !== undefined) {
        pushCircleStroke(center.x, center.y, radius, style.lineWidth ?? DEFAULT_STROKE_WIDTH, parseColor(style.stroke));
      }
    },

    drawText(style: TextStyle, text: string, position: Vec2, transform?: Mat2D): void {
      if (lost || text.length === 0) return;
      const size = style.fontSize ?? 16;
      const font = `${String(size)}px ${style.fontFamily ?? DEFAULT_FONT_FAMILY}`;
      const { texture, width, height } = getTextTexture(text, font, size);
      flush();

      const projection = computeProjection(driver.camera, transform);
      const x0 = position.x;
      const y0 = position.y - size;
      const x1 = position.x + width;
      const y1 = position.y + (height - size);
      const rgba = parseColor(style.fill ?? '#ffffff');

      gl.useProgram(textProgram);
      gl.bindVertexArray(textVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, textBuffer);
      const data = new Float32Array(6 * TEXT_STRIDE);
      writeTextQuad(data, x0, y0, x1, y1);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STREAM_DRAW);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(textTextureLocation, 0);
      gl.uniform4f(textColorLocation, rgba.r, rgba.g, rgba.b, rgba.a);
      gl.uniformMatrix3fv(textProjectionLocation, false, projection);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },

    drawPath(style: DrawStyle, points: readonly Vec2[], options?: PathOptions, transform?: Mat2D): void {
      if (lost || points.length < 2) return;
      setBatchProjection(driver.camera, transform);
      const fill = options?.fill ?? style.fill !== undefined;
      const stroke = options?.stroke ?? style.stroke !== undefined;
      if (fill && style.fill !== undefined) {
        pushPathFill(points, parseColor(style.fill));
      }
      if (stroke && style.stroke !== undefined) {
        const width = style.lineWidth ?? DEFAULT_STROKE_WIDTH;
        const color = parseColor(style.stroke);
        const first = points[0];
        if (options?.closed && first) {
          pushPathStroke([...points, first], width, color);
        } else {
          pushPathStroke(points, width, color);
        }
      }
    },

    destroy(): void {
      destroyGl();
      canvas.removeEventListener('webglcontextlost', onContextLost, false);
      canvas.removeEventListener('webglcontextrestored', onContextRestored, false);
    },
  };

  return driver;
}

type RGBA4 = { r: number; g: number; b: number; a: number };

/** Write a textured quad (two triangles) into an interleaved pos+uv buffer. */
function writeTextQuad(data: Float32Array, x0: number, y0: number, x1: number, y1: number): void {
  const v = (i: number, x: number, y: number, u: number, uv: number): void => {
    const o = i * 4;
    data[o] = x;
    data[o + 1] = y;
    data[o + 2] = u;
    data[o + 3] = uv;
  };
  v(0, x0, y0, 0, 0); // top-left
  v(1, x1, y0, 1, 0); // top-right
  v(2, x1, y1, 1, 1); // bottom-right
  v(3, x1, y1, 1, 1); // bottom-right
  v(4, x0, y1, 0, 1); // bottom-left
  v(5, x0, y0, 0, 0); // top-left
}
