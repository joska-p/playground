// graph/SceneSetup.tsx
// Declarative R3F scene environment: fog, ambient light, point light.

const SceneSetup = () => {
  return (
    <>
      {/* Declarative fog setup: R3F handles binding and unbinding this automatically */}
      <fogExp2
        attach="fog"
        args={[0x080c14, 0.0018]}
      />

      <ambientLight intensity={0.4} />
      <pointLight
        position={[0, 150, 0]}
        intensity={2}
        distance={600}
        color={0x4cc9f0}
      />
    </>
  );
};

export { SceneSetup };
