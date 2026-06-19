import { useEffect, useRef } from 'react';
import { compileToGLSL } from '../core/compile/compileToGLSL';
import type { ExpressionNode } from '../core/types';

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = (a_position + 1.0) / 2.0;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const POSITIONS = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string
): WebGLProgram {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);

  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${log}`);
  }

  gl.deleteShader(vert);
  gl.deleteShader(frag);

  return program;
}

export function useWebGLRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number },
  trees: {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
  },
  running: boolean,
  timeRef: React.MutableRefObject<number>,
  enabled: boolean
) {
  const programRef = useRef<WebGLProgram | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const canvas2 = canvasEl;
    const gl = canvas2.getContext('webgl', {
      preserveDrawingBuffer: true,
      alpha: false,
      antialias: false
    });

    if (!gl) {
      console.warn('WebGL not available');
      return;
    }

    glRef.current = gl;
    const gl2 = gl;

    const positionBuffer = gl2.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    let cancelled = false;
    let animationFrameId: number;
    let lastTime = performance.now();

    function compileAndRender(time: number) {
      if (cancelled) return;

      const fragmentSource = compileToGLSL(
        trees.treeR,
        trees.treeG,
        trees.treeB
      );

      try {
        const program = createProgram(
          gl2,
          VERTEX_SHADER_SOURCE,
          fragmentSource
        );
        if (programRef.current) {
          gl2.deleteProgram(programRef.current);
        }
        programRef.current = program;

        gl2.useProgram(program);

        const posLoc = gl2.getAttribLocation(program, 'a_position');
        gl2.enableVertexAttribArray(posLoc);
        gl2.vertexAttribPointer(posLoc, 2, gl2.FLOAT, false, 0, 0);

        const timeLoc = gl2.getUniformLocation(program, 'u_time');
        const resLoc = gl2.getUniformLocation(program, 'u_resolution');

        gl2.viewport(0, 0, canvas2.width, canvas2.height);
        gl2.clearColor(0, 0, 0, 1);
        gl2.clear(gl2.COLOR_BUFFER_BIT);

        gl2.uniform1f(timeLoc, time);
        gl2.uniform2f(resLoc, canvas2.width, canvas2.height);

        gl2.drawArrays(gl2.TRIANGLES, 0, 6);
      } catch (err) {
        console.warn('Shader compile failed, skipping frame:', err);
      }

      if (running && !cancelled) {
        animationFrameId = requestAnimationFrame(tick);
      }
    }

    function tick(now: number) {
      if (cancelled) return;

      const delta = now - lastTime;
      lastTime = now;

      if (running) {
        timeRef.current += delta / 1000;
      }

      if (
        canvas2.width !== dimensions.width ||
        canvas2.height !== dimensions.height
      ) {
        const dpr = window.devicePixelRatio || 1;
        const logicalSize = Math.max(
          100,
          Math.min(
            Math.floor(Math.min(dimensions.width, dimensions.height)),
            1024
          )
        );
        canvas2.width = Math.min(Math.round(logicalSize * dpr), 2048);
        canvas2.height = Math.min(Math.round(logicalSize * dpr), 2048);
        canvas2.style.width = `${logicalSize}px`;
        canvas2.style.height = `${logicalSize}px`;
      }

      if (!cancelled) {
        compileAndRender(timeRef.current);
      }
    }

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrameId);
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
      glRef.current = null;
    };
  }, [dimensions, trees, running, canvasRef, timeRef, enabled]);
}
