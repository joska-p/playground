import type { Control, ControlSection } from '@repo/ui/ControlPanel';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CSS_VARS, DEFAULT_GAP_SIZE, DEFAULT_TILE_SIZE } from '../../core/constants';
import { regenerateTiles } from '../../stores/mosaic/actions';
import { useMosaicRef } from '../../stores/mosaic/selectors';

function useSliderState(
  cssVar: string,
  defaultValue: number,
  debounceMs = 150
): { value: number; onChange: (value: number) => void } {
  const mosaicRef = useMosaicRef();
  const [value, setValue] = useState(defaultValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const onChange = useCallback(
    (newValue: number) => {
      setValue(newValue);
      mosaicRef.current?.style.setProperty(cssVar, `${String(newValue)}px`);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(regenerateTiles, debounceMs);
    },
    [mosaicRef, cssVar, debounceMs]
  );

  return { value, onChange };
}

export function useLayoutSection() {
  const tileSize = useSliderState(CSS_VARS.size, DEFAULT_TILE_SIZE);
  const gapSize = useSliderState(CSS_VARS.gap, DEFAULT_GAP_SIZE);

  const tileSizeControl: Control = {
    id: 'tile-size',
    type: 'slider',
    label: 'Tile Size',
    value: tileSize.value,
    min: 32,
    max: 256,
    step: 2,
    onChange: tileSize.onChange
  };

  const gapSizeControl: Control = {
    id: 'gap-size',
    type: 'slider',
    label: 'Gap Size',
    value: gapSize.value,
    min: 0,
    max: 64,
    step: 2,
    onChange: gapSize.onChange
  };

  const section: ControlSection = {
    id: 'layout',
    label: 'Layout',
    defaultOpen: true,
    controls: [tileSizeControl, gapSizeControl]
  };

  return section;
}
