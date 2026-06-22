import { MAX_STATE_COUNT } from '@repo/automa-engine/discrete/config';
import { useEffect } from 'react';
import { type GridUniforms } from './grid-texture.utils';

/**
 * Mutates stateColors and glowColor uniforms whenever the store values change.
 * Intentionally kept separate from useMemo so a color change never triggers
 * a full uniforms/texture rebuild.
 */
export const useColorSync = (
  uniforms: GridUniforms,
  stateColors: string[],
  glowColor: string
): void => {
  useEffect(() => {
    for (let i = 0; i < MAX_STATE_COUNT; i++) {
      uniforms.stateColors.value[i].set(stateColors[i] ?? '#000000');
    }
    uniforms.glowColor.value.set(glowColor);
  }, [stateColors, glowColor, uniforms]);
};
