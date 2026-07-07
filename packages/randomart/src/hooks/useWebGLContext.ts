import { useEffect, useRef, useState } from 'react';

const POSITIONS = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

export type BitmapSize = {
  width: number;
  height: number;
};

export function useWebGLContext(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const glRef = useRef<WebGLRenderingContext | null>(null);

  const [bitmapSize, setBitmapSize] = useState<BitmapSize>({ width: 0, height: 0 });

  // Effect 1: Core WebGL Initialization (runs once)
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl', {
      preserveDrawingBuffer: true,
      alpha: false,
      antialias: false
    });

    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    glRef.current = gl;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    return () => {
      gl.deleteBuffer(positionBuffer);
      glRef.current = null;
    };
  }, [canvasRef]);

  // Effect 2: Resize logic
  useEffect(() => {
    const canvasEl = canvasRef.current;
    const gl = glRef.current;
    if (!canvasEl || !gl) return;

    const parentRect = canvasEl.parentElement?.getBoundingClientRect();
    if (!parentRect) throw new Error('Canvas must have a parent element');

    const dpr = window.devicePixelRatio || 1;

    // Increased limits — feel free to adjust
    const maxLogicalWidth = 1400;
    const maxLogicalHeight = 1000;
    const maxBitmap = 2048;

    // Clamp
    const logicalWidth = Math.max(400, Math.min(Math.floor(parentRect.width), maxLogicalWidth));
    const logicalHeight = Math.max(400, Math.min(Math.floor(parentRect.height), maxLogicalHeight));

    const bitmapWidth = Math.min(Math.round(logicalWidth * dpr), maxBitmap);
    const bitmapHeight = Math.min(Math.round(logicalHeight * dpr), maxBitmap);

    setBitmapSize({ width: bitmapWidth, height: bitmapHeight });

    canvasEl.width = bitmapWidth;
    canvasEl.height = bitmapHeight;

    canvasEl.style.width = `${String(logicalWidth)}px`;
    canvasEl.style.height = `${String(logicalHeight)}px`;

    gl.viewport(0, 0, bitmapWidth, bitmapHeight);
  }, [canvasRef]);

  return { glRef, bitmapSize };
}
