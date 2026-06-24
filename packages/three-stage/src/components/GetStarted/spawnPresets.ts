import * as THREE from 'three';

export type SpawnPoint = {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

// Each entry is an outward face normal for the given solid.
// Position on the surface = normal × radius (passed to getSpawnPoints).
// Adding a new preset = just listing its face normals. Nothing else changes.
const s = 1 / Math.sqrt(3); // 1/√3, shared by tetrahedron and octahedron faces

const PRESETS = {
  cube: [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ],
  tetrahedron: [
    [s, s, -s],
    [s, -s, s],
    [-s, s, s],
    [-s, -s, -s]
  ],
  octahedron: [
    [s, s, s],
    [-s, s, s],
    [s, -s, s],
    [-s, -s, s],
    [s, s, -s],
    [-s, s, -s],
    [s, -s, -s],
    [-s, -s, -s]
  ]
} as const satisfies Record<string, [number, number, number][]>;

export type PresetName = keyof typeof PRESETS;

const LOCAL_UP = new THREE.Vector3(0, 1, 0);

// radius should match the inradius (center → face center) of your display mesh:
//   BoxGeometry(1,1,1)        → radius 0.5
//   TetrahedronGeometry(1)    → radius ≈ 0.33
//   OctahedronGeometry(1)     → radius ≈ 0.58
export function getSpawnPoints(preset: PresetName, radius = 0.5): SpawnPoint[] {
  return PRESETS[preset].map((n, id) => {
    const normal = new THREE.Vector3(...n).normalize();
    const position = normal.clone().multiplyScalar(radius);
    // Rotate branch local +Y to align with the outward face normal
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      LOCAL_UP,
      normal
    );
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);
    return { id, position, rotation };
  });
}

export const PRESET_CONFIG: Record<
  PresetName,
  { geometry: THREE.BufferGeometry; inradius: number }
> = {
  cube: { geometry: new THREE.BoxGeometry(1, 1, 1), inradius: 0.5 },
  tetrahedron: { geometry: new THREE.TetrahedronGeometry(1), inradius: 0.33 },
  octahedron: { geometry: new THREE.OctahedronGeometry(0.75), inradius: 0.43 }
};
