import { animationRegistry } from '@repo/randomart-engine/animation/behaviors';
import type { ExpressionNode } from '@repo/randomart-engine/types';
import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { randomartStore } from '../stores/randomart/store';
import { useAnimationLoop } from './useAnimationLoop';
import { useShaderProgram } from './useShaderProgram';
import { useWebGLContext } from './useWebGLContext';

/**
 * Master orchestrator. Wires useWebGLContext and useShaderProgram
 * together and drives the high-frequency GPU animation render loop.
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
  const speedRef = useRef(randomartStore.getState().animationSpeed);

  // 1. Initialize WebGL Context and manage canvas sizing bounds
  const { glRef, bitmapSize } = useWebGLContext(canvasRef, dimensions);

  // 2. Extract active animation behavior configuration states from the store
  const activeAnimationBehaviorIds = useStore(
    randomartStore,
    (s) => s.activeAnimationBehaviorIds
  );

  // Resolve raw behavior implementation instances from our engine registry
  const behaviors = activeAnimationBehaviorIds
    .map((id) => animationRegistry.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => !!b);

  // 3. Keep mutable animation speed reference updated without triggering component redraw loops
  const animationSpeed = useStore(randomartStore, (s) => s.animationSpeed);

  // 4. Handle shader program compilation pipelines
  const { programRef, uniformLocsRef } = useShaderProgram(
    glRef,
    bitmapSize,
    trees,
    behaviors,
    (gl, locs) => {
      // Execute initial draw invocation on program compile/ready frames
      gl.uniform1f(locs.time, timeRef.current);
      gl.uniform1f(locs.animSpeed, speedRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  );

  useEffect(() => {
    speedRef.current = animationSpeed;

    // Direct draw snapshot frame: If updated while paused, give the user real-time feedback immediately
    const gl = glRef.current;
    if (!running && gl && programRef.current) {
      const { time, animSpeed } = uniformLocsRef.current;
      gl.uniform1f(time, timeRef.current);
      gl.uniform1f(animSpeed, speedRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }, [animationSpeed, running, glRef, programRef, uniformLocsRef]);

  // 5. Synchronize internal frame clock counter with global store timeline boundaries on pause/play transitions
  useEffect(() => {
    if (running) {
      timeRef.current = randomartStore.getState().time;
    } else {
      randomartStore.setState({ time: timeRef.current });
    }
  }, [running]);

  // 6. High-frequency 60 FPS frame callback tick engine loop
  useAnimationLoop(
    running,
    (deltaMs) => {
      timeRef.current += deltaMs / 1000;

      const gl = glRef.current;
      if (!gl || !programRef.current) return;

      const { time, animSpeed } = uniformLocsRef.current;
      gl.uniform1f(time, timeRef.current);
      gl.uniform1f(animSpeed, speedRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    true
  );
}
