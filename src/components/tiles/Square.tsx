import { getRandomColor } from "#lib/colors.ts"

export default function Square() {
  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transition: "fill 0.5s ease-in-out",
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="square"
      viewBox="0 0 100 100"
      style={styleObject}
    >
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="0"
        y="0"
        width="50"
        height="50"
      />
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="50"
        y="0"
        width="50"
        height="50"
      />
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="0"
        y="50"
        width="50"
        height="50"
      />
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="50"
        y="50"
        width="50"
        height="50"
      />
    </svg>
  )
}
