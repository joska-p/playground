type Palette = [string, string, string, string, string] | []

const getRandomPalette = async () => {
  const palettes = (await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then(
    (response) => response.json()
  )) as Palette[]
  return palettes[Math.floor(Math.random() * palettes.length)]
}

const getRandomColor = (palette: string[]) => {
  return palette[Math.floor(Math.random() * palette.length)]
}

export { getRandomColor, getRandomPalette }
export type { Palette }
