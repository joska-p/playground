import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { hyperedge } from '../../../config';
import { useDataStore } from '../../../stores/dataStore';
import { useUiStore } from '../../../stores/uiStore';
import { computeHyperedgeHull } from '../../../utils/hyperedges';

function HyperedgeLayer() {
  const graphData = useDataStore((s) => s.graphData);
  const positions = useDataStore((s) => s.positions);
  const nodeIndex = useDataStore((s) => s.nodeIndex);
  const showHyperedges = useUiStore((s) => s.showHyperedges);

  const meshes = (() => {
    if (!positions || !graphData || !showHyperedges) return [];

    const hyperedges = graphData.graph?.hyperedges ?? [];

    return hyperedges
      .map((he) => {
        const indices = he.nodes
          .map((nid) => nodeIndex.get(nid))
          .filter((idx): idx is number => idx !== undefined);

        if (indices.length < 3) return null;

        const points = indices.map(
          (idx) =>
            new THREE.Vector3(
              positions[idx * 3],
              positions[idx * 3 + 1],
              positions[idx * 3 + 2]
            )
        );

        // Compute centroid for label position
        const centroid = new THREE.Vector3();
        for (const pt of points) centroid.add(pt);
        centroid.divideScalar(points.length);

        // Compute convex hull
        const geometry = computeHyperedgeHull(positions, indices);
        if (!geometry) return null;
        const edges = new THREE.EdgesGeometry(geometry);

        return { edges, centroid, label: he.label, id: he.id };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null);
  })();

  if (meshes.length === 0) return null;

  return (
    <>
      {meshes.map((m) => (
        <group key={m.id}>
          {/* Translucent hull */}
          <mesh geometry={m.edges} frustumCulled={false}>
            <meshBasicMaterial
              color={hyperedge.hullColor}
              transparent
              opacity={hyperedge.hullOpacity}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          {/* Wireframe overlay */}
          <lineSegments geometry={m.edges} frustumCulled={false}>
            <lineBasicMaterial
              color={hyperedge.wireColor}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </lineSegments>
          {/* Label */}
          <Text
            position={[m.centroid.x, m.centroid.y, m.centroid.z]}
            fontSize={hyperedge.labelFontSize}
            color={hyperedge.labelColor}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
            outlineOpacity={0.8}
          >
            {m.label}
          </Text>
        </group>
      ))}
    </>
  );
}

export { HyperedgeLayer };
