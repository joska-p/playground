import type { Community, GraphLink, GraphNode } from '../../core/pipeline/graphData.schema';

export interface GraphDataState {
    nodes: GraphNode[];
    links: GraphLink[];
    communities: Community[];
}
