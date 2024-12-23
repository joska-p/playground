const math = {
	equals: (p1: [number, number], p2: [number, number]) => {
		return p1[0] === p2[0] && p1[1] === p2[1];
	},

	lerp: (a: number, b: number, t: number) => {
		return a + (b - a) * t;
	},

	invLerp: (a: number, b: number, v: number) => {
		return (v - a) / (b - a);
	},

	remap: (
		oldA: number,
		oldB: number,
		newA: number,
		newB: number,
		v: number,
	) => {
		return math.lerp(newA, newB, math.invLerp(oldA, oldB, v));
	},

	remapPoint: (
		oldBounds: { left: number; top: number; right: number; bottom: number },
		newBounds: { left: number; top: number; right: number; bottom: number },
		point: [number, number],
	) => {
		return [
			math.remap(
				oldBounds.left,
				oldBounds.right,
				newBounds.left,
				newBounds.right,
				point[0],
			),
			math.remap(
				oldBounds.top,
				oldBounds.bottom,
				newBounds.top,
				newBounds.bottom,
				point[1],
			),
		];
	},

	add: (p1: [number, number], p2: [number, number]) => {
		return [p1[0] + p2[0], p1[1] + p2[1]];
	},

	subtract: (p1: [number, number], p2: [number, number]) => {
		return [p1[0] - p2[0], p1[1] - p2[1]];
	},

	scale: (p: [number, number], scaler: number) => {
		return [p[0] * scaler, p[1] * scaler];
	},

	distance: (p1: [number, number], p2: [number, number]) => {
		return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
	},

	formatNumber: (n: number, dec = 0) => {
		return n.toFixed(dec);
	},

	getNearest: (loc: [number, number], points: [number, number][]) => {
		let minDist = Number.MAX_SAFE_INTEGER;
		let nearestIndex = 0;

		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const d = math.distance(loc, point);

			if (d < minDist) {
				minDist = d;
				nearestIndex = i;
			}
		}
		return nearestIndex;
	},
};
