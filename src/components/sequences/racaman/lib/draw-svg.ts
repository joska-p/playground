import { findBiggestInterval } from "@/lib/math";

function resetSvg(svg: SVGSVGElement) {
  svg.innerHTML = "";
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
}

function calculateViewBox(sequence: number[], containerSize: { width: number; height: number }) {
  const maxWith = containerSize.width;
  const maxHeight = containerSize.height;
  const width = Math.min(Math.max(...sequence), maxWith);
  const height = Math.min(findBiggestInterval(sequence), maxHeight);
  return { width, height };
}

function generateArcPath(radius: number, value: number, height: number, clockwise: boolean): string {
  const sweepFlag = clockwise ? 1 : 0;
  return ` A ${radius} ${radius} 0 0 ${sweepFlag} ${value} ${height / 2}`;
}

function generatePath(sequence: number[], height: number): string {
  return sequence.reduce(
    (acc, value, index) => {
      if (index === 0) return acc; // Skip the first element

      const previousValue = sequence[index - 1];
      const radius = Math.abs(value - previousValue) / 2;

      // Determine the direction of the arc
      const clockwise = (index % 2 === 0 && previousValue > value) || (index % 2 !== 0 && previousValue < value);

      // Append the arc path to the accumulated path
      return acc + generateArcPath(radius, value, height, clockwise);
    },
    `M 0 ${height / 2} ` // Move to the starting point
  );
}

function draw(svg: SVGSVGElement, sequence: number[], containerSize: { width: number; height: number }) {
  resetSvg(svg);
  const { width, height } = calculateViewBox(sequence, containerSize);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const path = generatePath(sequence, height);
  svg.innerHTML += `<path class="path" d="${path}" style="vector-effect: non-scaling-stroke"/>`;
}

export { draw };
