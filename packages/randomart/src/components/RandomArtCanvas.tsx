import { useRef } from 'react';
import { useWebGLRenderer } from '../hooks/useWebGLRenderer';
import { useRunning, useTreeB, useTreeG, useTreeR } from '../stores/randomart/selectors';

export function RandomArtCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const treeR = useTreeR();
  const treeG = useTreeG();
  const treeB = useTreeB();
  const running = useRunning();

  useWebGLRenderer(canvasRef, { treeR, treeG, treeB }, running);

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden p-4">
      <canvas
        ref={canvasRef}
        className="rounded-sm"
      />
    </div>
  );
}
