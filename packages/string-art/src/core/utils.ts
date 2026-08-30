export interface ImageDimensions {
    width: number;
    height: number;
    scale: number;
    offset: { x: number; y: number };
}

function calculateImageDimensions(
    imageWidth: number,
    imageHeight: number,
    canvasWidth: number,
    canvasHeight: number
): ImageDimensions {
    const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);
    const scaledWidth = imageWidth * scale;
    const scaledHeight = imageHeight * scale;

    return {
        width: scaledWidth,
        height: scaledHeight,
        scale,
        offset: {
            x: (canvasWidth - scaledWidth) / 2,
            y: (canvasHeight - scaledHeight) / 2
        }
    };
}

function drawImageToCanvas(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    dimensions: ImageDimensions
): void {
    console.log('drawing');
    ctx.drawImage(
        image,
        dimensions.offset.x,
        dimensions.offset.y,
        dimensions.width,
        dimensions.height
    );
}

export { calculateImageDimensions, drawImageToCanvas };
