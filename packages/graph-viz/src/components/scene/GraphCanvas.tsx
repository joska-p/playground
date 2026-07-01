import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CONFIG } from '../../core/config.ts';
import { useCommunities, useNodes } from '../../stores/content/selectors';
import { initCommunities, selectNode } from '../../stores/view/actions';
import { useSelectedNodeIdx } from '../../stores/view/selectors';
import { CommunityLabels } from './CommunityLabels.tsx';
import { Edges } from './Edges.tsx';
import { Nodes } from './Nodes.tsx';

type OC = React.ComponentRef<typeof OrbitControls>;

const { camera, ambientLight, directionalLights, orbitControls } = CONFIG.scene;

const animTarget = new THREE.Vector3();
const animCamera = new THREE.Vector3();
let isAnimating = false;

function CameraAnimator({ controlsRef }: { controlsRef: React.RefObject<OC | null> }) {
  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls || !isAnimating) return;

    const speed = 0.08;

    controls.target.lerp(animTarget, speed);
    controls.object.position.lerp(animCamera, speed);
    controls.update();

    if (
      controls.target.distanceTo(animTarget) < 0.5 &&
      controls.object.position.distanceTo(animCamera) < 0.5
    ) {
      controls.target.copy(animTarget);
      controls.object.position.copy(animCamera);
      controls.update();
      isAnimating = false;
    }
  });

  return null;
}

function GraphCanvas() {
  const controlsRef = useRef<OC>(null);
  const communities = useCommunities();
  const nodes = useNodes();
  const selectedNodeIdx = useSelectedNodeIdx();

  useEffect(() => {
    const communityIds = communities.map((c) => c.id).sort((a, b) => a - b);
    initCommunities(communityIds);
  }, [communities]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (selectedNodeIdx === null || !controls) return;
    const node = nodes[selectedNodeIdx];
    if (!node) return;

    const offset = new THREE.Vector3().copy(controls.object.position).sub(controls.target);

    // Clamp offset to a reasonable distance so clicking from
    // far away doesn't keep the camera at extreme range.
    const maxDist = 300;
    if (offset.length() > maxDist) {
      offset.setLength(maxDist);
    }

    animTarget.set(node.x, node.y, node.z);
    animCamera.copy(animTarget).add(offset);
    isAnimating = true;
  }, [selectedNodeIdx, nodes]);

  return (
    <Canvas
      camera={{
        position: [camera.position[0], camera.position[1], camera.position[2]],
        far: camera.far
      }}
      className="bg-background h-full w-full"
      gl={{ antialias: true, alpha: false }}
      onContextMenu={(e: React.MouseEvent) => { e.preventDefault(); }}
      onCreated={(state: RootState) => {
        const bg = getComputedStyle(state.gl.domElement.parentElement!).backgroundColor;
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
        ref={controlsRef}
        enableDamping
        dampingFactor={orbitControls.dampingFactor}
        minDistance={orbitControls.minDistance}
        maxDistance={orbitControls.maxDistance}
      />
      <CameraAnimator controlsRef={controlsRef} />
    </Canvas>
  );
}

export { GraphCanvas };
