import { z } from "zod";

import { safeFetch } from "../../../lib/utils";

const fallbackPalettes = [["#333333", "#555555", "#777777", "#999999", "#babbbb"]];

const getPalettes = async (): Promise<string[][]> => {
  const palettesExpiration = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const palettesVersion = 1;
  const storedPalettes = localStorage.getItem("palettes");

  if (
    storedPalettes &&
    JSON.parse(storedPalettes).expiration > Date.now() &&
    JSON.parse(storedPalettes).version === palettesVersion
  ) {
    return JSON.parse(storedPalettes).palettes;
  }

  try {
    const palettes = await safeFetch(
      "https://unpkg.com/nice-color-palettes@3.0.0/1000.json",
      z.array(z.array(z.string().min(3).max(9).startsWith("#")).min(5)).min(1)
    );

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
    return fallbackPalettes;
  }
};

export { getPalettes };
