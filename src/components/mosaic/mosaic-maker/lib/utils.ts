import { shuffleObject } from "@/lib/utils";
import type { Palette } from "./colors";

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

const setCssColors = ({ element, palette }: { element: HTMLDivElement; palette: Palette }) => {
  Object.entries(palette).forEach(([colorName, colorValue]) =>
    element.style.setProperty(colorName, colorValue)
  );
};

const shuffleCssColors = ({ element, palette }: { element: HTMLDivElement; palette: Palette }) => {
  const newPalette = shuffleObject(palette) as Palette;
  setCssColors({ element, palette: newPalette });
};

const suffleCssRotations = ({
  element,
  rotations,
}: {
  element: HTMLDivElement;
  rotations: Record<string, string>;
}) => {
  const newRotations = shuffleObject(rotations);
  Object.entries(newRotations).forEach(([rotationName, rotationValue]) =>
    element.style.setProperty(rotationName, rotationValue)
  );
};

export {
  computeNumberOfTiles,
  setCssTileSize,
  setCssGap,
  setCssColors,
  shuffleCssColors,
  suffleCssRotations,
};
