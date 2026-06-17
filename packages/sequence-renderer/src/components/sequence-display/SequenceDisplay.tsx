import type { JSX } from 'react';
import { useEffect, useRef } from 'react';
import { render } from '../../core/visualizations/render';
import {
  useLayersConfig,
  useSequenceSequence,
  useViewport
} from '../../stores/sequence/store';

function SequenceDisplay(): JSX.Element {
  const sequence = useSequenceSequence();
  const layers = useLayersConfig();
  const viewport = useViewport();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    render(canvas, sequence, layers, viewport);
  }, [sequence, layers, viewport]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
    />
  );
}

export { SequenceDisplay };
