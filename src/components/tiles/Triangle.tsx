import { getRandomColor } from "#lib/colors.ts"

export default function Triangle() {
  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 100 100"
      style={styleObject}
    >
      <polygon fill={`var(${getRandomColor()})`} points="0,0 100,0 50,50" />
      <polygon fill={`var(${getRandomColor()})`} points="0,0 0,100 50,50" />
      <polygon fill={`var(${getRandomColor()})`} points="0,100 100,100 50,50" />
      <polygon fill={`var(${getRandomColor()})`} points="100,100 100,0 50,50" />
    </svg>
  )
}
