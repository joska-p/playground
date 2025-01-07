import { useCallback, useState } from "react";
import { initialPalette, MAX_RANDOM_PALETTES } from "../config";
import { getPalettes } from "../lib/colors";
import { shuffleArray } from "@/lib/utils";

const usePalettes = () => {
  const [allPalettes, setAllPalettes] = useState([initialPalette]);
  const [currentPalettes, setCurrentPalettes] = useState([initialPalette]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPalettes = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPalettes = await getPalettes();
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

  return { allPalettes, currentPalettes, isLoading, error, loadPalettes, shufflePalettes };
};

export { usePalettes };
