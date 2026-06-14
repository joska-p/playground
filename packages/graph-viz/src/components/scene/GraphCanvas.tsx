import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import type { GraphData } from '../../data/graphData.types.ts';
import { initCommunities, selectNode } from '../../stores/graph/actions';
import { Edges } from './Edges.tsx';
import { Nodes } from './Nodes.tsx';

type GraphCanvasProps = {
  data: GraphData;
};

function GraphCanvas({ data }: GraphCanvasProps) {
  useEffect(() => {
    const communityIds = data.communities
      .map((c) => c.id)
      .sort((a, b) => a - b);
    initCommunities(communityIds);
  }, [data.communities]);

  return (
    <Canvas
      camera={{ position: [0, 0, 1200], far: 5000 }}
      className="bg-background h-full w-full"
      gl={{ antialias: true, alpha: false }}
      onPointerMissed={() => {
        selectNode(null);
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
