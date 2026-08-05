import { useState } from 'react';
import type { CpuDoor, CpuDraw } from '@repo/glaze/cpu/createCpuDoor';
import { drawCircle } from '@repo/glaze/cpu/shapes/circle';
import { drawLine } from '@repo/glaze/cpu/shapes/line';
import { drawRect } from '@repo/glaze/cpu/shapes/rect';
import { drawText } from '@repo/glaze/cpu/shapes/text';
import { CpuCanvas } from '@repo/glaze/react/CpuCanvas';
import { verifyCpuShapes } from '../proof/cpuProbe';
import { stashProof } from '../proof/types';
import { SCENE } from './scene';

export function SurfaceCpu() {
  const [door, setDoor] = useState<CpuDoor | null>(null);

  const onFrame: CpuDraw = (ctx) => {
    if (!door) return;
    door.clear(SCENE.bg);
    door.applyCamera();
    drawCircle(door.context, { fill: SCENE.circle.fill }, SCENE.circle.center, SCENE.circle.radius);
    drawRect(
      door.context,
      { fill: SCENE.rect.fill },
      { x: SCENE.rect.x, y: SCENE.rect.y, w: SCENE.rect.w, h: SCENE.rect.h }
    );
    drawLine(door.context, { stroke: SCENE.line.stroke, lineWidth: SCENE.line.lineWidth }, SCENE.line.a, SCENE.line.b);
    drawText(door.context, { fill: SCENE.text.fill, fontSize: SCENE.text.fontSize }, SCENE.text.text, SCENE.text.position);
    if (ctx.frameCount === 3) {
      stashProof('surfaceCpu', verifyCpuShapes(door, ctx.dpr));
    }
  };

  return (
    <div className="h-[300px] w-[400px]">
      <CpuCanvas onDoor={setDoor} onFrame={onFrame} className="h-full w-full" />
    </div>
  );
}
