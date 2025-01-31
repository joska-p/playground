import { Button, Input } from "@jpotin/playground-ui";
import { StrictMode, useCallback, useEffect, useRef } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DAMPING,
  GRAVITY,
  INITIAL_VELOCITY,
  POSITION_THRESHOLD,
  RETURN_FORCE,
} from "./config";
import { calculateImageDimensions, drawImageToCanvas, initParticles } from "./lib/utils";
import { useImageUpload } from "./use-image-upload";

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

const ImageToParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number>(null);
  const [imageFile, handleImageUpload] = useImageUpload();

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
        x:
          INITIAL_VELOCITY.MIN_X +
          Math.random() * (INITIAL_VELOCITY.MAX_X - INITIAL_VELOCITY.MIN_X),
        y:
          INITIAL_VELOCITY.MIN_Y +
          Math.random() * (INITIAL_VELOCITY.MAX_Y - INITIAL_VELOCITY.MIN_Y),
      },
      state: "waiting",
      delay: (currentDelay += Math.random() * 5),
    }));
  }, []);

  useEffect(() => {
    if (!imageFile || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
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
        if (!canvasRef.current) return;
        canvasRef.current.width = CANVAS_WIDTH;
        canvasRef.current.height = CANVAS_HEIGHT;

        // Process image
        const dimensions = calculateImageDimensions(image.width, image.height);
        drawImageToCanvas(ctx, image, dimensions);

        // Initialize particles
        const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        particles.current = initParticles(imageData);

        // Start animation
        //cleanup();
        //animate();
      } catch (error) {
        if (error instanceof Error) throw new Error("Error processing image", error);
        throw error;
      }
    };

    image.onerror = (error) => {
      if (error instanceof Error) throw new Error("Error loading image", error);
      throw error;
    };

    return cleanup;
  }, [animate, imageFile]);

  return (
    <div className="mx-auto my-8 flex w-fit flex-col items-center gap-8">
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
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
