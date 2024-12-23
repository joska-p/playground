import { getPalettes, initialColors } from "@/components/mosaic/lib/colors";
import { Input } from "@/components/ui/input";
import { getRandom, shuffleArray } from "@/lib/utils";
import { PalettePicker } from "@components/mosaic/controls/Palette-picker";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { useEffect, useState } from "react";
import type { DefaultTileSet } from "../Mosaic";
import { initialRotations } from "../Mosaic";
import { TileSetControls } from "./Tile-set-controls";

export const defaultPalette = [
	"#333333",
	"#555555",
	"#777777",
	"#999999",
	"#bbbbbb",
];

type ControlsProps = {
	mosaicRef: React.RefObject<HTMLDivElement>;
	mosaicTileSet: DefaultTileSet;
	setMosaicTileSet: React.Dispatch<React.SetStateAction<string[]>>;
	initialTileSet: DefaultTileSet;
	handleSetNewTiles: (tileset?: DefaultTileSet) => void;
};

const Controls = ({
	mosaicRef,
	mosaicTileSet,
	setMosaicTileSet,
	initialTileSet,
	handleSetNewTiles,
}: ControlsProps) => {
	const [palettes, setPalettes] = useState([[""]]);
	const [currentPalette, setCurrentPalette] = useState(defaultPalette);
	const [size, setSize] = useState(64);
	const [gap, setGap] = useState(0);

	const computedColors = () => {
		if (!mosaicRef.current) return [];
		return Object.keys(initialColors).map((color) =>
			getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(
				color,
			),
		);
	};

	const computedRotation = () => {
		if (!mosaicRef.current) return [];
		return Object.keys(initialRotations).map((rotation) =>
			getComputedStyle(mosaicRef.current as HTMLDivElement).getPropertyValue(
				rotation,
			),
		);
	};

	const handleSetNewColors = (palette = getRandom(palettes)) => {
		setCurrentPalette(palette);
		Object.keys(initialColors).forEach((colorName, index) => {
			if (!mosaicRef.current) return;
			mosaicRef.current.style.setProperty(colorName, palette[index]);
		});
	};

	const HandleShuffleColors = () => {
		const newColors = shuffleArray(computedColors());
		Object.keys(initialColors).forEach((colorName, index) => {
			if (!mosaicRef.current) return;
			mosaicRef.current.style.setProperty(colorName, newColors[index]);
		});
	};

	const HandleSuffleRotations = () => {
		const newRotations = shuffleArray(computedRotation());
		Object.keys(initialRotations).forEach((rotationName, index) => {
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

	const handleSetNewPalettes = async () => {
		const palettes = await getPalettes();
		const randomPalettes = shuffleArray(palettes).slice(0, 23);
		setPalettes(randomPalettes);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies(handleSetNewPalettes): async call at need to initialize the palettes
	useEffect(() => {
		handleSetNewPalettes();
	}, []);

	return (
		<form className="max-w-sm space-y-8">
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
				<Label className="flex flex-col items-center text-sm">
					Tile size: {size}px
					<Input
						type="range"
						min={32}
						max={256}
						step={1}
						value={size}
						onChange={handleChangeTileSize}
					/>
				</Label>

				<Label className="flex flex-col items-center text-sm">
					Gap size: {gap}px
					<Input
						type="range"
						min={0}
						step={1}
						max={128}
						value={gap}
						onChange={handleChangeGapSize}
					/>
				</Label>
			</fieldset>

			<TileSetControls
				initialTileSet={initialTileSet}
				handleSetNewTiles={handleSetNewTiles}
				mosaicTileSet={mosaicTileSet}
				setMosaicTileSet={setMosaicTileSet}
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
