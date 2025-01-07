import { useCallback, useEffect, useState } from "react";
import { initialPalette, MAX_RANDOM_PALETTES } from "../config";
import { fetchPalettes } from "../libs/fetch-palettes";
import { shuffleArray } from "@/lib/utils";
import { updateElementStyles } from "../libs/style-utils";

type Props = {
  mosaicRef: React.RefObject<HTMLDivElement | null>;
};

const usePalettes = ({ mosaicRef }: Props) => {
  const [allPalettes, setAllPalettes] = useState([initialPalette]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPalettes, setCurrentPalettes] = useState([initialPalette]);
  const [currentPalette, setCurrentPalette] = useState(initialPalette);

  const loadPalettes = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPalettes = await fetchPalettes();
      setAllPalettes(fetchedPalettes);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load palettes"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const shufflePalettes = useCallback(() => {
    if (!allPalettes.length) return;
    const randomPalettes = shuffleArray(allPalettes).slice(0, MAX_RANDOM_PALETTES);
    setCurrentPalettes(randomPalettes);
  }, [allPalettes]);

  const handleSetCurrentPalette = (palette: typeof initialPalette) => {
    setCurrentPalette(palette);
    if (!mosaicRef.current) return;
    updateElementStyles(mosaicRef.current, palette);
  };

  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

  useEffect(() => {
    shufflePalettes();
  }, [shufflePalettes]);

  return {
    allPalettes,
    isLoading,
    error,
    currentPalettes,
    shufflePalettes,
    currentPalette,
    setCurrentPalette: handleSetCurrentPalette,
  };
};

export { usePalettes };
