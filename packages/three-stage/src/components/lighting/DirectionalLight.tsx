import { folder, useControls } from "leva";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useRef } from "react";

export function DirectionalLight() {
  const light = useRef(null!);
  useHelper(light, DirectionalLightHelper, 2, "crimson");

  const { intensity, color, x, y, z } = useControls("Lighting", {
    Directional: folder({
      intensity: {
        value: 0.5,
        label: "Intensity",
        min: 0,
        max: 1,
        step: 0.1,
      },
      color: { value: "#ffffff", label: "color" },
      x: {
        value: -5,
        label: "Position X",
        min: -20,
        max: 20,
        step: 1,
      },
      y: {
        value: 8,
        label: "Position Y",
        min: -20,
        max: 20,
        step: 1,
      },
      z: {
        value: 0,
        label: "Position Z",
        min: -20,
        max: 20,
        step: 1,
      },
    }),
  });

  return (
    <directionalLight
      ref={light}
      position={[x, y, z]}
      color={color}
      intensity={intensity}
      castShadow
    ></directionalLight>
  );
}
