import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export type Camera3DState = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

/**
 * Easing function for smooth camera transitions
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Hook to manage 3D camera controls (WASD + scroll wheel)
 * Integrates with React Three Fiber's useFrame for smooth animation
 */
export function use3DCamera(
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>,
  containerRef: React.MutableRefObject<HTMLDivElement | null>
) {
  const keysRef = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    up: false,
    down: false,
  });

  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetDepthRef = useRef(200);
  const isAnimatingRef = useRef(false);
  const animationStartRef = useRef(0);
  const animationDurationRef = useRef(0);
  const animationStartPosRef = useRef(new THREE.Vector3());
  const animationTargetPosRef = useRef(new THREE.Vector3());

  // Camera settings
  const moveSpeed = 2;
  const depthSpeed = 0.05;
  const friction = 0.85;
  const maxDepth = 400;
  const minDepth = 50;

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w') keysRef.current.w = true;
      if (key === 'a') keysRef.current.a = true;
      if (key === 's') keysRef.current.s = true;
      if (key === 'd') keysRef.current.d = true;
      if (e.key === 'ArrowUp') keysRef.current.up = true;
      if (e.key === 'ArrowDown') keysRef.current.down = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w') keysRef.current.w = false;
      if (key === 'a') keysRef.current.a = false;
      if (key === 's') keysRef.current.s = false;
      if (key === 'd') keysRef.current.d = false;
      if (e.key === 'ArrowUp') keysRef.current.up = false;
      if (e.key === 'ArrowDown') keysRef.current.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Scroll wheel for depth control
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Don't interfere with existing zoom behavior - only for depth if CTRL held
      if (!e.ctrlKey) return;
      e.preventDefault();

      const delta = e.deltaY > 0 ? 1.1 : 0.9;
      targetDepthRef.current = Math.max(
        minDepth,
        Math.min(maxDepth, targetDepthRef.current * delta)
      );
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  /**
   * Animate camera to a target position over time
   */
  const animateCameraTo = (
    targetPos: THREE.Vector3,
    durationMs: number = 1000
  ) => {
    if (!cameraRef.current) return;
    isAnimatingRef.current = true;
    animationStartRef.current = Date.now();
    animationDurationRef.current = durationMs;
    animationStartPosRef.current.copy(cameraRef.current.position);
    animationTargetPosRef.current.copy(targetPos);
  };

  /**
   * Update camera based on input - call from useFrame
   */
  const updateCamera = () => {
    const camera = cameraRef.current;
    if (!camera) return;

    // Handle animation
    if (isAnimatingRef.current) {
      const now = Date.now();
      const elapsed = now - animationStartRef.current;
      const duration = animationDurationRef.current;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      camera.position.lerpVectors(
        animationStartPosRef.current,
        animationTargetPosRef.current,
        eased
      );

      if (progress >= 1) {
        isAnimatingRef.current = false;
      }
      return;
    }

    // Keyboard input for XY movement
    const moveDir = new THREE.Vector3();
    if (keysRef.current.w) moveDir.y += moveSpeed;
    if (keysRef.current.s) moveDir.y -= moveSpeed;
    if (keysRef.current.d) moveDir.x += moveSpeed;
    if (keysRef.current.a) moveDir.x -= moveSpeed;

    // Arrow keys for Z depth
    if (keysRef.current.up) {
      targetDepthRef.current = Math.max(minDepth, targetDepthRef.current - 5);
    }
    if (keysRef.current.down) {
      targetDepthRef.current = Math.min(maxDepth, targetDepthRef.current + 5);
    }

    // Apply acceleration and friction
    velocityRef.current.add(moveDir);
    velocityRef.current.multiplyScalar(friction);

    // Update camera position
    camera.position.add(velocityRef.current);

    // Smooth depth transitions
    const currentZ = camera.position.z;
    const depthDelta = targetDepthRef.current - currentZ;
    camera.position.z += depthDelta * depthSpeed;

    // Update projection matrix
    camera.updateProjectionMatrix();
  };

  /**
   * Reset camera to default position
   */
  const resetCamera = () => {
    if (!cameraRef.current) return;
    animateCameraTo(new THREE.Vector3(0, 0, 200), 800);
    targetDepthRef.current = 200;
    velocityRef.current.set(0, 0, 0);
  };

  return {
    updateCamera,
    animateCameraTo,
    resetCamera,
    getDepth: () => cameraRef.current?.position.z ?? 200,
  };
}
