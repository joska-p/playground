function drawImageOnCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, image.width, image.height);
}

export { drawImageOnCanvas };
