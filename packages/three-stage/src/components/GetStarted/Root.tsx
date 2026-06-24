import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { useSpawnPresetName } from '../../stores/getStarted/selectors';
import { Branch } from './Branch';
import { getSpawnPoints, PRESET_CONFIG } from './spawnPresets';

function Root() {
  const groupRef = useRef<Group>(null);
  const presetName = useSpawnPresetName();

  const { geometry, inradius } = PRESET_CONFIG[presetName];
  const branches = getSpawnPoints(presetName, inradius);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="dimgray"
          wireframe
        />
      </mesh>

      {branches.map((branch) => (
        <Branch
          key={branch.id}
          rotation={branch.rotation}
          position={branch.position}
        />
      ))}
    </group>
  );
}

export { Root };
