// Visual constants for @repo/graph-viz
// All magic numbers that control the visual appearance live here.

export const fog = {
  color: '#0a0a1a',
  near: 100,
  far: 250
} as const;

export const hemisphereLight = {
  skyColor: '#87ceeb',
  groundColor: '#2a2a3a',
  intensity: 0.35
} as const;

export const keyLight = {
  position: [20, 30, 15] as const,
  intensity: 1.6,
  shadowMapSize: 2048,
  shadowCameraFar: 150,
  shadowCameraLeft: -60,
  shadowCameraRight: 60,
  shadowCameraTop: 60,
  shadowCameraBottom: -60
} as const;

export const fillLight = {
  position: [-20, 10, -25] as const,
  intensity: 0.5
} as const;

export const rimLight = {
  position: [0, -10, 30] as const,
  intensity: 0.3
} as const;

export const contactShadow = {
  position: [0, -50, 0] as const,
  opacity: 0.35,
  scale: 120,
  blur: 4,
  far: 70
} as const;

export const camera = {
  overviewPosition: [50, 40, 60] as const,
  detailSpreadMultiplier: 1.5,
  detailMinDistance: 8,
  detailXRatio: 0.6,
  detailYRatio: 0.4,
  detailMinSpread: 0.1,
  flyDuration: 600
} as const;

export const controls = {
  dampingFactor: 0.1,
  autoRotateSpeed: 0.5,
  minDistance: 1,
  maxDistance: 2000
} as const;

export const nodes = {
  geometryRadius: 0.5,
  geometryWidthSegments: 12,
  geometryHeightSegments: 8,
  defaultSize: 6,
  defaultSizeBase: 6,
  roughness: 0.85,
  metalness: 0
} as const;

export const degree = {
  sizeMin: 0.3,
  sizeMax: 1.8,
  brightnessMin: 0.35,
  brightnessFallback: 0.7
} as const;

export const nodeLabel = {
  fontSizeDefault: 0.6,
  selectedFontSize: 0.9,
  hoveredFontSize: 0.7,
  defaultFontSize: 0.5,
  offsetY: 2,
  outlineWidth: 0.03,
  outlineColor: '#000000',
  outlineOpacity: 0.9
} as const;

export const communityLabel = {
  defaultOffsetY: 2,
  defaultFontSize: 1.8,
  outlineWidth: 0.04,
  outlineColor: '#000000',
  outlineOpacity: 0.8,
  fontSizeBase: 0.6,
  fontSizeScale: 0.4,
  fontSizeMax: 3,
  hoverFontSize: 2.5,
  hoverOffsetYPad: 4
} as const;

export const communitySphere = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 12,
  ghostOpacity: 0.12
} as const;

export const community = {
  radiusMin: 0.5,
  radiusMultiplier: 1.5
} as const;

export const communityEdge = {
  minCount: 2,
  opacity: 0.3,
  coupling: {
    minOpacity: 0.1,
    maxOpacity: 0.9,
    thicknessTiers: 3,
    tierThresholds: [1, 10, 50]
  }
} as const;

export const relationPalette: Record<string, string> = {
  // Imports — blues
  imports: '#4a9eff',
  imports_from: '#2d7dd2',
  re_exports: '#7ab8ff',
  // Calls — greens
  calls: '#2ecc71',
  method: '#27ae60',
  uses: '#58d68d',
  // Structure — oranges
  contains: '#e67e22',
  implements: '#d35400',
  // References — teals
  references: '#1abc9c',
  // Similarity — purples
  conceptually_related_to: '#9b59b6',
  semantically_similar_to: '#8e44ad'
} as const;

export const graphEdge = {
  color: '#888888',
  opacity: 0.25,
  opacityByConfidence: {
    CONFIDENT: 0.25,
    INFERRED: 0.08
  }
} as const;

export const highlightedEdge = {
  color: '#ffffff',
  opacity: 0.35,
  useRelationColor: true
} as const;

export const fileTypeColors: Record<string, string> = {
  code: '#888888',
  document: '#f0db4f',
  image: '#2ecc71'
} as const;

export const torusRing = {
  radius: 0.7,
  tube: 0.04,
  radialSegments: 16,
  tubularSegments: 24
} as const;

export const smartLabel = {
  baseThreshold: 20,
  distanceScale: 30,
  maxLabels: 100,
  fontSizeBase: 0.6,
  fontSizeScale: 0.4,
  fontSizeMax: 3,
  cameraUpdateThreshold: 1
} as const;

export const communityLink = {
  opacityMax: 0.6,
  opacityBase: 0.15,
  opacityPerCount: 0.02
} as const;

export const detailView = {
  maxSpread: 15,
  communityListMax: 50,
  linkedEdgesMax: 8
} as const;

export const colors = {
  palette: [
    '#4cc9f0',
    '#4361ee',
    '#7209b7',
    '#f72585',
    '#f77f00',
    '#06d6a0',
    '#ffd166',
    '#ef476f',
    '#118ab2',
    '#06a77d',
    '#d62246',
    '#9b5de5',
    '#f15bb5',
    '#fee440',
    '#00bbf9',
    '#00f5d4',
    '#e07a5f',
    '#3d405b',
    '#81b29a',
    '#f2cc8f',
    '#a8dadc',
    '#457b9d',
    '#e63946',
    '#2a9d8f'
  ] as const,
  fallback: [0.5, 0.5, 0.5] as const,
  defaultCommunity: '#888888'
} as const;

export const hyperedge = {
  hullOpacity: 0.08,
  hullColor: '#8888ff',
  wireColor: '#aaaaff',
  labelFontSize: 0.8,
  labelColor: '#aaaaff'
} as const;

export const nodeHealth = {
  isolated: {
    opacity: 0.4,
    ringColor: '#ff4444'
  },
  lowConfidence: {
    opacity: 0.6,
    ringColor: '#ffaa00'
  }
} as const;

export const directedEdge = {
  enabled: true,
  arrowSize: 0.3,
  arrowColor: '#ffffff',
  opacity: 0.5,
  directedRelations: ['imports', 'imports_from', 'calls', 're_exports']
} as const;

export const communityClustering = {
  enabled: true,
  // Communities with fewer nodes than this threshold are considered "small"
  smallThreshold: 5,
  // Camera distance beyond which clustering activates
  // Default camera is at ~88 units; set high so clustering only triggers
  // when the user zooms out significantly past the default view
  farDistanceThreshold: 250,
  // Color for the aggregated "Other" cluster
  otherClusterColor: '#555555',
  // Radius multiplier for the aggregated cluster
  otherClusterRadiusMultiplier: 0.8
} as const;

export const communityLOD = {
  // [widthSegments, heightSegments] levels from high to low detail
  levels: [
    { distance: 0, widthSegments: 16, heightSegments: 12 },   // high detail (close)
    { distance: 60, widthSegments: 12, heightSegments: 8 },    // medium
    { distance: 120, widthSegments: 8, heightSegments: 6 }     // low detail (far)
  ] as Array<{ distance: number; widthSegments: number; heightSegments: number }>
} as const;
