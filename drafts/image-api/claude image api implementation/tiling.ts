import { ManipulationDefinition, NeighborhoodFn } from './types'

const TILE_SIZE = 512 // pixels per tile edge

/** Split an ImageData into tiles with optional halo padding for neighborhood ops. */
interface Tile {
  x: number       // destination x (no halo)
  y: number       // destination y (no halo)
  width: number   // destination width (no halo)
  height: number  // destination height (no halo)
  data: ImageData // tile data (may include halo)
  halo: number
}

function extractTile(
  src: ImageData,
  tx: number,
  ty: number,
  tw: number,
  th: number,
  halo: number
): ImageData {
  const padX = Math.max(0, tx - halo)
  const padY = Math.max(0, ty - halo)
  const padX2 = Math.min(src.width, tx + tw + halo)
  const padY2 = Math.min(src.height, ty + th + halo)

  const padW = padX2 - padX
  const padH = padY2 - padY

  const tile = new ImageData(padW, padH)
  const srcData = src.data

  for (let row = 0; row < padH; row++) {
    const srcRow = padY + row
    const srcOff = (srcRow * src.width + padX) * 4
    const dstOff = row * padW * 4
    tile.data.set(srcData.subarray(srcOff, srcOff + padW * 4), dstOff)
  }

  return tile
}

function blitTile(
  dest: ImageData,
  tile: ImageData,
  tx: number,
  ty: number,
  tw: number,
  th: number,
  halo: number
): void {
  const offX = tx - Math.max(0, tx - halo) // offset into tile where real data starts
  const offY = ty - Math.max(0, ty - halo)

  for (let row = 0; row < th; row++) {
    const tileOff = ((offY + row) * tile.width + offX) * 4
    const destOff = ((ty + row) * dest.width + tx) * 4
    dest.data.set(tile.data.subarray(tileOff, tileOff + tw * 4), destOff)
  }
}

/** Run a neighborhood manipulation on a large image by tiling. */
export function runNeighborhoodTiled(
  src: ImageData,
  def: ManipulationDefinition,
  opts: Record<string, unknown>
): ImageData {
  const halo = def.radius ?? 1
  const destImage = new ImageData(src.width, src.height)

  const cols = Math.ceil(src.width / TILE_SIZE)
  const rows = Math.ceil(src.height / TILE_SIZE)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tx = col * TILE_SIZE
      const ty = row * TILE_SIZE
      const tw = Math.min(TILE_SIZE, src.width - tx)
      const th = Math.min(TILE_SIZE, src.height - ty)

      const tile = extractTile(src, tx, ty, tw, th, halo)
      const tileOut = new ImageData(tile.width, tile.height)

      ;(def.fn as NeighborhoodFn)(tile.data, tileOut.data, tile.width, tile.height, opts)

      blitTile(destImage, tileOut, tx, ty, tw, th, halo)
    }
  }

  return destImage
}
