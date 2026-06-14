import type {
  Community,
  GraphLink,
  GraphNode
} from '../../data/graphData.schema';

export type GraphDataState = {
  nodes: GraphNode[];
  links: GraphLink[];
  communities: Community[];
};
