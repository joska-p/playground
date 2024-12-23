import { computeNumberOfTiles } from "@/components/mosaic/lib/utils";
import {
	Sidebar,
	SidebarContent,
	SidebarProvider,
} from "@/components/ui/Sidebar";
import { getRandom } from "@lib/utils";
import { useCallback, useRef, useState } from "react";
import { Controls } from "./controls/Controls";
import { Tile } from "./tiles/Tile";
import {
	defaulColors,
	defaultRotations,
	defaultTileSet,
} from "./tiles/default-options";
import type { DefaultTileSet } from "./tiles/default-options";

const Mosaic = ({
	tileWidth = 64,
	tileHeight = 64,
	tileSet = defaultTileSet,
	colors = defaulColors,
	rotations = defaultRotations,
}) => {
	const [mosaicTiles, setMosaicTiles] = useState<DefaultTileSet>([]);
	const mosaicRef = useRef<HTMLDivElement>(null);

	const handleSetNewTiles = useCallback((tileSet = defaultTileSet) => {
		if (!mosaicRef.current) {
			throw new Error("No mosaic ref");
		}
		if (!mosaicRef.current.parentElement) {
			throw new Error("No mosaic parent element");
		}

		const computedNumberOfTiles = computeNumberOfTiles({
			element: mosaicRef.current,
			parentElement: mosaicRef.current.parentElement as HTMLDivElement,
		});

		const newTiles = Array.from({ length: computedNumberOfTiles }, () =>
			getRandom(tileSet),
		);
		setMosaicTiles(newTiles);
	}, []);

	const styleObject = {
		...colors,
		...rotations,
		"--tile-width": `${tileWidth}px`,
		"--tile-height": `${tileHeight}px`,
		"--mosaicGap": `${0}px`,
	} as React.CSSProperties;

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
							colors={Object.keys(colors).map(() =>
								getRandom(Object.keys(colors)),
							)}
							rotation={getRandom(Object.keys(rotations))}
						/>
					))}
				</div>
			</SidebarContent>

			<Sidebar position="right">
				<Controls
					mosaicRef={mosaicRef}
					initialTileSet={tileSet}
					handleSetNewTiles={handleSetNewTiles}
				/>
			</Sidebar>
		</SidebarProvider>
	);
};

export { Mosaic };
