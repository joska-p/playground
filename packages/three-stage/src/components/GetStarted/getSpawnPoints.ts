import * as THREE from 'three';

export type SpawnPoint = {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

const LOCAL_UP = new THREE.Vector3(0, 1, 0);

// ============================================
// Mathematical Geometrical Constants
// ============================================
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2; // φ ≈ 1.618

// Normalization multipliers for uniform vector lengths across solids
const TETRA_OCTA_NORMAL = 1 / Math.sqrt(3);
const DODECA_NORMAL = 1 / Math.sqrt(1 + GOLDEN_RATIO * GOLDEN_RATIO);
const ICOS_NORMAL =
  1 /
  Math.sqrt(
    GOLDEN_RATIO * GOLDEN_RATIO +
      GOLDEN_RATIO * GOLDEN_RATIO * GOLDEN_RATIO * GOLDEN_RATIO
  );

const N_T = TETRA_OCTA_NORMAL;
const N_D = DODECA_NORMAL;
const N_I = ICOS_NORMAL;
const G_D = GOLDEN_RATIO * DODECA_NORMAL;
const G_I = GOLDEN_RATIO * ICOS_NORMAL;
const G2_I = GOLDEN_RATIO * GOLDEN_RATIO * ICOS_NORMAL;

// ============================================
// Exact Mathematical Face Normals (All 5 Solids)
// ============================================
const SOLID_NORMALS: Record<string, number[][]> = {
  // 4 Faces
  tetrahedron: [
    [N_T, N_T, -N_T],
    [N_T, -N_T, N_T],
    [-N_T, N_T, N_T],
    [-N_T, -N_T, -N_T]
  ],
  // 6 Faces
  cube: [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ],
  // 8 Faces
  octahedron: [
    [N_T, N_T, N_T],
    [-N_T, N_T, N_T],
    [N_T, -N_T, N_T],
    [-N_T, -N_T, N_T],
    [N_T, N_T, -N_T],
    [-N_T, N_T, -N_T],
    [N_T, -N_T, -N_T],
    [-N_T, -N_T, -N_T]
  ],
  // 12 Faces
  dodecahedron: [
    [0, N_D, G_D],
    [0, -N_D, G_D],
    [0, N_D, -G_D],
    [0, -N_D, -G_D],
    [G_D, 0, N_D],
    [-G_D, 0, N_D],
    [G_D, 0, -N_D],
    [-G_D, 0, -N_D],
    [N_D, G_D, 0],
    [-N_D, G_D, 0],
    [N_D, -G_D, 0],
    [-N_D, -G_D, 0]
  ],
  // 20 Faces
  icosahedron: [
    [N_I, N_I, G2_I],
    [-N_I, N_I, G2_I],
    [N_I, -N_I, G2_I],
    [-N_I, -N_I, G2_I],
    [N_I, G2_I, N_I],
    [-N_I, G2_I, N_I],
    [N_I, -G2_I, N_I],
    [-N_I, -G2_I, N_I],
    [G2_I, N_I, N_I],
    [-G2_I, N_I, N_I],
    [G2_I, -N_I, N_I],
    [-G2_I, -N_I, N_I],
    [G_I, G_I, G_I],
    [-G_I, G_I, G_I],
    [G_I, -G_I, G_I],
    [-G_I, -G_I, G_I],
    [G_I, G_I, -G_I],
    [-G_I, G_I, -G_I],
    [G_I, -G_I, -G_I],
    [-G_I, -G_I, -G_I]
  ]
};

export type PresetName =
  | 'circle'
  | 'tetrahedron'
  | 'cube'
  | 'octahedron'
  | 'dodecahedron'
  | 'icosahedron';

type GetSpawnPointsProps = {
  preset: PresetName;
  radius: number;
  offset: number;
  circleSegments: number;
};

export function getSpawnPoints({
  preset,
  radius,
  offset,
  circleSegments
}: GetSpawnPointsProps): SpawnPoint[] {
  const points: SpawnPoint[] = [];
  const totalDistance = radius + offset;

  // 1. Procedural Ring Spawning Strategy
  if (preset === 'circle') {
    for (let i = 0; i < circleSegments; i++) {
      const angle = (i / circleSegments) * Math.PI * 2;
      const normal = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);

      points.push({
        id: i,
        position: normal.clone().multiplyScalar(totalDistance),
        rotation: new THREE.Euler().setFromQuaternion(
          new THREE.Quaternion().setFromUnitVectors(LOCAL_UP, normal)
        )
      });
    }
    return points;
  }

  // 2. Pure Static Normals Array Strategy
  const normals = SOLID_NORMALS[preset] || [];
  const normalVec = new THREE.Vector3();

  for (let i = 0; i < normals.length; i++) {
    normalVec.fromArray(normals[i]);

    points.push({
      id: i,
      position: normalVec.clone().multiplyScalar(totalDistance),
      rotation: new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(LOCAL_UP, normalVec)
      )
    });
  }

  return points;
}
