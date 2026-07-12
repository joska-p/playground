import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import fragmentShader from '../shaders/fragmentShader.glsl?raw';
import vertexShader from '../shaders/vertexShader.glsl?raw';

export const useSimulationScene = (size: number, initialTexture: THREE.Texture) => {
  const simObjects = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    material: THREE.ShaderMaterial;
  } | null>(null);

  // Initialize the simulation scene only once
  useEffect(() => {
    if (simObjects.current === null) {
      const simMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uGridTexture: { value: initialTexture },
          uTexelSize: { value: new THREE.Vector2(1 / size, 1 / size) }
        }
      });

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
      scene.add(mesh);

      simObjects.current = { scene, camera, material: simMaterial };
    }
  }, [size, initialTexture]);

  const updateGridTexture = (texture: THREE.Texture) => {
    if (simObjects.current?.material.uniforms['uGridTexture']) {
      simObjects.current.material.uniforms['uGridTexture'].value = texture;
    }
  };

  return { simObjects, updateGridTexture };
};
