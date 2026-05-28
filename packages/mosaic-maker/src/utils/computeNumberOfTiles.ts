import { CSS_VARS } from "../core/cssVars";

type StyleProperty = keyof typeof CSS_VARS;

function getComputedPropertyValue(element: HTMLDivElement, property: StyleProperty): string {
  return getComputedStyle(element).getPropertyValue(CSS_VARS[property]);
}

function parseNumericValue(value: string): number {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }
  return parsed;
}

function computeTileHeight(element: HTMLDivElement): number {
  return parseNumericValue(getComputedPropertyValue(element, "height"));
}

function computeTileWidth(element: HTMLDivElement): number {
  return parseNumericValue(getComputedPropertyValue(element, "width"));
}

function computeGap(element: HTMLDivElement): number {
  return parseNumericValue(getComputedPropertyValue(element, "gap"));
}

function computeDimension(total: number, size: number, gap: number): number {
  return Math.floor((total + gap) / (size + gap));
}

function computeNumberOfTiles(element: HTMLDivElement): number {
  try {
    const gap = computeGap(element);
    const width = element.clientWidth;
    const height = element.clientHeight;
    
    if (width === 0 || height === 0) return 0;

    const tilesPerRow = computeDimension(width, computeTileWidth(element), gap);
    const tilesPerColumn = computeDimension(height, computeTileHeight(element), gap);
    
    return Math.max(0, tilesPerRow * tilesPerColumn);
  } catch (error) {
    console.error("Failed to compute number of tiles:", error);
    return 0;
  }
}

export { computeNumberOfTiles };
