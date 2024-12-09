type Palette = [string, string, string, string, string] | []

const getRandomPalette = async () => {
  const palettes = (await fetch("https://unpkg.com/nice-color-palettes@3.0.0/100.json").then(
    (response) => response.json()
  )) as Palette[]
  return palettes[Math.floor(Math.random() * palettes.length)]
}

const colors = ["--color-1", "--color-2", "--color-3", "--color-4"]
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

export { getRandomColor, getRandomPalette }
export type { Palette }
