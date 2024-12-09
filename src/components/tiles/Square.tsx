import { getRandomColor } from "#lib/colors.ts"

export default function Square() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="square"
      viewBox="0 0 100 100"
      width="var(--tile-width)"
      height="var(--tile-height)"
    >
      <rect fill={`var(${getRandomColor()})`} x="0" y="0" width="50" height="50" />
      <rect fill={`var(${getRandomColor()})`} x="50" y="0" width="50" height="50" />
      <rect fill={`var(${getRandomColor()})`} x="0" y="50" width="50" height="50" />
      <rect fill={`var(${getRandomColor()})`} x="50" y="50" width="50" height="50" />
    </svg>
  )
}
