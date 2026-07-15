/**
 * Minimal, dependency-free PNG encoder.
 *
 * We only need to write true-color (RGB) images, so this implements just the
 * subset of the PNG spec required for that: signature, IHDR, a single IDAT
 * chunk holding zlib-deflated scanlines (each prefixed with filter byte 0), and
 * IEND. Compression is provided by Node's built-in `zlib`, so no third-party
 * dependency is needed.
 */

import { deflateSync } from 'node:zlib';

/** Precomputed CRC-32 lookup table (used by PNG chunk checksums). */
const CRC_TABLE: number[] = (() => {
  const table = new Array<number>(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buf.values()) {
    const idx = (crc ^ byte) & 0xff;
    crc = CRC_TABLE[idx]! ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/** Build a single PNG chunk: length + type + data + CRC. */
function chunk(type: string, data: Buffer): Buffer {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Encode an RGB pixel buffer into a PNG.
 *
 * @param rgb   Raw pixel data, length must be `width * height * 3` (R,G,B).
 * @param width Image width in pixels.
 * @param height Image height in pixels.
 * @returns Encoded PNG as a Buffer.
 */
export function encodePNG(rgb: Uint8Array, width: number, height: number): Buffer {
  const expected = width * height * 3;
  if (rgb.length !== expected) {
    throw new Error(`Pixel buffer size ${rgb.length} does not match expected ${expected}.`);
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(2, 9); // color type 2 = truecolor RGB
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  // Add the mandatory per-scanline filter byte (0 = none).
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    const srcStart = y * stride;
    rgb.subarray(srcStart, srcStart + stride).forEach((v, i) => {
      raw[y * (stride + 1) + 1 + i] = v;
    });
  }

  const idat = deflateSync(raw);

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0))
  ]);
}
