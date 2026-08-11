import { encode } from 'fast-png';
import { renderTreesToBuffer } from './render/cpu-renderer';
import type { ExpressionNode } from './types';

/**
 * Renders the three channel trees to an encoded PNG (`Uint8Array`), ready for
 * disk or for wrapping in a `Blob`.
 * @param treeR - Expression tree for the red channel.
 * @param treeG - Expression tree for the green channel.
 * @param treeB - Expression tree for the blue channel.
 * @param size - Output size in pixels; the image is `size × size`.
 * @param time - Time value passed to the trees (default 0).
 * @returns The encoded PNG bytes.
 */
export function renderTreesToPngBuffer(
    treeR: ExpressionNode,
    treeG: ExpressionNode,
    treeB: ExpressionNode,
    size: number,
    time = 0
): Uint8Array {
    const buffer = renderTreesToBuffer(treeR, treeG, treeB, size, time);
    const encoded = encode({
        width: size,
        height: size,
        data: buffer,
        channels: 4,
        depth: 8
    });
    return new Uint8Array(encoded);
}

/**
 * Renders the three channel trees to a `Blob` of MIME type `image/png`, ready
 * for display or download.
 * @param treeR - Expression tree for the red channel.
 * @param treeG - Expression tree for the green channel.
 * @param treeB - Expression tree for the blue channel.
 * @param size - Output size in pixels; the image is `size × size`.
 * @param time - Time value passed to the trees (default 0).
 * @returns The PNG `Blob`.
 */
export function renderTreesToPngBlob(
    treeR: ExpressionNode,
    treeG: ExpressionNode,
    treeB: ExpressionNode,
    size: number,
    time = 0
): Blob {
    const pngBuffer = renderTreesToPngBuffer(treeR, treeG, treeB, size, time);
    return new Blob([new Uint8Array(pngBuffer)], { type: 'image/png' });
}
