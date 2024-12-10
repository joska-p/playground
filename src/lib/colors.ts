type Palette = [string, string, string, string, string] | []

const getRandomPalette = async () => {
  // check for local storage
  if (localStorage.getItem("palettes")) {
    const palettes = JSON.parse(localStorage.getItem("palettes") || "[]") as Palette[]
    return palettes[Math.floor(Math.random() * palettes.length)]
  }

  // if not, fetch and store
  const palettes = (await fetch("https://unpkg.com/nice-color-palettes@3.0.0/1000.json").then(
    (response) => response.json()
  )) as Palette[]

  localStorage.setItem("palettes", JSON.stringify(palettes))
  return palettes[Math.floor(Math.random() * palettes.length)]
}

export { getRandomPalette }
export type { Palette }
