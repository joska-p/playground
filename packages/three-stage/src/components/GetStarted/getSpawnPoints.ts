import * as THREE from 'three';

export type SpawnPoint = {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

const LOCAL_UP = new THREE.Vector3(0, 1, 0);

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2; // φ ≈ 1.618

// Pure raw vertex coordinate arrays before normalization
const VERTEX_PRESETS: Record<string, number[][]> = {
  // 4 Vertices
  tetrahedron: [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1]
  ],
  // 8 Vertices
  cube: [
    [1, 1, 1],
    [1, 1, -1],
    [1, -1, 1],
    [1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1]
  ],
  // 6 Vertices
  octahedron: [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ],
  // 20 Vertices
  dodecahedron: [
    [1, 1, 1],
    [1, 1, -1],
    [1, -1, 1],
    [1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1],
    [0, 1 / GOLDEN_RATIO, GOLDEN_RATIO],
    [0, 1 / GOLDEN_RATIO, -GOLDEN_RATIO],
    [0, -1 / GOLDEN_RATIO, GOLDEN_RATIO],
    [0, -1 / GOLDEN_RATIO, -GOLDEN_RATIO],
    [1 / GOLDEN_RATIO, GOLDEN_RATIO, 0],
    [1 / GOLDEN_RATIO, -GOLDEN_RATIO, 0],
    [-1 / GOLDEN_RATIO, GOLDEN_RATIO, 0],
    [-1 / GOLDEN_RATIO, -GOLDEN_RATIO, 0],
    [GOLDEN_RATIO, 0, 1 / GOLDEN_RATIO],
    [GOLDEN_RATIO, 0, -1 / GOLDEN_RATIO],
    [-GOLDEN_RATIO, 0, 1 / GOLDEN_RATIO],
    [-GOLDEN_RATIO, 0, -1 / GOLDEN_RATIO]
  ],
  // 12 Vertices (Perfectly round, clean distribution)
  icosahedron: [
    [0, 1, GOLDEN_RATIO],
    [0, 1, -GOLDEN_RATIO],
    [0, -1, GOLDEN_RATIO],
    [0, -1, -GOLDEN_RATIO],
    [1, GOLDEN_RATIO, 0],
    [1, -GOLDEN_RATIO, 0],
    [-1, GOLDEN_RATIO, 0],
    [-1, -GOLDEN_RATIO, 0],
    [GOLDEN_RATIO, 0, 1],
    [GOLDEN_RATIO, 0, -1],
    [-GOLDEN_RATIO, 0, 1],
    [-GOLDEN_RATIO, 0, -1]
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

  // 1. Handle flat 2D ring spawning
  if (preset === 'circle') {
    for (let i = 0; i < circleSegments; i++) {
      const angle = (i / circleSegments) * Math.PI * 2;
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

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

  // 2. Handle pure mathematical vertex processing
  const rawVertices = VERTEX_PRESETS[preset] || [];
  const vertexVec = new THREE.Vector3();

  for (let i = 0; i < rawVertices.length; i++) {
    // Load coordinates and normalize it to make it a true direction vector pointing out from origin center
    vertexVec.fromArray(rawVertices[i]).normalize();

    const position = vertexVec.clone().multiplyScalar(totalDistance);
    const rotation = new THREE.Euler().setFromQuaternion(
      new THREE.Quaternion().setFromUnitVectors(LOCAL_UP, vertexVec)
    );

    points.push({ id: i, position, rotation });
  }

  return points;
}
