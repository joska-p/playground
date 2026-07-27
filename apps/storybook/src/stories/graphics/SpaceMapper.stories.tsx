import { SpaceMapper } from '@repo/graphics/math/SpaceMapper';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useRef } from 'react';

const meta: Meta = {
  title: 'Graphics / SpaceMapper / Coordinate Alignment',
  tags: ['autodocs'],
  argTypes: {
    dpr: { control: 'select', options: [1, 1.5, 2], description: 'Device pixel ratio' },
    aspectRatio: {
      control: 'select',
      options: ['1:1', '16:9', '4:3'],
      description: 'Canvas aspect ratio'
    },
    padding: {
      control: { type: 'range', min: 0, max: 0.2, step: 0.01 },
      description: 'Padding fraction'
    }
  },
  args: {
    dpr: 1,
    aspectRatio: '16:9',
    padding: 0
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

function getDimensions(aspect: string) {
  const map: Record<string, [number, number]> = {
    '1:1': [400, 400],
    '16:9': [640, 360],
    '4:3': [480, 360]
  };
  return map[aspect] ?? [640, 360];
}

function InteractiveCanvas({
  dpr,
  aspectRatio,
  padding
}: {
  dpr: number;
  aspectRatio: string;
  padding: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const [w, h] = getDimensions(aspectRatio);
      const mapper = new SpaceMapper({ cssWidth: w, cssHeight: h, dpr });

      const screenPt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const uv = mapper.screenToUV(screenPt);
      const buffer = mapper.screenToBuffer(screenPt);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
        const y = (i / 10) * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw crosshair at pointer
      const bx = buffer.x / dpr;
      const by = buffer.y / dpr;
      ctx.strokeStyle = '#ff3366';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx - 12, by);
      ctx.lineTo(bx + 12, by);
      ctx.moveTo(bx, by - 12);
      ctx.lineTo(bx, by + 12);
      ctx.stroke();

      // Draw UV label
      ctx.fillStyle = '#fff';
      ctx.font = '12px monospace';
      ctx.fillText(`UV: ${uv.x.toFixed(3)}, ${uv.y.toFixed(3)}`, bx + 16, by - 8);
      ctx.fillText(`Buffer: ${Math.round(buffer.x)}, ${Math.round(buffer.y)}`, bx + 16, by + 8);
    },
    [dpr, aspectRatio, padding]
  );

  const [w, h] = getDimensions(aspectRatio);
  const padPx = padding * w;

  return (
    <div style={{ padding: padPx, background: '#111', display: 'inline-block' }}>
      <canvas
        ref={canvasRef}
        width={w * dpr}
        height={h * dpr}
        style={{ width: w, height: h, background: '#000', cursor: 'crosshair', display: 'block' }}
        onPointerMove={draw}
      />
    </div>
  );
}

export const CoordinateAlignment: Story = {
  render: (args) => <InteractiveCanvas {...args} />
};
