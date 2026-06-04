export { loadGraph } from './load-graph';
export type { GraphData } from './graph-data.schema';

import { loadGraph } from './load-graph';
import type { GraphData } from './graph-data.schema';

export const RAW_GRAPH: GraphData = loadGraph();
