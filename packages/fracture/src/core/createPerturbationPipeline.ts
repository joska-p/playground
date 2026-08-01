import { createQuadPipeline, type QuadPipeline } from '@repo/graphics/2d/createQuadPipeline';
import type { ReferenceOrbit } from './perturbationOrbit';

export type PerturbationPipeline = QuadPipeline & {
  /** Uploads (or reuses) the reference orbit as an RG32F data texture. */
  setReferenceOrbit(orbit: ReferenceOrbit): void;
  readonly orbitTexture: WebGLTexture | null;
};

export function createPerturbationPipeline(gl: WebGL2RenderingContext): PerturbationPipeline {
  const quad = createQuadPipeline(gl);
  let orbitTexture: WebGLTexture | null = null;
  let orbitWidth = 0;
  let lastOrbit: ReferenceOrbit | null = null;

  const deleteOrbitTexture = (): void => {
    if (orbitTexture) {
      gl.deleteTexture(orbitTexture);
      orbitTexture = null;
      orbitWidth = 0;
    }
  };

  const uploadOrbit = (orbit: ReferenceOrbit): void => {
    if (orbit.orbitLength !== orbitWidth) {
      deleteOrbitTexture();
      const tex = gl.createTexture();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- lib.dom types createTexture() as non-null, but the WebGL spec allows null on failure
      if (!tex) throw new Error('PerturbationPipeline: orbit texture creation failed');
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
      orbitTexture = tex;
      orbitWidth = orbit.orbitLength;
    } else {
      gl.bindTexture(gl.TEXTURE_2D, orbitTexture);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, orbit.orbitLength, 1, gl.RG, gl.FLOAT, orbit.data);
    }
  };

  return {
    ...quad,

    get orbitTexture(): WebGLTexture | null {
      return orbitTexture;
    },

    setReferenceOrbit(orbit: ReferenceOrbit): void {
      lastOrbit = orbit;
      uploadOrbit(orbit);
    },

    reinitialize(): void {
      quad.reinitialize();
      if (lastOrbit) uploadOrbit(lastOrbit);
    },

    dispose(): void {
      quad.dispose();
      deleteOrbitTexture();
      lastOrbit = null;
    }
  };
}
