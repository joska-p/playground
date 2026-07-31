import type { Point2D } from '@repo/graphics/math/transforms';
import type { ShaderRunner } from '@repo/graphics/webgl/createShaderRunner';
import { useEffect, useRef } from 'react';
import { buildStateColorArray } from '../lib/colors';
import { automaStore } from '../stores/automa';

type UseSimulationUniformsParams = {
  runnerRef: React.RefObject<ShaderRunner | null>;
  interactionState?: { current: { pan: Point2D; zoom: number } };
};

function useSimulationUniforms({ runnerRef, interactionState }: UseSimulationUniformsParams) {
  const onBeforeRenderRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    onBeforeRenderRef.current = (time: number) => {
      const { engine, cols, rows, stateColors } = automaStore.getState();
      if (!engine) return;

      const runner = runnerRef.current;
      if (!runner) return;

      const stateColorsArray = buildStateColorArray(stateColors);
      const interaction = interactionState?.current;

      runner.pipeline.setUniforms({
        gridTexture: engine.getDisplayTexture(),
        stateColors: stateColorsArray,
        texelSize: [1 / cols, 1 / rows],
        time,
        u_panOffset: interaction
          ? [
              interaction.pan.x / runner.canvas.clientWidth,
              -interaction.pan.y / runner.canvas.clientHeight
            ]
          : [0, 0],
        u_zoom: interaction?.zoom ?? 1
      });
    };
  }, [runnerRef, interactionState]);

  return { onBeforeRenderRef };
}

export { useSimulationUniforms };
