import type { GraphLink, GraphNode } from './graph.types';

/**
 * Builds the JS source for a disposable Web Worker that runs a force-directed
 * layout simulation. Posts `{type:'progress', iter, pos}` every 10 iterations
 * and `{type:'done'}` when finished.
 */
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

export { makeWorkerSrc };
