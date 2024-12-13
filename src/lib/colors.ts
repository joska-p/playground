import { z } from "zod"
import { getRandom, safeFetch } from "./utils"

type Palette = [string, string, string, string, string]
type Palettes = Palette[]
type ColorName = "--color-1" | "--color-2" | "--color-3" | "--color-4" | "--color-5"
type ColorNames = ColorName[]
type Colors = Record<ColorName, string>

const fallbackPalettes = [["#333333", "#555555", "#777777", "#999999", "#bbbbbb"]] as Palettes
const colorNames = ["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"] as ColorNames

const getRandomPalette = async (): Promise<Palette> => {
  const palettesExpiration = Date.now() + 7 * 24 * 60 * 60 * 1000
  const storedPalettes = localStorage.getItem("palettes")

  if (storedPalettes && JSON.parse(storedPalettes).expiration > Date.now())
    return getRandom(JSON.parse(storedPalettes).palettes)

  try {
    const palettes = await safeFetch(
      "https://unpkg.com/nice-color-palettes@3.0.0/1000.json",
      z.array(z.array(z.string().min(3).max(9).startsWith("#")).min(5)).min(1)
    )

    localStorage.setItem("palettes", JSON.stringify({ palettes, expiration: palettesExpiration }))
    return getRandom(palettes) as Palette
  } catch (e) {
    console.error(e)
    return getRandom(fallbackPalettes)
  }
}

const getColors = (palette = fallbackPalettes[0]) => {
  return colorNames.reduce((acc, color, index) => {
    acc[color] = palette[index]
    return acc
  }, {} as Colors)
}

const getColorsToUse = () => colorNames.map(() => getRandom(colorNames))

export { colorNames, fallbackPalettes, getColors, getColorsToUse, getRandomPalette }
export type { Colors, Palette }
