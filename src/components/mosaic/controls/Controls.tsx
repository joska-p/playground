import { getPalettes } from "@/components/mosaic/lib/colors";
import { Button } from "@/components/ui/Button";
import { getRandom, shuffleArray } from "@/lib/utils";
import { PalettePicker } from "@components/mosaic/controls/Palette-picker";
import { useCallback, useEffect, useState } from "react";
import type { DefaultTileSet } from "../tiles/default-options";
import {
	defaulColors as colors,
	defaultPalette,
	defaultRotations as rotations,
} from "../tiles/default-options";
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

	const computedColors = () => {
		if (!mosaicRef.current) return [];
		return Object.keys(colors).map((color) =>
			getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(
				color,
			),
		);
	};

	const computedRotation = () => {
		if (!mosaicRef.current) return [];
		return Object.keys(rotations).map((rotation) =>
			getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(
				rotation,
			),
		);
	};

	const handleSetNewColors = (palette = getRandom(palettes)) => {
		setCurrentPalette(palette);
		Object.keys(colors).forEach((colorName, index) => {
			if (!mosaicRef.current) return;
			mosaicRef.current.style.setProperty(colorName, palette[index]);
		});
	};

	const HandleShuffleColors = () => {
		const newColors = shuffleArray(computedColors());
		Object.keys(colors).forEach((colorName, index) => {
			if (!mosaicRef.current) return;
			mosaicRef.current.style.setProperty(colorName, newColors[index]);
		});
	};

	const HandleSuffleRotations = () => {
		const newRotations = shuffleArray(computedRotation());
		Object.keys(rotations).forEach((rotationName, index) => {
			if (!mosaicRef.current) return;
			mosaicRef.current.style.setProperty(rotationName, newRotations[index]);
		});
	};

	const handleChangeTileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSize(Number.parseInt(event.target.value));
		if (!mosaicRef.current) return;
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
		setGap(Number.parseInt(event.target.value));
		if (!mosaicRef.current) return;
		mosaicRef.current.style.setProperty(
			"--mosaicGap",
			`${event.target.value}px`,
		);
	};

	const handleSetNewPalettes = useCallback(async () => {
		const palettes = await getPalettes();
		const randomPalettes = shuffleArray(palettes).slice(0, 23);
		setPalettes(randomPalettes);
	}, []);

	useEffect(() => {
		handleSetNewPalettes();
		handleSetNewTiles();
	}, [handleSetNewTiles, handleSetNewPalettes]);

	return (
		<form className="space-y-8">
			<fieldset className="grid grid-cols-2 gap-4">
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
				<label className="flex flex-col items-center text-sm">
					Tile size: {size}px
					<input
						type="range"
						min={32}
						max={256}
						step={1}
						value={size}
						onChange={handleChangeTileSize}
					/>
				</label>

				<label className="flex flex-col items-center text-sm">
					Gap size: {gap}px
					<input
						type="range"
						min={0}
						step={1}
						max={128}
						value={gap}
						onChange={handleChangeGapSize}
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
