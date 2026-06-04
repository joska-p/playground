if (typeof globalThis.ImageData === 'undefined') {
  globalThis.ImageData = class ImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(
      dataOrWidth: Uint8ClampedArray | number,
      widthOrHeight?: number
    ) {
      if (typeof dataOrWidth === 'number') {
        this.width = dataOrWidth;
        this.height = widthOrHeight ?? dataOrWidth;
        this.data = new Uint8ClampedArray(this.width * this.height * 4);
      } else {
        this.data = new Uint8ClampedArray(dataOrWidth);
        this.width = widthOrHeight!;
        this.height = this.data.length / this.width / 4;
      }
    }
  } as unknown as typeof ImageData;
}
