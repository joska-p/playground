import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import { Color } from 'three';
import type { Vector3 } from '@react-three/fiber';

import type { Link3D, Node3D } from '../types/graph';

type LinkProps = {
  link: Link3D;
  nodeMap: Map<string, Node3D>;
};

function Link({ link, nodeMap }: LinkProps) {
  const source = nodeMap.get(link.sourceId);
  const target = nodeMap.get(link.targetId);

  const points = useMemo(() => {
    if (!source || !target) return [];
    return [
      [source.x, source.y, source.z] as Vector3,
      [target.x, target.y, target.z] as Vector3,
    ];
  }, [source, target]);

  const color = useMemo(() => {
    return new Color(0x999999);
  }, []);

  if (!points.length) return null;

  return (
    <Line
      points={points}
      color={color}
      lineWidth={Math.max(0.5, (link.weight ?? 1) * 1.5)}
      transparent
    />
  );
}

export { Link };
