import type { Point2D } from '../../core/coords/camera';
import { beginShape, paintShape } from './paint';
import type { DrawStyle } from './types';

export function drawCircle(
    context: CanvasRenderingContext2D,
    style: DrawStyle,
    center: Point2D,
    radius: number
): void {
    beginShape(context, style);
    context.arc(center.x, center.y, radius, 0, Math.PI * 2);
    paintShape(context, style);
}
