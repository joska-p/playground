import type { Point2D } from '../../core/coords/camera';
import { DEFAULT_STROKE_WIDTH } from './paint';
import type { DrawStyle } from './types';

export function drawLine(
        context: CanvasRenderingContext2D,
        style: DrawStyle,
        a: Point2D,
        b: Point2D
): void {
        const stroke = style.stroke ?? style.fill ?? '#000000';
        context.beginPath();
        context.strokeStyle = stroke;
        context.lineWidth = style.lineWidth ?? DEFAULT_STROKE_WIDTH;
        context.lineCap = 'round';
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
}
