import { computeNumberOfTiles } from "@/components/mosaic-builder/lib/utils";
import { Mosaic } from "@/components/mosaic-builder/mosaic";
import { SidebarProvider } from "@/components/ui/sidebar/Sidebar";
import { cn, getRandom } from "@lib/utils";
import { useCallback, useRef, useState } from "react";
import { Controls } from "./controls/Controls";
import {
	defaulColors,
	defaultRotations,
	defaultTileSet,
} from "./tiles/default-options";

const MosaicBuilder = ({
	inititialTileSet = defaultTileSet,
	inititialColors = defaulColors,
	inititialRotations = defaultRotations,
}) => {
	const [mosaicTiles, setMosaicTiles] = useState(inititialTileSet);
	const mosaicRef = useRef<HTMLDivElement>(null);

	const handleSetNewTiles = useCallback(
		(tileSet = inititialTileSet) => {
			if (!mosaicRef.current) {
				throw new Error("No mosaic ref");
			}
			const computedNumberOfTiles = computeNumberOfTiles(mosaicRef.current);
			const newTiles = Array.from({ length: computedNumberOfTiles }, () =>
				getRandom(tileSet),
			);
			setMosaicTiles(newTiles);
		},
		[inititialTileSet],
	);

	return (
		<SidebarProvider>
			<SidebarProvider.Content className="relative">
				<Mosaic
					mosaicRef={mosaicRef}
					colors={inititialColors}
					rotations={inititialRotations}
					mosaicTiles={mosaicTiles}
				/>
			</SidebarProvider.Content>

			<SidebarProvider.Sidebar>
				<Controls
					mosaicRef={mosaicRef}
					initialTileSet={inititialTileSet}
					handleSetNewTiles={handleSetNewTiles}
				/>
			</SidebarProvider.Sidebar>
		</SidebarProvider>
	);
};

export { MosaicBuilder };
