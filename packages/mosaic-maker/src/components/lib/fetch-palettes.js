import { z } from "zod";
import { initialPalette } from "../config.js";
import { safeFetch } from "./utils.js";
// Constants
const CACHE_KEY = "palettes";
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const CACHE_VERSION = 2;
const PALETTE_URL = "https://unpkg.com/nice-color-palettes@3.0.0/1000.json";
const colorNames = Object.keys(initialPalette);
const paletteSchema = z
    .array(z.array(z.string().min(3).max(9).startsWith("#")).min(5))
    .min(1);
function getCachedPalettes() {
    const stored = localStorage.getItem(CACHE_KEY);
    if (!stored)
        return null;
    try {
        return JSON.parse(stored);
    }
    catch {
        return null;
    }
}
function isCacheValid(cache) {
    return cache.expiration > Date.now() && cache.version === CACHE_VERSION;
}
function transformPalette(colors) {
    return colorNames.reduce((acc, colorName, index) => {
        acc[colorName] = colors[index] ?? "#000000";
        return acc;
    }, {});
}
function cachePalettes(palettes) {
    const cache = {
        palettes,
        expiration: Date.now() + CACHE_DURATION_MS,
        version: CACHE_VERSION,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}
async function fetchPalettes() {
    const cached = getCachedPalettes();
    if (cached && isCacheValid(cached)) {
        return cached.palettes;
    }
    try {
        const palettesArray = await safeFetch(PALETTE_URL, paletteSchema);
        const palettes = palettesArray.map(transformPalette);
        cachePalettes(palettes);
        return palettes;
    }
    catch (error) {
        console.error("Failed to fetch palettes:", error);
        return [initialPalette];
    }
}
export { fetchPalettes };
