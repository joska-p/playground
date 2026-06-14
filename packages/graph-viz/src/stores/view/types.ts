export type GraphState = {
  /** Currently selected node index, null if nothing selected */
  selectedNodeIdx: number | null;
  /** Whether edges are visible */
  edgesVisible: boolean;
  /** Community IDs that are currently visible (empty = show all) */
  visibleCommunities: Set<number>;
  /** Total communities in the dataset */
  totalCommunities: number;
  /** Whether floating community labels are visible */
  labelsVisible: boolean;
};
