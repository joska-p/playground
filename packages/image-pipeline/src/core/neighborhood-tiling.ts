import type { ManipulationDefinition } from "./image-pipeline.types";

const TILE_SIZE = 512; // pixels per tile edge

function extractTile({
  imageData,
  tx,
  ty,
  tw,
  th,
  halo,
}: {
  imageData: ImageData;
  tx: number;
  ty: number;
  tw: number;
  th: number;
  halo: number;
}) {
  const padX = Math.max(0, tx - halo);
  const padY = Math.max(0, ty - halo);
  const padX2 = Math.min(imageData.width, tx + tw + halo);
  const padY2 = Math.min(imageData.height, ty + th + halo);

  const padW = padX2 - padX;
  const padH = padY2 - padY;

  const tile = new ImageData(padW, padH);
  for (let row = 0; row < padH; row++) {
    const srcOff = ((padY + row) * imageData.width + padX) * 4;
    tile.data.set(imageData.data.subarray(srcOff, srcOff + padW * 4), row * padW * 4);
  }
  return tile;
}

function blitTile({
  destination,
  tile,
  tx,
  ty,
  tw,
  th,
  halo,
}: {
  destination: ImageData;
  tile: ImageData;
  tx: number;
  ty: number;
  tw: number;
  th: number;
  halo: number;
}) {
  const offX = tx - Math.max(0, tx - halo);
  const offY = ty - Math.max(0, ty - halo);

  for (let row = 0; row < th; row++) {
    const tileOff = ((offY + row) * tile.width + offX) * 4;
    const destOff = ((ty + row) * destination.width + tx) * 4;
    destination.data.set(tile.data.subarray(tileOff, tileOff + tw * 4), destOff);
  }
}

export function runNeighborhoodTiled({
  source,
  definition,
  options,
}: {
  source: ImageData;
  definition: ManipulationDefinition;
  options: Record<string, unknown>;
}) {
  const halo = (definition as { radius?: number }).radius ?? 1;
  const destinationImage = new ImageData(source.width, source.height);

  const columns = Math.ceil(source.width / TILE_SIZE);
  const rows = Math.ceil(source.height / TILE_SIZE);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const tx = column * TILE_SIZE;
      const ty = row * TILE_SIZE;
      const tw = Math.min(TILE_SIZE, source.width - tx);
      const th = Math.min(TILE_SIZE, source.height - ty);

      const tile = extractTile({ imageData: source, tx, ty, tw, th, halo });
      const tileOut = new ImageData(tile.width, tile.height);

      if (definition.type === "neighborhood") {
        definition.function({
          options,
          source: tile.data,
          destination: tileOut.data,
          width: tile.width,
          height: tile.height,
        });
      }

      blitTile({
        destination: destinationImage,
        tile: tileOut,
        tx,
        ty,
        tw,
        th,
        halo,
      });
    }
  }
  return destinationImage;
}
