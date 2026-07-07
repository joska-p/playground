import { compileToGLSL } from '@repo/randomart-engine/compile/compileToGLSL';
import type { AnimationBehavior, ExpressionNode } from '@repo/randomart-engine/types';
import { useEffect, useRef } from 'react';
import type { BitmapSize } from './useWebGLContext';

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = (a_position + 1.0) / 2.0;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export type UniformLocs = {
  time: WebGLUniformLocation | null;
  animSpeed: WebGLUniformLocation | null;
};

/**
 * Owns shader compilation and the resulting WebGLProgram lifecycle.
 */
export function useShaderProgram(
  glRef: React.RefObject<WebGLRenderingContext | null>,
  bitmapSize: BitmapSize,
  trees: {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
  },
  behaviors: AnimationBehavior[],
  onReady?: (gl: WebGLRenderingContext, uniformLocs: UniformLocs) => void
) {
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformLocsRef = useRef<UniformLocs>({ time: null, animSpeed: null });

  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;

    const fragmentShaderSource = compileToGLSL(trees.treeR, trees.treeG, trees.treeB, behaviors);

    let program: WebGLProgram | null = null;
    try {
      program = createProgram(gl, VERTEX_SHADER_SOURCE, fragmentShaderSource);
    } catch (error) {
      console.error('Shader program generation failed:', error);
      return;
    }

    // Clean up old program
    const oldProgram = programRef.current;
    if (oldProgram) {
      gl.deleteProgram(oldProgram);
    }

    programRef.current = program;
    gl.useProgram(program);

    // Bind position attribute
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Cache uniform locations
    const locs: UniformLocs = {
      time: gl.getUniformLocation(program, 'u_time'),
      animSpeed: gl.getUniformLocation(program, 'u_animSpeed')
    };
    uniformLocsRef.current = locs;

    // Update resolution uniform (now supports rectangles!)
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    if (resolutionLocation) {
      gl.uniform2f(resolutionLocation, bitmapSize.width, bitmapSize.height);
    }

    if (onReady) {
      onReady(gl, locs);
    }

    return () => {
      if (programRef.current === program) {
        gl.deleteProgram(program);
        programRef.current = null;
        uniformLocsRef.current = { time: null, animSpeed: null };
      }
    };
  }, [glRef, bitmapSize, trees, behaviors, onReady]); // ← bitmapSize is now an object

  return { programRef, uniformLocsRef };
}

// ---------------------------------------------------------------------------
// WebGL boilerplate (pure functions)
// ---------------------------------------------------------------------------

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Shader compile error: ' + String(info));
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
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    throw new Error('Program link error: ' + String(info));
  }
  // Safe to detach and delete individual intermediate shader objects once linked
  gl.detachShader(program, vs);
  gl.detachShader(program, fs);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}
