import type { QuadPipeline } from '@repo/graphics/webgl/QuadPipeline';
import { useEffect, useMemo, useRef } from 'react';
import { getEngine } from '../core/gpu/engine-ref';
import { useStateColors } from '../stores/ui/selectors';
import { buildStateColorArray } from './grid-texture.utils';

export type GridTextureRunnerTarget = {
  ctx: {
    gl: WebGL2RenderingContext;
  };
  pipeline: QuadPipeline;
};

export type UseGridTextureParams = {
  runnerRef: React.RefObject<GridTextureRunnerTarget | null>;
  cols: number;
  rows: number;
};

export function useGridTexture({ runnerRef, cols, rows }: UseGridTextureParams) {
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
