import type { Point2D, ShaderUniformValues } from '../math/transforms';

const FULLSCREEN_TRIANGLE = /* glsl */ `
  precision highp float;
  out vec2 vUv;
  void main() {
    vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
    vUv = pos[gl_VertexID] * 0.5 + 0.5;
    gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
  }
`;

type UniformEntry = { location: WebGLUniformLocation; type: number; size: number };

export type QuadPipeline = ReturnType<typeof createQuadPipeline>;

export function createQuadPipeline(
  gl: WebGL2RenderingContext,
  initialUniformBuilder: (mouseBufferPixel?: Point2D) => ShaderUniformValues
) {
  let program: WebGLProgram | null = null;
  let uniformBuilder = initialUniformBuilder;
  const uniforms = new Map<string, UniformEntry>();
  let nextTextureUnit = 0;

  const compileShader = (type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    let finalSource = source;
    if (!source.startsWith('#version 300 es')) {
      finalSource = `#version 300 es\n${source}`;
    }

    gl.shaderSource(shader, finalSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  return {
    compileFragmentShader(fragmentSource: string): void {
      const vs = compileShader(gl.VERTEX_SHADER, FULLSCREEN_TRIANGLE);
      if (!vs) throw new Error('Failed to compile vertex shader');

      const fs = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
      if (!fs) throw new Error('Failed to compile fragment shader');

      const prog = gl.createProgram();

      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(prog);
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        throw new Error(`Program link error: ${String(log)}`);
      }

      program = prog;
      uniforms.clear();

      const numUniforms = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < numUniforms; i++) {
        const info = gl.getActiveUniform(prog, i);
        if (info) {
          const loc = gl.getUniformLocation(prog, info.name);
          if (loc) {
            const entry: UniformEntry = { location: loc, type: info.type, size: info.size };
            uniforms.set(info.name, entry);
            // Also register the base name for arrays ("stateColors[0]" → "stateColors")
            const baseName = info.name.replace(/\[0\]$/, '');
            if (baseName !== info.name) uniforms.set(baseName, entry);
          }
        }
      }
    },

    render(mousePx?: Point2D): void {
      if (!program) {
        console.warn('QuadPipeline.render() called with no compiled program');
        return;
      }

      nextTextureUnit = 0;
      gl.useProgram(program);
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

    setUniforms(uniformValues: Record<string, number | number[] | WebGLTexture>): void {
      if (!program) {
        console.warn('QuadPipeline.setUniforms() called with no compiled program');
        return;
      }
      gl.useProgram(program);
      for (const [name, value] of Object.entries(uniformValues)) {
        const entry = uniforms.get(name);
        if (entry === undefined) continue;
        const { location: loc, type } = entry;
        if (value instanceof WebGLTexture) {
          const unit = nextTextureUnit++;
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, value);
          gl.uniform1i(loc, unit);
        } else if (typeof value === 'number') {
          gl.uniform1f(loc, value);
        } else {
          const FLOAT_VEC2 = 0x8b50;
          const FLOAT_VEC3 = 0x8b51;
          const FLOAT_VEC4 = 0x8b52;
          if (type === FLOAT_VEC4) gl.uniform4fv(loc, value);
          else if (type === FLOAT_VEC3) gl.uniform3fv(loc, value);
          else if (type === FLOAT_VEC2) gl.uniform2fv(loc, value);
          else gl.uniform1fv(loc, value);
        }
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
    }
  };
}
