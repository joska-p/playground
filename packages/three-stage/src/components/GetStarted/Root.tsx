import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from 'three';
import { Branch } from './Branch';
import { getSpawnPoints, type PresetName } from './getSpawnPoints';

function getDebugGeometry(
  preset: PresetName,
  radius: number,
  circleSegments: number
) {
  switch (preset) {
    case 'circle':
      return new THREE.RingGeometry(
        radius - 0.02,
        radius - 0.02,
        circleSegments
      );
    case 'tetrahedron':
      return new THREE.TetrahedronGeometry(radius, 0);
    case 'cube':
      return new THREE.BoxGeometry(radius * 1.15, radius * 1.15, radius * 1.15);
    case 'octahedron':
      return new THREE.OctahedronGeometry(radius, 0);
    case 'dodecahedron':
      return new THREE.DodecahedronGeometry(radius, 0);
    case 'icosahedron':
      return new THREE.IcosahedronGeometry(radius, 0);
  }
}

export function Root() {
  const groupRef = useRef<THREE.Group>(null);

  const { preset, radius, offset, circleSegments, visible } = useControls(
    'Spawning System',
    {
      preset: {
        label: 'Spawn',
        value: 'icosahedron' as PresetName,
        options: [
          'circle',
          'tetrahedron',
          'cube',
          'octahedron',
          'dodecahedron',
          'icosahedron'
        ] as PresetName[]
      },
      circleSegments: {
        label: 'Segments',
        value: 12,
        min: 3,
        max: 32,
        step: 1,
        render: (get) => get('Spawning System.preset') === 'circle'
      },
      radius: { label: 'Radius', value: 1.5, min: 0.5, max: 5, step: 0.1 },
      offset: {
        label: 'Offset',
        value: 0.0,
        min: -2,
        max: 2,
        step: 0.05
      },
      visible: { label: 'Visible', value: true }
    }
  );

  const branches = getSpawnPoints({ preset, radius, offset, circleSegments });
  const debugGeometry = getDebugGeometry(preset, radius, circleSegments);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {visible && (
        <mesh geometry={debugGeometry}>
          <meshStandardMaterial color="dimgray" />
        </mesh>
      )}

      {branches.map((branch) => (
        <Branch
          key={branch.id}
          position={branch.position}
          rotation={branch.rotation}
        />
      ))}
    </group>
  );
}
