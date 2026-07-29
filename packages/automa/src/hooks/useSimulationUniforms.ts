import type { QuadPipeline } from '@repo/graphics/webgl/QuadPipeline';
import { useEffect, useMemo, useRef } from 'react';
import { getEngine } from '../core/gpu/engineRegistry';
import { useStateColors } from '../stores/ui/selectors';
import { buildStateColorArray } from './color-utils';

type SimulationUniformsRunnerTarget = {
  ctx: {
    gl: WebGL2RenderingContext;
  };
  pipeline: QuadPipeline;
};

type UseSimulationUniformsParams = {
  runnerRef: React.RefObject<SimulationUniformsRunnerTarget | null>;
  cols: number;
  rows: number;
};

function useSimulationUniforms({ runnerRef, cols, rows }: UseSimulationUniformsParams) {
  const stateColors = useStateColors();

  const stateColorsArray = useMemo(() => buildStateColorArray(stateColors), [stateColors]);

  const onBeforeRenderRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    onBeforeRenderRef.current = (time: number) => {
      const runner = runnerRef.current;
      if (!runner) return;

      const engine = getEngine();
      if (!engine) return;

      runner.pipeline.setUniforms({
        gridTexture: engine.getDisplayTexture(),
        stateColors: Array.from(stateColorsArray),
        texelSize: [1 / cols, 1 / rows],
        time
      });
    };
  });

  return { onBeforeRenderRef };
}

export { useSimulationUniforms };
