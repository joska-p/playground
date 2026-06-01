export class BufferManager {
  private bufs: [Uint8ClampedArray, Uint8ClampedArray];
  private ptr: 0 | 1 = 0;
  private w: number;
  private h: number;

  constructor(source: ImageData) {
    this.bufs = [new Uint8ClampedArray(source.data), new Uint8ClampedArray(source.data.length)];
    this.w = source.width;
    this.h = source.height;
  }

  get current() { return this.bufs[this.ptr]; }
  get other() { return this.bufs[1 - this.ptr]; }
  get width() { return this.w; }
  get height() { return this.h; }

  swap() { this.ptr = this.ptr === 0 ? 1 : 0; }

  snapshot() {
    const out = new ImageData(this.w, this.h);
    out.data.set(this.current);
    return out;
  }

  replaceWith(img: ImageData) {
    this.bufs[this.ptr] = new Uint8ClampedArray(img.data);
    this.bufs[1 - this.ptr] = new Uint8ClampedArray(img.width * img.height * 4);
    this.w = img.width;
    this.h = img.height;
  }
}
