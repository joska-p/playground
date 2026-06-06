import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useCAStore } from '../stores/automaton/context.ts';
import { useShowDebug } from '../stores/automaton/selectors.ts';

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

function GridLines({ cols, rows }: { cols: number; rows: number }) {
  const geo = useMemo(() => {
    const vertices: number[] = [];
    for (let i = 0; i <= cols; i++) {
      vertices.push(i, 0, 0.01, i, rows, 0.01);
    }
    for (let j = 0; j <= rows; j++) {
      vertices.push(0, j, 0.01, cols, j, 0.01);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }, [cols, rows]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="white"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </lineSegments>
  );
}

type SceneProps = {
  aliveColor: string;
  deadColor: string;
};

function Scene({ aliveColor, deadColor }: SceneProps) {
  const store = useCAStore();
  const { camera } = useThree();
  const showDebug = useShowDebug();
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
    (point: THREE.Vector3, shiftKey: boolean) => {
      const state = store.getState();
      const col = Math.floor(point.x);
      const row = Math.floor(point.y);

      if (col < 0 || col >= state.cols || row < 0 || row >= state.rows) return;
      if (shiftKey || state.toolMode === 'pan') return;

      const index = row * state.cols + col;

      if (state.toolMode === 'erase') {
        state.paintCell(index, 0);
      } else {
        state.paintCell(index, 1);
      }
    },
    [store]
  );

  return (
    <>
      <OrbitControls
        makeDefault
        enableRotate={false}
        target={[cols / 2, rows / 2, 0]}
        mouseButtons={{
          MIDDLE: THREE.MOUSE.PAN,
        }}
      />
      <GizmoHelper
        alignment="bottom-left"
        margin={[80, 80]}
      >
        <GizmoViewport />
      </GizmoHelper>
      <mesh
        ref={meshRef}
        position={[cols / 2, rows / 2, 0]}
        onPointerDown={(e) => {
          if (e.object !== meshRef.current) return;
          if (e.button !== 0) return;
          isPointerDown.current = true;
          paintAtPointer(e.point, e.shiftKey);
        }}
        onPointerMove={(e) => {
          if (!isPointerDown.current) return;
          if (e.object !== meshRef.current) return;
          if (e.buttons !== 1) return;
          paintAtPointer(e.point, e.shiftKey);
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
      {showDebug && (
        <GridLines
          cols={cols}
          rows={rows}
        />
      )}
    </>
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
