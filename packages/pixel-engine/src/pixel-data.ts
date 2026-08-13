/** Framework-agnostic container holding RGBA pixel bytes and dimensions. */
export class PixelData {
    /** The raw RGBA byte buffer. */
    readonly data: Uint8ClampedArray;
    /** Width in pixels. */
    readonly width: number;
    /** Height in pixels. */
    readonly height: number;

    /**
     * Create a new PixelData container.
     *
     * @param width - Width of the image.
     * @param height - Height of the image.
     * @param data - Optional existing Uint8ClampedArray RGBA data buffer.
     */
    constructor(width: number, height: number, data?: Uint8ClampedArray) {
        this.width = width;
        this.height = height;
        this.data = data ?? new Uint8ClampedArray(width * height * 4);
    }
}
