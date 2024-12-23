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

const computeNumberOfTiles = ({
	element,
	parentElement,
}: { element: HTMLDivElement; parentElement: HTMLDivElement }) => {
	return (
		Math.floor(
			(parentElement.offsetWidth + computeGap(element)) /
				(computeTileWidth(element) + computeGap(element)),
		) *
		Math.floor(
			(parentElement.offsetHeight + computeGap(element)) /
				(computeTileHeight(element) + computeGap(element)),
		)
	);
};

export { computeNumberOfTiles };
