import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { FromSeed } from './from-seed/FromSeed';

//import { FoldedSpace } from './folded-space/FoldedSpace';

export function ArtCanvas() {
  const [seed, setSeed] = useState('random seed');

  return (
    <>
      <input
        className="bg-background text-foreground absolute top-3 left-3 z-10"
        value={seed}
        type="text"
        onChange={(e) => setSeed(e.target.value)}
      />
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FromSeed seed={seed} />
      </Canvas>
    </>
  );
}
