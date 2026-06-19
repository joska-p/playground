import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { animationRegistry } from '../core/animation/behaviors';
import { compileToGLSL } from '../core/compile/compileToGLSL';
import type { ExpressionNode } from '../core/types';
import { randomartStore } from '../stores/randomart/store';

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
 * Re-runs only when trees or active animation behaviors change.
 */
export function useShaderProgram(
  glRef: React.MutableRefObject<WebGLRenderingContext | null>,
  bitmapSize: number,
  trees: {
    treeR: ExpressionNode;
    treeG: ExpressionNode;
    treeB: ExpressionNode;
  },
  onReady?: (gl: WebGLRenderingContext, uniformLocs: UniformLocs) => void
) {
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformLocsRef = useRef<UniformLocs>({ time: null, animSpeed: null });

  const activeAnimationBehaviorIds = useStore(
    randomartStore,
    (s) => s.activeAnimationBehaviorIds
  );

  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;

    const activeBehaviors = animationRegistry.filter((b) =>
      activeAnimationBehaviorIds.includes(b.id)
    );
    const fragmentSource = compileToGLSL(
      trees.treeR,
      trees.treeG,
      trees.treeB,
      activeBehaviors
    );

    try {
      const program = createProgram(gl, VERTEX_SHADER_SOURCE, fragmentSource);

      if (programRef.current) gl.deleteProgram(programRef.current);
      programRef.current = program;
      gl.useProgram(program);

      uniformLocsRef.current = {
        time: gl.getUniformLocation(program, 'u_time'),
        animSpeed: gl.getUniformLocation(program, 'u_animSpeed')
      };

      const resLoc = gl.getUniformLocation(program, 'u_resolution');
      if (resLoc) gl.uniform2f(resLoc, bitmapSize, bitmapSize);

      const positionLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      onReady?.(gl, uniformLocsRef.current);
    } catch (e) {
      console.error('Shader compilation failed:', e);
    }

    return () => {
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trees, bitmapSize, activeAnimationBehaviorIds]);
  // glRef intentionally excluded — ref mutations don't warrant recompilation.

  return { programRef, uniformLocsRef };
}

// ---------------------------------------------------------------------------
// WebGL boilerplate (pure functions, no hooks)
// ---------------------------------------------------------------------------

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
