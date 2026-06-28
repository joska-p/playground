import { useRef } from 'react';
import { useCanvasInteraction } from '../hooks/useCanvasInteraction';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';
import { useSequenceSequence } from '../stores/sequence/selectors/useSequenceSequence';
import { useLayersConfig } from '../stores/ui/selectors/useLayersConfig';
import { useViewport } from '../stores/ui/selectors/useViewport';

function SequenceCanvas() {
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
