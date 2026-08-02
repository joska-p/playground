import { ShaderCanvas } from '@repo/graphics/2d/react/ShaderCanvas';
import { foldedSpaceFragment } from './foldedSpace';

function FoldedSpace() {
  return <ShaderCanvas fragmentShader={foldedSpaceFragment} />;
}

export { FoldedSpace };
