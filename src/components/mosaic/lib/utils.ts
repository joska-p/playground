const computeTileHeight = (element: HTMLDivElement) => {
	return Number.parseFloat(
		getComputedStyle(element).getPropertyValue("--tile-height"),
	);
};

const computeTileWidth = (element: HTMLDivElement) => {
	return Number.parseFloat(
		getComputedStyle(element).getPropertyValue("--tile-width"),
	);
};

const computeGap = (element: HTMLDivElement) => {
	return Number.parseFloat(
		getComputedStyle(element).getPropertyValue("--mosaicGap"),
	);
};

const computeNumberOfTiles = (element: HTMLDivElement) => {
	return (
		Math.floor(
			(element.offsetWidth + computeGap(element)) /
				(computeTileWidth(element) + computeGap(element)),
		) *
		Math.floor(
			(element.offsetHeight + computeGap(element)) /
				(computeTileHeight(element) + computeGap(element)),
		)
	);
};

export { computeNumberOfTiles };
