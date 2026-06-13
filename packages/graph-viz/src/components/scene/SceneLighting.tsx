import { ContactShadows } from '@react-three/drei';
import {
  contactShadow,
  fillLight,
  fog,
  hemisphereLight,
  keyLight,
  rimLight
} from '../../config';

/**
 * All scene lighting, fog, and contact shadows.
 * Pure visual — no state, no hooks.
 */
function SceneLighting() {
  return (
    <>
      {/* Fog for depth perception */}
      <fog attach="fog" args={[fog.color, fog.near, fog.far]} />

      {/* Ambient fill from sky/ground */}
      <hemisphereLight
        args={[
          hemisphereLight.skyColor,
          hemisphereLight.groundColor,
          hemisphereLight.intensity
        ]}
      />

      {/* Main key light — casts shadows */}
      <directionalLight
        position={keyLight.position}
        intensity={keyLight.intensity}
        castShadow
        shadow-mapSize-width={keyLight.shadowMapSize}
        shadow-mapSize-height={keyLight.shadowMapSize}
        shadow-camera-far={keyLight.shadowCameraFar}
        shadow-camera-left={keyLight.shadowCameraLeft}
        shadow-camera-right={keyLight.shadowCameraRight}
        shadow-camera-top={keyLight.shadowCameraTop}
        shadow-camera-bottom={keyLight.shadowCameraBottom}
      />

      {/* Cool fill light from opposite side */}
      <directionalLight
        position={fillLight.position}
        intensity={fillLight.intensity}
      />

      {/* Subtle rim light from behind */}
      <directionalLight
        position={rimLight.position}
        intensity={rimLight.intensity}
      />

      {/* Soft contact shadow beneath the graph */}
      <ContactShadows
        position={contactShadow.position}
        opacity={contactShadow.opacity}
        scale={contactShadow.scale}
        blur={contactShadow.blur}
        far={contactShadow.far}
      />
    </>
  );
}

export { SceneLighting };
