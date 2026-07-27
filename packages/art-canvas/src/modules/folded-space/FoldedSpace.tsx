import { CanvasContainer } from '@repo/graphics/react/CanvasContainer';
import { useShaderPass } from '@repo/graphics/react/useShaderPass';
import { foldedSpaceFragment } from './foldedSpace';

function FoldedSpace() {
  const { canvasRef } = useShaderPass({
    fragmentShader: foldedSpaceFragment,
    onBeforeRender: (pipeline, time) => {
      pipeline.setUniforms({ u_time: time });
    }
  });

  return (
    <CanvasContainer>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </CanvasContainer>
  );
}

export { FoldedSpace };
