const draw = (canvas: HTMLCanvasElement, sequence: number[]) => {
  if (!canvas.parentElement) return

  canvas.width = canvas.parentElement.clientWidth
  canvas.height = canvas.width / 2

  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  const valueMin = Math.min(...sequence)
  const valueMax = Math.max(...sequence)
  const valueScale = canvas.width / (valueMax - valueMin)

  context.save()
  context.translate(0, canvas.height / 2)

  context.strokeStyle = "#a89984"
  context.lineWidth = 1

  sequence.forEach((value, index) => {
    if (index > 0) {
      const previousValue = sequence[index - 1]
      const middleValue = ((previousValue + value) / 2) * valueScale
      const radius = (Math.abs(value - previousValue) / 2) * valueScale

      context.beginPath()

      if (index % 2 === 0) context.arc(middleValue, 0, radius, 0, Math.PI)
      else context.arc(middleValue, 0, radius, Math.PI, 0)

      context.stroke()
    }
  })

  context.restore()
}

export { draw }
