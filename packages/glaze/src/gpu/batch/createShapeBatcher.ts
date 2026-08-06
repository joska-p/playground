import type { Camera, Point2D } from '../../core/coords/camera';
import type { DrawStyle, Rect } from '../../cpu/shapes/types';
import { colorArray } from '../shapes/color';
import {
    type Mat3,
    circleFillVertices,
    circleRing,
    circleSegments,
    circleStrokeVertices,
    capSegments,
    lineVertices,
    projectionFor,
    rectFillVertices,
    rectStrokeVertices,
    sameMat3
} from './geometry';

const VERTEX_STRIDE = 6; // x, y, r, g, b, a
const INITIAL_CAPACITY = 4096;
const DEFAULT_LINE_WIDTH = 1;

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

export type ShapeBatcher = {
    drawCircle(center: Point2D, radius: number, style: DrawStyle): void;
    drawRect(rect: Rect, style: DrawStyle): void;
    drawLine(a: Point2D, b: Point2D, style: DrawStyle): void;
    flush(): void;
    reinitialize(): void;
    destroy(): void;
};

export type ShapeBatcherOptions = {
    gl: WebGL2RenderingContext;
    camera: Camera;
    getViewport: () => { width: number; height: number };
};

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Glaze: batcher shader creation failed');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Glaze: batcher shader compile failed: ${String(log)}`);
    }
    return shader;
}

function compileProgram(
    gl: WebGL2RenderingContext,
    vertexSource: string,
    fragmentSource: string
): WebGLProgram {
    const program = gl.createProgram();
    // gl.createProgram() can return null if the context is lost, but we don't expect that to happen here. If it does, we throw an error.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!program) throw new Error('Glaze: batcher program creation failed');
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(`Glaze: batcher program link failed: ${String(log)}`);
    }
    return program;
}

/**
 * Batches every shape into one dynamic vertex buffer and a single draw call
 * per flush — the pixelate2d approach ported to glaze. Shapes are tessellated
 * on the CPU (position + RGBA per vertex) and drawn through one shared
 * program with a single `u_projection` uniform, instead of a fullscreen
 * fragment pass per shape.
 */
export function createShapeBatcher(options: ShapeBatcherOptions): ShapeBatcher {
    const { gl, camera, getViewport } = options;

    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let buffer: WebGLBuffer | null = null;
    let projectionLocation: WebGLUniformLocation | null = null;
    let vertices = new Float32Array(INITIAL_CAPACITY);
    let vertexCount = 0;
    let batchProjection: Mat3 | null = null;
    let initialized = false;

    const ensureCapacity = (extra: number): void => {
        const needed = vertexCount + extra;
        if (needed <= vertices.length) return;
        let size = vertices.length * 2;
        while (size < needed) size *= 2;
        const next = new Float32Array(size);
        next.set(vertices);
        vertices = next;
    };

    const pushVertex = (
        x: number,
        y: number,
        color: readonly [number, number, number, number]
    ): void => {
        const i = vertexCount * VERTEX_STRIDE;
        vertices[i] = x;
        vertices[i + 1] = y;
        vertices[i + 2] = color[0];
        vertices[i + 3] = color[1];
        vertices[i + 4] = color[2];
        vertices[i + 5] = color[3];
        vertexCount++;
    };

    const pushTriangle = (
        p1: Point2D,
        p2: Point2D,
        p3: Point2D,
        color: readonly [number, number, number, number]
    ): void => {
        pushVertex(p1.x, p1.y, color);
        pushVertex(p2.x, p2.y, color);
        pushVertex(p3.x, p3.y, color);
    };

    const pushQuad = (
        p1: Point2D,
        p2: Point2D,
        p3: Point2D,
        p4: Point2D,
        color: readonly [number, number, number, number]
    ): void => {
        pushTriangle(p1, p2, p3, color);
        pushTriangle(p3, p4, p1, color);
    };

    const pushCircleFill = (
        cx: number,
        cy: number,
        radius: number,
        color: readonly [number, number, number, number]
    ): void => {
        const segments = circleSegments(radius, camera.zoom);
        const ring = circleRing(cx, cy, radius, segments);
        ensureCapacity(circleFillVertices(radius, camera.zoom));
        const center = { x: cx, y: cy };
        for (let i = 0; i < segments; i++) {
            const a = ring[i];
            const b = ring[(i + 1) % segments];
            if (a && b) pushTriangle(center, a, b, color);
        }
    };

    const pushCircleStroke = (
        cx: number,
        cy: number,
        radius: number,
        width: number,
        color: readonly [number, number, number, number]
    ): void => {
        const segments = circleSegments(radius, camera.zoom);
        const outer = circleRing(cx, cy, radius + width / 2, segments);
        const inner = circleRing(cx, cy, Math.max(0, radius - width / 2), segments);
        ensureCapacity(circleStrokeVertices(radius, camera.zoom));
        for (let i = 0; i < segments; i++) {
            const j = (i + 1) % segments;
            const a = outer[i];
            const b = outer[j];
            const c = inner[j];
            const d = inner[i];
            if (a && b && c && d) pushQuad(a, b, c, d, color);
        }
    };

    const pushRectFill = (rect: Rect, color: readonly [number, number, number, number]): void => {
        ensureCapacity(rectFillVertices());
        pushQuad(
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.w, y: rect.y },
            { x: rect.x + rect.w, y: rect.y + rect.h },
            { x: rect.x, y: rect.y + rect.h },
            color
        );
    };

    const pushRectStroke = (
        rect: Rect,
        width: number,
        color: readonly [number, number, number, number]
    ): void => {
        const half = width / 2;
        ensureCapacity(rectStrokeVertices());
        pushQuad(
            { x: rect.x, y: rect.y - half },
            { x: rect.x + rect.w, y: rect.y - half },
            { x: rect.x + rect.w, y: rect.y + half },
            { x: rect.x, y: rect.y + half },
            color
        );
        pushQuad(
            { x: rect.x, y: rect.y + rect.h - half },
            { x: rect.x + rect.w, y: rect.y + rect.h - half },
            { x: rect.x + rect.w, y: rect.y + rect.h + half },
            { x: rect.x, y: rect.y + rect.h + half },
            color
        );
        pushQuad(
            { x: rect.x - half, y: rect.y },
            { x: rect.x + half, y: rect.y },
            { x: rect.x + half, y: rect.y + rect.h },
            { x: rect.x - half, y: rect.y + rect.h },
            color
        );
        pushQuad(
            { x: rect.x + rect.w - half, y: rect.y },
            { x: rect.x + rect.w + half, y: rect.y },
            { x: rect.x + rect.w + half, y: rect.y + rect.h },
            { x: rect.x + rect.w - half, y: rect.y + rect.h },
            color
        );
    };

    const pushCap = (
        center: Point2D,
        dirX: number,
        dirY: number,
        normX: number,
        normY: number,
        half: number,
        segments: number,
        color: readonly [number, number, number, number]
    ): void => {
        ensureCapacity(segments * 3);
        for (let i = 0; i < segments; i++) {
            const t0 = -Math.PI / 2 + (i / segments) * Math.PI;
            const t1 = -Math.PI / 2 + ((i + 1) / segments) * Math.PI;
            pushTriangle(
                center,
                {
                    x: center.x + half * (Math.cos(t0) * dirX + Math.sin(t0) * normX),
                    y: center.y + half * (Math.cos(t0) * dirY + Math.sin(t0) * normY)
                },
                {
                    x: center.x + half * (Math.cos(t1) * dirX + Math.sin(t1) * normX),
                    y: center.y + half * (Math.cos(t1) * dirY + Math.sin(t1) * normY)
                },
                color
            );
        }
    };

    const pushLine = (
        a: Point2D,
        b: Point2D,
        width: number,
        color: readonly [number, number, number, number]
    ): void => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length = Math.hypot(dx, dy);
        if (length === 0) return;
        const ux = dx / length;
        const uy = dy / length;
        const nx = -uy;
        const ny = ux;
        const half = width / 2;
        const segments = capSegments(width, camera.zoom);
        ensureCapacity(lineVertices(width, camera.zoom));
        pushQuad(
            { x: a.x + nx * half, y: a.y + ny * half },
            { x: a.x - nx * half, y: a.y - ny * half },
            { x: b.x - nx * half, y: b.y - ny * half },
            { x: b.x + nx * half, y: b.y + ny * half },
            color
        );
        pushCap(a, -ux, -uy, nx, ny, half, segments, color);
        pushCap(b, ux, uy, nx, ny, half, segments, color);
    };

    const setBatchProjection = (): void => {
        const { width, height } = getViewport();
        const projection = projectionFor(camera, width, height);
        if (batchProjection === null || !sameMat3(batchProjection, projection)) {
            flush();
            batchProjection = projection;
        }
    };

    const flush = (): void => {
        if (vertexCount === 0) {
            batchProjection = null;
            return;
        }
        if (
            !initialized ||
            program === null ||
            vao === null ||
            buffer === null ||
            projectionLocation === null
        ) {
            vertexCount = 0;
            batchProjection = null;
            return;
        }
        const projection =
            batchProjection ??
            (() => {
                const { width, height } = getViewport();
                return projectionFor(camera, width, height);
            })();
        gl.useProgram(program);
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            vertices.subarray(0, vertexCount * VERTEX_STRIDE),
            gl.DYNAMIC_DRAW
        );
        gl.uniformMatrix3fv(projectionLocation, false, projection);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
        vertexCount = 0;
        batchProjection = null;
    };

    const init = (): void => {
        program = compileProgram(gl, SHAPE_VERTEX_SRC, SHAPE_FRAGMENT_SRC);
        projectionLocation = gl.getUniformLocation(program, 'u_projection');
        buffer = gl.createBuffer();
        vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, VERTEX_STRIDE * 4, 0);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, VERTEX_STRIDE * 4, 2 * 4);
        gl.bindVertexArray(null);
        initialized = true;
    };

    const destroy = (): void => {
        if (program) gl.deleteProgram(program);
        if (buffer) gl.deleteBuffer(buffer);
        if (vao) gl.deleteVertexArray(vao);
        program = null;
        buffer = null;
        vao = null;
        projectionLocation = null;
        vertices = new Float32Array(INITIAL_CAPACITY);
        vertexCount = 0;
        batchProjection = null;
        initialized = false;
    };

    const reinitialize = (): void => {
        destroy();
        init();
    };

    init();

    return {
        drawCircle(center: Point2D, radius: number, style: DrawStyle): void {
            if (!initialized) return;
            setBatchProjection();
            if (style.fill !== undefined) {
                pushCircleFill(center.x, center.y, radius, colorArray(style.fill));
            }
            if (style.stroke !== undefined) {
                pushCircleStroke(
                    center.x,
                    center.y,
                    radius,
                    style.lineWidth ?? DEFAULT_LINE_WIDTH,
                    colorArray(style.stroke)
                );
            }
        },

        drawRect(rect: Rect, style: DrawStyle): void {
            if (!initialized) return;
            setBatchProjection();
            if (style.fill !== undefined) {
                pushRectFill(rect, colorArray(style.fill));
            }
            if (style.stroke !== undefined) {
                pushRectStroke(
                    rect,
                    style.lineWidth ?? DEFAULT_LINE_WIDTH,
                    colorArray(style.stroke)
                );
            }
        },

        drawLine(a: Point2D, b: Point2D, style: DrawStyle): void {
            if (!initialized) return;
            const color = style.stroke ?? style.fill;
            if (color === undefined) return;
            setBatchProjection();
            pushLine(a, b, style.lineWidth ?? DEFAULT_LINE_WIDTH, colorArray(color));
        },

        flush,
        reinitialize,
        destroy
    };
}
