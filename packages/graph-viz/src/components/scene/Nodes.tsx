import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type * as THREE from 'three';
import {
  splitNodeIndices,
  writeInstanceData
} from '../../core/build-instances.ts';
import { useNodes } from '../../stores/content/selectors';
import { selectNode } from '../../stores/view/actions';
import {
  useSelectedNodeIdx,
  useVisibleCommunities
} from '../../stores/view/selectors';

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

    writeInstanceData(
      codeMesh,
      nodes,
      codeToGlobal,
      visibleCommunities,
      selectedNodeIdx
    );
    writeInstanceData(
      docMesh,
      nodes,
      docToGlobal,
      visibleCommunities,
      selectedNodeIdx
    );
  }, [nodes, codeToGlobal, docToGlobal, visibleCommunities, selectedNodeIdx]);

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const { instanceId } = event;
    if (instanceId === undefined) return;

    const isCode = event.object === codeMeshRef.current;
    const lookup = isCode ? codeToGlobal : docToGlobal;
    const globalIdx = lookup[instanceId];
    if (globalIdx === undefined) return;

    const node = nodes[globalIdx];
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
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh
        ref={docMeshRef}
        args={[undefined, undefined, docToGlobal.length]}
        frustumCulled={false}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>
    </>
  );
}

export { Nodes };
