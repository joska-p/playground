// createPerturbationPipeline.ts
import { createQuadPipeline, type QuadPipeline } from '@repo/graphics/2d/createQuadPipeline';
import type { ReferenceOrbit } from './perturbationOrbit';

export type PerturbationPipeline = QuadPipeline & {
  setReferenceOrbits(primary: ReferenceOrbit, secondary: ReferenceOrbit): void;
  readonly orbitTexture: WebGLTexture;
  readonly orbitTexture2: WebGLTexture;
};

export function createPerturbationPipeline(gl: WebGL2RenderingContext): PerturbationPipeline {
  const quad = createQuadPipeline(gl);

  let tex1: WebGLTexture | null = null;
  let tex2: WebGLTexture | null = null;
  let width1 = 0;
  let width2 = 0;
  let lastPrimary: ReferenceOrbit | null = null;
  let lastSecondary: ReferenceOrbit | null = null;

  const deleteTex = (t: WebGLTexture | null) => {
    if (t) gl.deleteTexture(t);
  };

  const upload = (
    orbit: ReferenceOrbit,
    existing: WebGLTexture | null,
    existingWidth: number
  ): { tex: WebGLTexture; width: number } => {
    if (!existing || orbit.orbitLength !== existingWidth) {
      deleteTex(existing);
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RG32F,
        orbit.orbitLength,
        1,
        0,
        gl.RG,
        gl.FLOAT,
        orbit.data
      );
      return { tex, width: orbit.orbitLength };
    }

    gl.bindTexture(gl.TEXTURE_2D, existing);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, orbit.orbitLength, 1, gl.RG, gl.FLOAT, orbit.data);
    return { tex: existing, width: existingWidth };
  };

  return {
    ...quad,

    get orbitTexture(): WebGLTexture {
      if (!tex1) throw new Error('primary orbit texture not ready');
      return tex1;
    },
    get orbitTexture2(): WebGLTexture {
      if (!tex2) throw new Error('secondary orbit texture not ready');
      return tex2;
    },

    setReferenceOrbits(primary: ReferenceOrbit, secondary: ReferenceOrbit): void {
      lastPrimary = primary;
      lastSecondary = secondary;

      const r1 = upload(primary, tex1, width1);
      tex1 = r1.tex;
      width1 = r1.width;

      const r2 = upload(secondary, tex2, width2);
      tex2 = r2.tex;
      width2 = r2.width;
    },

    reinitialize(): void {
      quad.reinitialize();
      // force recreation on context restore
      deleteTex(tex1);
      tex1 = null;
      width1 = 0;
      deleteTex(tex2);
      tex2 = null;
      width2 = 0;
      if (lastPrimary && lastSecondary) {
        this.setReferenceOrbits(lastPrimary, lastSecondary);
      }
    },

    dispose(): void {
      quad.dispose();
      deleteTex(tex1);
      deleteTex(tex2);
      tex1 = tex2 = null;
      lastPrimary = lastSecondary = null;
    }
  };
}
