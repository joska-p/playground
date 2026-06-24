import * as THREE from 'three';

export type SpawnPoint = {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

// ============================================
// Constants
// ============================================

const LOCAL_UP = new THREE.Vector3(0, 1, 0);
const NORMALIZATION_FACTOR = 1 / Math.sqrt(3); // For tetrahedron/octahedron face normals

// ============================================
// Presets: Face normals for each shape
// (Position on surface = normal × radius)
// ============================================

const PRESETS = {
  cube: [
    [1, 0, 0],
    [-1, 0, 0], // ±X
    [0, 1, 0],
    [0, -1, 0], // ±Y
    [0, 0, 1],
    [0, 0, -1] // ±Z
  ],
  tetrahedron: [
    [NORMALIZATION_FACTOR, NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR],
    [NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR, NORMALIZATION_FACTOR],
    [-NORMALIZATION_FACTOR, NORMALIZATION_FACTOR, NORMALIZATION_FACTOR],
    [-NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR]
  ],
  octahedron: [
    [NORMALIZATION_FACTOR, NORMALIZATION_FACTOR, NORMALIZATION_FACTOR],
    [-NORMALIZATION_FACTOR, NORMALIZATION_FACTOR, NORMALIZATION_FACTOR],
    [NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR, NORMALIZATION_FACTOR],
    [-NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR, NORMALIZATION_FACTOR],
    [NORMALIZATION_FACTOR, NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR],
    [-NORMALIZATION_FACTOR, NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR],
    [NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR],
    [-NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR, -NORMALIZATION_FACTOR]
  ]
} as const satisfies Record<string, [number, number, number][]>;

export type PresetName = keyof typeof PRESETS;

// ============================================
// Helpers
// ============================================

/**
 * Creates a rotation that aligns the local +Y axis with a target direction.
 */
function createAlignmentRotation(targetDirection: THREE.Vector3): THREE.Euler {
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    LOCAL_UP,
    targetDirection
  );
  return new THREE.Euler().setFromQuaternion(quaternion);
}

/**
 * Generates spawn points for a given preset and radius.
 * @param preset - Name of the shape preset (e.g., 'cube', 'tetrahedron')
 * @param radius - Distance from center to spawn points (should match the shape's inradius)
 */
export function getSpawnPoints(preset: PresetName, radius = 0.5): SpawnPoint[] {
  return PRESETS[preset].map((normalComponents, id) => {
    const normal = new THREE.Vector3(...normalComponents).normalize();
    const position = normal.clone().multiplyScalar(radius);
    const rotation = createAlignmentRotation(normal);
    return { id, position, rotation };
  });
}

// ============================================
// Geometry Config
// (Inradius values are approximate for unit geometries)
// ============================================

export const PRESET_CONFIG: Record<
  PresetName,
  { geometry: THREE.BufferGeometry; inradius: number }
> = {
  cube: { geometry: new THREE.BoxGeometry(1, 1, 1), inradius: 0.5 },
  tetrahedron: { geometry: new THREE.TetrahedronGeometry(1), inradius: 1 / 3 }, // ~0.333
  octahedron: {
    geometry: new THREE.OctahedronGeometry(1),
    inradius: Math.sqrt(6) / 6
  } // ~0.408
};
