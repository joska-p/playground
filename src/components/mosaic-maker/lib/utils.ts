import { defaulColors, defaultRotations } from "@/components/mosaic-maker/tiles/default-options";
import { shuffleArray } from "@/lib/utils";

const computedColors = (element: HTMLDivElement) => {
  return Object.keys(defaulColors).map((color) =>
    getComputedStyle(element).getPropertyValue(color)
  );
};

const computedRotation = (element: HTMLDivElement) => {
  return Object.keys(defaultRotations).map((rotation) =>
    getComputedStyle(element).getPropertyValue(rotation)
  );
};

const computeTileHeight = (element: HTMLDivElement) => {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue("--tile-height"));
};

const computeTileWidth = (element: HTMLDivElement) => {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue("--tile-width"));
};

const computeGap = (element: HTMLDivElement) => {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue("--mosaicGap"));
};

const computeNumberOfTiles = (element: HTMLDivElement) => {
  return (
    Math.floor(
      (element.offsetWidth + computeGap(element)) /
        (computeTileWidth(element) + computeGap(element))
    ) *
    Math.floor(
      (element.offsetHeight + computeGap(element)) /
        (computeTileHeight(element) + computeGap(element))
    )
  );
};

const setCssTileSize = ({ element, value }: { element: HTMLDivElement; value: string }) => {
  element.style.setProperty("--tile-width", `${value}px`);
  element.style.setProperty("--tile-height", `${value}px`);
};

const setCssGap = ({ element, value }: { element: HTMLDivElement; value: string }) => {
  element.style.setProperty("--mosaicGap", `${value}px`);
};

const setCssColors = ({ element, palette }: { element: HTMLDivElement; palette: string[] }) => {
  Object.keys(defaulColors).forEach((colorName, index) =>
    element.style.setProperty(colorName, palette[index])
  );
};

const shuffleCssColors = (element: HTMLDivElement) => {
  const newColors = shuffleArray(computedColors(element));
  Object.keys(defaulColors).forEach((colorName, index) =>
    element.style.setProperty(colorName, newColors[index])
  );
};

const suffleCssRotations = (element: HTMLDivElement) => {
  const newRotations = shuffleArray(computedRotation(element));
  Object.keys(defaultRotations).forEach((rotationName, index) =>
    element.style.setProperty(rotationName, newRotations[index])
  );
};

export {
  computeNumberOfTiles,
  computedColors,
  computedRotation,
  setCssTileSize,
  setCssGap,
  setCssColors,
  shuffleCssColors,
  suffleCssRotations,
};
