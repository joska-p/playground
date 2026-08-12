import { PixelData } from './pixel-data';

/**
 * Double-buffered pixel array manager for ping-ponging image transforms.
 */
export class BufferManager {
    private buffers: [Uint8ClampedArray, Uint8ClampedArray];
    private pointer: 0 | 1 = 0;
    private imageWidth: number;
    private imageHeight: number;

    /**
     * @param source - Initial source pixel data.
     */
    constructor(source: PixelData) {
        this.buffers = [
            new Uint8ClampedArray(source.data),
            new Uint8ClampedArray(source.data.length)
        ];
        this.imageWidth = source.width;
        this.imageHeight = source.height;
    }

    /** Gets the active current buffer. */
    get current() {
        return this.buffers[this.pointer];
    }

    /** Gets the secondary target buffer. */
    get other() {
        return this.buffers[1 - this.pointer];
    }

    /** Width of the managed image. */
    get width() {
        return this.imageWidth;
    }

    /** Height of the managed image. */
    get height() {
        return this.imageHeight;
    }

    /** Swaps current and target buffers. */
    swap() {
        this.pointer = this.pointer === 0 ? 1 : 0;
    }

    /** Creates a copy snapshot of the current buffer as PixelData. */
    snapshot() {
        const pixelData = new PixelData(this.imageWidth, this.imageHeight);
        pixelData.data.set(this.current);
        return pixelData;
    }

    /** Replaces current state with new PixelData, resizing buffers if necessary. */
    replaceWith(pixelData: PixelData) {
        this.buffers[this.pointer] = new Uint8ClampedArray(pixelData.data);
        this.buffers[1 - this.pointer] = new Uint8ClampedArray(
            pixelData.width * pixelData.height * 4
        );
        this.imageWidth = pixelData.width;
        this.imageHeight = pixelData.height;
    }
}

