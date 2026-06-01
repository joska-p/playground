import type { ManipulationDefinition, NeighborhoodFn } from "./image-pipeline.types";

const TILE_SIZE = 512; // pixels per tile edge

function extractTile(src: ImageData, tx: number, ty: number, tw: number, th: number, halo: number) {
  const padX = Math.max(0, tx - halo);
  const padY = Math.max(0, ty - halo);
  const padX2 = Math.min(src.width, tx + tw + halo);
  const padY2 = Math.min(src.height, ty + th + halo);

  const padW = padX2 - padX;
  const padH = padY2 - padY;

  const tile = new ImageData(padW, padH);
  for (let row = 0; row < padH; row++) {
    const srcOff = ((padY + row) * src.width + padX) * 4;
    tile.data.set(src.data.subarray(srcOff, srcOff + padW * 4), row * padW * 4);
  }
  return tile;
}

function blitTile(dest: ImageData, tile: ImageData, tx: number, ty: number, tw: number, th: number, halo: number) {
  const offX = tx - Math.max(0, tx - halo);
  const offY = ty - Math.max(0, ty - halo);

  for (let row = 0; row < th; row++) {
    const tileOff = ((offY + row) * tile.width + offX) * 4;
    const destOff = ((ty + row) * dest.width + tx) * 4;
    dest.data.set(tile.data.subarray(tileOff, tileOff + tw * 4), destOff);
  }
}

export function runNeighborhoodTiled(src: ImageData, def: ManipulationDefinition, options: Record<string, unknown>) {
  const halo = def.radius ?? 1;
  const destImage = new ImageData(src.width, src.height);
  const fn = def.fn as NeighborhoodFn;

  const cols = Math.ceil(src.width / TILE_SIZE);
  const rows = Math.ceil(src.height / TILE_SIZE);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tx = col * TILE_SIZE, ty = row * TILE_SIZE;
      const tw = Math.min(TILE_SIZE, src.width - tx), th = Math.min(TILE_SIZE, src.height - ty);

      const tile = extractTile(src, tx, ty, tw, th, halo);
      const tileOut = new ImageData(tile.width, tile.height);

      fn(tile.data, tileOut.data, tile.width, tile.height, options);
      blitTile(destImage, tileOut, tx, ty, tw, th, halo);
    }
  }
  return destImage;
}
