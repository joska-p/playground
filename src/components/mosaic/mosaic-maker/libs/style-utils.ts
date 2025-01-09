import { CSS_VARS } from "../config";

type StyleProperty = keyof typeof CSS_VARS;
type ComputedStyles = Record<string, string>;

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
    const tilesPerRow = computeDimension(element.offsetWidth, computeTileWidth(element), gap);
    const tilesPerColumn = computeDimension(element.offsetHeight, computeTileHeight(element), gap);
    return tilesPerRow * tilesPerColumn;
  } catch (error) {
    console.error("Failed to compute number of tiles:", error);
    return 0;
  }
}

function updateElementStyles(element: HTMLElement, styles: ComputedStyles): void {
  for (const [prop, value] of Object.entries(styles)) {
    element.style.setProperty(prop, value);
  }
}

export { computeNumberOfTiles, updateElementStyles };
