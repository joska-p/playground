import type { QuadPipeline } from '@repo/graphics/webgl/QuadPipeline';
import { createGridWebGLTexture, uploadGridTexture } from '@repo/graphics/webgl/texture-utils';
import { useEffect, useMemo, useRef } from 'react';
import { simulationStore } from '../stores/simulation/store';
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

  const lastRenderedGeneration = useRef(-1);
  const textureRef = useRef<{ texture: WebGLTexture; data: Uint8Array } | null>(null);
  const allocatedGlRef = useRef<WebGL2RenderingContext | null>(null);

  const stateColorsArray = useMemo(() => buildStateColorArray(stateColors), [stateColors]);

  // Clean up texture when unmounting or grid size changes
  useEffect(() => {
    return () => {
      if (textureRef.current && allocatedGlRef.current) {
        allocatedGlRef.current.deleteTexture(textureRef.current.texture);
        textureRef.current = null;
        allocatedGlRef.current = null;
      }
    };
  }, [cols, rows]);

  const onBeforeRenderRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    onBeforeRenderRef.current = (time: number) => {
      const runner = runnerRef.current;
      if (!runner) return;

      const gl = runner.ctx.gl;

      // Lazily allocate WebGL texture if context changed or hasn't been created yet
      if (!textureRef.current || allocatedGlRef.current !== gl) {
        if (textureRef.current && allocatedGlRef.current) {
          allocatedGlRef.current.deleteTexture(textureRef.current.texture);
        }
        textureRef.current = createGridWebGLTexture(gl, cols, rows);
        allocatedGlRef.current = gl;
        lastRenderedGeneration.current = -1; // Force texture re-upload
      }

      const res = textureRef.current;

      const { grid, generation } = simulationStore.getState();

      // Only re-upload pixel data if simulation state advanced
      if (generation !== lastRenderedGeneration.current) {
        for (let i = 0; i < grid.length; i++) {
          res.data[i] = grid[i] ?? 0;
        }
        uploadGridTexture(gl, res.texture, res.data, cols, rows);
        lastRenderedGeneration.current = generation;
      }

      runner.pipeline.setUniforms({
        gridTexture: res.texture,
        stateColors: Array.from(stateColorsArray),
        texelSize: [1 / cols, 1 / rows],
        time
      });
    };
  });

  return { onBeforeRenderRef };
}
