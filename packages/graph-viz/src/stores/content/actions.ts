import { graphDataStore } from './store';

import type { GraphData } from '../../core/pipeline/graphData.schema';

export function initGraphData(data: GraphData): void {
    graphDataStore.setState({
        nodes: data.nodes,
        links: data.links,
        communities: data.communities
    });
}
