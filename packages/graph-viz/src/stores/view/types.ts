export type GraphState = {
    selectedNodeIdx: number | null;
    edgesVisible: boolean;
    visibleCommunities: Set<number>;
    totalCommunities: number;
    labelsVisible: boolean;
};
