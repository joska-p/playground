import { CSS_VARS } from "../config";

type StyleProperty = keyof typeof CSS_VARS;
type ComputedStyles = Record<string, string>;

const getComputedPropertyValue = (element: HTMLDivElement, property: StyleProperty): string => {
  return getComputedStyle(element).getPropertyValue(CSS_VARS[property]);
};

const parseNumericValue = (value: string): number => {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }
  return parsed;
};

const computeTileHeight = (element: HTMLDivElement): number => {
  return parseNumericValue(getComputedPropertyValue(element, "height"));
};

const computeTileWidth = (element: HTMLDivElement): number => {
  return parseNumericValue(getComputedPropertyValue(element, "width"));
};

const computeGap = (element: HTMLDivElement): number => {
  return parseNumericValue(getComputedPropertyValue(element, "gap"));
};

const computeDimension = (total: number, size: number, gap: number): number => {
  return Math.floor((total + gap) / (size + gap));
};

const computeNumberOfTiles = (element: HTMLDivElement): number => {
  try {
    const gap = computeGap(element);
    const tilesPerRow = computeDimension(element.offsetWidth, computeTileWidth(element), gap);
    const tilesPerColumn = computeDimension(element.offsetHeight, computeTileHeight(element), gap);
    return tilesPerRow * tilesPerColumn;
  } catch (error) {
    console.error("Failed to compute number of tiles:", error);
    return 0;
  }
};

const updateElementStyles = (element: HTMLElement, styles: ComputedStyles): void => {
  try {
    Object.entries(styles).forEach(([prop, value]) => {
      element.style.setProperty(prop, value);
    });
  } catch (error) {
    console.error("Failed to update element styles:", error);
  }
};

export { computeNumberOfTiles, updateElementStyles, type ComputedStyles };
