import { useControls } from 'leva';
import { type PresetName } from './getSpawnPoints';

function useLevaControls() {
  const { preset, radius, offset, circleSegments, fsphereFaces, visible } =
    useControls('Spawning System', {
      preset: {
        label: 'Spawn',
        value: 'icosahedron' as PresetName,
        options: [
          'circle',
          'fsphere',
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
      fsphereFaces: {
        label: 'Faces',
        value: 12,
        min: 3,
        max: 32,
        step: 1,
        render: (get) => get('Spawning System.preset') === 'fsphere'
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
    });

  return { preset, radius, offset, circleSegments, fsphereFaces, visible };
}

export { useLevaControls };
