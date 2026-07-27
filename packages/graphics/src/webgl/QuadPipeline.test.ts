import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createShaderUniformBuilder,
  type Point2D,
  type ShaderUniformValues
} from '../math/transforms';
import { QuadPipeline } from './QuadPipeline';

function createMockGL() {
  const shaderParams = new Map<WebGLShader, Map<number, unknown>>();
  const shaderSources = new Map<WebGLShader, string>();
  const programParams = new Map<WebGLProgram, Map<number, unknown>>();
  let shaderId = 0;
  let programId = 0;

  const gl = {
    VERTEX_SHADER: 0x8b31,
    FRAGMENT_SHADER: 0x8b30,
    COMPILE_STATUS: 0x8b81,
    LINK_STATUS: 0x8b82,
    ACTIVE_UNIFORMS: 0x8b86,
    TRIANGLES: 0x0004,

    drawingBufferWidth: 1600,
    drawingBufferHeight: 1200,

    createShader: vi.fn(() => `shader_${String(++shaderId)}`),
    shaderSource: vi.fn((shader: WebGLShader, source: string) => {
      shaderSources.set(shader, source);
    }),
    compileShader: vi.fn((shader: WebGLShader) => {
      if (!shaderParams.has(shader)) shaderParams.set(shader, new Map());
      const source = shaderSources.get(shader) ?? '';
      const isValid = source.includes('#version');
      shaderParams.get(shader)?.set(gl.COMPILE_STATUS, isValid);
    }),
    getShaderParameter: vi.fn((shader: WebGLShader, param: number) => {
      return shaderParams.get(shader)?.get(param) ?? false;
    }),
    getShaderInfoLog: vi.fn(() => ''),
    deleteShader: vi.fn(),

    createProgram: vi.fn(() => `program_${String(++programId)}`),
    attachShader: vi.fn(),
    linkProgram: vi.fn((program: WebGLProgram) => {
      if (!programParams.has(program)) programParams.set(program, new Map());
      programParams.get(program)?.set(gl.LINK_STATUS, true);
      programParams.get(program)?.set(gl.ACTIVE_UNIFORMS, 3);
    }),
    getProgramParameter: vi.fn((program: WebGLProgram, param: number) => {
      return programParams.get(program)?.get(param) ?? 0;
    }),
    getProgramInfoLog: vi.fn(() => ''),
    getActiveUniform: vi.fn((_program: WebGLProgram, index: number) => {
      const names = ['u_resolution', 'u_aspect', 'u_mouse'];
      if (index < names.length) return { name: names[index], size: 1, type: 'vec2' };
      return null;
    }),
    getUniformLocation: vi.fn((_program: WebGLProgram, name: string) => {
      return `loc_${name}`;
    }),
    bindAttribLocation: vi.fn(),
    useProgram: vi.fn(),
    viewport: vi.fn(),
    uniform2f: vi.fn(),
    uniform1f: vi.fn(),
    drawArrays: vi.fn(),
    deleteProgram: vi.fn()
  };

  return gl as unknown as WebGL2RenderingContext;
}

describe('QuadPipeline', () => {
  let gl: WebGL2RenderingContext;
  let uniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues;

  beforeEach(() => {
    gl = createMockGL();
    uniformBuilder = createShaderUniformBuilder(800, 600, 2);
  });

  it('instantiates cleanly', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    expect(pipeline).toBeDefined();
  });

  it('returns true for valid fragment shader', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    const result = pipeline.compileFragmentShader(`
      #version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      void main() {
        fragColor = vec4(vUv, 0.0, 1.0);
      }
    `);
    expect(result).toBe(true);
  });

  it('returns false for invalid fragment shader', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    const result = pipeline.compileFragmentShader('NOT VALID GLSL');
    expect(result).toBe(false);
  });

  it('does not throw on invalid shader', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    expect(() => {
      pipeline.compileFragmentShader('BROKEN CODE {{{');
    }).not.toThrow();
  });

  it('getShaderUniforms returns expected values after compilation', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    pipeline.compileFragmentShader(`
      #version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      uniform vec2 u_resolution;
      uniform float u_aspect;
      uniform vec2 u_mouse;
      void main() {
        fragColor = vec4(1.0);
      }
    `);
    const uniforms = uniformBuilder({ x: 100, y: 200 });
    expect(uniforms.uniformResolution).toEqual([1600, 1200]);
    expect(uniforms.uniformAspectRatio).toBeCloseTo(800 / 600);
    expect(uniforms.uniformMouse).toEqual([100, 200]);
  });

  it('render calls drawArrays with TRIANGLES and count 3', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    pipeline.compileFragmentShader(`
      #version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      void main() { fragColor = vec4(1.0); }
    `);
    pipeline.render({ x: 50, y: 50 });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- mock assertion
    expect(gl.drawArrays).toHaveBeenCalledWith(0x0004, 0, 3);
  });

  it('dispose calls deleteProgram', () => {
    const pipeline = new QuadPipeline(gl, uniformBuilder);
    pipeline.compileFragmentShader(`
      #version 300 es
      precision highp float;
      in vec2 vUv;
      out vec4 fragColor;
      void main() { fragColor = vec4(1.0); }
    `);
    pipeline.dispose();
    // eslint-disable-next-line @typescript-eslint/unbound-method -- mock assertion
    expect(gl.deleteProgram).toHaveBeenCalled();
  });
});
