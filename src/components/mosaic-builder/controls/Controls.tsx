import { Button } from "@/components/ui/Button";
import { getRandom, shuffleArray } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPalettes } from "../lib/colors";
import { computedColors, computedRotation } from "../lib/utils";
import type { DefaultTileSet } from "../tiles/default-options";
import {
	defaulColors,
	defaultPalette,
	defaultRotations,
} from "../tiles/default-options";
import { PalettePicker } from "./Palette-picker";
import { TileSetControls } from "./Tile-set-controls";

type Props = {
	mosaicRef: React.RefObject<HTMLDivElement>;
	initialTileSet: DefaultTileSet;
	handleSetNewTiles: (tileset?: DefaultTileSet) => void;
};

const Controls = ({ mosaicRef, initialTileSet, handleSetNewTiles }: Props) => {
	const [mosaicTileSet, setMosaicTileSet] = useState(initialTileSet);
	const [palettes, setPalettes] = useState([[""]]);
	const [currentPalette, setCurrentPalette] = useState(defaultPalette);
	const [size, setSize] = useState(64);
	const [gap, setGap] = useState(0);

	const handleSetNewColors = (palette = getRandom(palettes)) => {
		if (!mosaicRef.current) return;

		const element = mosaicRef.current;
		setCurrentPalette(palette);
		Object.keys(defaulColors).forEach((colorName, index) =>
			element.style.setProperty(colorName, palette[index]),
		);
	};

	const HandleShuffleColors = () => {
		if (!mosaicRef.current) return;

		const element = mosaicRef.current;
		const newColors = shuffleArray(computedColors(element));
		Object.keys(defaulColors).forEach((colorName, index) =>
			element.style.setProperty(colorName, newColors[index]),
		);
	};

	const HandleSuffleRotations = () => {
		if (!mosaicRef.current) return;

		const element = mosaicRef.current;
		const newRotations = shuffleArray(computedRotation(element));
		Object.keys(defaultRotations).forEach((rotationName, index) =>
			element.style.setProperty(rotationName, newRotations[index]),
		);
	};

	const handleChangeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!mosaicRef.current) return;

		setSize(Number.parseInt(event.target.value));
		mosaicRef.current.style.setProperty(
			"--tile-width",
			`${event.target.value}px`,
		);
		mosaicRef.current.style.setProperty(
			"--tile-height",
			`${event.target.value}px`,
		);
	};

	const handleChangeGapSize = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!mosaicRef.current) return;

		setGap(Number.parseInt(event.target.value));
		mosaicRef.current.style.setProperty(
			"--mosaicGap",
			`${event.target.value}px`,
		);
	};

	const initialPalettes = useMemo(async () => {
		const palettes = await getPalettes();
		return palettes;
	}, []);

	const handleSetNewPalettes = useCallback(async () => {
		const randomPalettes = shuffleArray(await initialPalettes).slice(0, 23);
		setPalettes(randomPalettes);
	}, [initialPalettes]);

	useEffect(() => {
		handleSetNewPalettes();
		handleSetNewTiles();
	}, [handleSetNewTiles, handleSetNewPalettes]);

	return (
		<form className="flex h-[40ch] flex-wrap justify-center gap-4 overflow-y-auto overflow-x-visible md:h-auto md:w-[42ch] md:flex-col md:gap-8">
			<fieldset className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-2">
				<Button type="button" onClick={HandleShuffleColors} size="sm">
					Shuffle colors
				</Button>
				<Button type="button" onClick={HandleSuffleRotations} size="sm">
					Shuffle rotations
				</Button>
				<Button type="button" onClick={handleSetNewPalettes} size="sm">
					New palettes
				</Button>
				<Button
					type="button"
					onClick={() => handleSetNewTiles(mosaicTileSet)}
					size="sm"
				>
					New tiles
				</Button>
			</fieldset>

			<fieldset className="grid grid-cols-2 gap-4">
				<label className="flex flex-col items-center text-sm ">
					Tile size: {size}px
					<input
						type="range"
						min={32}
						max={256}
						step={2}
						value={size}
						onChange={handleChangeTileSize}
						className="outline-none hover:bg-primary/90 focus:ring-4 focus:ring-seconary"
					/>
				</label>

				<label className="flex flex-col items-center text-sm">
					Gap size: {gap}px
					<input
						type="range"
						min={0}
						step={2}
						max={128}
						value={gap}
						onChange={handleChangeGapSize}
						className="outline-none hover:bg-primary/90 focus:ring-4 focus:ring-seconary"
					/>
				</label>
			</fieldset>

			<TileSetControls
				initialTileSet={initialTileSet}
				mosaicTileSet={mosaicTileSet}
				setMosaicTileSet={setMosaicTileSet}
				handleSetNewTiles={handleSetNewTiles}
			/>

			<PalettePicker
				palettes={palettes}
				currentPalette={currentPalette}
				handleSetNewColors={handleSetNewColors}
			/>
		</form>
	);
};

export { Controls };
