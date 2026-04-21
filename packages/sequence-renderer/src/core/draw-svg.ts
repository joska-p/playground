import { findBiggestInterval } from "../utils/math.js";

function resetSvg(svg: SVGSVGElement) {
  svg.innerHTML = "";
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
}

function calculateViewBox(sequence: number[]) {
  const width = Math.max(...sequence, 0) || 1;
  const height = findBiggestInterval(sequence) || 1;

  // Add 5% padding
  const paddingX = width * 0.05;
  const paddingY = height * 0.05;

  return {
    minX: -paddingX / 2,
    minY: -paddingY / 2,
    width: width + paddingX,
    height: height + paddingY,
    internalHeight: height,
  };
}

function generateArcPath(
  radius: number,
  value: number,
  baselineY: number,
  clockwise: boolean,
): string {
  const sweepFlag = clockwise ? 1 : 0;
  return ` A ${radius} ${radius} 0 0 ${sweepFlag} ${value} ${baselineY}`;
}

function generatePath(sequence: number[], baselineY: number): string {
  return sequence.reduce((acc, value, index) => {
    const previousValue = sequence[index - 1];
    if (index === 0 || previousValue === undefined) return acc;

    const radius = Math.abs(value - previousValue) / 2;

    const clockwise =
      (index % 2 === 0 && previousValue > value) ||
      (index % 2 !== 0 && previousValue < value);

    return acc + generateArcPath(radius, value, baselineY, clockwise);
  }, `M 0 ${baselineY} `);
}

function draw(svg: SVGSVGElement, sequence: number[]) {
  resetSvg(svg);
  const { minX, minY, width, height, internalHeight } =
    calculateViewBox(sequence);
  svg.setAttribute("viewBox", `${minX} ${minY} ${width} ${height}`);

  const path = generatePath(sequence, internalHeight / 2);
  svg.innerHTML += `<path class="path" d="${path}" style="vector-effect: non-scaling-stroke; stroke: currentColor; fill: transparent;"/>`;
}

export { draw };
