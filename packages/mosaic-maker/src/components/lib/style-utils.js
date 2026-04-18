import { CSS_VARS } from "../config.js";
function getComputedPropertyValue(element, property) {
    return getComputedStyle(element).getPropertyValue(CSS_VARS[property]);
}
function parseNumericValue(value) {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
        throw new Error(`Invalid numeric value: ${value}`);
    }
    return parsed;
}
function computeTileHeight(element) {
    return parseNumericValue(getComputedPropertyValue(element, "height"));
}
function computeTileWidth(element) {
    return parseNumericValue(getComputedPropertyValue(element, "width"));
}
function computeGap(element) {
    return parseNumericValue(getComputedPropertyValue(element, "gap"));
}
function computeDimension(total, size, gap) {
    return Math.floor((total + gap) / (size + gap));
}
function computeNumberOfTiles(element) {
    try {
        const gap = computeGap(element);
        const tilesPerRow = computeDimension(element.offsetWidth, computeTileWidth(element), gap);
        const tilesPerColumn = computeDimension(element.offsetHeight, computeTileHeight(element), gap);
        return tilesPerRow * tilesPerColumn;
    }
    catch (error) {
        console.error("Failed to compute number of tiles:", error);
        return 0;
    }
}
function updateElementStyles(element, styles) {
    for (const [prop, value] of Object.entries(styles)) {
        element.style.setProperty(prop, value);
    }
}
export { computeNumberOfTiles, updateElementStyles };
