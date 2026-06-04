import { useEffect } from 'react';
import type { RefObject } from 'react';

import type { GraphNode } from '../core/graph.types';
import type { ThreeState } from './useThreeScene';

/**
 * Updates instance matrix scales so the selected node appears larger (3.5×)
 * and the hovered node slightly larger (2.2×). Runs as a separate effect so
 * the heavyweight scene setup is not re-triggered by selection changes.
 */
function useHighlight(
  threeRef: RefObject<ThreeState | null>,
  selectedNode: GraphNode | null,
  hoveredNode: GraphNode | null
): void {
  useEffect(() => {
    const t = threeRef.current;
    if (!t) return;
    const { dummy } = t;
    for (let i = 0; i < t.nodes.length; i++) {
      t.mesh.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      const n = t.nodes[i]!;
      dummy.scale.setScalar(
        selectedNode?.id === n.id ? 3.5 : hoveredNode?.id === n.id ? 2.2 : 1
      );
      dummy.updateMatrix();
      t.mesh.setMatrixAt(i, dummy.matrix);
    }
    t.mesh.instanceMatrix.needsUpdate = true;
  }, [threeRef, selectedNode, hoveredNode]);
}

export { useHighlight };
