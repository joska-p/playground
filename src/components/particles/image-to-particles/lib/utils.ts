import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_VELOCITY,
  MAX_PARTICLES,
  PARTICLE_SIZE,
} from "../config";

export type ImageDimensions = {
  width: number;
  height: number;
  scale: number;
  offset: { x: number; y: number };
};

export type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  velocity: {
    x: number;
    y: number;
  };
  state: "waiting" | "falling" | "landed";
  delay: number;
};

export const calculateImageDimensions = (
  imageWidth: number,
  imageHeight: number
): ImageDimensions => {
  const scale = Math.min(CANVAS_WIDTH / imageWidth, CANVAS_HEIGHT / imageHeight);
  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;

  return {
    width: scaledWidth,
    height: scaledHeight,
    scale,
    offset: {
      x: (CANVAS_WIDTH - scaledWidth) / 2,
      y: (CANVAS_HEIGHT - scaledHeight) / 2,
    },
  };
};

export const drawImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  dimensions: ImageDimensions
): void => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(
    image,
    dimensions.offset.x,
    dimensions.offset.y,
    dimensions.width,
    dimensions.height
  );
};

export const initParticles = (imageData: ImageData) => {
  const particles: Particle[] = [];
  let currentDelay = 0;

  // Count visible pixels first
  let visiblePixels = 0;
  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] > 128) visiblePixels++;
  }

  // Adjust sampling rate based on visible pixels
  const samplingRate = Math.ceil(Math.sqrt(visiblePixels / MAX_PARTICLES));

  for (let y = 0; y < imageData.height; y += samplingRate) {
    for (let x = 0; x < imageData.width; x += samplingRate) {
      const i = (y * imageData.width + x) * 4;
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const a = imageData.data[i + 3];

      if (a > 128) {
        const randomVelocityX =
          INITIAL_VELOCITY.MIN_X +
          Math.random() * (INITIAL_VELOCITY.MAX_X - INITIAL_VELOCITY.MIN_X);
        const randomVelocityY =
          INITIAL_VELOCITY.MIN_Y +
          Math.random() * (INITIAL_VELOCITY.MAX_Y - INITIAL_VELOCITY.MIN_Y);
        const randomSize =
          PARTICLE_SIZE.MIN + Math.random() * (PARTICLE_SIZE.MAX - PARTICLE_SIZE.MIN);

        // Add slight color variation
        const colorVariation = Math.random() * 20 - 10;
        const adjustedR = Math.min(255, Math.max(0, r + colorVariation));
        const adjustedG = Math.min(255, Math.max(0, g + colorVariation));
        const adjustedB = Math.min(255, Math.max(0, b + colorVariation));

        particles.push({
          x: x,
          y: -10, // Start above canvas
          originX: x,
          originY: y,
          color: `rgba(${adjustedR},${adjustedG},${adjustedB},${a})`,
          size: randomSize,
          velocity: {
            x: randomVelocityX,
            y: randomVelocityY,
          },
          state: "waiting",
          delay: currentDelay,
        });
        currentDelay += Math.random() * 5; // Random delay between particles
      }
    }
  }
  return particles;
};
