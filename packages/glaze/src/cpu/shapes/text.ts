import type { Point2D } from '../../core/coords/camera';
import { DEFAULT_FONT_FAMILY, DEFAULT_STROKE_WIDTH } from './paint';
import type { TextStyle } from './types';

export function drawText(
    context: CanvasRenderingContext2D,
    style: TextStyle,
    text: string,
    position: Point2D
): void {
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
}
