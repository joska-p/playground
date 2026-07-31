import type { Point2D, ShaderUniformValues } from '../math/transforms';
import { compileShaderProgram, setUniformValue } from './compileShaderProgram';
import type { UniformEntry, UniformValue } from './compileShaderProgram';

export type QuadPipeline = {
  compileFragmentShader(fragmentSource: string): void;
  reinitialize(fragmentSource: string): void;
  render(mousePx?: Point2D): void;
  setUniforms(uniformValues: Record<string, UniformValue>): void;
  updateUniformBuilder(builder: (mouseBufferPixel?: Point2D) => ShaderUniformValues): void;
  dispose(): void;
};

export function createQuadPipeline(
  gl: WebGL2RenderingContext,
  initialUniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues
): QuadPipeline {
  let program: WebGLProgram | null = null;
  let uniformBuilder = initialUniformBuilder;
  let uniforms = new Map<string, UniformEntry>();
  let nextTextureUnit = 0;
  let vao = gl.createVertexArray();

  return {
    compileFragmentShader(fragmentSource: string): void {
      if (program) gl.deleteProgram(program);
      const compiled = compileShaderProgram(gl, fragmentSource);
      program = compiled.program;
      uniforms = compiled.uniforms;
    },

    reinitialize(fragmentSource: string): void {
      gl.deleteVertexArray(vao);
      vao = gl.createVertexArray();
      this.compileFragmentShader(fragmentSource);
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

      const resEntry = uniforms.get('uniformResolution') ?? uniforms.get('u_resolution');
      if (resEntry) gl.uniform2f(resEntry.location, ...builtUniforms.uniformResolution);

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

    updateUniformBuilder(builder: (mouseBufferPixel?: Point2D) => ShaderUniformValues): void {
      uniformBuilder = builder;
    },

    dispose(): void {
      if (program) {
        gl.deleteProgram(program);
        program = null;
      }
      gl.deleteVertexArray(vao);
    }
  };
}
