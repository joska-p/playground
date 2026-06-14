import { Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useCommunities } from '../../stores/content/selectors';
import {
  useLabelsVisible,
  useVisibleCommunities
} from '../../stores/view/selectors';

function CommunityLabels() {
  const communities = useCommunities();
  const labelsVisible = useLabelsVisible();
  const visibleCommunities = useVisibleCommunities();

  const labels = useMemo(() => {
    if (!labelsVisible) return [];

    return communities
      .filter((c) => visibleCommunities.has(c.id))
      .map((c) => {
        const color = new THREE.Color(c.color);
        color.lerp(new THREE.Color(0xffffff), 0.6);

        return (
          <Text
            key={c.id}
            position={[c.centroid.x, c.centroid.y + 14, c.centroid.z]}
            fontSize={3.5}
            color={color.getStyle()}
            anchorX="center"
            anchorY="bottom"
            font={undefined}
            outlineWidth={0.3}
            outlineColor="#000000"
          >
            {c.name}
          </Text>
        );
      });
  }, [communities, labelsVisible, visibleCommunities]);

  return <>{labels}</>;
}

export { CommunityLabels };
