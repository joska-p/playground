import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

import { CONFIG } from '../../core/config.ts';
import { useCommunities } from '../../stores/content/selectors';
import { useLabelsVisible, useVisibleCommunities } from '../../stores/view/selectors';

const { labels } = CONFIG;

function CommunityLabels() {
    const communities = useCommunities();
    const labelsVisible = useLabelsVisible();
    const visibleCommunities = useVisibleCommunities();

    if (!labelsVisible) return <></>;

    const labelElements = communities
        .filter((c) => visibleCommunities.has(c.id))
        .map((c) => {
            const color = new THREE.Color(c.color);

            color.lerp(new THREE.Color(0xffffff), labels.colorLerp);

            return (
                <Billboard
                    key={c.id}
                    position={[c.centroid.x, c.centroid.y + labels.offsetY, c.centroid.z]}
                >
                    <Text
                        fontSize={labels.fontSize}
                        color={color.getStyle()}
                        anchorX="center"
                        anchorY="bottom"
                        outlineWidth={labels.outlineWidth}
                        outlineColor={labels.outlineColor}
                    >
                        {c.name}
                    </Text>
                </Billboard>
            );
        });

    return <>{labelElements}</>;
}

export { CommunityLabels };
