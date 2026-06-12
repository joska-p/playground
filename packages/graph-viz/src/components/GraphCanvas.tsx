import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WorkerPool } from '@repo/worker-pool';
import type { GraphData, GraphLink, GraphNode, LayoutInput } from '../types';
import { GraphEdges } from './GraphEdges';
import { GraphNodes } from './GraphNodes';
import { GraphPanel } from './GraphPanel';

// ── Helpers ────────────────────────────────────────────────

function parseCommunityFilter(input: string): Set<number> | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const ids = new Set<number>();
  for (const part of trimmed.split(',')) {
    const p = part.trim();
    if (!p) continue;

    const range = p.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number.parseInt(range[1]!, 10);
      const end = Number.parseInt(range[2]!, 10);
      const lo = Math.min(start, end);
      const hi = Math.max(start, end);
      for (let i = lo; i <= hi; i++) ids.add(i);
    } else {
      const n = Number.parseInt(p, 10);
      if (!Number.isNaN(n)) ids.add(n);
    }
  }

  return ids.size > 0 ? ids : null;
}

// ── Scene ──────────────────────────────────────────────────

function Scene({
  positions,
  nodes,
  links,
  nodeIndex,
  autoRotate,
  showEdges,
}: {
  positions: Float32Array;
  nodes: GraphNode[];
  links: GraphLink[];
  nodeIndex: Map<string, number>;
  autoRotate: boolean;
  showEdges: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />
      <directionalLight position={[-10, 0, -20]} intensity={0.4} />

      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        minDistance={1}
        maxDistance={2000}
      />

      <GraphNodes positions={positions} nodes={nodes} />
      {showEdges && (
        <GraphEdges
          positions={positions}
          links={links}
          nodeIndex={nodeIndex}
        />
      )}
    </>
  );
}

// ── Loading ────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      Computing graph layout...
    </div>
  );
}

// ── GraphCanvas ────────────────────────────────────────────

function GraphCanvas() {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [minCommunitySize, setMinCommunitySize] = useState(1);
  const [communityFilter, setCommunityFilter] = useState('');
  const [autoRotate, setAutoRotate] = useState(true);
  const [showEdges, setShowEdges] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // ── Load graph data ──

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/src/data/graph.json');
        const data = (await response.json()) as GraphData;
        setGraphData(data);
      } catch {
        const mod = await import('../data/graph.json');
        setGraphData(mod.default as unknown as GraphData);
      }
    }
    loadData();
  }, []);

  // ── Run force layout ──

  useEffect(() => {
    if (!graphData) return;

    const pool = new WorkerPool<LayoutInput, Float32Array>({
      workerFactory: () =>
        new Worker(new URL('../workers/force-layout.worker', import.meta.url), {
          type: 'module',
        }),
      maxPoolSize: 1,
      serialize: (task) => ({ message: task }),
      deserialize: (event) => ({ ok: true, value: event.data as Float32Array }),
    });

    pool
      .run({
        nodes: graphData.nodes,
        links: graphData.links,
        center: [0, 0, 0],
        radius: 30,
      })
      .then((result) => {
        setPositions(result);
      });

    return () => {
      pool.teardown();
    };
  }, [graphData]);

  // ── Derived: node index ──

  const nodeIndex = useMemo(() => {
    if (!graphData) return new Map<string, number>();
    const idx = new Map<string, number>();
    graphData.nodes.forEach((node, i) => idx.set(node.id, i));
    return idx;
  }, [graphData]);

  // ── Derived: community sizes ──

  const communitySizes = useMemo(() => {
    if (!graphData) return new Map<number, number>();
    const map = new Map<number, number>();
    graphData.nodes.forEach((n) => map.set(n.community, (map.get(n.community) ?? 0) + 1));
    return map;
  }, [graphData]);

  // ── Derived: visible communities ──

  const visibleCommunities = useMemo(() => {
    if (!graphData) return new Set<number>();
    let communities = new Set(graphData.nodes.map((n) => n.community));

    // Apply min-size filter
    if (minCommunitySize > 1) {
      communities = new Set(
        [...communities].filter(
          (c) => (communitySizes.get(c) ?? 0) >= minCommunitySize,
        ),
      );
    }

    // Apply specific community IDs filter
    const filterIds = parseCommunityFilter(communityFilter);
    if (filterIds) {
      communities = new Set([...communities].filter((c) => filterIds.has(c)));
    }

    return communities;
  }, [graphData, minCommunitySize, communityFilter, communitySizes]);

  // ── Derived: filtered data ──

  const filteredData = useMemo(() => {
    if (!graphData || !positions) return null;

    const isSearching = searchQuery.trim().length > 0;
    const isFilteringBySize = minCommunitySize > 1;
    const isFilteringById = communityFilter.trim().length > 0;
    if (!isSearching && !isFilteringBySize && !isFilteringById) return null;

    // Determine which node IDs are visible
    let visibleNodeIds: Set<string>;

    if (isSearching) {
      const q = searchQuery.toLowerCase();
      visibleNodeIds = new Set(
        graphData.nodes
          .filter((n) => n.label.toLowerCase().includes(q))
          .map((n) => n.id),
      );
    } else {
      visibleNodeIds = new Set(
        graphData.nodes
          .filter((n) => visibleCommunities.has(n.community))
          .map((n) => n.id),
      );
    }

    // Rebuild filtered positions and node index
    const filteredNodes: GraphNode[] = [];
    const filteredPos = new Float32Array(visibleNodeIds.size * 3);
    const filteredIdx = new Map<string, number>();
    let idx = 0;

    for (let i = 0; i < graphData.nodes.length; i++) {
      const node = graphData.nodes[i]!;
      if (visibleNodeIds.has(node.id)) {
        filteredNodes.push(node);
        filteredIdx.set(node.id, idx);
        filteredPos[idx * 3] = positions[i * 3]!;
        filteredPos[idx * 3 + 1] = positions[i * 3 + 1]!;
        filteredPos[idx * 3 + 2] = positions[i * 3 + 2]!;
        idx++;
      }
    }

    // Filter links
    const filteredLinks = graphData.links.filter(
      (l) => filteredIdx.has(l.source) && filteredIdx.has(l.target),
    );

    return {
      nodes: filteredNodes,
      links: filteredLinks,
      positions: filteredPos,
      nodeIndex: filteredIdx,
    };
  }, [graphData, positions, visibleCommunities, searchQuery, minCommunitySize, communityFilter]);

  // ── Data for rendering ──

  if (!graphData || !positions) return <LoadingFallback />;

  const displayNodes = filteredData?.nodes ?? graphData.nodes;
  const displayLinks = filteredData?.links ?? graphData.links;
  const displayPositions = filteredData?.positions ?? positions;
  const displayNodeIndex = filteredData?.nodeIndex ?? nodeIndex;

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [50, 40, 60], fov: 50 }}
        dpr={[1, 2]}
        className="h-full w-full"
      >
        <Scene
          positions={displayPositions}
          nodes={displayNodes}
          links={displayLinks}
          nodeIndex={displayNodeIndex}
          autoRotate={autoRotate}
          showEdges={showEdges}
        />
      </Canvas>

      <GraphPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        minCommunitySize={minCommunitySize}
        onMinCommunitySizeChange={setMinCommunitySize}
        communityFilter={communityFilter}
        onCommunityFilterChange={setCommunityFilter}
        autoRotate={autoRotate}
        onAutoRotateChange={setAutoRotate}
        showEdges={showEdges}
        onShowEdgesChange={setShowEdges}
        totalNodes={graphData.nodes.length}
        visibleNodes={displayNodes.length}
        totalLinks={graphData.links.length}
        visibleLinks={displayLinks.length}
        totalCommunities={communitySizes.size}
        visibleCommunities={visibleCommunities.size}
        isPanelOpen={isPanelOpen}
        onPanelToggle={() => setIsPanelOpen((v) => !v)}
      />
    </div>
  );
}

export { GraphCanvas };
