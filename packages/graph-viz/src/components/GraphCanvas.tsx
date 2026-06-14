import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { useGraphStore } from '../store/graphStore.ts';
import { Edges } from './Edges.tsx';
import { Nodes } from './Nodes.tsx';
import type { GraphData } from './useGraphData.ts';

type GraphCanvasProps = {
  data: GraphData;
};

function GraphCanvas({ data }: GraphCanvasProps) {
  // Initialise the community set on mount
  const initCommunities = useGraphStore((s) => s.initCommunities);

  useEffect(() => {
    const communityIds = data.communities
      .map((c) => c.id)
      .sort((a, b) => a - b);
    initCommunities(communityIds);
  }, [data.communities, initCommunities]);

  return (
    <Canvas
      camera={{ position: [0, 0, 1200], far: 5000 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      gl={{ antialias: true, alpha: false }}
      onPointerMissed={() => {
        useGraphStore.getState().selectNode(null);
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[1, 1, 1]}
        intensity={0.8}
      />
      <directionalLight
        position={[-1, -1, -1]}
        intensity={0.3}
      />
      <Nodes nodes={data.nodes} />
      <Edges
        nodes={data.nodes}
        links={data.links}
      />
      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        minDistance={10}
        maxDistance={3000}
      />
    </Canvas>
  );
}

export { GraphCanvas };
