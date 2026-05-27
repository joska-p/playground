/**
 * Reads the current pixel data from a canvas.
 */
function getImageData(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * Writes ImageData back to a canvas, resizing it to match.
 */
function putImageData(canvas: HTMLCanvasElement, imageData: ImageData): void {
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.putImageData(imageData, 0, 0);
}

/**
 * Converts an HTMLImageElement to an ImageData object via an offscreen canvas.
 * This is the entry point — go from a loaded <img> to raw pixel data.
 */
function imageElementToImageData(image: HTMLImageElement): ImageData {
  const offscreen = document.createElement("canvas");
  offscreen.width = image.width;
  offscreen.height = image.height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) throw new Error("Could not get offscreen canvas context");
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
}

export { getImageData, imageElementToImageData, putImageData };
