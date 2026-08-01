import type { UniformValue } from './compileShaderProgram';

export type ShaderUniformValues = {
  resolution: [number, number];
  aspectRatio: number;
  mouse: [number, number];
};

/**
 * Canonical framework-uniform names injected every render. Shaders must declare
 * these exact names to receive the values.
 */
export const STANDARD_UNIFORM_NAMES = ['u_resolution', 'u_aspect', 'u_mouse'] as const;

type StandardUniformTarget = {
  hasUniform(name: string): boolean;
  setUniforms(uniformValues: Record<string, UniformValue>): void;
};

export function applyStandardUniforms(
  pipeline: StandardUniformTarget,
  values: ShaderUniformValues
): void {
  const standardValues: Record<string, UniformValue> = {};

  const pick = (name: string, value: UniformValue): void => {
    if (pipeline.hasUniform(name)) {
      standardValues[name] = value;
    }
  };

  pick('u_resolution', values.resolution);
  pick('u_aspect', values.aspectRatio);
  pick('u_mouse', values.mouse);

  if (Object.keys(standardValues).length > 0) {
    pipeline.setUniforms(standardValues);
  }
}
