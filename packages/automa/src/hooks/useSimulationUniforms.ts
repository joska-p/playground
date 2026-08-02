import type { ShaderRunner } from '@repo/graphics/2d/createShaderRunner';
import { useEffect, useRef } from 'react';
import { buildStateColorArray } from '../lib/colors';
import { automaStore } from '../stores/automa';
import type { PanZoomState } from '@repo/graphics/2d/react/usePanZoom';

type UseSimulationUniformsParams = {
  runnerRef: React.RefObject<ShaderRunner | null>;
  panZoomRef?: React.RefObject<PanZoomState | null>;
};

function useSimulationUniforms({ runnerRef, panZoomRef }: UseSimulationUniformsParams) {
  const onBeforeRenderRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    onBeforeRenderRef.current = () => {
      const { engine, cols, rows, stateColors } = automaStore.getState();
      if (!engine) return;

      const runner = runnerRef.current;
      if (!runner) return;

      const stateColorsArray = buildStateColorArray(stateColors);
      const panZoomState = panZoomRef?.current;

      runner.pipeline.setUniforms({
        gridTexture: engine.getDisplayTexture(),
        stateColors: stateColorsArray,
        texelSize: [1 / cols, 1 / rows],
        u_panOffset: panZoomState
          ? [
              panZoomState.pan.x / runner.canvas.clientWidth,
              -panZoomState.pan.y / runner.canvas.clientHeight
            ]
          : [0, 0],
        u_zoom: panZoomState?.zoom ?? 1
      });
    };
  }, [runnerRef, panZoomRef]);

  return { onBeforeRenderRef };
}

export { useSimulationUniforms };
