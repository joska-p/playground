import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';
import { useAnimationLoop } from './useAnimationLoop';
import { useShaderProgram } from './useShaderProgram';
import { useWebGLContext } from './useWebGLContext';

/**
 * Thin orchestrator. Its only job is to wire useWebGLContext and
 * useShaderProgram together and drive the animation loop.
 *
 * Responsibility map:
 *   useWebGLContext   → GL context, canvas sizing, geometry buffer
 *   useShaderProgram  → shader compilation, program lifecycle, uniform locations
 *   useWebGLRenderer  → time tracking, animation loop, store sync
 *
 * No enabled flag — this hook is only mounted when the WebGL renderer
 * is active. Conditional rendering in the parent handles the switch.
 */
export function useWebGLRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number },
  trees: {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
  },
  running: boolean
) {
  const timeRef = useRef(0);

  const { glRef, bitmapSize } = useWebGLContext(canvasRef, dimensions);

  const { programRef, uniformLocsRef } = useShaderProgram(
    glRef,
    bitmapSize,
    trees,
    (gl, locs) => {
      gl.uniform1f(locs.time, timeRef.current);
      gl.uniform1f(locs.animSpeed, randomartStore.getState().animationSpeed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  );

  // Pull store time into ref when resuming; flush ref back to store on pause.
  useEffect(() => {
    if (running) {
      timeRef.current = randomartStore.getState().time;
    } else {
      randomartStore.setState({ time: timeRef.current });
    }
  }, [running]);

  useAnimationLoop(
    running,
    (deltaMs) => {
      timeRef.current += deltaMs / 1000;

      const gl = glRef.current;
      if (!gl || !programRef.current) return;

      const { time, animSpeed } = uniformLocsRef.current;
      gl.uniform1f(time, timeRef.current);
      gl.uniform1f(animSpeed, randomartStore.getState().animationSpeed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    true
  );

  // Redraw when animationSpeed changes while paused.
  const animationSpeed = useStore(randomartStore, (s) => s.animationSpeed);
  useEffect(() => {
    if (running) return;

    const gl = glRef.current;
    if (!gl || !programRef.current) return;

    const { time, animSpeed } = uniformLocsRef.current;
    gl.uniform1f(time, timeRef.current);
    gl.uniform1f(animSpeed, animationSpeed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [running, animationSpeed, glRef, programRef, uniformLocsRef]);
}
