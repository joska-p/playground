import { ShaderCanvas } from '@repo/graphics/react/ShaderCanvas';
import { manual } from './manual';
import { useChroma, useDivisions, useLightness } from './store';

function Manual() {
  const divisions = useDivisions();
  const lightness = useLightness();
  const chroma = useChroma();

  return (
    <ShaderCanvas
      fragmentShader={manual.fragmentShader}
      onBeforeRender={(pipeline) => {
        pipeline.setUniforms({
          uDivisions: divisions,
          uLightness: lightness,
          uChroma: chroma
        });
      }}
    />
  );
}

export { Manual };
