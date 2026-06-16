import { useEffect, useRef } from 'react';
import { evaluateNode } from '../core/engine';
import {
  useTreeB,
  useTreeG,
  useTreeR
} from '../stores/randomart/selectors/useTrees';

type Props = {
  size?: number;
};

export function RandomArtCanvas({ size = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();

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

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="border-border rounded-xl border shadow-lg"
    />
  );
}
