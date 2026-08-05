import { useEffect, useRef } from 'react';
import { createGpuDoor, type GpuDoor, type GpuFrameContext } from '@repo/glaze/gpu/createGpuDoor';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { verifyGpuShapes, type GpuShapeResults } from './gpuShapes';

declare global {
  interface Window {
    __glazeGpu?: GpuShapeResults;
  }
}

type GpuShapesCanvasProps = {
  width: number;
  height: number;
};

const paintScene = (door: GpuDoor, ctx: GpuFrameContext): void => {
  door.clear(0.05, 0.07, 0.09, 1);
  door.drawCircle({ x: 200, y: 150 }, 60, { fill: '#e11d48' });
  door.drawRect({ x: 30, y: 30, w: 120, h: 90 }, { fill: '#16a34a' });
  door.drawLine({ x: 30, y: 260 }, { x: 200, y: 260 }, { stroke: '#3b82f6', lineWidth: 8 });
  door.drawText('RENDER', { x: 220, y: 80 }, { fill: '#f8fafc', fontSize: 28 });
  if (ctx.frameCount === 3) {
    window.__glazeGpu = verifyGpuShapes(door, ctx.width, ctx.height, ctx.dpr);
  }
};

export function GpuShapesCanvas({ width, height }: GpuShapesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const door = createGpuDoor({ canvas });
    door.setDraw((ctx) => paintScene(door, ctx));
    return () => door.destroy();
  }, []);

  return <canvas ref={canvasRef} style={{ width: `${width}px`, height: `${height}px` }} />;
}

const meta: Meta<typeof GpuShapesCanvas> = {
  title: 'Glaze/GpuShapes',
  component: GpuShapesCanvas,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    width: 400,
    height: 300
  }
};

export default meta;

type Story = StoryObj<typeof GpuShapesCanvas>;

export const Shapes: Story = {};
