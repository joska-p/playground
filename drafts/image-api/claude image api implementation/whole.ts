import { registerManipulation } from '../index'
import type { WholeImageFn } from '../types'

const wholeFn = (fn: WholeImageFn) => fn

// ─── Histogram Equalization ──────────────────────────────────────────────────
registerManipulation({
  id: 'histogram-equalize',
  type: 'whole',
  fn: wholeFn((imageData) => {
    const data = imageData.data
    const n = imageData.width * imageData.height
    const hist = new Uint32Array(256)
    for (let i = 0; i < n; i++) {
      const l = Math.round((data[i * 4] ?? 0) * 0.2126 + (data[i * 4 + 1] ?? 0) * 0.7152 + (data[i * 4 + 2] ?? 0) * 0.0722)
      hist[l] = (hist[l] ?? 0) + 1
    }
    const cdf = new Uint32Array(256)
    cdf[0] = hist[0] ?? 0
    for (let i = 1; i < 256; i++) cdf[i] = (cdf[i - 1] ?? 0) + (hist[i] ?? 0)
    let cdfMin = 0
    for (let i = 0; i < 256; i++) { if ((cdf[i] ?? 0) > 0) { cdfMin = cdf[i] ?? 0; break } }
    const lut = new Uint8ClampedArray(256)
    for (let i = 0; i < 256; i++) lut[i] = Math.round(((( cdf[i] ?? 0) - cdfMin) / (n - cdfMin)) * 255)
    const out = new ImageData(imageData.width, imageData.height)
    for (let i = 0; i < n; i++) {
      const off = i * 4
      const r = data[off] ?? 0, g = data[off + 1] ?? 0, b = data[off + 2] ?? 0
      const l = Math.round(r * 0.2126 + g * 0.7152 + b * 0.0722)
      const scale = l > 0 ? (lut[l] ?? 0) / l : 1
      out.data[off] = Math.min(255, Math.round(r * scale))
      out.data[off + 1] = Math.min(255, Math.round(g * scale))
      out.data[off + 2] = Math.min(255, Math.round(b * scale))
      out.data[off + 3] = data[off + 3] ?? 255
    }
    return out
  }),
})

// ─── Flip horizontal ──────────────────────────────────────────────────────────
registerManipulation({
  id: 'flip-horizontal',
  type: 'whole',
  fn: wholeFn((imageData) => {
    const { width, height, data } = imageData
    const out = new ImageData(width, height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const src = (y * width + x) * 4
        const dst = (y * width + (width - 1 - x)) * 4
        out.data[dst] = data[src] ?? 0
        out.data[dst + 1] = data[src + 1] ?? 0
        out.data[dst + 2] = data[src + 2] ?? 0
        out.data[dst + 3] = data[src + 3] ?? 255
      }
    }
    return out
  }),
})

// ─── Flip vertical ────────────────────────────────────────────────────────────
registerManipulation({
  id: 'flip-vertical',
  type: 'whole',
  fn: wholeFn((imageData) => {
    const { width, height, data } = imageData
    const out = new ImageData(width, height)
    for (let y = 0; y < height; y++) {
      out.data.set(data.subarray(y * width * 4, (y + 1) * width * 4), (height - 1 - y) * width * 4)
    }
    return out
  }),
})

// ─── Rotate 90 CW ────────────────────────────────────────────────────────────
registerManipulation({
  id: 'rotate-90cw',
  type: 'whole',
  fn: wholeFn((imageData) => {
    const { width, height, data } = imageData
    const out = new ImageData(height, width)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const src = (y * width + x) * 4
        const dst = (x * height + (height - 1 - y)) * 4
        out.data[dst] = data[src] ?? 0
        out.data[dst + 1] = data[src + 1] ?? 0
        out.data[dst + 2] = data[src + 2] ?? 0
        out.data[dst + 3] = data[src + 3] ?? 255
      }
    }
    return out
  }),
})
