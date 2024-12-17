import { z } from "zod"
import { getRandom, safeFetch } from "../../../lib/utils"

type Palette = [string, string, string, string, string]
type ColorName = "--color-0" | "--color-1" | "--color-2" | "--color-3" | "--color-4"
type ColorProperties = Record<ColorName, string>
const fallbackPalettes: Palette[] = [["#333333", "#555555", "#777777", "#999999", "#bbbbbb"]]
const colorNames: ColorName[] = ["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"]

const getRandomPalette = async (): Promise<Palette> => {
  const palettesExpiration = Date.now() + 7 * 24 * 60 * 60 * 1000
  const palettesVersion = 1
  const storedPalettes = localStorage.getItem("palettes")
  let randomPalette: Palette

  if (
    storedPalettes &&
    JSON.parse(storedPalettes).expiration > Date.now() &&
    JSON.parse(storedPalettes).version === palettesVersion
  ) {
    randomPalette = getRandom(JSON.parse(storedPalettes).palettes)
  } else {
    try {
      const palettes = await safeFetch(
        "https://unpkg.com/nice-color-palettes@3.0.0/1000.json",
        z.array(z.array(z.string().min(3).max(9).startsWith("#")).min(5)).min(1)
      )

      localStorage.setItem(
        "palettes",
        JSON.stringify({ palettes, expiration: palettesExpiration, version: palettesVersion })
      )
      randomPalette = getRandom(palettes) as Palette
    } catch (e) {
      console.error(e)
      randomPalette = getRandom(fallbackPalettes)
    }
  }

  return randomPalette
}

const getColorProperties = (palette = fallbackPalettes[0]) => {
  return colorNames.reduce((acc, color, index) => {
    acc[color] = palette[index]
    return acc
  }, {} as ColorProperties)
}

const getRandomColorsToUse = () => colorNames.map(() => getRandom(colorNames))

export { colorNames, fallbackPalettes, getColorProperties, getRandomColorsToUse, getRandomPalette }
