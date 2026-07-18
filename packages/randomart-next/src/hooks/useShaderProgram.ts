import { compileToShader } from '@repo/randomart-engine-next';
import type { Behavior, ColorSpaceId, ExprNode } from '@repo/randomart-engine-next/types';
import { useEffect, useRef } from 'react';
import type { BitmapSize } from './useWebGLContext';

// WebGL2 GLSL ES 3.00 Vertex Shader
const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 a_position;
out vec2 v_texCoord;
void main() {
  v_texCoord = (a_position + 1.0) / 2.0;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export type UniformLocs = {
  time: WebGLUniformLocation | null;
  animSpeed: WebGLUniformLocation | null;
  resolution: WebGLUniformLocation | null;
  mouse: WebGLUniformLocation | null;
};

/**
 * Owns shader compilation and the resulting WebGLProgram lifecycle.
 */
export function useShaderProgram(
  glRef: React.RefObject<WebGL2RenderingContext | null>, // Upgraded to WebGL2RenderingContext
  bitmapSize: BitmapSize,
  trees: {
    treeR: ExprNode;
    treeG: ExprNode;
    treeB: ExprNode;
  },
  behaviors: Behavior[],
  colorSpace: ColorSpaceId,
  onReady?: (gl: WebGL2RenderingContext, uniformLocs: UniformLocs) => void
) {
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformLocsRef = useRef<UniformLocs>({
    time: null,
    animSpeed: null,
    resolution: null,
    mouse: null
  });

  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;

    // Note: Make sure your compileToGLSL outputs a string starting with "#version 300 es",
    // uses "in vec2 v_texCoord;", and defines a custom fragment output variable like "out vec4 fragColor;"
    const fragmentShaderSource = compileToShader(
      trees.treeR,
      trees.treeG,
      trees.treeB,
      behaviors,
      colorSpace
    );

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
      animSpeed: gl.getUniformLocation(program, 'u_animSpeed'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      mouse: gl.getUniformLocation(program, 'u_mouse')
    };
    uniformLocsRef.current = locs;

    // Update resolution uniform
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
        uniformLocsRef.current = { time: null, animSpeed: null, resolution: null, mouse: null };
      }
    };
  }, [glRef, bitmapSize, trees, behaviors, colorSpace, onReady]);

  return { programRef, uniformLocsRef };
}

// ---------------------------------------------------------------------------
// WebGL2 boilerplate (pure functions)
// ---------------------------------------------------------------------------

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
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
  gl: WebGL2RenderingContext,
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
  gl.detachShader(program, vs);
  gl.detachShader(program, fs);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}
