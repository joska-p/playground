import type { Point2D } from '../../core/coords/camera';
import { beginShape, paintShape } from './paint';
import type { DrawStyle, PathOptions } from './types';

export function drawPath(
    context: CanvasRenderingContext2D,
    style: DrawStyle,
    points: readonly Point2D[],
    options?: PathOptions
): void {
    if (points.length < 2) return;
    beginShape(context, style);
    const first = points[0];
    if (first) context.moveTo(first.x, first.y);
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        if (point) context.lineTo(point.x, point.y);
    }
    if (options?.closed) context.closePath();
    paintShape(context, style, options);
}
