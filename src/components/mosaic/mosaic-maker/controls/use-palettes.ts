import { shuffleArray } from "@/lib/utils";
import { signal } from "@preact/signals-react";
import { MAX_RANDOM_PALETTES, initialPalette } from "../config";
import { fetchPalettes } from "../libs/fetch-palettes";
import { updateElementStyles } from "../libs/style-utils";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
};

const allThePalettes = signal(await fetchPalettes());
export const currentPalettes = signal(allThePalettes.value.slice(0, MAX_RANDOM_PALETTES));
export const currentPalette = signal(initialPalette);

function usePalettes({ mosaicRef }: Props) {
  const shufflePalettes = () => {
    if (!allThePalettes.value.length) return;
    const randomPalettes = shuffleArray(allThePalettes.value).slice(0, MAX_RANDOM_PALETTES);
    currentPalettes.value = randomPalettes;
  };

  const setCurrentPalette = (palette: typeof initialPalette) => {
    currentPalette.value = palette;
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, palette);
  };

  return {
    shufflePalettes,
    setCurrentPalette,
  };
}

export { usePalettes };
