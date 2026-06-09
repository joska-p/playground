import { manipulatorStore } from '../store';
import type { OutputType } from '../types';

function useImageSource(): OutputType | undefined {
  return manipulatorStore((s) => s.imageSource);
}

export { useImageSource };
