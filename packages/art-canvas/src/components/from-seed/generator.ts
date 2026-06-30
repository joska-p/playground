import { cosinePalette } from '../../shaders/effects/cosinePalette';
import { posterize } from '../../shaders/effects/posterize';
import { sdBox } from '../../shaders/shapes/sdBox';
import { domainWarp } from '../../shaders/space/domainWarp';
import { polarCoords } from '../../shaders/space/polarCoords';
import { repeatSpace } from '../../shaders/space/repeatSpace';
import { rotate2d } from '../../shaders/space/rotate2d';
import { SeededRandom } from './utils/seededRandom';

// 1. Add it to your selection registry
const SPACE_MODIFIERS = [repeatSpace, polarCoords, rotate2d, domainWarp];
const SHAPE_MODIFIERS = [sdBox];

export function generateShaderFromSeed(seed: string): string {
  const rng = new SeededRandom(seed);

  const selectedSpaceMod = rng.pick(SPACE_MODIFIERS);
  const selectedShapeMod = rng.pick(SHAPE_MODIFIERS);
  const usePosterize = rng.next() > 0.6; // 40% chance for blocky cell shading

  const gridCount = (rng.next() * 3.0 + 1.5).toFixed(1);
  const rippleSpeed = (rng.next() * 8.0 + 3.0).toFixed(1); // Higher range for more noise detail
  const coreComplexity = Math.floor(rng.next() * 2 + 2);
  const warpIntensity = (rng.next() * 0.4 + 0.1).toFixed(3); // Random sludge factor

  const paletteVecD = `vec3(${rng.next().toFixed(3)}, ${rng.next().toFixed(3)}, ${rng.next().toFixed(3)})`;

  // 2. Handle the dynamic function arguments
  let spaceCallLine;
  if (selectedSpaceMod.name === 'repeatSpace') {
    spaceCallLine = selectedSpaceMod.getCall({ uv: 'uv', count: gridCount });
  } else if (selectedSpaceMod.name === 'rotate2d') {
    spaceCallLine = selectedSpaceMod.getCall({ uv: 'uv', angle: 'u_time * 0.15' });
  } else if (selectedSpaceMod.name === 'domainWarp') {
    spaceCallLine = selectedSpaceMod.getCall({
      uv: 'uv',
      time: 'u_time',
      intensity: warpIntensity
    });
  } else {
    spaceCallLine = selectedSpaceMod.getCall({ uv: 'uv' });
  }

  const shapeCallLine = selectedShapeMod.getCall({ uv: 'uv', width: '0.25', height: '0.25' });
  const posterizeCallLine = usePosterize ? posterize.getCall({ val: 'wave', steps: '6.0' }) : '';

  return `
    uniform float u_time;
    varying vec2 vUv;

    ${selectedSpaceMod.code}
    ${selectedShapeMod.code}
    ${cosinePalette.code}
    ${usePosterize ? posterize.code : ''}

    void main() {
      vec2 uv = vUv - 0.5;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);

      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = ${paletteVecD};

      for (float i = 0.0; i < ${coreComplexity.toFixed(1)}; i++) {

          // If domainWarp is chosen, this warps space organically instead of a rigid transformation
          ${spaceCallLine}

          // Evaluate the shape field through the twisted/warped space coordinates
          ${shapeCallLine}

          dist *= exp(-length(uv0));

          // Noise + waves creates dynamic marble or liquid tendril outlines
          float wave = sin(dist * ${rippleSpeed} - u_time * 1.5);
          wave = abs(wave);

          ${posterizeCallLine}

          wave = 0.012 / wave; // Fine-tune the neon line thickness

          vec3 col = cosinePalette(length(uv0) + i * 0.3 + u_time * 0.2, a, b, c, d);

          finalColor += col * wave;
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
}
