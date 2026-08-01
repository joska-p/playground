import type { Point2D, ShaderUniformValues } from './transforms';
import { compileShaderProgram, setUniformValue } from '../core/compileShaderProgram';
import type { UniformEntry, UniformValue } from '../core/compileShaderProgram';

export type QuadPipeline = {
  compileFragmentShader(fragmentSource: string): void;
  reinitialize(fragmentSource?: string): void;
  render(mousePx?: Point2D): void;
  setUniforms(uniformValues: Record<string, UniformValue>): void;
  hasUniform(name: string): boolean;
  updateUniformBuilder(builder: (mouseBufferPixel?: Point2D) => ShaderUniformValues): void;
  dispose(): void;
};

export function createQuadPipeline(
  gl: WebGL2RenderingContext,
  initialUniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues
): QuadPipeline {
  let program: WebGLProgram | null = null;
  let currentSource: string | null = null;
  let uniformBuilder = initialUniformBuilder;
  let uniforms = new Map<string, UniformEntry>();
  let nextTextureUnit = 0;
  let vao: WebGLVertexArrayObject | null = gl.createVertexArray();

  return {
    compileFragmentShader(fragmentSource: string): void {
      const compiled = compileShaderProgram(gl, fragmentSource);
      if (program) gl.deleteProgram(program);
      program = compiled.program;
      uniforms = compiled.uniforms;
      currentSource = fragmentSource;
    },

    reinitialize(fragmentSource?: string): void {
      const source = fragmentSource ?? currentSource;
      if (source === null) {
        throw new Error('QuadPipeline.reinitialize() called before any shader was compiled');
      }
      gl.deleteVertexArray(vao);
      vao = gl.createVertexArray();
      this.compileFragmentShader(source);
    },

    render(mousePx?: Point2D): void {
      if (!program) {
        console.warn('QuadPipeline.render() called with no compiled program');
        return;
      }

      nextTextureUnit = 0;
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

      const builtUniforms = uniformBuilder(mousePx);

      const resolution: [number, number] = [gl.drawingBufferWidth, gl.drawingBufferHeight];

      const resEntry = uniforms.get('uniformResolution') ?? uniforms.get('u_resolution');
      if (resEntry) gl.uniform2f(resEntry.location, ...resolution);

      const aspectEntry = uniforms.get('uniformAspectRatio') ?? uniforms.get('u_aspect');
      if (aspectEntry) gl.uniform1f(aspectEntry.location, builtUniforms.uniformAspectRatio);

      const mouseEntry = uniforms.get('uniformMouse') ?? uniforms.get('u_mouse');
      if (mouseEntry) gl.uniform2f(mouseEntry.location, ...builtUniforms.uniformMouse);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    setUniforms(uniformValues: Record<string, UniformValue>): void {
      if (!program) {
        console.warn('QuadPipeline.setUniforms() called with no compiled program');
        return;
      }
      gl.useProgram(program);
      for (const [name, value] of Object.entries(uniformValues)) {
        const entry = uniforms.get(name);
        if (entry === undefined) {
          if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
            console.warn('[graphics] unknown uniform "' + name + '" in program');
          }
          continue;
        }
        setUniformValue(gl, entry, value, () => nextTextureUnit++);
      }
    },

    hasUniform(name: string): boolean {
      return uniforms.has(name);
    },

    updateUniformBuilder(builder: (mouseBufferPixel?: Point2D) => ShaderUniformValues): void {
      uniformBuilder = builder;
    },

    dispose(): void {
      if (program) {
        gl.deleteProgram(program);
        program = null;
      }
      gl.deleteVertexArray(vao);
      vao = null;
    }
  };
}
