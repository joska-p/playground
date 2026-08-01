import { createFBOManager, type FBOManager } from '../core/createFBOManager';
import {
  compileShaderProgram,
  setUniformValue,
  warnUnknownUniform,
  type CompiledShaderProgram,
  type UniformValue
} from '../core/compileShaderProgram';

export type { UniformValue };

export type GPGPUPipeline = {
  readonly width: number;
  readonly height: number;
  readonly fbo: FBOManager;
  addProgram(name: string, fragmentSource: string): void;
  useProgram(name: string): void;
  setUniforms(uniforms: Record<string, UniformValue>): void;
  setUniforms(name: string, value: UniformValue): void;
  step(): void;
  init(data: Uint8Array): void;
  getStateTexture(): WebGLTexture;
  resize(width: number, height: number): void;
  dispose(): void;
};

export function createGPGPUPipeline(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  defaultShader: string
): GPGPUPipeline {
  // Known limitation: not rebuilt after a GL context loss (engine recreation + FBO rebuild required)
  const fbo = createFBOManager(gl, width, height);
  const programs = new Map<string, CompiledShaderProgram>();
  let activeName: string | null = null;

  const emptyVao = gl.createVertexArray();

  const addProgram = (name: string, fragmentSource: string): void => {
    const entry = compileShaderProgram(gl, fragmentSource);
    const prior = programs.get(name);
    if (prior) gl.deleteProgram(prior.program);
    programs.set(name, entry);
  };

  addProgram('default', defaultShader);

  return {
    fbo,

    get width(): number {
      return fbo.width;
    },

    get height(): number {
      return fbo.height;
    },

    addProgram,

    useProgram(name: string): void {
      const entry = programs.get(name);
      if (!entry) throw new Error(`GPGPUPipeline: program "${name}" not found`);
      activeName = name;
      gl.useProgram(entry.program);
    },

    setUniforms(nameOrUniforms: string | Record<string, UniformValue>, value?: UniformValue): void {
      const targetName = activeName ?? 'default';
      const entry = programs.get(targetName);
      if (!entry) throw new Error(`GPGPUPipeline: program "${targetName}" not found`);

      if (typeof nameOrUniforms === 'string') {
        if (value === undefined) return;
        const info = entry.uniforms.get(nameOrUniforms);
        if (info) {
          setUniformValue(gl, info, value);
        } else {
          warnUnknownUniform(nameOrUniforms);
        }
      } else {
        for (const key of Object.keys(nameOrUniforms)) {
          const v = nameOrUniforms[key];
          if (v === undefined) continue;
          const info = entry.uniforms.get(key);
          if (info) {
            setUniformValue(gl, info, v);
          } else {
            warnUnknownUniform(key);
          }
        }
      }
    },

    step(): void {
      const targetName = activeName ?? 'default';
      const entry = programs.get(targetName);
      if (!entry) throw new Error(`GPGPUPipeline: program "${targetName}" not found`);

      gl.useProgram(entry.program);
      fbo.bindWrite();

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fbo.getReadTexture());

      const stateEntry = entry.uniforms.get('u_state');
      if (stateEntry) {
        gl.uniform1i(stateEntry.location, 0);
      }

      gl.bindVertexArray(emptyVao);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      fbo.unbind();
      fbo.swap();
    },

    init(data: Uint8Array): void {
      if (data.length !== fbo.width * fbo.height) {
        throw new Error(
          `GPGPUPipeline: init data length ${String(data.length)} does not match ${String(fbo.width)}x${String(fbo.height)} cells`
        );
      }

      const rgba = new Uint8Array(data.length * 4);
      for (let i = 0; i < data.length; i++) {
        const cellState = data[i] ?? 0;
        const j = i * 4;
        rgba[j] = cellState;
        rgba[j + 1] = 0;
        rgba[j + 2] = 0;
        rgba[j + 3] = 255;
      }

      const updateTex = (tex: WebGLTexture) => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          0,
          0,
          0,
          fbo.width,
          fbo.height,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          rgba
        );
      };

      updateTex(fbo.getReadTexture());
      updateTex(fbo.getWriteTexture());
    },

    getStateTexture(): WebGLTexture {
      return fbo.getReadTexture();
    },

    resize(newWidth: number, newHeight: number): void {
      fbo.resize(newWidth, newHeight);
    },

    dispose(): void {
      fbo.destroy();
      gl.deleteVertexArray(emptyVao);
      for (const [, entry] of programs) {
        gl.deleteProgram(entry.program);
      }
      programs.clear();
    }
  };
}
