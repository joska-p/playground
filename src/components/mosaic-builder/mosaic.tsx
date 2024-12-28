import { getRandom } from "@/lib/utils";
import { Tile } from "./tiles/Tile";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	mosaicRef: React.RefObject<HTMLDivElement>;
	colors: Record<string, string>;
	rotations: Record<string, string>;
	mosaicTiles: string[];
};

const Mosaic = ({ mosaicRef, colors, rotations, mosaicTiles }: Props) => {
	const styleObject = {
		...colors,
		...rotations,
		"--tile-width": "64px",
		"--tile-height": "64px",
		"--mosaicGap": "0px",
	} as React.CSSProperties;

	return (
		<div
			ref={mosaicRef}
			className="flex h-full flex-wrap content-start justify-center gap-[var(--mosaicGap)]"
			style={styleObject}
		>
			{mosaicTiles.map((tile, index) => (
				<Tile
					// biome-ignore lint/suspicious/noArrayIndexKey: There is no other way
					key={index}
					name={tile}
					colors={Object.keys(colors).map(() => getRandom(Object.keys(colors)))}
					rotation={getRandom(Object.keys(rotations))}
				/>
			))}
		</div>
	);
};

export { Mosaic };
