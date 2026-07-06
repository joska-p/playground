import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Vector2 } from 'three';
import {
  useComplexity,
  useGlitch,
  useModulo,
  usePalette,
  useSeed,
  useSymbolType
} from './store/selectors';
import type { SyllabicFibonacciMaterial } from './SyllabicFibonacciMaterial';
import { SyllabicFibonacciShaderElement } from './SyllabicFibonacciMaterial';

function Atlas() {
  const materialRef = useRef<SyllabicFibonacciMaterial>(null);
  const seed = useSeed();
  const modulo = useModulo();
  const complexity = useComplexity();
  const symbolType = useSymbolType();
  const palette = usePalette();
  const glitch = useGlitch();

  // Memoize CPU-bound hash generation to preserve 60-120fps fluid calculations
  const seedOffset = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 1000);
  }, [seed]);

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;

    // Secure Frame-0 updates (replaces dynamic truthiness check on numeric uTime/uSeedOffset values)
    if (mat.uniforms['uTime'] !== undefined) {
      mat.uniforms['uTime'].value = state.clock.getElapsedTime();
    }
    if (mat.uniforms['uGridSize'] !== undefined) {
      mat.uniforms['uGridSize'].value = complexity;
    }
    if (mat.uniforms['uModulo'] !== undefined) {
      mat.uniforms['uModulo'].value = modulo;
    }
    if (mat.uniforms['uSymbolType'] !== undefined) {
      mat.uniforms['uSymbolType'].value = symbolType;
    }
    if (mat.uniforms['uPalette'] !== undefined) {
      mat.uniforms['uPalette'].value = palette;
    }
    if (mat.uniforms['uGlitch'] !== undefined) {
      mat.uniforms['uGlitch'].value = glitch;
    }
    if (mat.uniforms['uSeedOffset'] !== undefined) {
      mat.uniforms['uSeedOffset'].value = seedOffset;
    }

    // Smoothly push resolution size directly here instead of static JSX declarations
    if (mat.uniforms['uResolution'] !== undefined) {
      (mat.uniforms['uResolution'].value as Vector2).set(state.size.width, state.size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <SyllabicFibonacciShaderElement ref={materialRef} />
    </mesh>
  );
}

export { Atlas };
