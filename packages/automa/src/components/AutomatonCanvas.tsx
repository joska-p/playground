import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { cameraControlRef, useCAStore } from '../stores/automaton/context.ts';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D gridTexture;
uniform vec3 aliveColor;
uniform vec3 deadColor;
varying vec2 vUv;
void main() {
  float val = texture2D(gridTexture, vUv).r;
  gl_FragColor = vec4(val > 0.5 ? aliveColor : deadColor, 1.0);
}
`;

type SceneProps = {
  aliveColor: string;
  deadColor: string;
};

function Scene({ aliveColor, deadColor }: SceneProps) {
  const store = useCAStore();
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const lastGeneration = useRef(-1);
  const isPointerDown = useRef(false);
  const texRef = useRef<THREE.DataTexture | null>(null);
  const gridDataRef = useRef<Uint8Array | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  const { cols, rows } = store.getState();

  const uniforms = useMemo(() => {
    const data = new Uint8Array(cols * rows);
    const tex = new THREE.DataTexture(
      data,
      cols,
      rows,
      THREE.RedFormat,
      THREE.UnsignedByteType
    );
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;

    return {
      gridTexture: { value: tex },
      aliveColor: { value: new THREE.Color(aliveColor) },
      deadColor: { value: new THREE.Color(deadColor) },
    };
  }, [cols, rows, aliveColor, deadColor]);

  useEffect(() => {
    texRef.current = uniforms.gridTexture.value;
    gridDataRef.current = uniforms.gridTexture.value.image.data as Uint8Array;
  }, [uniforms]);

  useEffect(() => {
    uniforms.aliveColor.value.set(aliveColor);
    uniforms.deadColor.value.set(deadColor);
  }, [aliveColor, deadColor, uniforms]);

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      cameraRef.current = camera;
    }
  }, [camera]);

  useEffect(() => {
    const cam = cameraRef.current;
    if (!cam) return;

    const aspect = window.innerWidth / window.innerHeight;
    const gridAspect = cols / rows;

    if (gridAspect > aspect) {
      cam.left = 0;
      cam.right = cols;
      cam.top = cols / aspect / 2;
      cam.bottom = -cols / aspect / 2;
    } else {
      cam.left = (-rows * aspect) / 2;
      cam.right = (rows * aspect) / 2;
      cam.top = rows / 2;
      cam.bottom = -rows / 2;
    }
    cam.position.set(cols / 2, rows / 2, 10);
    cam.updateProjectionMatrix();

    cameraControlRef.current = {
      zoomIn: () => {
        cam.zoom = Math.min(cam.zoom * 1.2, 20);
        cam.updateProjectionMatrix();
      },
      zoomOut: () => {
        cam.zoom = Math.max(cam.zoom / 1.2, 0.1);
        cam.updateProjectionMatrix();
      },
      pan: (dx: number, dy: number) => {
        const speed = 5 / cam.zoom;
        cam.position.x += dx * speed;
        cam.position.y += dy * speed;
        cam.updateProjectionMatrix();
      },
    };

    return () => {
      cameraControlRef.current = null;
    };
  }, [camera, cols, rows]);

  useEffect(() => {
    const tex = texRef.current;
    const data = gridDataRef.current;
    if (!tex || !data) return;

    const state = store.getState();
    const grid = state.grid;
    for (let i = 0; i < grid.length; i++) {
      data[i] = grid[i] === 1 ? 255 : 0;
    }
    tex.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    const state = store.getState();
    const tex = texRef.current;
    const data = gridDataRef.current;

    if (!tex || !data) return;

    if (state.generation !== lastGeneration.current) {
      const grid = state.grid;
      for (let i = 0; i < grid.length; i++) {
        data[i] = grid[i] === 1 ? 255 : 0;
      }
      tex.needsUpdate = true;
      lastGeneration.current = state.generation;
    }
  });

  const paintAtPointer = useCallback(
    (point: THREE.Vector3, shiftKey: boolean, button: number) => {
      const state = store.getState();
      const col = Math.floor(point.x);
      const row = Math.floor(point.y);

      if (col < 0 || col >= state.cols || row < 0 || row >= state.rows) return;
      if (shiftKey || state.toolMode === 'pan') return;

      const index = row * state.cols + col;

      if (button === 2 || state.toolMode === 'erase') {
        state.paintCell(index, 0);
      } else {
        state.paintCell(index, 1);
      }
    },
    [store]
  );

  return (
    <mesh
      ref={meshRef}
      onPointerDown={(e) => {
        isPointerDown.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        paintAtPointer(e.point, e.shiftKey, e.button);
      }}
      onPointerMove={(e) => {
        if (!isPointerDown.current) return;
        paintAtPointer(e.point, e.shiftKey, e.button);
      }}
      onPointerUp={() => {
        isPointerDown.current = false;
      }}
      onContextMenu={(e) => e.nativeEvent.preventDefault()}
    >
      <planeGeometry args={[cols, rows]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

type CACanvasProps = {
  aliveColor?: string;
  deadColor?: string;
  className?: string;
};

const AutomatonCanvas = ({
  aliveColor = '#22d3ee',
  deadColor = '#0f172a',
  className,
}: CACanvasProps) => (
  <div
    className={className}
    style={
      {
        width: '100%',
        height: '100%',
        '--ca-alive': aliveColor,
        '--ca-dead': deadColor,
      } as React.CSSProperties
    }
  >
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], near: 0.1, far: 100 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Scene
        aliveColor={aliveColor}
        deadColor={deadColor}
      />
    </Canvas>
  </div>
);

export { AutomatonCanvas };
export type { CACanvasProps };
