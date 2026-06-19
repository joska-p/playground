import { useEffect, useRef } from 'react';
import { compileToGLSL } from '../core/compile/compileToGLSL';
import type { ExpressionNode } from '../core/types';
import { useAnimationLoop } from './useAnimationLoop';
import { useCanvasSize } from './useCanvasSize';

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
  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);

  useEffect(() => {
    if (!enabled) return;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl', {
      preserveDrawingBuffer: true,
      alpha: false,
      antialias: false
    });

    if (!gl) {
      console.warn('WebGL not available');
      return;
    }

    glRef.current = gl;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    canvasEl.width = bitmapSize;
    canvasEl.height = bitmapSize;
    canvasEl.style.width = `${logicalSize}px`;
    canvasEl.style.height = `${logicalSize}px`;

    return () => {
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
      glRef.current = null;
    };
  }, [enabled, canvasRef, logicalSize, bitmapSize]);

  useAnimationLoop(
    running,
    (deltaMs) => {
      if (running) {
        timeRef.current += deltaMs / 1000;
      }

      const gl = glRef.current;
      const canvas = canvasRef.current;
      if (!gl || !canvas) return;

      const fragmentSource = compileToGLSL(
        trees.treeR,
        trees.treeG,
        trees.treeB
      );

      try {
        const program = createProgram(gl, VERTEX_SHADER_SOURCE, fragmentSource);
        if (programRef.current) {
          gl.deleteProgram(programRef.current);
        }
        programRef.current = program;

        gl.useProgram(program);

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const timeLoc = gl.getUniformLocation(program, 'u_time');
        const resLoc = gl.getUniformLocation(program, 'u_resolution');

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(timeLoc, timeRef.current);
        gl.uniform2f(resLoc, canvas.width, canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } catch (err) {
        console.warn('Shader compile failed, skipping frame:', err);
      }
    },
    enabled
  );
}
