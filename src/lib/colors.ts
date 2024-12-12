import { getRandom } from "./utils"

const colorNames = ["--color-0", "--color-1", "--color-2", "--color-3", "--color-4"]

const getRandomPalette = async () => {
  let palette: [string, string, string, string, string]

  const expirationDuration = 1000 * 60 * 60 * 24 * 7 // 7 days
  const expirationDate = new Date().getTime() + expirationDuration
  const date = new Date()
  const storedPalettes = localStorage.getItem("palettes")

  if (!storedPalettes || JSON.parse(storedPalettes).expiration - date.getTime() < 0) {
    const newPalettes = await fetch("https://unpkg.com/nice-color-palettes@3.0.0/1000.json").then(
      (response) => response.json()
    )
    localStorage.setItem("palettes", JSON.stringify({ newPalettes, expiration: expirationDate }))
    palette = getRandom(newPalettes)
  } else {
    palette = getRandom(JSON.parse(storedPalettes).newPalettes)
  }

  return palette
}

const getCssColors = ({ palette, colorNames }: { palette: string[]; colorNames: string[] }) => {
  return colorNames.reduce((acc: Record<string, string>, color, index) => {
    acc[color] = palette[index]
    return acc
  }, {})
}

const getColorsToUse = () => colorNames.map(() => getRandom(colorNames))

export { colorNames, getColorsToUse, getCssColors, getRandomPalette }
