import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import { splitNodeIndices, writeInstanceData } from '../../core/build-instances.ts';
import { CONFIG } from '../../core/config.ts';
import { useNodes } from '../../stores/content/selectors';
import { selectNode } from '../../stores/view/actions';
import { useSelectedNodeIdx, useVisibleCommunities } from '../../stores/view/selectors';

const { sphereGeometry, boxGeometry } = CONFIG.nodes;

function Nodes() {
  const codeMeshRef = useRef<THREE.InstancedMesh>(null);
  const docMeshRef = useRef<THREE.InstancedMesh>(null);

  const nodes = useNodes();
  const selectedNodeIdx = useSelectedNodeIdx();
  const visibleCommunities = useVisibleCommunities();

  const { codeToGlobal, docToGlobal } = splitNodeIndices(nodes);

  useEffect(() => {
    const codeMesh = codeMeshRef.current;
    const docMesh = docMeshRef.current;
    if (!codeMesh || !docMesh) return;

    writeInstanceData(codeMesh, nodes, codeToGlobal, visibleCommunities, selectedNodeIdx);
    writeInstanceData(docMesh, nodes, docToGlobal, visibleCommunities, selectedNodeIdx);
  }, [nodes, codeToGlobal, docToGlobal, visibleCommunities, selectedNodeIdx]);

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const { instanceId } = event;
    if (instanceId === undefined) return;

    const isCode = event.object === codeMeshRef.current;
    const lookup = isCode ? codeToGlobal : docToGlobal;
    const globalIdx = lookup[instanceId];
    if (globalIdx === undefined) return;

    const node = nodes[globalIdx]!;
    if (!visibleCommunities.has(node.community)) return;

    selectNode(selectedNodeIdx === globalIdx ? null : globalIdx);
  }

  return (
    <>
      <instancedMesh
        ref={codeMeshRef}
        args={[undefined, undefined, codeToGlobal.length]}
        frustumCulled={false}
        onClick={handleClick}
        onPointerDown={(e) => { e.stopPropagation(); }}
      >
        <sphereGeometry
          args={[
            sphereGeometry.radius,
            sphereGeometry.widthSegments,
            sphereGeometry.heightSegments
          ]}
        />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh
        ref={docMeshRef}
        args={[undefined, undefined, docToGlobal.length]}
        frustumCulled={false}
        onClick={handleClick}
        onPointerDown={(e) => { e.stopPropagation(); }}
      >
        <boxGeometry args={[boxGeometry.width, boxGeometry.height, boxGeometry.depth]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}

export { Nodes };
