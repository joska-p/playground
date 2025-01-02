import { z } from "zod";
import { safeFetch } from "@/lib/utils";

type ColorNames = "--color-0" | "--color-1" | "--color-2" | "--color-3" | "--color-4";
const colorNames: ColorNames[] = [
  "--color-0",
  "--color-1",
  "--color-2",
  "--color-3",
  "--color-4",
] as const;

type Palette = Record<ColorNames, string>;
const fallbackPalette: Palette = {
  "--color-0": "#333333",
  "--color-1": "#555555",
  "--color-2": "#777777",
  "--color-3": "#999999",
  "--color-4": "#bbbbbb",
};

const getPalettes = async (): Promise<Palette[]> => {
  const palettesExpiration = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const palettesVersion = 2;
  const storedPalettes = localStorage.getItem("palettes");

  if (
    storedPalettes &&
    JSON.parse(storedPalettes).expiration > Date.now() &&
    JSON.parse(storedPalettes).version === palettesVersion
  ) {
    return JSON.parse(storedPalettes).palettes;
  }

  try {
    const palettesArray = await safeFetch(
      "https://unpkg.com/nice-color-palettes@3.0.0/1000.json",
      z.array(z.array(z.string().min(3).max(9).startsWith("#")).min(5)).min(1)
    );

    const palettes: Palette[] = palettesArray.map((palette) => {
      return colorNames.reduce(
        (acc, colorName, index) => {
          acc[colorName] = palette[index];
          return acc;
        },
        {} as Record<ColorNames, string>
      );
    });

    localStorage.setItem(
      "palettes",
      JSON.stringify({
        palettes,
        expiration: palettesExpiration,
        version: palettesVersion,
      })
    );
    return palettes;
  } catch (e) {
    console.error(e);
    return [fallbackPalette];
  }
};

export { getPalettes };
