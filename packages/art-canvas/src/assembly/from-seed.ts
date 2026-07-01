import { cosinePalette } from '../shaders/modules/effects/cosinePalette';
import { posterize } from '../shaders/modules/effects/posterize';
import { surfaceLighting } from '../shaders/modules/effects/surfaceLighting';
import { sdBox } from '../shaders/modules/shapes/sdBox';
import { voronoiModule } from '../shaders/modules/shapes/voronoi';
import { domainWarp } from '../shaders/modules/space/domainWarp';
import { flowField } from '../shaders/modules/space/flowField';
import { mouseAttractor } from '../shaders/modules/space/mouseAttractor';
import { polarCoords } from '../shaders/modules/space/polarCoords';
import { repeatSpace } from '../shaders/modules/space/repeatSpace';
import { rotate2d } from '../shaders/modules/space/rotate2d';
import type { ShaderModule } from '../shaders/types';
import { PALETTE_REGISTRY } from '../palettes/registry';
import { SeededRandom } from './seeded-random';

const SPACE_REGISTRY: ShaderModule[] = [
  domainWarp,
  flowField,
  rotate2d,
  repeatSpace,
  polarCoords,
  mouseAttractor
];
const SHAPE_REGISTRY: ShaderModule[] = [voronoiModule, sdBox];
const EFFECT_REGISTRY: ShaderModule[] = [posterize, surfaceLighting];

export function generateShaderFromSeed(seed: string, maxDepth: number = 3): string {
  const rng = new SeededRandom(seed);
  const activeModules: ShaderModule[] = [];

  const processArgs = (mod: ShaderModule): Record<string, string> => {
    const resolvedArgs: Record<string, string> = { uv: 'uv' };
    if (!mod.params) return resolvedArgs;

    for (const [paramName, rule] of Object.entries(mod.params)) {
      if (rule.type === 'global' || rule.type === 'literal') {
        resolvedArgs[paramName] = String(rule.value);
      } else if (rule.type === 'range') {
        resolvedArgs[paramName] = rng.range(rule.min, rule.max, rule.precision ?? 3);
      }
    }
    return resolvedArgs;
  };

  let spaceExecutionBlock = '';
  for (let d = 0; d < maxDepth; d++) {
    const pickedSpace = rng.pickWeighted(SPACE_REGISTRY);
    activeModules.push(pickedSpace);
    spaceExecutionBlock += `\n          ${pickedSpace.getCall(processArgs(pickedSpace))}`;
  }

  const pickedShape = rng.pickWeighted(SHAPE_REGISTRY);
  activeModules.push(pickedShape);
  const shapeExecutionLine = pickedShape.getCall(processArgs(pickedShape));

  const hasPosterize = rng.next() > 0.6;
  const hasLighting = rng.next() > 0.4;

  EFFECT_REGISTRY.forEach((effect) => {
    if (effect.name === 'posterize' && hasPosterize) activeModules.push(effect);
    if (effect.name === 'surfaceLighting' && hasLighting) activeModules.push(effect);
  });

  activeModules.push(cosinePalette);
  const uniqueInjectedCode = Array.from(new Set(activeModules.map((m) => m.code))).join('\n');

  const pickedPalette = rng.pickWeighted(PALETTE_REGISTRY);
  const rippleSpeed = rng.range(3.0, 11.0, 1);
  const coreComplexity = Math.floor(rng.next() * 2 + 2);

  return `
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 vUv;

      // --- Automated Grammar Code Injection ---
      ${uniqueInjectedCode}

      void main() {
        vec2 uv = vUv - 0.5;
        uv *= 2.0; // Zoom out slightly so shapes fit nicely
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);

        // Aesthetic rules
        vec3 a = ${pickedPalette.a};
        vec3 b = ${pickedPalette.b};
        vec3 c = ${pickedPalette.c};
        vec3 d = ${pickedPalette.d};
        vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));

        for (float i = 0.0; i < ${coreComplexity.toFixed(1)}; i++) {

            // FIX 1: Reset UV at the start of the loop.
            // This prevents domain warps from compounding into chaos across iterations.
            uv = uv0;

            // Coordinate space operations
            ${spaceExecutionBlock}

            // Shape evaluation (module declares 'float dist = ...')
            ${shapeExecutionLine}

            // Vignette/falloff
            dist *= exp(-length(uv0) * 0.5);

            float wave = sin(dist * ${rippleSpeed} - u_time * 1.5);
            wave = abs(wave);

            // Optional abstract effects evaluation
            ${hasPosterize ? posterize.getCall(processArgs(posterize)) : ''}

            // Color generation (module declares 'vec3 col = ...')
            ${cosinePalette.getCall({ dist: 'dist', offset: 'i * 0.15 + u_time * 0.05', a: 'a', b: 'b', c: 'c', d: 'd' })}

            // Optional structural surface lighting
            ${
              hasLighting
                ? `
            ${surfaceLighting.getCall({ uv: 'uv' })}
            float diffuse = max(dot(normal, lightDir), 0.0);
            col = col * (diffuse + 0.3) + vec3(pow(diffuse, 32.0) * 0.25);
            `
                : `
            col *= (1.0 - dot(uv, uv0) * 0.5);
            `
            }

            // FIX 2 & 3: Clean accumulation and Absolute Distance Masking
            // Using abs(dist) ensures the INSIDE of SDF shapes isn't pitch black.
            // Additive blending prevents color values from clipping to white.
            float mask = smoothstep(0.5, 0.0, abs(dist)) * 0.6;
            finalColor += col * mask;
        }

        // Subtle global vignette
        finalColor *= 1.0 - 0.3 * length(uv0);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
}
