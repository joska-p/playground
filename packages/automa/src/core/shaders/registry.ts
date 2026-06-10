import { blurShader } from './blur/blur';
import { dissolveShader } from './dissolve/dissolve';
import { edgeDetectShader } from './edge-detect/edge-detect';
import { glowShader } from './glow/glow';
import { heatHazeShader } from './heat-haze/heat-haze';
import { kaleidoscopeShader } from './kaleidoscope/kaleidoscope';
import { pixelateShader } from './pixelate/pixelate';
import { rippleShader } from './ripple/ripple';
import type { Shader } from './types';

const shaders = new Map<string, Shader>([
  [blurShader.id, blurShader],
  [dissolveShader.id, dissolveShader],
  [edgeDetectShader.id, edgeDetectShader],
  [glowShader.id, glowShader],
  [heatHazeShader.id, heatHazeShader],
  [kaleidoscopeShader.id, kaleidoscopeShader],
  [pixelateShader.id, pixelateShader],
  [rippleShader.id, rippleShader],
]);

function getShader(id: string): Shader | undefined {
  return shaders.get(id);
}

function getAllShaders(): Shader[] {
  return Array.from(shaders.values());
}

export { getAllShaders, getShader };
