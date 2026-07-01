import { useEffect, useRef } from 'react';
import { useCanvasSize } from './useCanvasSize';

const POSITIONS = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

/**
 * Owns the WebGL context lifecycle and canvas geometry buffer.
 * Separates core hardware initialization from dynamic resize operations.
 */
export function useWebGLContext(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number }
) {
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);

  // Effect 1: Core WebGL Initialization (Runs once per canvas element lifetime)
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl', {
      preserveDrawingBuffer: true,
      alpha: false,
      antialias: false
    });
    if (!gl) return;

    glRef.current = gl;

    // Create and populate the static screen-quad position buffer once
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    return () => {
      gl.deleteBuffer(positionBuffer);
      glRef.current = null;
    };
  }, [canvasRef]);

  // Effect 2: Geometry Sizing Updates (Safe to run frequently on window resizing)
  useEffect(() => {
    const canvasEl = canvasRef.current;
    const gl = glRef.current;
    if (!canvasEl || !gl) return;

    // Adjust drawing buffer capacity dimensions
    canvasEl.width = bitmapSize;
    canvasEl.height = bitmapSize;

    // Adjust CSS layout layout boundaries
    canvasEl.style.width = `${String(logicalSize)}px`;
    canvasEl.style.height = `${String(logicalSize)}px`;

    // Map normalized device coordinates to the newly allocated texture size
    gl.viewport(0, 0, bitmapSize, bitmapSize);
  }, [bitmapSize, logicalSize, canvasRef]);

  return { glRef, bitmapSize };
}
