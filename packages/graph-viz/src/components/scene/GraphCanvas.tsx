import { OrbitControls } from '@react-three/drei';
import { Canvas, type RootState } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useCommunities } from '../../stores/content/selectors';
import { initCommunities, selectNode } from '../../stores/view/actions';
import { CommunityLabels } from './CommunityLabels.tsx';
import { Edges } from './Edges.tsx';
import { Nodes } from './Nodes.tsx';

function GraphCanvas() {
  const communities = useCommunities();

  useEffect(() => {
    const communityIds = communities
      .map((c) => c.id)
      .sort((a, b) => a - b);
    initCommunities(communityIds);
  }, [communities]);

  return (
    <Canvas
      camera={{ position: [0, 0, 800], far: 5000 }}
      className="bg-background h-full w-full"
      gl={{ antialias: true, alpha: false }}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      onCreated={(state: RootState) => {
        const bg = getComputedStyle(
          state.gl.domElement.parentElement!
        ).backgroundColor;
        state.gl.setClearColor(new THREE.Color(bg));
      }}
      onPointerMissed={(event: MouseEvent) => {
        if (event.button === 0) selectNode(null);
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
      <Nodes />
      <CommunityLabels />
      <Edges />
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
