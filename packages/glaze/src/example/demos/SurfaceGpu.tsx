import { useState } from 'react';
import type { GpuDoor, GpuDraw } from '@repo/glaze/gpu/createGpuDoor';
import { GpuCanvas } from '@repo/glaze/react/GpuCanvas';
import { verifyGpuShapes } from '../proof/gpuProbe';
import { stashProof } from '../proof/types';
import { SCENE } from './scene';

export function SurfaceGpu() {
  const [door, setDoor] = useState<GpuDoor | null>(null);

  const onFrame: GpuDraw = (ctx) => {
    if (!door) return;
    door.clear(SCENE.bgGpu[0], SCENE.bgGpu[1], SCENE.bgGpu[2], 1);
    door.drawCircle(SCENE.circle.center, SCENE.circle.radius, { fill: SCENE.circle.fill });
    door.drawRect(
      { x: SCENE.rect.x, y: SCENE.rect.y, w: SCENE.rect.w, h: SCENE.rect.h },
      { fill: SCENE.rect.fill }
    );
    door.drawLine(SCENE.line.a, SCENE.line.b, {
      stroke: SCENE.line.stroke,
      lineWidth: SCENE.line.lineWidth
    });
    door.drawText(SCENE.text.text, SCENE.text.position, {
      fill: SCENE.text.fill,
      fontSize: SCENE.text.fontSize
    });
    if (ctx.frameCount === 3) {
      stashProof('surfaceGpu', verifyGpuShapes(door, ctx.height, ctx.dpr));
    }
  };

  return (
    <div className="h-75 w-100">
      <GpuCanvas
        onDoor={setDoor}
        onFrame={onFrame}
        className="h-full w-full"
      />
    </div>
  );
}
