class ImageDataPolyfill {
  readonly width: number;
  readonly height: number;
  readonly data: Uint8ClampedArray;

  constructor(widthOrData: number | Uint8ClampedArray, width: number, height?: number) {
    if (typeof widthOrData === "number") {
      this.width = widthOrData;
      this.height = width;
      this.data = new Uint8ClampedArray(widthOrData * width * 4);
    } else {
      this.width = width;
      this.height = height!;
      this.data = new Uint8ClampedArray(widthOrData);
    }
  }
}

if (typeof ImageData === "undefined") {
  const ImageDataCtor = ImageDataPolyfill as typeof ImageData;
  (globalThis as unknown as { ImageData: typeof ImageData }).ImageData = ImageDataCtor;
}

export {};
