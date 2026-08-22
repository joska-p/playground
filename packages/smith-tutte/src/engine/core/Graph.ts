type NodeId = string;

interface Node {
  id: NodeId;
}

interface Edge {
  id: string;
  from: NodeId;   // convention : potentiel le plus haut
  to: NodeId;     // convention : potentiel le plus bas
  resistance: number; // toujours 1 pour l'instant, mais explicite plutôt que codé en dur
}

interface Graph {
  nodes: Node[];
  edges: Edge[];
  source: NodeId; // le nœud "plus"
  sink: NodeId;   // le nœud "moins"
}

interface SolvedEdge extends Edge {
  current: number;
  voltage: number;
}

interface SolvedGraph extends Omit<Graph, 'edges'> {
  edges: SolvedEdge[];
  potentials: Record<NodeId, number>;
}

Class