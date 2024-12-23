const findBiggestInterval = (numbers: number[]) => {
	if (numbers.length === 1) {
		return 0;
	}

	if (numbers.length === 2) {
		return Math.abs(numbers[1] - numbers[0]);
	}

	let biggestInterval = 0;
	for (let i = 1; i < numbers.length; i++) {
		const interval = Math.abs(numbers[i] - numbers[i - 1]);
		if (interval > biggestInterval) {
			biggestInterval = interval;
		}
	}

	return biggestInterval;
};

export { findBiggestInterval };
