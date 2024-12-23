import { initialColors } from "@/components/mosaic/lib/colors";
import { getRandom } from "@lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@ui/sidebar";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controls } from "./controls/Controls";
import { Tile } from "./tiles/Tile";
import { defaultTileSet } from "./tiles/default-tile-set";

export type DefaultTileSet = typeof defaultTileSet;
export const initialRotations = {
	"--rotation-0": "0deg",
	"--rotation-1": "90deg",
	"--rotation-2": "180deg",
	"--rotation-3": "270deg",
};

const Mosaic = ({
	tileWidth = 64,
	tileHeight = 64,
	tileSet = defaultTileSet,
}) => {
	const [mosaicTileSet, setMosaicTileSet] = useState(tileSet);
	const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([]);
	const mosaicRef = useRef<HTMLDivElement>(null);

	const handleSetNewTiles = useCallback(
		(newMosaicTileSet = mosaicTileSet) => {
			const computedTileHeight = () => {
				if (!mosaicRef.current) return tileHeight;
				return Number.parseFloat(
					getComputedStyle(
						mosaicRef.current as HTMLDivElement,
					).getPropertyValue("--tile-height"),
				);
			};

			const computedTileWidth = () => {
				if (!mosaicRef.current) return tileWidth;
				return Number.parseFloat(
					getComputedStyle(
						mosaicRef.current as HTMLDivElement,
					).getPropertyValue("--tile-width"),
				);
			};

			const computedGap = () => {
				if (!mosaicRef.current) return 0;
				return Number.parseFloat(
					getComputedStyle(
						mosaicRef.current as HTMLDivElement,
					).getPropertyValue("--mosaicGap"),
				);
			};

			const computedNumberOfTiles = () => {
				if (!mosaicRef.current || !mosaicRef.current.parentElement) return 0;

				return (
					Math.floor(
						(mosaicRef.current.parentElement.offsetWidth + computedGap()) /
							(computedTileWidth() + computedGap()),
					) *
					Math.floor(
						(mosaicRef.current.parentElement.offsetHeight + computedGap()) /
							(computedTileHeight() + computedGap()),
					)
				);
			};

			const newTiles = Array.from({ length: computedNumberOfTiles() }, () =>
				getRandom(newMosaicTileSet),
			);
			setMosaicTiles(newTiles);
		},
		[mosaicTileSet, tileHeight, tileWidth],
	);

	const styleObject = {
		...initialColors,
		...initialRotations,
		"--tile-width": `${tileWidth}px`,
		"--tile-height": `${tileHeight}px`,
		"--mosaicGap": `${0}px`,
	} as React.CSSProperties;

	useEffect(() => {
		handleSetNewTiles();
	}, [handleSetNewTiles]);

	return (
		<SidebarProvider className="h-full">
			<SidebarContent className="absolute inset-0 content-center overflow-hidden">
				<div
					className="mx-auto flex w-fit flex-wrap justify-center gap-[var(--mosaicGap)]"
					ref={mosaicRef}
					style={styleObject}
				>
					{mosaicTiles.map((tile, index) => (
						<Tile
							// biome-ignore lint/suspicious/noArrayIndexKey: There is no other way
							key={index}
							name={tile}
							colors={Object.keys(initialColors).map(() =>
								getRandom(Object.keys(initialColors)),
							)}
							rotation={getRandom(Object.keys(initialRotations))}
						/>
					))}
				</div>
			</SidebarContent>

			<Sidebar position="right">
				<Controls
					mosaicRef={mosaicRef}
					mosaicTileSet={mosaicTileSet}
					setMosaicTileSet={setMosaicTileSet}
					initialTileSet={tileSet}
					handleSetNewTiles={handleSetNewTiles}
				/>
			</Sidebar>
		</SidebarProvider>
	);
};

export { Mosaic };
