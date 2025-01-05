import { Button, buttonVariants } from "@components/ui/button";
import { StrictMode, useCallback, useEffect, useRef, useState } from "react";

export interface Particle {
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
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MAX_PARTICLES = 5000;

const GRAVITY = 0.5;

const INITIAL_VELOCITY = {
  MIN_X: -0.5,
  MAX_X: 0.5,
  MIN_Y: 0,
  MAX_Y: 2,
};

const PARTICLE_SIZE = {
  MIN: 1.5,
  MAX: 2.5,
};

const RETURN_FORCE = 0.05;
const DAMPING = 0.95;
const POSITION_THRESHOLD = 0.5;

interface ImageDimensions {
  width: number;
  height: number;
  scale: number;
  offset: { x: number; y: number };
}

const calculateImageDimensions = (imageWidth: number, imageHeight: number): ImageDimensions => {
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

const drawImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  dimensions: ImageDimensions
): void => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(image, dimensions.offset.x, dimensions.offset.y, dimensions.width, dimensions.height);
};

const ImageToParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const initParticles = (imageData: ImageData) => {
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
            INITIAL_VELOCITY.MIN_X + Math.random() * (INITIAL_VELOCITY.MAX_X - INITIAL_VELOCITY.MIN_X);
          const randomVelocityY =
            INITIAL_VELOCITY.MIN_Y + Math.random() * (INITIAL_VELOCITY.MAX_Y - INITIAL_VELOCITY.MIN_Y);
          const randomSize = PARTICLE_SIZE.MIN + Math.random() * (PARTICLE_SIZE.MAX - PARTICLE_SIZE.MIN);

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

  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const time = performance.now();

    particles.current.forEach((particle) => {
      if (particle.state === "waiting" && time > particle.delay) {
        particle.state = "falling";
      }

      if (particle.state === "falling" || particle.state === "landed") {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.state === "falling") {
          // Apply gravity and initial velocity
          particle.velocity.y += GRAVITY;
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;

          // Check if landed
          if (particle.y >= particle.originY) {
            particle.state = "landed";
            particle.y = particle.originY;
          }
        } else if (particle.state === "landed") {
          // Return to final position
          const dx = particle.originX - particle.x;
          const distance = Math.abs(dx);

          if (distance > POSITION_THRESHOLD) {
            particle.velocity.x += dx * RETURN_FORCE;
            particle.velocity.x *= DAMPING;
            particle.x += particle.velocity.x;
          } else {
            // Snap to final position
            particle.x = particle.originX;
            particle.velocity.x = 0;
          }
        }
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Add reset function
  const resetParticles = useCallback(() => {
    if (!particles.current) return;

    let currentDelay = 0;
    particles.current = particles.current.map((particle) => ({
      ...particle,
      x: particle.originX,
      y: -10,
      velocity: {
        x: INITIAL_VELOCITY.MIN_X + Math.random() * (INITIAL_VELOCITY.MAX_X - INITIAL_VELOCITY.MIN_X),
        y: INITIAL_VELOCITY.MIN_Y + Math.random() * (INITIAL_VELOCITY.MAX_Y - INITIAL_VELOCITY.MIN_Y),
      },
      state: "waiting",
      delay: (currentDelay += Math.random() * 5),
    }));
  }, []);

  useEffect(() => {
    if (!imageFile || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }

    const image = new Image();
    image.src = imageFile;

    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    image.onload = () => {
      try {
        // Setup canvas
        canvasRef.current!.width = CANVAS_WIDTH;
        canvasRef.current!.height = CANVAS_HEIGHT;

        // Process image
        const dimensions = calculateImageDimensions(image.width, image.height);
        drawImageToCanvas(ctx, image, dimensions);

        // Initialize particles
        const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        particles.current = initParticles(imageData);

        // Start animation
        cleanup();
        animate();
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    image.onerror = (error) => {
      console.error("Error loading image:", error);
    };

    return cleanup;
  }, [animate, imageFile]);

  return (
    <div className="mx-auto my-8 flex w-fit flex-col items-center gap-8">
      <input type="file" accept="image/*" onChange={handleImageUpload} className={buttonVariants()} />
      <Button
        onClick={resetParticles}
        style={{
          margin: "10px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Replay Animation
      </Button>
      <canvas ref={canvasRef} className="bg-black" />
    </div>
  );
};

const StrictModeImageToParticles = () => {
  return (
    <StrictMode>
      <ImageToParticles />
    </StrictMode>
  );
};

export { ImageToParticles, StrictModeImageToParticles };
