import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

import { SIM_CONFIG } from '../constants';
import { RAW_GRAPH } from '../data/graph-data';
import {
  setIsReady,
  setStats,
  useColorMode,
  useFilterFT,
  useFilterRel,
  useSearch,
  useShowHyper,
} from '../stores/graph/store';
import { buildDegreeMap, nodeColor, nodeRadius } from '../utils/colors';
import { hexToRGB } from './sim-utils';
import type { SimLink, SimNode } from './use-graph-simulation.types';

function resolveId(endpoint: string | number | d3.SimulationNodeDatum): string {
  return typeof endpoint === 'object'
    ? (endpoint as SimNode).id
    : String(endpoint);
}

export function useGraphSimulation() {
  const simRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodePositionsRef = useRef<Float32Array>(new Float32Array(0));
  const nodeColorsRef = useRef<Float32Array>(new Float32Array(0));
  const linkPositionsRef = useRef<Float32Array>(new Float32Array(0));

  const nodesRef = useRef<SimNode[]>([]);
  const linksRef = useRef<SimLink[]>([]);
  const degMapRef = useRef<Map<string, number>>(new Map());

  const hullsRef = useRef<Array<Array<[number, number]>>>([]);

  const highlightedNodeRef = useRef<string | null>(null);
  const connectedNodesRef = useRef<Set<string>>(new Set());

  const filterFT = useFilterFT();
  const filterRel = useFilterRel();
  const showHyper = useShowHyper();
  const colorMode = useColorMode();
  const colorModeRef = useRef(colorMode);
  const search = useSearch();

  const [nodes, setNodes] = useState<SimNode[]>([]);
  const [links, setLinks] = useState<SimLink[]>([]);

  useEffect(() => {
    colorModeRef.current = colorMode;
  }, [colorMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const prevSim = simRef.current;
    if (prevSim) prevSim.stop();

    setIsReady(false);

    let nodes: SimNode[] = RAW_GRAPH.nodes.map((n) => ({ ...n }));
    let links: SimLink[] = RAW_GRAPH.links.map((l) => ({
      ...l,
      source: l.s,
      target: l.t,
    }));

    if (filterFT) {
      const keep = new Set(
        nodes.filter((n) => n.ft === filterFT).map((n) => n.id)
      );
      links = links.filter((l) => keep.has(l.s) && keep.has(l.t));
      nodes = nodes.filter((n) => keep.has(n.id));
    }
    if (filterRel) {
      links = links.filter((l) => l.r === filterRel);
      const linked = new Set(links.flatMap((l) => [l.s, l.t]));
      nodes = nodes.filter((n) => linked.has(n.id));
    }

    const degMap = buildDegreeMap(links);
    const validLinks = links.filter(
      (l) => nodes.find((n) => n.id === l.s) && nodes.find((n) => n.id === l.t)
    );

    setStats({ nodes: nodes.length, links: validLinks.length });

    nodePositionsRef.current = new Float32Array(nodes.length * 3);
    nodeColorsRef.current = new Float32Array(nodes.length * 3);
    linkPositionsRef.current = new Float32Array(validLinks.length * 4);
    nodesRef.current = nodes;
    setNodes(nodes);
    linksRef.current = validLinks;
    setLinks(validLinks);
    degMapRef.current = degMap;
    hullsRef.current = [];

    for (let i = 0; i < nodes.length; i++) {
      const c = hexToRGB(nodeColor(nodes[i], colorModeRef.current));
      nodeColorsRef.current[i * 3] = c[0];
      nodeColorsRef.current[i * 3 + 1] = c[1];
      nodeColorsRef.current[i * 3 + 2] = c[2];
    }

    const sim = d3
      .forceSimulation<SimNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<SimNode, SimLink>(validLinks)
          .id((d) => d.id)
          .distance(SIM_CONFIG.linkDistance)
          .strength(SIM_CONFIG.linkStrength)
      )
      .force(
        'charge',
        d3
          .forceManyBody()
          .strength(SIM_CONFIG.chargeStrength)
          .distanceMax(SIM_CONFIG.chargeMaxDist)
      )
      .force('center', d3.forceCenter(0, 0))
      .force(
        'collide',
        d3.forceCollide<SimNode>(
          (d) => nodeRadius(d.id, degMap) + SIM_CONFIG.collideBuffer
        )
      )
      .alphaDecay(SIM_CONFIG.alphaDecay);

    function renderHulls() {
      if (!showHyper) {
        hullsRef.current = [];
        return;
      }
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const hulls: Array<Array<[number, number]>> = [];
      RAW_GRAPH.hyperedges.forEach((he) => {
        const pts = he.nodes
          .map((id) => nodeMap.get(id))
          .filter((n): n is SimNode => n !== undefined)
          .map((n): [number, number] => [n.x ?? 0, n.y ?? 0]);
        if (pts.length < 3) return;
        const hull = d3.polygonHull(pts);
        if (!hull) return;
        const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
        const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
        const padded = hull.map(([x, y]): [number, number] => {
          const dx = x - cx;
          const dy = y - cy;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          return [x + (dx / len) * 16, y + (dy / len) * 16];
        });
        hulls.push(padded);
      });
      hullsRef.current = hulls;
    }

    sim.on('tick', () => {
      const np = nodePositionsRef.current;
      const lp = linkPositionsRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        np[i * 3] = n.x ?? 0;
        np[i * 3 + 1] = n.y ?? 0;
        np[i * 3 + 2] = nodeRadius(n.id, degMap);
      }
      for (let i = 0; i < validLinks.length; i++) {
        const l = validLinks[i];
        const s = l.source as SimNode;
        const t = l.target as SimNode;
        lp[i * 4] = s.x ?? 0;
        lp[i * 4 + 1] = s.y ?? 0;
        lp[i * 4 + 2] = t.x ?? 0;
        lp[i * 4 + 3] = t.y ?? 0;
      }
      renderHulls();
    });

    sim.on('end', () => setIsReady(true));

    simRef.current = sim;

    return () => {
      sim.stop();
    };
  }, [filterFT, filterRel, showHyper]);

  useEffect(() => {
    const nodes = nodesRef.current;
    const nc = nodeColorsRef.current;
    for (let i = 0; i < nodes.length; i++) {
      const c = hexToRGB(nodeColor(nodes[i], colorMode));
      nc[i * 3] = c[0];
      nc[i * 3 + 1] = c[1];
      nc[i * 3 + 2] = c[2];
    }
  }, [colorMode]);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      highlightedNodeRef.current = null;
      connectedNodesRef.current = new Set();
      return;
    }
    const match = nodesRef.current.find(
      (n) => n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)
    );
    if (match) {
      const connected = new Set<string>();
      connected.add(match.id);
      linksRef.current.forEach((l) => {
        const s = resolveId(l.source);
        const t = resolveId(l.target);
        if (s === match.id) connected.add(t);
        if (t === match.id) connected.add(s);
      });
      highlightedNodeRef.current = match.id;
      connectedNodesRef.current = connected;
    } else {
      highlightedNodeRef.current = null;
      connectedNodesRef.current = new Set();
    }
  }, [search]);

  return {
    containerRef,
    simRef,
    nodePositionsRef,
    nodeColorsRef,
    linkPositionsRef,
    nodesRef,
    linksRef,
    degMapRef,
    hullsRef,
    highlightedNodeRef,
    connectedNodesRef,
    nodes,
    links,
  };
}
