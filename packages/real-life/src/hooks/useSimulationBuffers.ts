import { useFBO } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export const useSimulationBuffers = (size: number) => {
  const bufferA = useFBO(size, size, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter
  });
  const bufferB = useFBO(size, size, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter
  });

  const readBuffer = useRef(bufferA);
  const writeBuffer = useRef(bufferB);

  const swapBuffers = () => {
    const temp = readBuffer.current;
    readBuffer.current = writeBuffer.current;
    writeBuffer.current = temp;
  };

  return { readBuffer, writeBuffer, swapBuffers };
};
