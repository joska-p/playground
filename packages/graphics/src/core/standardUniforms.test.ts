import { describe, expect, it, vi } from 'vitest';
import { applyStandardUniforms, type ShaderUniformValues } from './standardUniforms';

const values: ShaderUniformValues = {
  resolution: [800, 600],
  aspectRatio: 800 / 600,
  mouse: [0.5, 0.75]
};

describe('applyStandardUniforms', () => {
  it('binds all three canonical uniforms when declared', () => {
    const setUniforms = vi.fn();
    const target = {
      hasUniform: () => true,
      setUniforms
    };

    applyStandardUniforms(target, values);

    expect(setUniforms).toHaveBeenCalledWith({
      u_resolution: [800, 600],
      u_aspect: 800 / 600,
      u_mouse: [0.5, 0.75]
    });
  });

  it('binds only the canonical uniforms the shader declares', () => {
    const setUniforms = vi.fn();
    const target = {
      hasUniform: (name: string) => name === 'u_resolution',
      setUniforms
    };

    applyStandardUniforms(target, values);

    expect(setUniforms).toHaveBeenCalledWith({ u_resolution: [800, 600] });
  });

  it('does not fall back to legacy uniform* names', () => {
    const setUniforms = vi.fn();
    const target = {
      hasUniform: (name: string) => name === 'uniformMouse',
      setUniforms
    };

    applyStandardUniforms(target, values);

    expect(setUniforms).not.toHaveBeenCalled();
  });

  it('does not call setUniforms when none are declared', () => {
    const setUniforms = vi.fn();
    const target = {
      hasUniform: () => false,
      setUniforms
    };

    applyStandardUniforms(target, values);

    expect(setUniforms).not.toHaveBeenCalled();
  });
});
