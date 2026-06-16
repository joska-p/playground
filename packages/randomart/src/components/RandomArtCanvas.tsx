import { Button } from '@repo/ui/Button';
import { useEffect, useRef } from 'react';
import { evaluateNode } from '../core/engine';
import { useSeedText } from '../stores/randomart/selectors/useSeedText';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors/useTrees';

type Props = {
  size?: number;
};

export function RandomArtCanvas({ size = 350 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const seedText = useSeedText();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const imgData = ctx.createImageData(size, size);

    for (let py = 0; py < size; py++) {
      const y = (py / size) * 2 - 1;
      for (let px = 0; px < size; px++) {
        const x = (px / size) * 2 - 1;

        const r = Math.floor(((evaluateNode(treeR, x, y) + 1) / 2) * 255);
        const g = Math.floor(((evaluateNode(treeG, x, y) + 1) / 2) * 255);
        const b = Math.floor(((evaluateNode(treeB, x, y) + 1) / 2) * 255);

        const index = (py * size + px) * 4;
        imgData.data[index] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }, [treeR, treeG, treeB, size]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `randomart-${(seedText || 'untitled').replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        aria-label={`Generative art for seed "${seedText}"`}
        className="border-border max-w-full rounded-xl border shadow-lg"
        style={{ aspectRatio: '1' }}
      />
      <Button
        type="button"
        onClick={handleDownload}
        variant="primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line
            x1="12"
            y1="15"
            x2="12"
            y2="3"
          />
        </svg>
        Download PNG
      </Button>
    </>
  );
}
