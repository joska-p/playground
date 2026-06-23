import * as THREE from 'three';

export function useInitialGridTexture(size = 512) {
  const data = new Uint8Array(size * size * 4); // 4 channels: RGBA

  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;

    const randomIntensity = Math.floor(Math.random() * 256);

    data[stride] = randomIntensity; // R
    data[stride + 1] = randomIntensity; // G
    data[stride + 2] = randomIntensity; // B
    data[stride + 3] = 255; // A (Fully opaque)
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  return texture;
}
