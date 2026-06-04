import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import * as THREE from 'three';

import type { GraphLink, GraphNode } from '../core/graph.types';
import { communityColor } from '../core/palette';

// ── Shared types exposed to sibling hooks ───────────────────────────────────

export type ThreeState = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.InstancedMesh;
  lines: THREE.LineSegments;
  lineBuf: Float32Array;
  lineAttr: THREE.BufferAttribute;
  nodes: GraphNode[];
  idToIdx: Map<string, number>;
  dummy: THREE.Object3D;
};

export type SphericalState = {
  theta: number;
  phi: number;
  radius: number;
};

type UseThreeSceneResult = {
  threeRef: RefObject<ThreeState | null>;
  sphericalRef: RefObject<SphericalState>;
  draggingRef: RefObject<boolean>;
};

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Creates the Three.js renderer, scene, camera, instanced mesh (nodes) and
 * line segments (edges). Starts the render loop with slow auto-rotation.
 *
 * Returns mutable refs shared with sibling hooks (simulation, interaction,
 * highlight) so they can read/write Three.js objects without re-renders.
 */
function useThreeScene(
  mountRef: RefObject<HTMLDivElement | null>,
  nodes: GraphNode[],
  links: GraphLink[],
  width?: number,
  height?: number
): UseThreeSceneResult {
  const threeRef = useRef<ThreeState | null>(null);
  const sphericalRef = useRef<SphericalState>({
    theta: 0.4,
    phi: 1.2,
    radius: 300,
  });
  const draggingRef = useRef(false);
  const frameIdRef = useRef(0);

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
    camera.position.set(0, 0, sphericalRef.current.radius);

    // --- Instanced mesh (nodes) ----------------------------------------------
    const geo = new THREE.SphereGeometry(1.2, 8, 8);
    const mat = new THREE.MeshPhongMaterial({ vertexColors: true });
    const mesh = new THREE.InstancedMesh(geo, mat, nodes.length);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;

    const colBuf = new Float32Array(nodes.length * 3);
    const dummy = new THREE.Object3D();
    nodes.forEach((n, i) => {
      const c = new THREE.Color(communityColor(n.community));
      colBuf[i * 3] = c.r;
      colBuf[i * 3 + 1] = c.g;
      colBuf[i * 3 + 2] = c.b;
    });
    geo.setAttribute('color', new THREE.InstancedBufferAttribute(colBuf, 3));

    // Initial random sphere placement so something is visible immediately
    for (let i = 0; i < nodes.length; i++) {
      const th = Math.acos(2 * Math.random() - 1);
      const ph = Math.PI * 2 * Math.random();
      const r = 80 + Math.random() * 40;
      dummy.position.set(
        r * Math.sin(th) * Math.cos(ph),
        r * Math.sin(th) * Math.sin(ph),
        r * Math.cos(th)
      );
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
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
    lines.visible = false;
    scene.add(lines);

    // --- idToIdx map ---------------------------------------------------------
    const idToIdx = new Map<string, number>(nodes.map((n, i) => [n.id, i]));

    // Store refs so sibling hooks can access them
    threeRef.current = {
      renderer,
      scene,
      camera,
      mesh,
      lines,
      lineBuf,
      lineAttr,
      nodes,
      idToIdx,
      dummy,
    };

    // --- Render loop ---------------------------------------------------------
    let running = true;
    function animate(): void {
      if (!running) return;
      frameIdRef.current = requestAnimationFrame(animate);
      if (!draggingRef.current) sphericalRef.current.theta += 0.0008;
      const { theta, phi, radius } = sphericalRef.current;
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
    function onResize(): void {
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
      cancelAnimationFrame(frameIdRef.current);
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

  return { threeRef, sphericalRef, draggingRef };
}

export { useThreeScene };
