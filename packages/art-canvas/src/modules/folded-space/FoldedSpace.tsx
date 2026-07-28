import { ShaderCanvas } from '@repo/graphics/react/ShaderCanvas';
import { foldedSpaceFragment } from './foldedSpace';

function FoldedSpace() {
  return (
    <ShaderCanvas
      fragmentShader={foldedSpaceFragment}
      onBeforeRender={(pipeline, time) => {
        pipeline.setUniforms({ u_time: time });
      }}
    />
  );
}

export { FoldedSpace };
