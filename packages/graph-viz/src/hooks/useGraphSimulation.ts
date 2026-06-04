import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

import { REL_COLORS, SIM_CONFIG } from '../constants';
import { RAW_GRAPH } from '../data/graph-data';
import {
  setIsReady,
  setSelectedNode,
  setStats,
  useColorMode,
  useFilterFT,
  useFilterRel,
  useSearch,
  useShowHyper,
} from '../stores/graph/store';
import { buildDegreeMap, nodeColor, nodeRadius } from '../utils/colors';
import type { SimLink, SimNode } from './use-graph-simulation.types';

/**
 * Owns the entire D3 lifecycle: builds the filtered graph, runs the force
 * simulation, and attaches all DOM event listeners.  Returns stable refs
 * for the SVG and its container div so the canvas component can mount them.
 */
export function useGraphSimulation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const filterFT = useFilterFT();
  const filterRel = useFilterRel();
  const showHyper = useShowHyper();
  const colorMode = useColorMode();
  const search = useSearch();

  // ── Rebuild simulation when structural state changes ───────────────────────
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const W = containerRef.current.clientWidth;
    const H = containerRef.current.clientHeight;

    svg.selectAll('*').remove();
    setIsReady(false);

    // 1. Filter data
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

    const nodeMap = new Map<string, SimNode>(nodes.map((n) => [n.id, n]));
    const degMap = buildDegreeMap(links);
    const validLinks = links.filter(
      (l) => nodeMap.has(l.s) && nodeMap.has(l.t)
    );

    setStats({ nodes: nodes.length, links: validLinks.length });

    // 2. SVG layers (back → front)
    const g = svg.append('g');
    const hyperLayer = g.append('g').attr('class', 'hyper');
    const linkLayer = g.append('g').attr('class', 'links');
    const nodeLayer = g.append('g').attr('class', 'nodes');
    const labelLayer = g.append('g').attr('class', 'labels');

    // 3. Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 8])
      .on('zoom', (e: d3.D3ZoomEvent<SVGSVGElement, unknown>) =>
        g.attr('transform', e.transform.toString())
      );
    svg.call(zoom);
    zoomRef.current = zoom;

    // 4. Render links
    const linkSel = linkLayer
      .selectAll<SVGLineElement, SimLink>('line')
      .data(validLinks)
      .join('line')
      .attr('stroke', (d) => REL_COLORS[d.r] ?? '#334155')
      .attr('stroke-opacity', 0.55)
      .attr('stroke-width', (d) => 0.5 + d.w * 0.8);

    // 5. Render nodes
    const nodeSel = nodeLayer
      .selectAll<SVGCircleElement, SimNode>('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => nodeRadius(d.id, degMap))
      .attr('fill', (d) => nodeColor(d, colorMode))
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 0.8)
      .style('cursor', 'pointer')
      .on('click', (e: MouseEvent, d: SimNode) => {
        e.stopPropagation();
        setSelectedNode(d);
        highlight(d.id);
      })
      .call(
        d3
          .drag<SVGCircleElement, SimNode>()
          .on(
            'start',
            (e: d3.D3DragEvent<SVGCircleElement, SimNode, SimNode>, d) => {
              if (!e.active) sim.alphaTarget(0.3).restart();
              d.fx = d.x ?? null;
              d.fy = d.y ?? null;
            }
          )
          .on(
            'drag',
            (e: d3.D3DragEvent<SVGCircleElement, SimNode, SimNode>, d) => {
              d.fx = e.x;
              d.fy = e.y;
            }
          )
          .on(
            'end',
            (e: d3.D3DragEvent<SVGCircleElement, SimNode, SimNode>, d) => {
              if (!e.active) sim.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }
          )
      );

    // 6. Labels (only high-degree nodes to avoid clutter)
    const labelSel = labelLayer
      .selectAll<SVGTextElement, SimNode>('text')
      .data(nodes.filter((n) => (degMap.get(n.id) ?? 0) >= 4))
      .join('text')
      .text((d) => (d.label.length > 18 ? d.label.slice(0, 16) + '…' : d.label))
      .attr('font-size', '7px')
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => -nodeRadius(d.id, degMap) - 2)
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // 7. Highlight helper (used by click + search)
    function highlight(nodeId: string | null) {
      const connected = new Set<string>();
      if (nodeId) {
        connected.add(nodeId);
        validLinks.forEach((l) => {
          const s = resolveId(l.source);
          const t = resolveId(l.target);
          if (s === nodeId) connected.add(t);
          if (t === nodeId) connected.add(s);
        });
      }
      nodeSel
        .attr('opacity', (d) => (!nodeId || connected.has(d.id) ? 1 : 0.15))
        .attr('stroke', (d) => (d.id === nodeId ? '#fff' : '#0f172a'))
        .attr('stroke-width', (d) => (d.id === nodeId ? 2 : 0.8));
      linkSel.attr('opacity', (d) => {
        if (!nodeId) return 0.55;
        const s = resolveId(d.source);
        const t = resolveId(d.target);
        return s === nodeId || t === nodeId ? 0.9 : 0.05;
      });
    }

    svg.on('click', () => {
      setSelectedNode(undefined);
      highlight(null);
    });

    // 8. Hyperedge convex-hull overlays
    function renderHulls() {
      if (!showHyper) return;
      hyperLayer.selectAll('*').remove();
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
          const dx = x - cx,
            dy = y - cy;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          return [x + (dx / len) * 16, y + (dy / len) * 16];
        });

        hyperLayer
          .append('path')
          .attr('d', 'M' + padded.map((p) => p.join(',')).join('L') + 'Z')
          .attr('fill', '#334155')
          .attr('fill-opacity', 0.12)
          .attr('stroke', '#475569')
          .attr('stroke-opacity', 0.4)
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '4,3');
      });
    }

    // 9. Force simulation
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
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force(
        'collide',
        d3.forceCollide<SimNode>(
          (d) => nodeRadius(d.id, degMap) + SIM_CONFIG.collideBuffer
        )
      )
      .alphaDecay(SIM_CONFIG.alphaDecay);

    sim.on('tick', () => {
      linkSel
        .attr('x1', (d) => (d.source as SimNode).x ?? 0)
        .attr('y1', (d) => (d.source as SimNode).y ?? 0)
        .attr('x2', (d) => (d.target as SimNode).x ?? 0)
        .attr('y2', (d) => (d.target as SimNode).y ?? 0);

      nodeSel.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);

      labelSel.attr('x', (d) => d.x ?? 0).attr('y', (d) => d.y ?? 0);

      renderHulls();
    });

    sim.on('end', () => setIsReady(true));

    return () => {
      sim.stop();
    };
  }, [filterFT, filterRel, showHyper]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reactive color update (no simulation restart) ──────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    d3.select(svgRef.current)
      .selectAll<SVGCircleElement, SimNode>('.nodes circle')
      .attr('fill', (d) => nodeColor(d, colorMode));
  }, [colorMode]);

  // ── Reactive search highlight ──────────────────────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    const q = search.toLowerCase().trim();
    d3.select(svgRef.current)
      .selectAll<SVGCircleElement, SimNode>('.nodes circle')
      .attr('opacity', (d) => (!q || matches(d, q) ? 1 : 0.12))
      .attr('stroke', (d) => (q && matches(d, q) ? '#fff' : '#0f172a'))
      .attr('stroke-width', (d) => (q && matches(d, q) ? 2 : 0.8));
  }, [search]);

  return { svgRef, containerRef, zoomRef };
}

// ── Private helpers ────────────────────────────────────────────────────────────

function resolveId(endpoint: string | number | d3.SimulationNodeDatum): string {
  return typeof endpoint === 'object'
    ? (endpoint as SimNode).id
    : String(endpoint);
}

function matches(node: SimNode, query: string): boolean {
  return (
    node.label.toLowerCase().includes(query) ||
    node.id.toLowerCase().includes(query)
  );
}
