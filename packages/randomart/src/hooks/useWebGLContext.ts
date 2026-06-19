import { useEffect, useRef } from 'react';
import { useCanvasSize } from './useCanvasSize';

const POSITIONS = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

/**
 * Owns the WebGL context lifecycle and canvas geometry buffer.
 * Re-runs only when the canvas element or its display dimensions change —
 * never when shaders or trees change.
 */
export function useWebGLContext(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number }
) {
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);

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

    canvasEl.width = bitmapSize;
    canvasEl.height = bitmapSize;
    canvasEl.style.width = `${logicalSize}px`;
    canvasEl.style.height = `${logicalSize}px`;
    gl.viewport(0, 0, bitmapSize, bitmapSize);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    return () => {
      glRef.current = null;
    };
  }, [canvasRef, logicalSize, bitmapSize]);

  return { glRef, bitmapSize };
}
