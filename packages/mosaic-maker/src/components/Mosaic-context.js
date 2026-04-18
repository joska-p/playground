import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import { initialPalette, initialTileSet, MAX_NUMBER_OF_PALETTES, } from "./config.js";
import { fetchPalettes } from "./lib/fetch-palettes.js";
import { computeNumberOfTiles, updateElementStyles, } from "./lib/style-utils.js";
import { getRandom } from "./lib/utils.js";
const MosaicMakerContext = createContext(null);
function MosaicMakerProvider({ children }) {
    const mosaicRef = useRef(null);
    const [paletteStock, setPaletteStock] = useState([]);
    const [currentPalettesIndex, setCurrentPalettesIndex] = useState(0);
    const [currentPalette, setCurrentPalette] = useState(initialPalette);
    const [tileSet, setTileSet] = useState([...initialTileSet]);
    const [tiles, setTiles] = useState([]);
    const currentPalettes = useMemo(() => {
        return paletteStock.slice(currentPalettesIndex, currentPalettesIndex + MAX_NUMBER_OF_PALETTES);
    }, [currentPalettesIndex, paletteStock]);
    const updateCurrentPalettes = useCallback(() => {
        setCurrentPalettesIndex((prev) => prev >= paletteStock.length - MAX_NUMBER_OF_PALETTES
            ? 0
            : prev + MAX_NUMBER_OF_PALETTES);
    }, [paletteStock]);
    const updatePalette = useCallback((palette) => {
        setCurrentPalette(palette);
        if (!mosaicRef.current)
            return;
        updateElementStyles(mosaicRef.current, palette);
    }, []);
    const updateTileSet = useCallback((tileName) => {
        // if this is the only tile in the set, don't remove it
        if (tileSet.length === 1 && tileName === tileSet[0])
            return;
        if (tileSet.includes(tileName)) {
            setTileSet((prev) => prev.filter((tile) => tile !== tileName));
        }
        else {
            setTileSet((prev) => [...prev, tileName]);
        }
    }, [tileSet]);
    const updateTiles = useCallback((newTileSet = tileSet) => {
        if (!mosaicRef.current)
            return;
        const newNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
        const newTiles = Array.from({ length: newNumberOfTiles }, () => getRandom(newTileSet));
        setTiles(newTiles);
    }, [tileSet]);
    const init = useCallback(async () => {
        const palettes = await fetchPalettes();
        setPaletteStock(palettes);
        updateTiles();
    }, [updateTiles]);
    useEffect(() => {
        init();
    }, [init]);
    return (_jsx(MosaicMakerContext, { value: {
            mosaicRef,
            currentPalettes,
            updateCurrentPalettes,
            currentPalette,
            updatePalette,
            tileSet,
            updateTileSet,
            tiles,
            updateTiles,
        }, children: children }));
}
function useMosaicMakerContext() {
    const context = useContext(MosaicMakerContext);
    if (!context) {
        throw new Error("useMosaicMakerContext must be used within a MosaicMakerProvider");
    }
    return context;
}
export { MosaicMakerProvider, useMosaicMakerContext };
