import {
        type Camera,
        type Mat2D,
        type Rect,
        type Vec2,
        defaultCamera
} from '@repo/pixelate2d-math';
import type { Color, DrawStyle, PathOptions, RenderDriver, TextStyle } from '../core/types';

const DEFAULT_FONT_FAMILY = 'sans-serif';
const DEFAULT_STROKE_WIDTH = 1;

export type CpuDriverOptions = {
        dpr?: number;
};

function applyWorld(
        context: CanvasRenderingContext2D,
        camera: Camera,
        dpr: number,
        transform?: Mat2D
): void {
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (transform)
                context.transform(
                        transform.a,
                        transform.b,
                        transform.c,
                        transform.d,
                        transform.tx,
                        transform.ty
                );
        context.transform(camera.zoom, 0, 0, camera.zoom, camera.x, camera.y);
        context.scale(dpr, dpr);
}

function beginShape(context: CanvasRenderingContext2D, style: DrawStyle): void {
        context.beginPath();
        if (style.fill) context.fillStyle = style.fill;
        if (style.stroke) {
                context.strokeStyle = style.stroke;
                context.lineWidth = style.lineWidth ?? DEFAULT_STROKE_WIDTH;
                context.lineJoin = 'round';
                context.lineCap = 'round';
        }
}

function paintShape(
        context: CanvasRenderingContext2D,
        style: DrawStyle,
        options?: PathOptions
): void {
        const fill = options?.fill ?? style.fill !== undefined;
        const stroke = options?.stroke ?? style.stroke !== undefined;
        if (fill && style.fill) context.fill();
        if (stroke && style.stroke) context.stroke();
}

/**
 * Canvas2D-backed driver. Every style is declared per draw call and applied
 * through `setTransform`, so there is no mutable global drawing state.
 */
export function createCpuDriver(
        canvas: HTMLCanvasElement,
        options: CpuDriverOptions = {}
): RenderDriver {
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Pixelate2D: Canvas2D context unavailable');
        const dpr =
                options.dpr ?? (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);

        const driver: RenderDriver = {
                kind: 'cpu',
                canvas,
                camera: defaultCamera(),

                clear(color: Color): void {
                        context.setTransform(1, 0, 0, 1, 0, 0);
                        context.globalAlpha = 1;
                        context.fillStyle = color;
                        context.fillRect(0, 0, canvas.width, canvas.height);
                },

                drawRectangle(style: DrawStyle, rect: Rect, transform?: Mat2D): void {
                        applyWorld(context, driver.camera, dpr, transform);
                        beginShape(context, style);
                        context.rect(rect.x, rect.y, rect.w, rect.h);
                        paintShape(context, style);
                },

                drawCircle(
                        style: DrawStyle,
                        center: Vec2,
                        radius: number,
                        transform?: Mat2D
                ): void {
                        applyWorld(context, driver.camera, dpr, transform);
                        beginShape(context, style);
                        context.arc(center.x, center.y, radius, 0, Math.PI * 2);
                        paintShape(context, style);
                },

                drawText(style: TextStyle, text: string, position: Vec2, transform?: Mat2D): void {
                        applyWorld(context, driver.camera, dpr, transform);
                        const fontSize = String(style.fontSize ?? 16);
                        context.font = `${fontSize}px ${style.fontFamily ?? DEFAULT_FONT_FAMILY}`;
                        context.textAlign = style.align ?? 'left';
                        context.textBaseline = style.baseline ?? 'alphabetic';
                        if (style.stroke) {
                                context.lineWidth = style.lineWidth ?? DEFAULT_STROKE_WIDTH;
                                context.strokeStyle = style.stroke;
                                context.strokeText(text, position.x, position.y);
                        }
                        if (style.fill) {
                                context.fillStyle = style.fill;
                                context.fillText(text, position.x, position.y);
                        }
                },

                drawPath(
                        style: DrawStyle,
                        points: readonly Vec2[],
                        options?: PathOptions,
                        transform?: Mat2D
                ): void {
                        if (points.length < 2) return;
                        applyWorld(context, driver.camera, dpr, transform);
                        beginShape(context, style);
                        const first = points[0];
                        if (first) context.moveTo(first.x, first.y);
                        for (let i = 1; i < points.length; i++) {
                                const point = points[i];
                                if (point) context.lineTo(point.x, point.y);
                        }
                        if (options?.closed) context.closePath();
                        paintShape(context, style, options);
                },

                destroy(): void {
                        context.setTransform(1, 0, 0, 1, 0, 0);
                }
        };

        return driver;
}
