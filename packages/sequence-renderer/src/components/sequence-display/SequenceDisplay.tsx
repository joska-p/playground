import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { render } from '../../core/visualizations/render';
import {
  useLayersConfig,
  useSequenceSequence
} from '../../stores/sequence/store';

function SequenceDisplay(): JSX.Element {
  const sequence = useSequenceSequence();
  const layers = useLayersConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    render(canvas, sequence, layers);
  }, [sequence, layers]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
    />
  );
}

export { SequenceDisplay };
