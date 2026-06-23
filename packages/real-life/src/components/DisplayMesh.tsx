import type { MeshBasicMaterial } from 'three';

type DisplayMeshProps = {
  displayMaterialRef: React.RefObject<MeshBasicMaterial | null>;
};

export const DisplayMesh = ({ displayMaterialRef }: DisplayMeshProps) => {
  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial ref={displayMaterialRef} />
    </mesh>
  );
};
