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
      viewBox="0 0 2 2"
      style={styleObject}
    >
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="0"
        y="0"
        width="1"
        height="1"
      />
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="1"
        y="0"
        width="1"
        height="1"
      />
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="0"
        y="1"
        width="1"
        height="1"
      />
      <rect
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${getRandomColor()})`}
        x="1"
        y="1"
        width="1"
        height="1"
      />
    </svg>
  )
}
