import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { getVisualization } from '../../core/visualizations/registry';
import {
  useSequenceSequence,
  useSequenceVisualizationId
} from '../../store/sequenceStore';

function SequenceDisplay(): JSX.Element {
  const sequence = useSequenceSequence();
  const visualizationId = useSequenceVisualizationId();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const visualization = getVisualization(visualizationId);
    visualization?.draw({ canvas, sequence });
  }, [sequence, visualizationId]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
    />
  );
}

export { SequenceDisplay };
