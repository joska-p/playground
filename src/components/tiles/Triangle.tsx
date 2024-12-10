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
      viewBox="0 0 2 2"
      style={styleObject}
    >
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        points="0,0 2,0 1,1"
      />
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        points="0,0 0,2 1,1"
      />
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        points="0,2 2,2 1,1"
      />
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        points="2,2 2,0 1,1"
      />
    </svg>
  )
}
