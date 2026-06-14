import type { GraphData } from '../../data/graphData.schema';
import { graphDataStore } from './store';

export function initGraphData(data: GraphData): void {
  graphDataStore.setState({
    nodes: data.nodes,
    links: data.links,
    communities: data.communities
  });
}
