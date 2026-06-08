import { glowShader } from './glow/glow';
import type { Shader } from './types';

const shaders = new Map<string, Shader>([[glowShader.id, glowShader]]);

function registerShader(shader: Shader): void {
  shaders.set(shader.id, shader);
}

function getShader(id: string): Shader | undefined {
  return shaders.get(id);
}

function getAllShaders(): Shader[] {
  return Array.from(shaders.values());
}

export { getAllShaders, getShader, registerShader };
