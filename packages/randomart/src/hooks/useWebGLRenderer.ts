import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { compileToGLSL } from '../core/compile/compileToGLSL';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';
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

export function useWebGLRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dimensions: { width: number; height: number },
  trees: {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
  },
  running: boolean,
  enabled: boolean
) {
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const timeUniformLocRef = useRef<WebGLUniformLocation | null>(null);
  const animSpeedUniformLocRef = useRef<WebGLUniformLocation | null>(null);
  const timeRef = useRef(0);
  const frameCountRef = useRef(0);

  const { logicalSize, bitmapSize } = useCanvasSize(dimensions);

  // Sync local timeRef with store when running starts (handles Reset Time while paused)
  useEffect(() => {
    if (running) {
      timeRef.current = randomartStore.getState().time;
    }
  }, [running]);

  // Effect 1: Recompile the shader ONLY when trees change or WebGL is enabled
  useEffect(() => {
    if (!enabled) return;
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext('webgl', {
      preserveDrawingBuffer: true,
      alpha: false,
      antialias: false
    });
    if (!gl) return;
    glRef.current = gl;

    // Set canvas viewport size attributes
    canvasEl.width = bitmapSize;
    canvasEl.height = bitmapSize;
    canvasEl.style.width = `${logicalSize}px`;
    canvasEl.style.height = `${logicalSize}px`;
    gl.viewport(0, 0, bitmapSize, bitmapSize);

    // Setup Geometry Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, POSITIONS, gl.STATIC_DRAW);

    // Compile the GLSL representation safely here
    const fragmentSource = compileToGLSL(trees.treeR, trees.treeG, trees.treeB);

    try {
      const program = createProgram(gl, VERTEX_SHADER_SOURCE, fragmentSource);
      if (programRef.current) gl.deleteProgram(programRef.current);

      programRef.current = program;
      gl.useProgram(program);

      // Cache uniform locations to keep loop iterations hyper-fast
      timeUniformLocRef.current = gl.getUniformLocation(program, 'u_time');
      animSpeedUniformLocRef.current = gl.getUniformLocation(
        program,
        'u_animSpeed'
      );
      const resLoc = gl.getUniformLocation(program, 'u_resolution');
      if (resLoc) gl.uniform2f(resLoc, bitmapSize, bitmapSize);

      const positionLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Draw an initial frame instantly
      gl.uniform1f(timeUniformLocRef.current, timeRef.current);
      gl.uniform1f(
        animSpeedUniformLocRef.current,
        randomartStore.getState().animationSpeed
      );
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } catch (e) {
      console.error('Shader compilation failed:', e);
    }

    return () => {
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
      glRef.current = null;
    };
  }, [enabled, trees, logicalSize, bitmapSize, canvasRef]);

  // Effect 2: Smooth frame loop uniform ticks
  useAnimationLoop(
    running,
    (deltaMs) => {
      if (running) {
        timeRef.current += deltaMs / 1000;
      }

      frameCountRef.current++;
      if (running && frameCountRef.current % 6 === 0) {
        randomartStore.setState({ time: timeRef.current });
      }

      // Draw updates using the cached program without recompiling
      if (enabled) {
        const gl = glRef.current;
        if (!gl || !programRef.current) return;

        gl.uniform1f(timeUniformLocRef.current, timeRef.current);
        gl.uniform1f(
          animSpeedUniformLocRef.current,
          randomartStore.getState().animationSpeed
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    },
    true
  );

  // Effect 3: Redraw when animationSpeed changes (even when paused)
  const animationSpeed = useStore(randomartStore, (s) => s.animationSpeed);
  useEffect(() => {
    if (!enabled || running) return;
    const gl = glRef.current;
    if (!gl || !programRef.current) return;

    gl.uniform1f(timeUniformLocRef.current, timeRef.current);
    gl.uniform1f(animSpeedUniformLocRef.current, animationSpeed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [enabled, running, animationSpeed]);
}

// WebGL Boilerplate Helpers
function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Shader compile error: ' + info);
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error('Program link error: ' + gl.getProgramInfoLog(program));
  }
  return program;
}
