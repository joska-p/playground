export type PixelTransform = (input: ImageData) => ImageData;

export function processImage(input: ImageData, transforms: readonly PixelTransform[]): ImageData {
    return transforms.reduce((acc, transform) => transform(acc), input);
}
