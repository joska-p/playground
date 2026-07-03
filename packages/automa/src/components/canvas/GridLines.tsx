type GridLinesProps = {
  cols: number;
  rows: number;
  cellSize?: number;
};

function GridLines({ cols, rows, cellSize = 1 }: GridLinesProps) {
  const maxCells = Math.max(cols, rows);
  const totalSize = maxCells * cellSize;

  return (
    <gridHelper
      args={[totalSize, maxCells, 'white', 'white']}
      rotation={[Math.PI / 2, 0, 0]} // Flip from horizontal XZ plane to vertical XY plane
      position={[0, 0, 0.01]} // Slight offset to prevent z-fighting with a background
    >
      <lineBasicMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </gridHelper>
  );
}

export { GridLines };
