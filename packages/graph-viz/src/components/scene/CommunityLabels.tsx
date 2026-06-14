import { Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { CONFIG } from '../../core/config.ts';
import { useCommunities } from '../../stores/content/selectors';
import {
  useLabelsVisible,
  useVisibleCommunities
} from '../../stores/view/selectors';

const { labels } = CONFIG;

function CommunityLabels() {
  const communities = useCommunities();
  const labelsVisible = useLabelsVisible();
  const visibleCommunities = useVisibleCommunities();

  const labelElements = useMemo(() => {
    if (!labelsVisible) return [];

    return communities
      .filter((c) => visibleCommunities.has(c.id))
      .map((c) => {
        const color = new THREE.Color(c.color);
        color.lerp(new THREE.Color(0xffffff), labels.colorLerp);

        return (
          <Text
            key={c.id}
            position={[
              c.centroid.x,
              c.centroid.y + labels.offsetY,
              c.centroid.z
            ]}
            fontSize={labels.fontSize}
            color={color.getStyle()}
            anchorX="center"
            anchorY="bottom"
            font={undefined}
            outlineWidth={labels.outlineWidth}
            outlineColor={labels.outlineColor}
          >
            {c.name}
          </Text>
        );
      });
  }, [communities, labelsVisible, visibleCommunities]);

  return <>{labelElements}</>;
}

export { CommunityLabels };
