import { findBiggestInterval } from "@/lib/math";

const draw = (
	canvas: HTMLCanvasElement,
	sequence: number[],
	containerSize: { width: number; height: number },
) => {
	if (!canvas.parentElement) return;

	canvas.width = containerSize.width;
	canvas.height = containerSize.height;

	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	const valueMin = Math.min(...sequence);
	const valueMax = Math.max(...sequence);
	const valueScale = canvas.width / (valueMax - valueMin);

	context.save();
	context.translate(0, canvas.height / 2);

	context.strokeStyle = "currentColor";
	context.lineWidth = 1;

	sequence.forEach((value, index) => {
		if (index > 0) {
			const previousValue = sequence[index - 1];
			const middleValue = ((previousValue + value) / 2) * valueScale;
			const radius = (Math.abs(value - previousValue) / 2) * valueScale;

			context.beginPath();

			if (index % 2 === 0) context.arc(middleValue, 0, radius, 0, Math.PI);
			else context.arc(middleValue, 0, radius, Math.PI, 0);

			context.stroke();
		}
	});

	context.restore();
};

const drawSvg = (
	svg: SVGSVGElement,
	sequence: number[],
	containerSize: { width: number; height: number },
) => {
	//reset the svg
	svg.innerHTML = "";
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

	const maxWith = containerSize.width;
	const maxHeight = containerSize.height;

	// calculate the viewbox
	const width = Math.min(Math.max(...sequence), maxWith);
	const height = Math.min(findBiggestInterval(sequence), maxHeight);

	svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

	const path = sequence.reduce(
		(acc, value, index) => {
			if (index > 0) {
				const previousValue = sequence[index - 1];
				const radius = Math.abs(value - previousValue) / 2;
				if (
					(index % 2 === 0 && previousValue > value) ||
					(index % 2 !== 0 && previousValue < value)
				) {
					acc += ` A ${radius} ${radius} 0 0 1 ${value} ${height / 2}`; // clockwise
				} else acc += `  A ${radius} ${radius} 0 0 0 ${value} ${height / 2}`; // counter-clockwise
			}
			return acc;
		},
		`M 0 ${height / 2} `,
	);

	svg.innerHTML += `<path class="path" d="${path}"  style="vector-effect: non-scaling-stroke"/>`;
};

export { draw, drawSvg };
