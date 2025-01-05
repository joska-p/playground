import { CSS_VARS } from "../config";

const computeTileHeight = (element: HTMLDivElement) => {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue(CSS_VARS.height));
};

const computeTileWidth = (element: HTMLDivElement) => {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue(CSS_VARS.width));
};

const computeGap = (element: HTMLDivElement) => {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue(CSS_VARS.gap));
};

const computeNumberOfTiles = (element: HTMLDivElement) => {
  return (
    Math.floor((element.offsetWidth + computeGap(element)) / (computeTileWidth(element) + computeGap(element))) *
    Math.floor((element.offsetHeight + computeGap(element)) / (computeTileHeight(element) + computeGap(element)))
  );
};

const updateElementStyles = (element: HTMLElement, styles: Record<string, string>): void => {
  Object.entries(styles).forEach(([prop, value]) => {
    element.style.setProperty(prop, value);
  });
};

export { computeNumberOfTiles, updateElementStyles };
