import type { GpuRuntime } from '@repo/glaze/gpu/createGpuRuntime';
import type { CpuRuntime } from '@repo/glaze/cpu/createCpuRuntime';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import { drawLine } from '@repo/glaze/cpu/shapes/line';
import { drawRect } from '@repo/glaze/cpu/shapes/rect';
import { drawText } from '@repo/glaze/cpu/shapes/text';

export const SCENE = {
    bg: '#0d1117',
    bgGpu: [0.05, 0.07, 0.09] as const,
    circle: { center: { x: 200, y: 150 }, radius: 60, fill: '#e11d48' },
    rect: { x: 30, y: 30, w: 120, h: 90, fill: '#16a34a' },
    line: { a: { x: 30, y: 260 }, b: { x: 200, y: 260 }, stroke: '#3b82f6', lineWidth: 8 },
    text: { text: 'RENDER', position: { x: 220, y: 80 }, fill: '#f8fafc', fontSize: 28 }
} as const;

export function drawSceneCpu(runtime: CpuRuntime): void {
    runtime.clear(SCENE.bg);
    runtime.applyCamera();
    drawCircle(
        runtime.context,
        { fill: SCENE.circle.fill },
        SCENE.circle.center,
        SCENE.circle.radius
    );
    drawRect(
        runtime.context,
        { fill: SCENE.rect.fill },
        { x: SCENE.rect.x, y: SCENE.rect.y, w: SCENE.rect.w, h: SCENE.rect.h }
    );
    drawLine(
        runtime.context,
        { stroke: SCENE.line.stroke, lineWidth: SCENE.line.lineWidth },
        SCENE.line.a,
        SCENE.line.b
    );
    drawText(
        runtime.context,
        { fill: SCENE.text.fill, fontSize: SCENE.text.fontSize },
        SCENE.text.text,
        SCENE.text.position
    );
}

export function drawSceneGpu(runtime: GpuRuntime): void {
    runtime.clear(SCENE.bgGpu[0], SCENE.bgGpu[1], SCENE.bgGpu[2], 1);
    runtime.drawCircle(SCENE.circle.center, SCENE.circle.radius, { fill: SCENE.circle.fill });
    runtime.drawRect(
        { x: SCENE.rect.x, y: SCENE.rect.y, w: SCENE.rect.w, h: SCENE.rect.h },
        { fill: SCENE.rect.fill }
    );
    runtime.drawLine(SCENE.line.a, SCENE.line.b, {
        stroke: SCENE.line.stroke,
        lineWidth: SCENE.line.lineWidth
    });
    runtime.drawText(SCENE.text.text, SCENE.text.position, {
        fill: SCENE.text.fill,
        fontSize: SCENE.text.fontSize
    });
}
