import { createFrameLoop, type FrameCallback } from '../core/FrameLoop';
import { defaultCamera, type Camera, type Point2D } from '../core/Camera';
import { createInputStore, type InputStore } from '../core/InputStore';
import type { DrawStyle, Rect, TextStyle } from '../cpu/shapes/types';
import { ShapeBatcher } from './batch/ShapeBatcher';
import { createProgram, type Program } from './shader/Program';
import { createStandardUniformValues } from './shader/setUniforms';
import {
    TextRasterizer,
    DEFAULT_FONT_FAMILY,
    textFragmentSource,
    textUniforms
} from './shapes/TextRasterizer';

export interface GpuSurfaceConfig {
    canvas: HTMLCanvasElement;
    camera?: Camera;
    /** Backing-buffer pixel ratio; defaults to `window.devicePixelRatio` (or 1 off-browser). */
    dpr?: number;
}

export type GpuDraw = (surface: GpuSurface) => void;

const buildStyle = (fill?: string, stroke?: string, lineWidth?: number): DrawStyle => ({
    ...(fill !== undefined ? { fill } : {}),
    ...(stroke !== undefined ? { stroke } : {}),
    ...(lineWidth !== undefined ? { lineWidth } : {})
});

/**
 * WebGL2 surface with the same chainable, world-space drawing model as `CpuSurface`. Shapes are
 * tessellated into one shared vertex buffer and drawn in a single batched call; `createProgram` /
 * `renderProgram` add fullscreen shader passes. Per-frame state — `time` / `deltaTime` (seconds),
 * `width` / `height` (CSS px) — is updated before each draw callback, and context loss/restore is
 * handled internally.
 */
export class GpuSurface {
    /** Seconds since the frame loop started. */
    time = 0;
    /** Seconds since the previous frame. */
    deltaTime = 0;
    frameCount = 0;
    /** CSS pixels, not device pixels — multiply by `dpr` for the backing-buffer size. */
    width = 0;
    height = 0;
    readonly dpr: number;
    readonly canvas: HTMLCanvasElement;
    readonly gl: WebGL2RenderingContext;
    readonly camera: Camera;
    readonly input: InputStore;

    readonly #loop = createFrameLoop();
    readonly #programs = new Set<Program>();
    readonly #subscribers = new Set<GpuDraw>();
    readonly #batch: ShapeBatcher;
    #draw: GpuDraw | null = null;
    #textRasterizer: TextRasterizer | null = null;
    #textProgram: Program | null = null;
    #cssWidth = 0;
    #cssHeight = 0;
    #lost = false;
    #rendererAttached = false;
    #unsubscribeRenderer: (() => void) | null = null;

    constructor(config: GpuSurfaceConfig) {
        const gl = config.canvas.getContext('webgl2', {
            alpha: true,
            antialias: true,
            premultipliedAlpha: true
        });
        if (!gl) throw new Error('Glaze: WebGL2 not supported');

        this.canvas = config.canvas;
        this.gl = gl;
        this.camera = config.camera ?? defaultCamera();
        this.dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
        this.input = createInputStore();
        this.input.attach(this.canvas);
        this.#batch = new ShapeBatcher({
            gl,
            camera: this.camera,
            getViewport: () => ({ width: this.#cssWidth, height: this.#cssHeight })
        });

        this.#configureState();
        this.#resize();
        this.canvas.addEventListener('webglcontextlost', this.#onContextLost);
        this.canvas.addEventListener('webglcontextrestored', this.#onContextRestored);
    }

    get isRunning(): boolean {
        return this.#loop.isRunning;
    }

    /**
     * Current pointer position in world coordinates.
     * @returns The pointer position, camera-transformed.
     */
    get pointer(): Point2D {
        return this.camera.screenToWorld(this.input.pointer);
    }

    screenToWorld(point: Point2D): Point2D {
        return this.camera.screenToWorld(point);
    }

    worldToScreen(point: Point2D): Point2D {
        return this.camera.worldToScreen(point);
    }

    /**
     * Compiles a fragment shader (over the default fullscreen-triangle vertex shader) into a
     * program owned by this surface: it is destroyed with the surface and recompiled on context
     * restore.
     * @param fragmentSource The fragment shader source.
     * @param vertexSource The vertex shader source; defaults to a fullscreen triangle.
     * @returns The compiled program.
     */
    createProgram(fragmentSource: string, vertexSource?: string): Program {
        const program = createProgram(this.gl, fragmentSource, vertexSource);
        this.#programs.add(program);
        return program;
    }

    /**
     * Flushes pending batched shapes, applies the standard per-frame uniforms, then renders the
     * program as a fullscreen triangle.
     * @param program The program to render.
     * @returns This surface, for chaining.
     */
    renderProgram(program: Program): this {
        this.#flushBatch();
        if (this.#lost) return this;
        program.setUniforms(
            createStandardUniformValues(
                this.width,
                this.height,
                this.dpr,
                this.input.pointer,
                this.camera,
                this.time
            )
        );
        program.render();
        return this;
    }

    rect(
        x: number,
        y: number,
        w: number,
        h: number,
        fill?: string,
        stroke?: string,
        lineWidth?: number
    ): this;
    rect(rect: Rect, style?: DrawStyle): this;
    rect(
        xOrRect: number | Rect,
        yOrStyle?: number | DrawStyle,
        w = 0,
        h = 0,
        fill?: string,
        stroke?: string,
        lineWidth?: number
    ): this {
        if (typeof xOrRect === 'number') {
            this.#drawRect(
                { x: xOrRect, y: yOrStyle as number, w, h },
                buildStyle(fill, stroke, lineWidth)
            );
        } else {
            this.#drawRect(xOrRect, yOrStyle as DrawStyle | undefined);
        }
        return this;
    }

    circle(
        x: number,
        y: number,
        radius: number,
        fill?: string,
        stroke?: string,
        lineWidth?: number
    ): this;
    circle(center: Point2D, radius: number, style?: DrawStyle): this;
    circle(
        xOrCenter: number | Point2D,
        yOrRadius: number,
        radiusOrStyle?: number | DrawStyle,
        fill?: string,
        stroke?: string,
        lineWidth?: number
    ): this {
        if (typeof xOrCenter === 'number') {
            this.#drawCircle(
                { x: xOrCenter, y: yOrRadius },
                radiusOrStyle as number,
                buildStyle(fill, stroke, lineWidth)
            );
        } else {
            this.#drawCircle(xOrCenter, yOrRadius, radiusOrStyle as DrawStyle | undefined);
        }
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number, stroke?: string, lineWidth?: number): this;
    line(a: Point2D, b: Point2D, style?: DrawStyle): this;
    line(
        x1OrA: number | Point2D,
        y1OrB: number | Point2D,
        x2OrStyle?: number | DrawStyle,
        y2 = 0,
        stroke?: string,
        lineWidth?: number
    ): this {
        if (typeof x1OrA === 'number') {
            this.#drawLine(
                { x: x1OrA, y: y1OrB as number },
                { x: x2OrStyle as number, y: y2 },
                buildStyle(undefined, stroke, lineWidth)
            );
        } else {
            this.#drawLine(x1OrA, y1OrB as Point2D, x2OrStyle as DrawStyle | undefined);
        }
        return this;
    }

    text(text: string, x: number, y: number, fill?: string, fontSize?: number): this;
    text(text: string, x: number, y: number, style: TextStyle): this;
    text(text: string, position: Point2D, style: TextStyle): this;
    text(
        text: string,
        xOrPosition: number | Point2D,
        yOrStyle: number | TextStyle,
        fillOrStyle?: string | TextStyle,
        fontSize?: number
    ): this {
        if (typeof xOrPosition === 'number') {
            if (typeof fillOrStyle === 'object') {
                this.#drawText(text, xOrPosition, yOrStyle as number, fillOrStyle);
            } else {
                this.#drawText(text, xOrPosition, yOrStyle as number, {
                    ...(fillOrStyle !== undefined ? { fill: fillOrStyle } : {}),
                    ...(fontSize !== undefined ? { fontSize } : {})
                });
            }
        } else {
            this.#drawText(text, xOrPosition.x, xOrPosition.y, yOrStyle as TextStyle);
        }
        return this;
    }

    /**
     * Clears the framebuffer. `r`/`g`/`b`/`a` are normalized 0..1, unlike the color-string
     * `CpuSurface.clear`.
     * @param r Red, 0..1.
     * @param g Green, 0..1.
     * @param b Blue, 0..1.
     * @param a Alpha, 0..1.
     * @returns This surface, for chaining.
     */
    clear(r = 0, g = 0, b = 0, a = 1): this {
        this.#flushBatch();
        if (this.#lost) return this;
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        return this;
    }

    /**
     * Sets the per-frame draw callback. A non-null callback starts the rAF loop; `null` stops it.
     * @param fn The frame callback, or `null` to stop rendering.
     */
    setDraw(fn: GpuDraw | null): void {
        this.#draw = fn;
        if (fn && this.#subscribers.size === 0) this.#startRendering();
        else if (!fn && this.#subscribers.size === 0) this.#stopRendering();
    }

    subscribe(fn: GpuDraw): () => void {
        this.#subscribers.add(fn);
        this.#startRendering();
        return () => {
            this.#subscribers.delete(fn);
            if (this.#subscribers.size === 0 && this.#draw === null) this.#stopRendering();
        };
    }

    destroy(): void {
        this.#stopRendering();
        this.#loop.dispose();
        this.input.destroy();
        this.canvas.removeEventListener('webglcontextlost', this.#onContextLost);
        this.canvas.removeEventListener('webglcontextrestored', this.#onContextRestored);
        for (const program of this.#programs) program.destroy();
        this.#programs.clear();
        this.#textProgram = null;
        this.#batch.destroy();
        this.#textRasterizer?.destroy();
        this.#textRasterizer = null;
        this.#subscribers.clear();
        this.#draw = null;
    }

    #drawCircle(center: Point2D, radius: number, style?: DrawStyle): void {
        if (this.#lost) return;
        this.#batch.drawCircle(center, radius, style ?? {});
    }

    #drawRect(rect: Rect, style?: DrawStyle): void {
        if (this.#lost) return;
        this.#batch.drawRect(rect, style ?? {});
    }

    #drawLine(a: Point2D, b: Point2D, style?: DrawStyle): void {
        if (this.#lost) return;
        this.#batch.drawLine(a, b, style ?? {});
    }

    #drawText(text: string, x: number, y: number, style: TextStyle): void {
        if (this.#lost || text.length === 0) return;
        this.#flushBatch();
        const rasterizer = (this.#textRasterizer ??= new TextRasterizer(this.gl));
        const size = style.fontSize ?? 16;
        const font = `${String(size)}px ${style.fontFamily ?? DEFAULT_FONT_FAMILY}`;
        const { texture, width, height } = rasterizer.get(text, font, size);
        const program = this.#getTextProgram();
        program.setUniforms(textUniforms({ x, y }, width, height, size, texture, style));
        this.renderProgram(program);
    }

    #getTextProgram(): Program {
        if (this.#textProgram === null) {
            this.#textProgram = this.createProgram(textFragmentSource);
        }
        return this.#textProgram;
    }

    #configureState(): void {
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    #resize(): void {
        this.#cssWidth = Math.max(1, this.canvas.clientWidth);
        this.#cssHeight = Math.max(1, this.canvas.clientHeight);
        const deviceWidth = Math.round(this.#cssWidth * this.dpr);
        const deviceHeight = Math.round(this.#cssHeight * this.dpr);
        if (this.canvas.width !== deviceWidth) this.canvas.width = deviceWidth;
        if (this.canvas.height !== deviceHeight) this.canvas.height = deviceHeight;
        this.gl.viewport(0, 0, deviceWidth, deviceHeight);
    }

    #flushBatch(): void {
        if (this.#lost) return;
        this.#batch.flush();
    }

    #startRendering(): void {
        if (this.#rendererAttached) return;
        this.#unsubscribeRenderer = this.#loop.subscribe(this.#onFrame);
        this.#rendererAttached = true;
    }

    #stopRendering(): void {
        if (!this.#rendererAttached) return;
        this.#unsubscribeRenderer?.();
        this.#unsubscribeRenderer = null;
        this.#rendererAttached = false;
    }

    #onContextLost = (event: Event): void => {
        event.preventDefault();
        this.#lost = true;
    };

    #onContextRestored = (): void => {
        this.#lost = false;
        this.#configureState();
        this.#resize();
        this.#textRasterizer?.clear();
        this.#batch.reinitialize();
        for (const program of this.#programs) program.reinitialize();
    };

    #onFrame: FrameCallback = (time, deltaTime): void => {
        this.#resize();
        this.frameCount++;
        this.time = time;
        this.deltaTime = deltaTime;
        this.width = this.#cssWidth;
        this.height = this.#cssHeight;

        const current = this.#draw;
        if (current) current(this);
        for (const subscriber of this.#subscribers) subscriber(this);
        this.#flushBatch();
        this.input.endFrame();
    };
}

export function createGpuSurface(config: GpuSurfaceConfig): GpuSurface {
    return new GpuSurface(config);
}
