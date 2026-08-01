import type { RefObject } from 'react';
import type { ShaderRunner } from '../createShaderRunner';
import type { UniformValue } from '../../core/compileShaderProgram';
import type { CanvasInteractionState } from './useInteractiveCanvas';

/**
 * Returns a function that maps pan/zoom interaction state onto the shader's
 * `u_panOffset` / `u_zoom` uniforms each frame.
 *
 * Pan is stored in CSS pixels (top-left origin, y-down); it is normalized
 * against the canvas size and Y-flipped into vUv space (bottom-left, y-up)
 * before upload. The uniforms are only written when the shader declares them.
 */
export function usePanZoomUniforms(
  runnerRef: RefObject<ShaderRunner | null>,
  interactionRef: RefObject<CanvasInteractionState>
): () => void {
  return () => {
    const runner = runnerRef.current;
    if (!runner) return;
    const interaction = interactionRef.current;

    const pipeline = runner.pipeline;
    const hasPan = pipeline.hasUniform('u_panOffset');
    const hasZoom = pipeline.hasUniform('u_zoom');
    if (!hasPan && !hasZoom) return;

    const values: Record<string, UniformValue> = {};
    if (hasPan) {
      values['u_panOffset'] = [
        -interaction.pan.x / runner.canvas.clientWidth,
        interaction.pan.y / runner.canvas.clientHeight
      ];
    }
    if (hasZoom) {
      values['u_zoom'] = interaction.zoom;
    }
    pipeline.setUniforms(values);
  };
}
