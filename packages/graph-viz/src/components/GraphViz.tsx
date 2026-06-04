/**
 * GraphViz.tsx
 *
 * Three.js 3-D force-directed graph — single unified effect, no stale closures.
 *
 * Install:  npm install three @types/three
 *
 * Usage:
 *   import graphData from './graph.json';
 *   import { GraphViz } from './GraphViz';
 *   <div style={{ width: '100vw', height: '100vh' }}>
 *     <GraphViz data={graphData} onNodeSelect={n => console.log(n)} />
 *   </div>
 */

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';
import * as THREE from 'three';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GraphNode = {
  id: string;
  label: string;
  file_type?: string;
  source_file?: string;
  source_location?: string;
  community?: number;
  norm_label?: string;
};

export type GraphLink = {
  source: string;
  target: string;
  relation?: string;
  confidence?: string;
  confidence_score?: number;
  weight?: number;
  source_file?: string;
  source_location?: string | null;
};

export type GraphHyperedge = {
  id: string;
  label: string;
  nodes: string[];
  relation?: string;
  confidence?: string;
  confidence_score?: number;
  source_file?: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links?: GraphLink[];
  edges?: GraphLink[];
  hyperedges?: GraphHyperedge[];
  graph?: { hyperedges?: GraphHyperedge[] };
  directed?: boolean;
  multigraph?: boolean;
  built_at_commit?: string;
};

export type GraphVizProps = {
  data: GraphData;
  width?: number;
  height?: number;
  maxNodes?: number;
  onNodeSelect?: (node: GraphNode | null) => void;
};

// ─── Palette ──────────────────────────────────────────────────────────────────

const PALETTE = [
  '#4cc9f0',
  '#4361ee',
  '#7209b7',
  '#f72585',
  '#f77f00',
  '#06d6a0',
  '#ffd166',
  '#ef476f',
  '#118ab2',
  '#06a77d',
  '#d62246',
  '#9b5de5',
  '#f15bb5',
  '#fee440',
  '#00bbf9',
  '#00f5d4',
  '#e07a5f',
  '#3d405b',
  '#81b29a',
  '#f2cc8f',
  '#a8dadc',
  '#457b9d',
  '#e63946',
  '#2a9d8f',
];
const communityColor = (id?: number) =>
  id == null ? '#888888' : PALETTE[id % PALETTE.length];

// ─── Worker source ────────────────────────────────────────────────────────────

function makeWorkerSrc(nodes: GraphNode[], links: GraphLink[]): string {
  const nd = JSON.stringify(nodes.map((n) => ({ id: n.id })));
  const ld = JSON.stringify(links.map((l) => ({ s: l.source, t: l.target })));
  return `(function(){
  const nodes=${nd};
  const links=${ld};
  const idx=new Map(nodes.map((n,i)=>[n.id,i]));
  const N=nodes.length, L=links.length;
  const pos=new Float32Array(N*3);
  const vel=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const th=Math.acos(2*Math.random()-1), ph=Math.PI*2*Math.random(), r=80+Math.random()*40;
    pos[i*3]=r*Math.sin(th)*Math.cos(ph);
    pos[i*3+1]=r*Math.sin(th)*Math.sin(ph);
    pos[i*3+2]=r*Math.cos(th);
  }
  const si=new Int32Array(L), ti=new Int32Array(L);
  for(let e=0;e<L;e++){
    si[e]=idx.has(links[e].s)?idx.get(links[e].s):-1;
    ti[e]=idx.has(links[e].t)?idx.get(links[e].t):-1;
  }
  const REP=180, ATT=0.012, DAMP=0.78, ITER=120, EVERY=10;
  for(let iter=0;iter<ITER;iter++){
    const a=1-iter/ITER;
    const fx=new Float32Array(N), fy=new Float32Array(N), fz=new Float32Array(N);
    const S=Math.min(N*4,40000);
    for(let s=0;s<S;s++){
      const i=(Math.random()*N)|0, j=(Math.random()*N)|0;
      if(i===j) continue;
      const dx=pos[i*3]-pos[j*3], dy=pos[i*3+1]-pos[j*3+1], dz=pos[i*3+2]-pos[j*3+2];
      const d2=dx*dx+dy*dy+dz*dz+1, f=REP*REP/d2;
      fx[i]+=dx*f; fy[i]+=dy*f; fz[i]+=dz*f;
      fx[j]-=dx*f; fy[j]-=dy*f; fz[j]-=dz*f;
    }
    for(let e=0;e<L;e++){
      const i=si[e], j=ti[e]; if(i<0||j<0) continue;
      const dx=pos[j*3]-pos[i*3], dy=pos[j*3+1]-pos[i*3+1], dz=pos[j*3+2]-pos[i*3+2];
      const d=Math.sqrt(dx*dx+dy*dy+dz*dz)+0.01, f=d*ATT*a;
      fx[i]+=dx*f; fy[i]+=dy*f; fz[i]+=dz*f;
      fx[j]-=dx*f; fy[j]-=dy*f; fz[j]-=dz*f;
    }
    for(let i=0;i<N;i++){
      vel[i*3]=(vel[i*3]+fx[i])*DAMP; pos[i*3]+=vel[i*3];
      vel[i*3+1]=(vel[i*3+1]+fy[i])*DAMP; pos[i*3+1]+=vel[i*3+1];
      vel[i*3+2]=(vel[i*3+2]+fz[i])*DAMP; pos[i*3+2]+=vel[i*3+2];
    }
    if((iter+1)%EVERY===0||iter===ITER-1)
      self.postMessage({type:'progress',iter,pos:pos.slice()});
  }
  self.postMessage({type:'done'});
})();`;
}

// ─── Spherical orbit helper ───────────────────────────────────────────────────

type Spherical = {
  theta: number;
  phi: number;
  radius: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function GraphViz({
  data,
  width,
  height,
  maxNodes = 4000,
  onNodeSelect,
}: GraphVizProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  // Shared mutable state accessed inside the single effect
  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    mesh: THREE.InstancedMesh;
    lines: THREE.LineSegments;
    nodes: GraphNode[];
    idToIdx: Map<string, number>;
  } | null>(null);

  const spherical = useRef<Spherical>({ theta: 0.4, phi: 1.2, radius: 300 });
  const dragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const frameId = useRef(0);
  const dummy = useRef(new THREE.Object3D());

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [simProgress, setSimProgress] = useState(0);
  const [simDone, setSimDone] = useState(false);

  // ── Derived graph data ────────────────────────────────────────────────────
  const { nodes, links, hyperedges } = useMemo(() => {
    const raw = data ?? { nodes: [] };
    const nodes = raw.nodes.slice(0, maxNodes);
    const nodeSet = new Set(nodes.map((n) => n.id));
    const links = (raw.links ?? raw.edges ?? []).filter(
      (l) => nodeSet.has(l.source) && nodeSet.has(l.target)
    );
    const hyperedges = raw.hyperedges ?? raw.graph?.hyperedges ?? [];
    return { nodes, links, hyperedges };
  }, [data, maxNodes]);

  // ── Single unified effect: scene + simulation ─────────────────────────────
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || nodes.length === 0) return;

    // --- Dimensions ----------------------------------------------------------
    const W = (width ?? mount.clientWidth) || window.innerWidth;
    const H = (height ?? mount.clientHeight) || window.innerHeight;

    // --- Renderer ------------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x080c14, 1);
    mount.appendChild(renderer.domElement);

    // --- Scene ---------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080c14, 0.0018);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pt = new THREE.PointLight(0x4cc9f0, 2, 600);
    pt.position.set(0, 150, 0);
    scene.add(pt);

    // --- Camera --------------------------------------------------------------
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.5, 3000);
    camera.position.set(0, 0, spherical.current.radius);

    // --- Instanced mesh (nodes) ----------------------------------------------
    const geo = new THREE.SphereGeometry(1.2, 8, 8);
    const mat = new THREE.MeshPhongMaterial({ vertexColors: true });
    const mesh = new THREE.InstancedMesh(geo, mat, nodes.length);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false; // avoid culling during animation

    // Per-instance colours
    const colBuf = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      const c = new THREE.Color(communityColor(n.community));
      colBuf[i * 3] = c.r;
      colBuf[i * 3 + 1] = c.g;
      colBuf[i * 3 + 2] = c.b;
    });
    geo.setAttribute('color', new THREE.InstancedBufferAttribute(colBuf, 3));

    // Initial random sphere placement — so something is visible immediately
    const d = dummy.current;
    for (let i = 0; i < nodes.length; i++) {
      const th = Math.acos(2 * Math.random() - 1);
      const ph = Math.PI * 2 * Math.random();
      const r = 80 + Math.random() * 40;
      d.position.set(
        r * Math.sin(th) * Math.cos(ph),
        r * Math.sin(th) * Math.sin(ph),
        r * Math.cos(th)
      );
      d.scale.setScalar(1);
      d.updateMatrix();
      mesh.setMatrixAt(i, d.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);

    // --- Line segments (edges) -----------------------------------------------
    const lineGeo = new THREE.BufferGeometry();
    const lineBuf = new Float32Array(links.length * 6);
    const lineAttr = new THREE.BufferAttribute(lineBuf, 3);
    lineAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute('position', lineAttr);
    // Pre-set bounding sphere to avoid NaN computation on empty/zero buffer
    lineGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 2000);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2a4060,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.frustumCulled = false;
    lines.visible = false; // shown after first valid positions
    scene.add(lines);

    // --- idToIdx map ---------------------------------------------------------
    const idToIdx = new Map<string, number>(nodes.map((n, i) => [n.id, i]));

    // Store refs so pointer handlers can access them
    threeRef.current = { renderer, scene, camera, mesh, lines, nodes, idToIdx };

    // --- applyPositions ------------------------------------------------------
    function applyPositions(pos: Float32Array) {
      // Update node spheres
      for (let i = 0; i < nodes.length; i++) {
        const x = pos[i * 3],
          y = pos[i * 3 + 1],
          z = pos[i * 3 + 2];
        if (!isFinite(x) || !isFinite(y) || !isFinite(z)) continue;
        d.position.set(x, y, z);
        d.scale.setScalar(1);
        d.updateMatrix();
        mesh.setMatrixAt(i, d.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;

      // Update edge lines
      if (links.length > 0) {
        let anyWritten = false;
        for (let e = 0; e < links.length; e++) {
          const si = idToIdx.get(links[e].source);
          const ti = idToIdx.get(links[e].target);
          if (si === undefined || ti === undefined) continue;
          const sx = pos[si * 3],
            sy = pos[si * 3 + 1],
            sz = pos[si * 3 + 2];
          const tx = pos[ti * 3],
            ty = pos[ti * 3 + 1],
            tz = pos[ti * 3 + 2];
          if (
            !isFinite(sx) ||
            !isFinite(sy) ||
            !isFinite(sz) ||
            !isFinite(tx) ||
            !isFinite(ty) ||
            !isFinite(tz)
          )
            continue;
          lineBuf[e * 6] = sx;
          lineBuf[e * 6 + 1] = sy;
          lineBuf[e * 6 + 2] = sz;
          lineBuf[e * 6 + 3] = tx;
          lineBuf[e * 6 + 4] = ty;
          lineBuf[e * 6 + 5] = tz;
          anyWritten = true;
        }
        lineAttr.needsUpdate = true;
        if (anyWritten) lines.visible = true;
      }
    }

    // --- Web Worker simulation -----------------------------------------------
    const src = makeWorkerSrc(nodes, links);
    const blob = new Blob([src], { type: 'application/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    const worker = new Worker(blobUrl);

    worker.onmessage = (
      e: MessageEvent<{ type: string; iter: number; pos: Float32Array }>
    ) => {
      const { type, iter, pos } = e.data;
      if (type === 'progress') {
        setSimProgress(Math.round(((iter + 1) / 120) * 100));
        applyPositions(pos);
      }
      if (type === 'done') {
        setSimDone(true);
        worker.terminate();
        URL.revokeObjectURL(blobUrl);
      }
    };

    // --- Render loop ---------------------------------------------------------
    let running = true;
    function animate() {
      if (!running) return;
      frameId.current = requestAnimationFrame(animate);
      if (!dragging.current) spherical.current.theta += 0.0008;
      const { theta, phi, radius } = spherical.current;
      camera.position.set(
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta)
      );
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();

    // --- Resize --------------------------------------------------------------
    function onResize() {
      const W2 = mount?.clientWidth || window.innerWidth;
      const H2 = mount?.clientHeight || window.innerHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // --- Cleanup -------------------------------------------------------------
    return () => {
      running = false;
      cancelAnimationFrame(frameId.current);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      threeRef.current = null;
    };
    // Re-run whenever the graph data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, links]);

  // ── Highlight selected / hovered (outside the main effect) ───────────────
  useEffect(() => {
    const t = threeRef.current;
    if (!t) return;
    const d = dummy.current;
    for (let i = 0; i < t.nodes.length; i++) {
      t.mesh.getMatrixAt(i, d.matrix);
      d.matrix.decompose(d.position, d.quaternion, d.scale);
      const n = t.nodes[i];
      d.scale.setScalar(
        selectedNode?.id === n.id ? 3.5 : hoveredNode?.id === n.id ? 2.2 : 1
      );
      d.updateMatrix();
      t.mesh.setMatrixAt(i, d.matrix);
    }
    t.mesh.instanceMatrix.needsUpdate = true;
  }, [selectedNode, hoveredNode]);

  // ── Raycasting ────────────────────────────────────────────────────────────
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const getNodeAt = useCallback(
    (e: MouseEvent): GraphNode | null => {
      const t = threeRef.current;
      if (!t) return null;
      const canvas = t.renderer.domElement;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        ((e.clientY - rect.top) / rect.height) * -2 + 1
      );
      raycaster.setFromCamera(mouse, t.camera);
      const hits = raycaster.intersectObject(t.mesh);
      if (!hits.length) return null;
      return t.nodes[hits[0].instanceId ?? -1] ?? null;
    },
    [raycaster]
  );

  // ── Pointer events (attached to canvas after mount) ───────────────────────
  useEffect(() => {
    // Wait until the renderer canvas exists
    const canvas = threeRef.current?.renderer.domElement;
    if (!canvas) return;

    function onDown(e: MouseEvent) {
      dragging.current = false;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    }
    function onMove(e: MouseEvent) {
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      if (e.buttons === 1) {
        dragging.current = true;
        spherical.current.theta -= dx * 0.005;
        spherical.current.phi = Math.max(
          0.1,
          Math.min(Math.PI - 0.1, spherical.current.phi + dy * 0.005)
        );
        prevMouse.current = { x: e.clientX, y: e.clientY };
      } else {
        const n = getNodeAt(e);
        setHoveredNode(n);
        if (canvas) canvas.style.cursor = n ? 'pointer' : 'default';
      }
    }
    function onUp(e: MouseEvent) {
      if (!dragging.current) {
        const n = getNodeAt(e);
        setSelectedNode((prev) => (prev?.id === n?.id ? null : n));
        onNodeSelect?.(n);
      }
      dragging.current = false;
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      spherical.current.radius = Math.max(
        60,
        Math.min(1200, spherical.current.radius + e.deltaY * 0.4)
      );
    }

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('wheel', onWheel);
    };
    // Re-attach when nodes change (new canvas after scene rebuild)
  }, [nodes, getNodeAt, onNodeSelect]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Canvas target — must have explicit size from parent */}
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Progress bar */}
      {!simDone && (
        <div style={s.progressWrap}>
          <div style={s.progressLabel}>Simulating layout… {simProgress}%</div>
          <div style={s.progressTrack}>
            <div style={{ ...s.progressBar, width: `${simProgress}%` }} />
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={s.stats}>
        <span style={s.statItem}>
          <Dot c="#4cc9f0" />
          {nodes.length.toLocaleString()} nodes
        </span>
        <span style={s.statItem}>
          <Dot c="#7209b7" />
          {links.length.toLocaleString()} edges
        </span>
        <span style={s.statItem}>
          <Dot c="#f72585" />
          {hyperedges.length} hyperedges
        </span>
      </div>

      {/* Node detail panel */}
      {selectedNode && (
        <NodePanel
          node={selectedNode}
          links={links}
          nodes={nodes}
          onClose={() => {
            setSelectedNode(null);
            onNodeSelect?.(null);
          }}
        />
      )}

      {/* Hover tooltip */}
      {hoveredNode && !selectedNode && (
        <div style={s.tooltip}>{hoveredNode.label}</div>
      )}

      <Legend />
      <div style={s.controls}>
        Drag to rotate · Scroll to zoom · Click node for details
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Dot({ c }: { c: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: c,
        marginRight: 5,
      }}
    />
  );
}

type NodePanelProps = {
  node: GraphNode;
  links: GraphLink[];
  nodes: GraphNode[];
  onClose: () => void;
};
type Neighbour = {
  dir: '→' | '←';
  rel?: string;
  node?: GraphNode;
  rawId: string;
};

function NodePanel({ node, links, nodes, onClose }: NodePanelProps) {
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const neighbours = useMemo<Neighbour[]>(() => {
    const out: Neighbour[] = [];
    for (const l of links) {
      if (l.source === node.id)
        out.push({
          dir: '→',
          rel: l.relation,
          node: nodeMap.get(l.target),
          rawId: l.target,
        });
      else if (l.target === node.id)
        out.push({
          dir: '←',
          rel: l.relation,
          node: nodeMap.get(l.source),
          rawId: l.source,
        });
      if (out.length >= 20) break;
    }
    return out;
  }, [node, links, nodeMap]);

  return (
    <div style={s.panel}>
      <button
        style={s.panelClose}
        onClick={onClose}
      >
        ✕
      </button>
      <div style={{ ...s.panelType, color: communityColor(node.community) }}>
        {(node.file_type ?? 'node').toUpperCase()} · community {node.community}
      </div>
      <div style={s.panelTitle}>{node.label}</div>
      <div style={s.panelMeta}>{node.source_file}</div>
      {node.source_location && (
        <div style={s.panelMeta}>{node.source_location}</div>
      )}
      <div style={s.panelDivider} />
      <div style={s.panelSectionTitle}>
        Connections ({neighbours.length}
        {neighbours.length === 20 ? '+' : ' '})
      </div>
      <div style={s.neighbourList}>
        {neighbours.map((nb, i) => (
          <div
            key={i}
            style={s.neighbourRow}
          >
            <span style={s.neighbourDir}>{nb.dir}</span>
            <span style={s.neighbourRel}>{nb.rel}</span>
            <span style={s.neighbourLabel}>{nb.node?.label ?? nb.rawId}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div style={s.legend}>
      {[
        { c: communityColor(32), label: 'Community cluster' },
        { c: '#4cc9f0', label: 'Code node' },
        { c: '#f77f00', label: 'Document node' },
        { c: '#06d6a0', label: 'Image node' },
      ].map((it) => (
        <div
          key={it.label}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Dot c={it.c} />
          <span style={s.legendLabel}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  progressWrap: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(8,12,20,0.85)',
    border: '1px solid rgba(76,201,240,0.3)',
    borderRadius: 8,
    padding: '10px 16px',
    minWidth: 260,
    backdropFilter: 'blur(8px)',
  },
  progressLabel: {
    color: '#4cc9f0',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    background: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg,#4361ee,#4cc9f0)',
    transition: 'width 0.2s ease',
    borderRadius: 2,
  },
  stats: {
    position: 'absolute',
    top: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 20,
    background: 'rgba(8,12,20,0.75)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '6px 18px',
    backdropFilter: 'blur(10px)',
  },
  statItem: {
    color: '#c0d0e8',
    fontSize: 12,
    fontFamily: 'monospace',
    display: 'flex',
    alignItems: 'center',
  },
  panel: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 300,
    maxHeight: 'calc(100% - 32px)',
    overflowY: 'auto',
    background: 'rgba(8,12,20,0.92)',
    border: '1px solid rgba(76,201,240,0.25)',
    borderRadius: 12,
    padding: '18px 20px',
    backdropFilter: 'blur(16px)',
    color: '#e0eaf8',
    fontFamily: 'monospace',
  },
  panelClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'transparent',
    border: 'none',
    color: '#6080a0',
    cursor: 'pointer',
    fontSize: 14,
  },
  panelType: {
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  panelTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#e8f4ff',
    marginBottom: 4,
    wordBreak: 'break-word',
  },
  panelMeta: {
    fontSize: 11,
    color: '#5a7a9a',
    marginBottom: 2,
    wordBreak: 'break-word',
  },
  panelDivider: {
    height: 1,
    background: 'rgba(255,255,255,0.07)',
    margin: '12px 0',
  },
  panelSectionTitle: {
    fontSize: 11,
    color: '#4cc9f0',
    letterSpacing: '0.1em',
    marginBottom: 8,
  },
  neighbourList: { display: 'flex', flexDirection: 'column', gap: 4 },
  neighbourRow: { display: 'flex', alignItems: 'center', gap: 6 },
  neighbourDir: { color: '#7209b7', fontSize: 12, minWidth: 16 },
  neighbourRel: {
    fontSize: 10,
    color: '#3a6080',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    padding: '1px 5px',
    minWidth: 60,
  },
  neighbourLabel: {
    fontSize: 11,
    color: '#a0c0d8',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 160,
  },
  tooltip: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(8,12,20,0.9)',
    border: '1px solid rgba(76,201,240,0.2)',
    borderRadius: 6,
    padding: '5px 12px',
    color: '#c0d8f0',
    fontSize: 12,
    fontFamily: 'monospace',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
  legend: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    background: 'rgba(8,12,20,0.7)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 8,
    padding: '10px 14px',
    backdropFilter: 'blur(8px)',
  },
  legendLabel: { color: '#6a90b0', fontSize: 11, fontFamily: 'monospace' },
  controls: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'rgba(100,140,180,0.6)',
    fontSize: 11,
    fontFamily: 'monospace',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
};
