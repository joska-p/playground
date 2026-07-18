import {
  auroraFlowBehavior,
  colorDriftBehavior,
  edgeDetectBehavior,
  filmGrainBehavior,
  hueShiftBehavior,
  iridescentSheenBehavior,
  neonGlowPulseBehavior,
  neonReactivePulseBehavior,
  paletteCycleBehavior,
  rgbGlitchSplitBehavior,
  scanLinesBehavior,
  spectralShiftBehavior,
  thermalRadianceBehavior,
  thermalVisionBehavior,
  vignetteBehavior
} from './color.js';
import {
  cosmicMaelstromBehavior,
  crystalFacetBehavior,
  cyberChromaGlitchBehavior,
  domainWarpBehavior,
  glitchBlocksBehavior,
  gravityLensBehavior,
  gravityWellBehavior,
  kaleidoscopeBehavior,
  liquidMetalBehavior,
  mirrorTileBehavior,
  mouseProximityBehavior,
  noiseCrawlBehavior,
  pixelationBehavior,
  plasmaFluidBehavior,
  quantumTessellationBehavior,
  rotateBehavior,
  spiralGalaxyBehavior,
  swirlBehavior,
  tunnelBehavior,
  voronoiBehavior,
  waveInterferenceBehavior
} from './spatial.js';

export type BehaviourKind = 'spatial' | 'color';

export type ApplyCodeContext = {
  time: string;
  speed: string;
  spatial: string;
  color: string;
};

export type Behavior = {
  readonly id: string;
  readonly label: string;
  readonly glslFunction?: string;
  readonly kind: BehaviourKind;
  readonly applyCode: (ctx: ApplyCodeContext) => string;
  readonly noiseDependencies?: readonly string[];
};

export const BEHAVIORS = {
  // ── Spatial ──
  rotate: rotateBehavior,
  swirl: swirlBehavior,
  kaleidoscope: kaleidoscopeBehavior,
  'domain-warp': domainWarpBehavior,
  'mirror-tile': mirrorTileBehavior,
  tunnel: tunnelBehavior,
  'noise-crawl': noiseCrawlBehavior,
  'mouse-proximity': mouseProximityBehavior,
  pixelation: pixelationBehavior,
  voronoi: voronoiBehavior,
  'spiral-galaxy': spiralGalaxyBehavior,
  'gravity-lens': gravityLensBehavior,
  'wave-interference': waveInterferenceBehavior,
  'crystal-facet': crystalFacetBehavior,
  'glitch-blocks': glitchBlocksBehavior,
  'liquid-metal': liquidMetalBehavior,
  'cosmic-maelstrom': cosmicMaelstromBehavior,
  'quantum-tessellation': quantumTessellationBehavior,
  'gravity-well': gravityWellBehavior,
  'plasma-fluid': plasmaFluidBehavior,
  'cyber-chroma-glitch': cyberChromaGlitchBehavior,
  // ── Color ──
  'hue-shift': hueShiftBehavior,
  'color-drift': colorDriftBehavior,
  'edge-detect': edgeDetectBehavior,
  vignette: vignetteBehavior,
  'film-grain': filmGrainBehavior,
  'scan-lines': scanLinesBehavior,
  'spectral-shift': spectralShiftBehavior,
  'iridescent-sheen': iridescentSheenBehavior,
  'thermal-radiance': thermalRadianceBehavior,
  'neon-reactive': neonReactivePulseBehavior,
  'palette-cycle': paletteCycleBehavior,
  'neon-glow-pulse': neonGlowPulseBehavior,
  'rgb-glitch-split': rgbGlitchSplitBehavior,
  'aurora-flow': auroraFlowBehavior,
  'thermal-vision': thermalVisionBehavior
} satisfies Record<string, Behavior>;

export type BehaviorId = keyof typeof BEHAVIORS;

export function getBehaviour(id: BehaviorId): Behavior {
  return BEHAVIORS[id];
}
export function hasBehaviour(id: string): id is BehaviorId {
  return id in BEHAVIORS;
}
export function listBehaviours(): Behavior[] {
  return Object.values(BEHAVIORS);
}

// ── Type grouping ───────────────────────────────────────────────

export type BehaviourGroup = {
  label: string;
  behaviors: { id: BehaviorId; label: string }[];
};

const TYPE_ORDER: Behavior['kind'][] = ['spatial', 'color'];

const TYPE_LABELS: Record<Behavior['kind'], string> = {
  spatial: 'Spatial',
  color: 'Color'
};

export function listBehaviourGroups(): BehaviourGroup[] {
  const grouped = new Map<Behavior['kind'], { id: BehaviorId; label: string }[]>();

  for (const t of TYPE_ORDER) {
    grouped.set(t, []);
  }

  for (const [id, b] of Object.entries(BEHAVIORS) as [BehaviorId, Behavior][]) {
    grouped.get(b.kind)!.push({ id, label: b.label });
  }

  return TYPE_ORDER.map((t) => ({
    label: TYPE_LABELS[t],
    behaviors: grouped.get(t)!
  }));
}
