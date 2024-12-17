import styles from "./tile.module.css"

type Props = {
  colors: string[]
  rotation: number
}

const Square = ({ colors, rotation }: Props) => {
  const styleObject = {
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <div className={`tile grid grid-cols-2 grid-rows-2 ${styles.tile}`} style={styleObject}>
      <div style={{ backgroundColor: `var(${colors[0]})` }} />
      <div style={{ backgroundColor: `var(${colors[1]})` }} />
      <div style={{ backgroundColor: `var(${colors[2]})` }} />
      <div style={{ backgroundColor: `var(${colors[3]})` }} />
    </div>
  )
}

export default Square
