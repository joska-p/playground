import { getColorsToUse } from "#lib/colors.ts"

type Props = {
  colors?: string[]
}

const MiddleCircle = ({ colors = getColorsToUse() }: Props) => {
  const uniqueId = colors.join("-").trim()

  const styleObject = {
    width: "var(--tile-width)",
    height: "var(--tile-height)",
    transform: `rotate(${[0, 90, 180, 270].sort(() => Math.random() - 0.5)[0]}deg)`,
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="triangle"
      viewBox="0 0 2 2"
      style={styleObject}
    >
      <defs>
        <linearGradient id={uniqueId}>
          <stop stopColor={`var(${colors[0]})`} offset="0%" />
          <stop stopColor={`var(${colors[0]})`} offset="50%" />
          <stop stopColor={`var(${colors[1]})`} offset="50%" />
          <stop stopColor={`var(${colors[1]})`} offset="100%" />
        </linearGradient>
      </defs>
      <circle cx="1" cy="1" r="25%" fill={`url(#${uniqueId})`} />
    </svg>
  )
}

export default MiddleCircle
