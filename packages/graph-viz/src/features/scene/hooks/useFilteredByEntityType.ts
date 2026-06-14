import type { FilteredSubset } from '../../../utils/communities';

export type FilteredByEntityType = {
  filteredNodes: FilteredSubset['nodes'];
  filteredPositions: Float32Array;
  filteredDegrees: Float32Array;
  filteredNodeIndex: Map<string, number>;
  filteredLinks: FilteredSubset['links'];
};

/**
 * Narrow a FilteredSubset to only nodes matching a given entity type.
 * When entityTypeFilter is empty, returns the full subset unchanged.
 *
 * Extracted from SceneDetail to keep that component thin and make this
 * logic independently testable.
 */
export function useFilteredByEntityType(
  detailData: FilteredSubset | null,
  entityTypeFilter: string
): FilteredByEntityType {
  if (!detailData || !entityTypeFilter) {
    return {
      filteredNodes: detailData?.nodes ?? [],
      filteredPositions: detailData?.positions ?? new Float32Array(0),
      filteredDegrees: detailData?.degrees ?? new Float32Array(0),
      filteredNodeIndex: detailData?.nodeIndex ?? new Map(),
      filteredLinks: detailData?.links ?? []
    };
  }

  const keep: number[] = [];
  for (let i = 0; i < detailData.nodes.length; i++) {
    if (detailData.nodes[i]!.entity_type === entityTypeFilter) {
      keep.push(i);
    }
  }

  const n = keep.length;
  const pos = new Float32Array(n * 3);
  const deg = new Float32Array(n);
  const nodes: FilteredSubset['nodes'] = [];
  const idx = new Map<string, number>();

  for (let j = 0; j < n; j++) {
    const origI = keep[j]!;
    pos[j * 3] = detailData.positions[origI * 3]!;
    pos[j * 3 + 1] = detailData.positions[origI * 3 + 1]!;
    pos[j * 3 + 2] = detailData.positions[origI * 3 + 2]!;
    deg[j] = detailData.degrees[origI]!;
    nodes.push(detailData.nodes[origI]!);
    idx.set(detailData.nodes[origI]!.id, j);
  }

  // Only keep links where both endpoints are in the filtered set
  const links = detailData.links.filter(
    (l) => idx.has(l.source) && idx.has(l.target)
  );

  return {
    filteredNodes: nodes,
    filteredPositions: pos,
    filteredDegrees: deg,
    filteredNodeIndex: idx,
    filteredLinks: links
  };
}
