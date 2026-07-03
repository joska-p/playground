import { useGlowColor, useStateColors } from '../../stores/ui/selectors';
import { buildGridUniforms } from './grid-texture.utils';
import { useColorSync } from './useColorSync';
import { useFrameSync } from './useFrameSync';
import { useGridDataTexture } from './useGridDataTexture';

type UseGridTextureParams = {
  cols: number;
  rows: number;
};

const useGridTexture = ({ cols, rows }: UseGridTextureParams) => {
  const stateColors = useStateColors();
  const glowColor = useGlowColor();
  const texture = useGridDataTexture(cols, rows);
  const uniforms = buildGridUniforms(cols, rows, texture, stateColors, glowColor);

  useColorSync(uniforms, stateColors, glowColor);
  useFrameSync(uniforms);

  return { uniforms };
};

export { useGridTexture };
export type { UseGridTextureParams };
