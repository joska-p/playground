import { useMemo } from 'react';
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

  // Owns texture lifecycle — recreated only when grid dimensions change
  const texture = useGridDataTexture(cols, rows);

  // Recreated only when texture (cols/rows) changes; initial colors come from
  // the store so the first frame is never blank
  const uniforms = useMemo(
    () => buildGridUniforms(cols, rows, texture, stateColors, glowColor),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cols, rows, texture]
  );

  // Mutates color uniforms reactively — no texture rebuild on color change
  useColorSync(uniforms, stateColors, glowColor);

  // Drives time uniform and grid → texture copy every frame
  useFrameSync(uniforms);

  return { uniforms };
};

export { useGridTexture };
export type { UseGridTextureParams };
