// graph/workerSrc.ts
// Builds the inline Web Worker source string for the force-directed simulation.
// The worker runs entirely off the main thread and posts progress + done messages.

import type { GraphNode, GraphLink } from './types';

/**
 * Returns a self-contained JS string suitable for a Blob Worker.
 * The simulation runs Barnes-Hut-approximated repulsion (random pair sampling)
 * plus spring attraction along edges, for ITER iterations.
 * Posts: { type: 'progress', iter: number, pos: Float32Array }  every EVERY steps
 *        { type: 'done' }  when finished
 */
export function makeWorkerSrc(nodes: GraphNode[], links: GraphLink[]): string {
  const nd = JSON.stringify(nodes.map((n) => ({ id: n.id })));
  const ld = JSON.stringify(links.map((l) => ({ s: l.source, t: l.target })));

  return `(function(){
  const nodes = ${nd};
  const links = ${ld};
  const idx   = new Map(nodes.map((n, i) => [n.id, i]));
  const N = nodes.length;
  const L = links.length;

  // Initial positions: random points on a sphere shell
  const pos = new Float32Array(N * 3);
  const vel = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const th = Math.acos(2 * Math.random() - 1);
    const ph = Math.PI * 2 * Math.random();
    const r  = 80 + Math.random() * 40;
    pos[i*3]   = r * Math.sin(th) * Math.cos(ph);
    pos[i*3+1] = r * Math.sin(th) * Math.sin(ph);
    pos[i*3+2] = r * Math.cos(th);
  }

  // Pre-resolve link endpoint indices
  const si = new Int32Array(L);
  const ti = new Int32Array(L);
  for (let e = 0; e < L; e++) {
    si[e] = idx.has(links[e].s) ? idx.get(links[e].s) : -1;
    ti[e] = idx.has(links[e].t) ? idx.get(links[e].t) : -1;
  }

  const REP   = 180;    // repulsion strength
  const ATT   = 0.012;  // attraction strength
  const DAMP  = 0.78;   // velocity damping
  const ITER  = 120;    // total iterations
  const EVERY = 10;     // report frequency

  for (let iter = 0; iter < ITER; iter++) {
    const alpha = 1 - iter / ITER;  // cooling factor
    const fx = new Float32Array(N);
    const fy = new Float32Array(N);
    const fz = new Float32Array(N);

    // Repulsion: O(N) approximation via random pair sampling
    const S = Math.min(N * 4, 40000);
    for (let s = 0; s < S; s++) {
      const i = (Math.random() * N) | 0;
      const j = (Math.random() * N) | 0;
      if (i === j) continue;
      const dx = pos[i*3]   - pos[j*3];
      const dy = pos[i*3+1] - pos[j*3+1];
      const dz = pos[i*3+2] - pos[j*3+2];
      const d2 = dx*dx + dy*dy + dz*dz + 1;
      const f  = REP * REP / d2;
      fx[i] += dx*f;  fy[i] += dy*f;  fz[i] += dz*f;
      fx[j] -= dx*f;  fy[j] -= dy*f;  fz[j] -= dz*f;
    }

    // Attraction: spring force along each edge
    for (let e = 0; e < L; e++) {
      const i = si[e], j = ti[e];
      if (i < 0 || j < 0) continue;
      const dx = pos[j*3]   - pos[i*3];
      const dy = pos[j*3+1] - pos[i*3+1];
      const dz = pos[j*3+2] - pos[i*3+2];
      const d  = Math.sqrt(dx*dx + dy*dy + dz*dz) + 0.01;
      const f  = d * ATT * alpha;
      fx[i] += dx*f;  fy[i] += dy*f;  fz[i] += dz*f;
      fx[j] -= dx*f;  fy[j] -= dy*f;  fz[j] -= dz*f;
    }

    // Euler integration with damping
    for (let i = 0; i < N; i++) {
      vel[i*3]   = (vel[i*3]   + fx[i]) * DAMP;
      vel[i*3+1] = (vel[i*3+1] + fy[i]) * DAMP;
      vel[i*3+2] = (vel[i*3+2] + fz[i]) * DAMP;
      pos[i*3]   += vel[i*3];
      pos[i*3+1] += vel[i*3+1];
      pos[i*3+2] += vel[i*3+2];
    }

    if ((iter + 1) % EVERY === 0 || iter === ITER - 1) {
      self.postMessage({ type: 'progress', iter, pos: pos.slice() });
    }
  }

  self.postMessage({ type: 'done' });
})();`;
}
