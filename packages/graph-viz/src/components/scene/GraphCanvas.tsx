import { OrbitControls } from '@react-three/drei';
import { Canvas, type RootState } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { CONFIG } from '../../core/config.ts';
import { useCommunities } from '../../stores/content/selectors';
import { initCommunities, selectNode } from '../../stores/view/actions';
import { CommunityLabels } from './CommunityLabels.tsx';
import { Edges } from './Edges.tsx';
import { Nodes } from './Nodes.tsx';

const { camera, ambientLight, directionalLights, orbitControls } = CONFIG.scene;

function GraphCanvas() {
  const communities = useCommunities();

  useEffect(() => {
    const communityIds = communities.map((c) => c.id).sort((a, b) => a - b);
    initCommunities(communityIds);
  }, [communities]);

  return (
    <Canvas
      camera={{
        position: [camera.position[0], camera.position[1], camera.position[2]],
        far: camera.far
      }}
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
      <ambientLight intensity={ambientLight.intensity} />
      <directionalLight
        position={[
          directionalLights[0].position[0],
          directionalLights[0].position[1],
          directionalLights[0].position[2]
        ]}
        intensity={directionalLights[0].intensity}
      />
      <directionalLight
        position={[
          directionalLights[1].position[0],
          directionalLights[1].position[1],
          directionalLights[1].position[2]
        ]}
        intensity={directionalLights[1].intensity}
      />
      <Nodes />
      <CommunityLabels />
      <Edges />
      <OrbitControls
        enableDamping
        dampingFactor={orbitControls.dampingFactor}
        minDistance={orbitControls.minDistance}
        maxDistance={orbitControls.maxDistance}
      />
    </Canvas>
  );
}

export { GraphCanvas };
