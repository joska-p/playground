import { createFrameLoop, type FrameCallback } from '../core/FrameLoop';
import { defaultCamera, type Camera, type Point2D } from '../core/Camera';
import { createInputStore, type InputStore } from '../core/InputStore';
import type { DrawStyle, PathOptions, Rect, TextStyle } from './shapes/types';

const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_FONT_FAMILY = 'sans-serif';

export interface CpuSurfaceConfig {
    canvas: HTMLCanvasElement;
    camera?: Camera;
    /** Backing-buffer pixel ratio; defaults to `window.devicePixelRatio` (or 1 off-browser). */
    dpr?: number;
}

export type CpuDraw = (surface: CpuSurface) => void;

/**
 * Immediate-mode Canvas2D drawing. Draw calls are chainable and every method returns the surface;
 * drawing happens in world space, with `applyCamera()` running automatically before each frame's
 * callback. Per-frame state — `time` / `deltaTime` (seconds), `frameCount`, `width` / `height`
 * (CSS px) — is updated just before the draw callback runs.
 */
export class CpuSurface {
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
    readonly context: CanvasRenderingContext2D;
    readonly camera: Camera;
    readonly input: InputStore;

    #loop = createFrameLoop();
    #subscribers = new Set<CpuDraw>();
    #cpuDraw: CpuDraw | null = null;
    #frameCount = 0;
    #cssWidth = 0;
    #cssHeight = 0;
    #rendererAttached = false;
    #unsubscribeRenderer: (() => void) | null = null;

    constructor(config: CpuSurfaceConfig) {
        const context = config.canvas.getContext('2d');
        if (!context) throw new Error('Glaze: Canvas2D context unavailable');

        this.canvas = config.canvas;
        this.context = context;
        this.camera = config.camera ?? defaultCamera();
        this.dpr = config.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
        this.input = createInputStore();
        this.input.attach(this.canvas);

        // Size the canvas once up front so one-shot draws made outside the frame loop survive
        // (the loop's first resize would otherwise clear the buffer).
        this.#resize();
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
     * Sets the per-frame draw callback. A non-null callback starts the rAF loop; `null` stops it.
     * @param newCpuDraw The frame callback, or `null` to stop rendering.
     */
    setDraw(newCpuDraw: CpuDraw | null): void {
        this.#cpuDraw = newCpuDraw;
        if (newCpuDraw && this.#subscribers.size === 0) this.#startRendering();
        else if (!newCpuDraw && this.#subscribers.size === 0) this.#stopRendering();
    }

    /**
     * Adds a draw callback, starting the loop if it is not running. The returned function removes
     * the callback and stops the loop once none remain.
     * @param fn The frame callback.
     * @returns Removes the callback and stops rendering when the last one is gone.
     */
    subscribe(fn: CpuDraw): () => void {
        this.#subscribers.add(fn);
        this.#startRendering();
        return () => {
            this.#subscribers.delete(fn);
            if (this.#subscribers.size === 0 && this.#cpuDraw === null) this.#stopRendering();
        };
    }

    clear(color: string): this {
        const context = this.context;
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = color;
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.restore();
        return this;
    }

    /**
     * Resets the context transform, then applies the camera (`zoom` plus `x`/`y` pan) scaled by
     * `dpr`. Runs automatically before each frame's draw callback; call manually before one-shot
     * draws made outside the loop.
     * @returns This surface, for chaining.
     */
    applyCamera(): this {
        const context = this.context;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.transform(this.camera.zoom, 0, 0, this.camera.zoom, this.camera.x, this.camera.y);
        context.scale(this.dpr, this.dpr);
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
            this.#begin(fill, stroke, lineWidth);
            this.context.rect(xOrRect, yOrStyle as number, w, h);
            this.#paintShape(fill, stroke);
        } else {
            const style = yOrStyle as DrawStyle | undefined;
            this.rect(
                xOrRect.x,
                xOrRect.y,
                xOrRect.w,
                xOrRect.h,
                style?.fill,
                style?.stroke,
                style?.lineWidth
            );
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
            this.#begin(fill, stroke, lineWidth);
            this.context.arc(xOrCenter, yOrRadius, radiusOrStyle as number, 0, Math.PI * 2);
            this.#paintShape(fill, stroke);
        } else {
            const style = radiusOrStyle as DrawStyle | undefined;
            this.circle(
                xOrCenter.x,
                xOrCenter.y,
                yOrRadius,
                style?.fill,
                style?.stroke,
                style?.lineWidth
            );
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
            this.#strokeLine(x1OrA, y1OrB as number, x2OrStyle as number, y2, stroke, lineWidth);
        } else {
            const b = y1OrB as Point2D;
            const style = x2OrStyle as DrawStyle | undefined;
            this.line(x1OrA.x, x1OrA.y, b.x, b.y, style?.stroke, style?.lineWidth);
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
            const style = typeof fillOrStyle === 'object' ? fillOrStyle : undefined;
            const fill = typeof fillOrStyle === 'string' ? fillOrStyle : style?.fill;
            this.#drawText(
                text,
                xOrPosition,
                yOrStyle as number,
                fill,
                style ? style.fontSize : fontSize,
                style
            );
        } else {
            const style = yOrStyle as TextStyle;
            this.#drawText(text, xOrPosition.x, xOrPosition.y, style.fill, style.fontSize, style);
        }
        return this;
    }

    path(
        points: readonly Point2D[],
        fill?: string,
        stroke?: string,
        lineWidth?: number,
        closed?: boolean
    ): this;
    path(points: readonly Point2D[], style?: DrawStyle, options?: PathOptions): this;
    path(
        points: readonly Point2D[],
        fillOrStyle?: string | DrawStyle,
        strokeOrOptions?: string | PathOptions,
        lineWidth?: number,
        closed?: boolean
    ): this {
        if (typeof fillOrStyle === 'string') {
            this.#drawPath(
                points,
                fillOrStyle,
                strokeOrOptions as string | undefined,
                lineWidth,
                closed
            );
        } else {
            const options = strokeOrOptions as PathOptions | undefined;
            this.#drawPath(
                points,
                fillOrStyle?.fill,
                fillOrStyle?.stroke,
                fillOrStyle?.lineWidth,
                options?.closed,
                options
            );
        }
        return this;
    }

    destroy(): void {
        this.#stopRendering();
        this.#loop.dispose();
        this.input.destroy();
        this.#subscribers.clear();
        this.#cpuDraw = null;
    }

    #onFrame: FrameCallback = (time, deltaTime): void => {
        this.#resize();
        this.#frameCount++;
        this.applyCamera();

        this.time = time;
        this.deltaTime = deltaTime;
        this.frameCount = this.#frameCount;
        this.width = this.#cssWidth;
        this.height = this.#cssHeight;

        const current = this.#cpuDraw;
        if (current) current(this);
        for (const subscriber of this.#subscribers) subscriber(this);
        this.input.endFrame();
    };

    #resize(): void {
        this.#cssWidth = Math.max(1, this.canvas.clientWidth);
        this.#cssHeight = Math.max(1, this.canvas.clientHeight);
        const deviceWidth = Math.round(this.#cssWidth * this.dpr);
        const deviceHeight = Math.round(this.#cssHeight * this.dpr);
        if (this.canvas.width !== deviceWidth) this.canvas.width = deviceWidth;
        if (this.canvas.height !== deviceHeight) this.canvas.height = deviceHeight;
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

    #begin(fill?: string, stroke?: string, lineWidth?: number): void {
        const context = this.context;
        context.beginPath();
        if (fill) context.fillStyle = fill;
        if (stroke) {
            context.strokeStyle = stroke;
            context.lineWidth = lineWidth ?? DEFAULT_STROKE_WIDTH;
            context.lineJoin = 'round';
            context.lineCap = 'round';
        }
    }

    #paintShape(fill?: string, stroke?: string, options?: PathOptions): void {
        const doFill = options?.fill ?? fill !== undefined;
        const doStroke = options?.stroke ?? stroke !== undefined;
        if (doFill && fill) this.context.fill();
        if (doStroke && stroke) this.context.stroke();
    }

    #strokeLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        stroke?: string,
        lineWidth?: number
    ): void {
        const context = this.context;
        context.beginPath();
        context.strokeStyle = stroke ?? '#000000';
        context.lineWidth = lineWidth ?? DEFAULT_STROKE_WIDTH;
        context.lineCap = 'round';
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    #drawText(
        text: string,
        x: number,
        y: number,
        fill: string | undefined,
        fontSize: number | undefined,
        style?: TextStyle
    ): void {
        const context = this.context;
        const size = String(fontSize ?? 16);
        context.font = `${size}px ${style?.fontFamily ?? DEFAULT_FONT_FAMILY}`;
        context.textAlign = style?.align ?? 'left';
        context.textBaseline = style?.baseline ?? 'alphabetic';
        if (style?.stroke) {
            context.lineWidth = style.lineWidth ?? DEFAULT_STROKE_WIDTH;
            context.strokeStyle = style.stroke;
            context.strokeText(text, x, y);
        }
        if (fill) {
            context.fillStyle = fill;
            context.fillText(text, x, y);
        }
    }

    #drawPath(
        points: readonly Point2D[],
        fill?: string,
        stroke?: string,
        lineWidth?: number,
        closed?: boolean,
        options?: PathOptions
    ): void {
        if (points.length < 2) return;
        this.#begin(fill, stroke, lineWidth);
        const context = this.context;
        const first = points[0];
        if (first) context.moveTo(first.x, first.y);
        for (let i = 1; i < points.length; i++) {
            const point = points[i];
            if (point) context.lineTo(point.x, point.y);
        }
        if (options?.closed ?? closed) context.closePath();
        this.#paintShape(fill, stroke, options);
    }
}

export function createCpuSurface(config: CpuSurfaceConfig): CpuSurface {
    return new CpuSurface(config);
}
