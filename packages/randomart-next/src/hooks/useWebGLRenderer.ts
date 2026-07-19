import { BEHAVIORS } from '@repo/randomart-engine-next/behaviors';
import type { Node } from '@repo/randomart-engine-next/types';
import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { randomartStore } from '../stores/randomart/store';
import type { UniformLocs } from './types';
import { useAnimationLoop } from './useAnimationLoop';
import { useShaderProgram } from './useShaderProgram';
import { useWebGLContext } from './useWebGLContext';

export function useWebGLRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  trees: {
    treeR: Node;
    treeG: Node;
    treeB: Node;
  },
  running: boolean
) {
  const timeRef = useRef(0);
  const speedRef = useRef(randomartStore.getState().animationSpeed);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { glRef, bitmapSize } = useWebGLContext(canvasRef);

  const activeBehaviorIds = useStore(randomartStore, (s) => s.activeBehaviorIds);
  const colorSpace = useStore(randomartStore, (s) => s.colorSpace);

  const behaviors = activeBehaviorIds.map((id) => BEHAVIORS[id]);

  const animationSpeed = useStore(randomartStore, (s) => s.animationSpeed);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef]);

  const useShaderProgramOptions = {
    glRef,
    bitmapSize,
    trees,
    behaviors,
    colorSpace,
    onReady: (gl: WebGLRenderingContext, locs: UniformLocs) => {
      gl.uniform1f(locs.time, timeRef.current);
      gl.uniform1f(locs.animSpeed, speedRef.current);
      gl.uniform2f(locs.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  };
  const { programRef, uniformLocsRef } = useShaderProgram(useShaderProgramOptions);

  useEffect(() => {
    speedRef.current = animationSpeed;

    const gl = glRef.current;
    if (!running && gl && programRef.current) {
      const { time, animSpeed, mouse } = uniformLocsRef.current;
      gl.uniform1f(time, timeRef.current);
      gl.uniform1f(animSpeed, speedRef.current);
      gl.uniform2f(mouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }, [animationSpeed, running, glRef, programRef, uniformLocsRef]);

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

      const { time, animSpeed, mouse } = uniformLocsRef.current;
      gl.uniform1f(time, timeRef.current);
      gl.uniform1f(animSpeed, speedRef.current);
      gl.uniform2f(mouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    true
  );
}
