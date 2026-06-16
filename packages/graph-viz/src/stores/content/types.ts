import type {
  Community,
  GraphLink,
  GraphNode
} from '../../core/pipeline/graphData.schema';

export type GraphDataState = {
  nodes: GraphNode[];
  links: GraphLink[];
  communities: Community[];
};
