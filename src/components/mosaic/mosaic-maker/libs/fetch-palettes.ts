import { z } from "zod";
import { safeFetch } from "@lib/utils";
import { initialPalette } from "../config";

// Types
type Palette = typeof initialPalette;
type CachedPalettes = {
  palettes: Palette[];
  expiration: number;
  version: number;
};

// Constants
const CACHE_KEY = "palettes";
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const CACHE_VERSION = 2;
const PALETTE_URL = "https://unpkg.com/nice-color-palettes@3.0.0/1000.json";

const colorNames = Object.keys(initialPalette) as (keyof Palette)[];

const paletteSchema = z.array(z.array(z.string().min(3).max(9).startsWith("#")).min(5)).min(1);

const getCachedPalettes = (): CachedPalettes | null => {
  const stored = localStorage.getItem(CACHE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as CachedPalettes;
  } catch {
    return null;
  }
};

const isCacheValid = (cache: CachedPalettes): boolean => {
  return cache.expiration > Date.now() && cache.version === CACHE_VERSION;
};

const transformPalette = (colors: string[]): Palette => {
  return colorNames.reduce((acc, colorName, index) => {
    acc[colorName] = colors[index];
    return acc;
  }, {} as Palette);
};

const cachePalettes = (palettes: Palette[]): void => {
  const cache: CachedPalettes = {
    palettes,
    expiration: Date.now() + CACHE_DURATION_MS,
    version: CACHE_VERSION,
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const fetchPalettes = async (): Promise<Palette[]> => {
  const cached = getCachedPalettes();
  if (cached && isCacheValid(cached)) {
    return cached.palettes;
  }

  try {
    const palettesArray = await safeFetch(PALETTE_URL, paletteSchema);
    const palettes = palettesArray.map(transformPalette);
    cachePalettes(palettes);
    return palettes;
  } catch (error) {
    console.error("Failed to fetch palettes:", error);
    return [initialPalette];
  }
};

export { fetchPalettes };
