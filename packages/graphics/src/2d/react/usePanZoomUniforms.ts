import type { RefObject } from 'react';
import type { ShaderRunner } from '../createShaderRunner';
import type { UniformValue } from '../../core/compileShaderProgram';
import type { PanZoomState } from './usePanZoom';

export function usePanZoomUniforms(
  runnerRef: RefObject<ShaderRunner | null>,
  panZoomRef: RefObject<PanZoomState | null>
): () => void {
  return () => {
    const runner = runnerRef.current;
    const panZoomState = panZoomRef.current;
    if (!runner || !panZoomState) return;

    const pipeline = runner.pipeline;
    const hasPan = pipeline.hasUniform('u_panOffset');
    const hasZoom = pipeline.hasUniform('u_zoom');
    if (!hasPan && !hasZoom) return;

    const values: Record<string, UniformValue> = {};
    if (hasPan) {
      values['u_panOffset'] = [
        panZoomState.pan.x / runner.canvas.clientWidth,
        -panZoomState.pan.y / runner.canvas.clientHeight
      ];
    }
    if (hasZoom) {
      values['u_zoom'] = panZoomState.zoom;
    }
    pipeline.setUniforms(values);
  };
}
