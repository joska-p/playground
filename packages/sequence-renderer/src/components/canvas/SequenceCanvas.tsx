import { useRef } from 'react';
import type { JSX } from 'react';
import { useCanvasInteraction } from '../../hooks/useCanvasInteraction';
import { useCanvasRenderer } from '../../hooks/useCanvasRenderer';
import {
  useLayersConfig,
  useSequenceSequence,
  useViewport
} from '../../stores/sequence/store';

function SequenceCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sequence = useSequenceSequence();
  const layers = useLayersConfig();
  const viewport = useViewport();

  useCanvasRenderer(canvasRef, sequence, layers, viewport);
  useCanvasInteraction(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    />
  );
}

export { SequenceCanvas };
