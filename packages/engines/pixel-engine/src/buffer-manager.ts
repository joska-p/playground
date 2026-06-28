export class BufferManager {
  private buffers: [Uint8ClampedArray, Uint8ClampedArray];
  private pointer: 0 | 1 = 0;
  private imageWidth: number;
  private imageHeight: number;

  constructor(source: ImageData) {
    this.buffers = [new Uint8ClampedArray(source.data), new Uint8ClampedArray(source.data.length)];
    this.imageWidth = source.width;
    this.imageHeight = source.height;
  }

  get current() {
    return this.buffers[this.pointer];
  }

  get other() {
    return this.buffers[1 - this.pointer];
  }

  get width() {
    return this.imageWidth;
  }

  get height() {
    return this.imageHeight;
  }

  swap() {
    this.pointer = this.pointer === 0 ? 1 : 0;
  }

  snapshot() {
    const imageData = new ImageData(this.imageWidth, this.imageHeight);
    imageData.data.set(this.current);
    return imageData;
  }

  replaceWith(imageData: ImageData) {
    this.buffers[this.pointer] = new Uint8ClampedArray(imageData.data);
    this.buffers[1 - this.pointer] = new Uint8ClampedArray(imageData.width * imageData.height * 4);
    this.imageWidth = imageData.width;
    this.imageHeight = imageData.height;
  }
}
