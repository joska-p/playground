import { getRandom } from "./utils"

type Palette = [string, string, string, string, string]
type Palettes = Palette[]
type ColorName = "--color-1" | "--color-2" | "--color-3" | "--color-4" | "--color-5"
type ColorNames = ColorName[]
type Colors = Record<ColorName, string>

const isPalettes = (palettes: unknown): palettes is Palettes =>
  Array.isArray(palettes) &&
  palettes.every(
    (palette) => Array.isArray(palette) && palette.every((color) => typeof color === "string")
  ) &&
  palettes.length > 5

const fallbackPalette = ["#333333", "#555555", "#777777", "#999999", "#bbbbbb"] as Palette
const colorNames = ["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"] as ColorNames

const getRandomPalette = async () => {
  const palettesExpiration = Date.now() + 7 * 24 * 60 * 60 * 1000
  const storedPalettes = localStorage.getItem("palettes")

  if (!storedPalettes || JSON.parse(storedPalettes).expiration < Date.now()) {
    const newPalettes = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/1000.json")
      .then((response) => response.json())
      .then((palettes) => {
        if (!isPalettes(palettes)) return [fallbackPalette]

        localStorage.setItem(
          "palettes",
          JSON.stringify({ palettes, expiration: palettesExpiration })
        )
        return palettes
      })
    return getRandom(newPalettes)
  }

  const newPalettes = JSON.parse(storedPalettes).palettes
  if (!isPalettes(newPalettes)) return fallbackPalette

  return getRandom(newPalettes)
}

const getColors = ({ palette, colorNames }: { palette: Palette; colorNames: ColorNames }) => {
  return colorNames.reduce((acc, color, index) => {
    acc[color] = palette[index]
    return acc
  }, {} as Colors)
}

const getColorsToUse = () => colorNames.map(() => getRandom(colorNames))

export { colorNames, fallbackPalette, getColors, getColorsToUse, getRandomPalette }
export type { Colors, Palette }
