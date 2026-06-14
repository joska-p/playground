import type { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GraphNode } from '../../data/graphData.types';
import { selectNode } from '../../stores/graph/actions';
import {
  useSelectedNodeIdx,
  useVisibleCommunities
} from '../../stores/graph/selectors';

const DIM_COLOR = new THREE.Color(0x333333);
const WHITE = new THREE.Color(0xffffff);

function getSize(node: GraphNode): number {
  const degree = node.inDegree + node.outDegree;
  return Math.log(degree + 1) * 0.3 + 0.8;
}

/**
 * Splits node indices by file_type and returns lookup maps
 * from local instanced-mesh index → global nodes array index.
 */
function splitNodes(nodes: GraphNode[]) {
  const codeToGlobal: number[] = [];
  const docToGlobal: number[] = [];

  nodes.forEach((n, globalIdx) => {
    if (n.file_type === 'code') codeToGlobal.push(globalIdx);
    else docToGlobal.push(globalIdx);
  });

  return { codeToGlobal, docToGlobal };
}

type NodesProps = {
  nodes: GraphNode[];
};

function Nodes({ nodes }: NodesProps) {
  const codeMeshRef = useRef<THREE.InstancedMesh>(null);
  const docMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const tmpColor = useRef(new THREE.Color());

  const selectedNodeIdx = useSelectedNodeIdx();
  const visibleCommunities = useVisibleCommunities();

  const { codeToGlobal, docToGlobal } = splitNodes(nodes);

  // Single effect updates both meshes in one pass over the full node list.
  useEffect(() => {
    const codeMesh = codeMeshRef.current;
    const docMesh = docMeshRef.current;
    if (!codeMesh || !docMesh) return;

    let codeLocalIdx = 0;
    let docLocalIdx = 0;

    nodes.forEach((node, globalIdx) => {
      const isCode = node.file_type === 'code';
      const mesh = isCode ? codeMesh : docMesh;
      const localIdx = isCode ? codeLocalIdx++ : docLocalIdx++;

      const isVisible = visibleCommunities.has(node.community);
      const scale = isVisible ? getSize(node) : 0.001;

      dummy.current.position.set(node.x, node.y, node.z);
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(localIdx, dummy.current.matrix);

      if (!isVisible) {
        tmpColor.current.copy(DIM_COLOR);
      } else {
        tmpColor.current.set(node.color);
        if (globalIdx === selectedNodeIdx) {
          tmpColor.current.lerp(WHITE, 0.4);
        }
      }
      mesh.setColorAt(localIdx, tmpColor.current);
    });

    codeMesh.instanceMatrix.needsUpdate = true;
    if (codeMesh.instanceColor) codeMesh.instanceColor.needsUpdate = true;

    docMesh.instanceMatrix.needsUpdate = true;
    if (docMesh.instanceColor) docMesh.instanceColor.needsUpdate = true;
  }, [nodes, visibleCommunities, selectedNodeIdx]);

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const { instanceId } = event;
    if (instanceId === undefined) return;

    const node = nodes[instanceId];
    if (!visibleCommunities.has(node.community)) return;

    // Toggle: clicking the already-selected node deselects it.
    selectNode(selectedNodeIdx === instanceId ? null : instanceId);
  }

  return (
    <>
      {/* Code nodes → spheres */}
      <instancedMesh
        key={codeToGlobal.length}
        ref={codeMeshRef}
        args={[undefined, undefined, codeToGlobal.length]}
        frustumCulled={false}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>

      {/* Doc nodes → boxes */}
      <instancedMesh
        key={docToGlobal.length}
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
