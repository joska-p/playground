import { type FC, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { GraphData } from './useGraphData.ts';
import Nodes from './Nodes.tsx';
import Edges from './Edges.tsx';
import { useGraphStore } from '../store/graphStore.ts';

interface GraphCanvasProps {
  data: GraphData;
}

const GraphCanvas: FC<GraphCanvasProps> = ({ data }) => {
  // Initialise the community set on mount
  const initCommunities = useGraphStore((s) => s.initCommunities);

  useEffect(() => {
    const communityIds = data.communities.map((c) => c.id).sort((a, b) => a - b);
    initCommunities(communityIds);
  }, [data.communities, initCommunities]);

  return (
    <Canvas
      camera={{ position: [0, 0, 12000], far: 30000 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      gl={{ antialias: true, alpha: false }}
      onPointerMissed={() => {
        useGraphStore.getState().selectNode(null);
      }}
    >
      <color attach="background" args={['#1a1a2e']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[1, 1, 1]} intensity={0.8} />
      <directionalLight position={[-1, -1, -1]} intensity={0.3} />
      <Nodes nodes={data.nodes} />
      <Edges nodes={data.nodes} links={data.links} />
      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        minDistance={100}
        maxDistance={50000}
      />
    </Canvas>
  );
};

export default GraphCanvas;
