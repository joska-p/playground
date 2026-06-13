import type {} from '@react-three/fiber';
import { useDataStore } from '../../../stores/dataStore';
import { buildCommunityLinkGeometries } from '../services/communityGeometry';

type CommunityLinksProps = {
  selectedCommunityId: number;
};

function CommunityLinks({ selectedCommunityId }: CommunityLinksProps) {
  const communities = useDataStore((s) => s.communities);
  const interCommunityEdges = useDataStore((s) => s.interCommunityEdges);

  const selectedCommunity = communities.get(selectedCommunityId);

  // Delegate link geometry computation to the service
  const links = !selectedCommunity
    ? []
    : buildCommunityLinkGeometries(
        selectedCommunityId,
        selectedCommunity,
        interCommunityEdges,
        communities
      );

  return (
    <>
      {links.map((link) => (
        <lineSegments
          key={`cross-${selectedCommunityId}-${link.targetCid}`}
          geometry={link.geometry}
        >
          <lineBasicMaterial
            color={link.color}
            opacity={link.opacity}
            transparent
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </>
  );
}

export { CommunityLinks };
