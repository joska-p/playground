import { computeNumberOfTiles } from "@/components/mosaic/lib/utils";
import { Mosaic } from "@/components/mosaic/mosaic";
import { SidebarProvider } from "@/components/ui/sidebar/Sidebar";
// import {
// 	Sidebar,
// 	SidebarContent,
// 	SidebarProvider,
// } from "@/components/ui/Sidebar";
import { cn, getRandom } from "@lib/utils";
import { useCallback, useRef, useState } from "react";
import { Controls } from "./controls/Controls";
import {
	defaulColors,
	defaultRotations,
	defaultTileSet,
} from "./tiles/default-options";

const MosaicProvider = ({
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
			<SidebarProvider.Content className={cn("relative overflow-hidden")}>
				<Mosaic
					mosaicRef={mosaicRef}
					colors={inititialColors}
					rotations={inititialRotations}
					mosaicTiles={mosaicTiles}
				/>
			</SidebarProvider.Content>

			<SidebarProvider.Sidebar className="px-4">
				<Controls
					mosaicRef={mosaicRef}
					initialTileSet={inititialTileSet}
					handleSetNewTiles={handleSetNewTiles}
				/>
			</SidebarProvider.Sidebar>
		</SidebarProvider>
	);
};

export { MosaicProvider };
