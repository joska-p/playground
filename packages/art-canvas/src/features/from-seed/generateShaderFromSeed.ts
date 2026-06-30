import { cosinePalette } from '../../shaders/effects/cosinePalette';
import { posterize } from '../../shaders/effects/posterize';
import { sdBox } from '../../shaders/shapes/sdBox';
import { voronoiModule } from '../../shaders/shapes/voronoi';
import { domainWarp } from '../../shaders/space/domainWarp';
import { flowField } from '../../shaders/space/flowField';
import { mouseAttractor } from '../../shaders/space/mouseAttractor';
import { polarCoords } from '../../shaders/space/polarCoords';
import { repeatSpace } from '../../shaders/space/repeatSpace';
import { rotate2d } from '../../shaders/space/rotate2d';
import type { ShaderModule } from '../../shaders/types';
import { SeededRandom } from './utils/seededRandom';

// 1. Registries categorized by their exact functional signature contracts
const SPACE_MODIFIERS: ShaderModule[] = [
  repeatSpace,
  polarCoords,
  rotate2d,
  domainWarp,
  flowField,
  mouseAttractor
];
const SHAPE_MODIFIERS: ShaderModule[] = [sdBox, voronoiModule];

export function generateShaderFromSeed(seed: string): string {
  const rng = new SeededRandom(seed);

  // Determine how many space warps to chain together (e.g., between 1 and 3 sequential steps)
  const spaceChainLength = Math.floor(rng.next() * 2) + 1;
  const selectedSpaceMods: ShaderModule[] = [];
  for (let i = 0; i < spaceChainLength; i++) {
    selectedSpaceMods.push(rng.pick(SPACE_MODIFIERS));
  }

  // Pick exactly one shape field generator
  const selectedShapeMod = rng.pick(SHAPE_REGISTRY_CONTRACTABLE_FALLBACK(SHAPE_MODIFIERS));
  const usePosterize = rng.next() > 0.6; // 40% chance for cellular posterization

  // Pre-calculate randomized values from the seed to feed into the inputs safely
  const gridCount = (rng.next() * 3.0 + 1.5).toFixed(1);
  const coreComplexity = Math.floor(rng.next() * 2 + 2);
  const warpIntensity = (rng.next() * 0.4 + 0.1).toFixed(3);
  const voronoiScale = (rng.next() * 5.0 + 2.0).toFixed(1);
  const voronoiSpeed = (rng.next() * 1.2 + 0.2).toFixed(2);
  const flowStrength = (rng.next() * 0.2 + 0.05).toFixed(3);

  const paletteVecD = `vec3(${rng.next().toFixed(3)}, ${rng.next().toFixed(3)}, ${rng.next().toFixed(3)})`;

  // 2. Map all potential runtime arguments into a shared contextual payload object
  const inputContext = {
    uv: 'uv',
    time: 'u_time',
    mouse: 'u_mouse',
    count: gridCount,
    angle: 'u_time * 0.15',
    intensity: warpIntensity,
    strength: flowStrength,
    scale: voronoiScale,
    animSpeed: voronoiSpeed,
    width: '0.25',
    height: '0.25'
  };

  // 3. Chain execution definitions sequentially
  const spaceCallLines = selectedSpaceMods
    .map((mod) => mod.getCall(inputContext))
    .join('\n          ');

  const shapeCallLine = selectedShapeMod.getCall(inputContext);

  // 4. Extract unique boilerplate code definitions to prevent redefinition compile crashes
  const uniqueInjectedCode = Array.from(
    new Set([...selectedSpaceMods, selectedShapeMod].map((mod) => mod.code))
  ).join('\n');

  return `
    uniform float u_time;
    uniform vec2 u_mouse;
    varying vec2 vUv;

    // --- Dynamic Code Injection ---
    ${uniqueInjectedCode}
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

      // Define a virtual light source position in 3D space (moving organically over time)
      vec3 lightPos = vec3(sin(u_time * 0.5) * 0.5, cos(u_time * 0.3) * 0.5, 1.0);

      for (float i = 0.0; i < ${coreComplexity.toFixed(1)}; i++) {
        ${spaceCallLines}
        ${shapeCallLine} // Generates 'dist'

        // 1. CALCULATE NORMALS (For Weight)
        // Look at neighboring coordinates to figure out slopes
        vec2 eps = vec2(0.005, 0.0);
        // We can estimate the gradient vector of our field
        float dX = dist - (length(uv + eps.xy));
        float dY = dist - (length(uv + eps.yx));
        vec3 normal = normalize(vec3(dX, dY, 0.03)); // Smaller Z = thicker/heavier ridges

        // 2. LIGHTING CALCULATION (Diffused & Specular Highlights)
        vec3 fragPos = vec3(uv0, dist * 0.2); // Treat the distance as an actual Z height
        vec3 lightDir = normalize(lightPos - fragPos);

        float diffuse = max(dot(normal, lightDir), 0.0);

        // Specular highlights give it a wet, slimy, or polished stone look
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 reflectDir = reflect(-lightDir, normal);
        float specular = pow(max(dot(viewDir, reflectDir), 0.0), 16.0); // 16.0 is shininess

        // 3. DEPTH ATTENUATION (Visual Fog)
        // Deeper layers (higher 'i') get darker and lose contrast
        float depthFactor = exp(-i * 0.4);
        float centerFalloff = exp(-length(uv0) * 1.2);

        float mask = smoothstep(0.5, 0.0, dist);

        // Sample our palette color map
        vec3 baseColor = cosinePalette(dist + i * 0.2 + u_time * 0.05, a, b, c, d);

        // Mix lighting into our base color to give it weight
        vec3 shadedColor = baseColor * (diffuse + 0.2) + vec3(specular * 0.4);

        // Accumulate the layers using our depth factor
        finalColor = mix(finalColor, finalColor + shadedColor, mask * 0.6 * depthFactor * centerFalloff);
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
}

// Small helper to ensure typing safety during pick evaluations
function SHAPE_REGISTRY_CONTRACTABLE_FALLBACK(mods: ShaderModule[]): ShaderModule[] {
  return mods;
}
