import type { JSX } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { resolveVisualization } from '../../core/visualizations/resolve-visualization';
import {
  useLayersConfig,
  useScaleConfig,
  useSequenceSequence
} from '../../stores/sequence/store';

function SequenceDisplay(): JSX.Element {
  const sequence = useSequenceSequence();
  const layers = useLayersConfig();
  const scale = useScaleConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const visualization = useMemo(
    () =>
      resolveVisualization({
        layers,
        scale
      }),
    [layers, scale]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    visualization.draw({ canvas, sequence });
  }, [visualization, sequence]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
    />
  );
}

export { SequenceDisplay };
