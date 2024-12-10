import type { CssColorVariablesNames } from "#constants/css-variables-names.ts"

export default function Triangle({ colors }: { colors: CssColorVariablesNames }) {
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
        fill={`var(${colors[0]})`}
        points="0,0 2,0 1,1"
      />
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${colors[1]})`}
        points="0,0 0,2 1,1"
      />
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${colors[2]})`}
        points="0,2 2,2 1,1"
      />
      <polygon
        style={{ transition: "fill 0.5s ease-in-out" }}
        fill={`var(${colors[3]})`}
        points="2,2 2,0 1,1"
      />
    </svg>
  )
}
