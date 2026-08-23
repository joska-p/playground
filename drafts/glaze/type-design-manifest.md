# Graphics Library Architecture & Type Design Manifest

## 1. Push Dishonesty to the Edges (_Impure at the Edges_)

Keep your core graphics algorithms **100% honest**:

- **Honest Functions:** Take all dependencies as parameters (`dt`, `input`, `randomSeed`, `dimensions`). They do not touch global state, read `window`/DOM, or call `Math.random()`. Given the same inputs, they return the exact same outputs.
- **Dishonest Edges:** The application shell (lifecycle runner, DOM listeners, `requestAnimationFrame`, WebGL/Canvas context calls) sits at the top level. It gathers environment data, invokes honest core functions, and executes side effects.

### ❌ Dishonest (Impure) Logic Mixed Inside Core

```typescript
class Particle {
    position = { x: 0, y: 0 };

    // Dishonest: Reads global time, calls Math.random(), mutates self directly
    update() {
        const dt = performance.now() / 1000; // ⚠️ Hidden external state
        this.position.x += Math.random() * 10 * dt; // ⚠️ Hidden side-effect
    }
}
```

### ✅ Honest Core + Impure Shell

```typescript
// 1. Immutable State & Pure Data Types
interface Vec2 {
    readonly x: number;
    readonly y: number;
}

interface ParticleState {
    readonly position: Vec2;
    readonly velocity: Vec2;
}

// 2. Honest Pure Function (Library Level)
function updateParticle(
    particle: ParticleState,
    dt: number,
    randomSeed: number // Seed injected explicitly
): ParticleState {
    const noise = (randomSeed - 0.5) * 10;
    return {
        position: {
            x: particle.position.x + (particle.velocity.x + noise) * dt,
            y: particle.position.y + particle.velocity.y * dt
        },
        velocity: particle.velocity
    };
}

// 3. Dishonest Shell / Lifecycle Engine (Application Level)
class GraphicsEngine {
    private state: ParticleState = { position: { x: 0, y: 0 }, velocity: { x: 1, y: 0 } };
    private lastTime = performance.now();

    start() {
        const frame = (now: number) => {
            const dt = (now - this.lastTime) / 1000;
            this.lastTime = now;

            // Inject dishonesty (time & random numbers) at the top boundary
            const seed = Math.random();
            this.state = updateParticle(this.state, dt, seed);

            requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    }
}
```

---

## 2. Invariants by Construction (Branded Types & Proof Tokens)

Eliminate runtime checks (`if (!vector)`, `if (len === 0)`, `if (!isBound)`) by forcing your TypeScript compiler to enforce mathematical and lifecycle guarantees.

### A. Branded Types for Mathematical Invariants

Use **Branded Types** (Nominal Typing) to ensure vectors are guaranteed to be normalized at compile-time.

```typescript
// Define a Branded Type for Normalized Vectors
type Brand<T, B extends string> = T & { readonly __brand: B };
type NormalizedVec2 = Brand<Vec2, 'NormalizedVec2'>;

// Constructor/Factory function: The ONLY place where normalization validation happens
function toNormalizedVec2(v: Vec2): NormalizedVec2 {
    const len = Math.hypot(v.x, v.y);
    if (len === 0) {
        throw new Error('Cannot normalize a zero-length vector.');
    }
    return { x: v.x / len, y: v.y / len } as NormalizedVec2;
}

// Function signature REQUIRES a guaranteed normalized vector
function calculateReflection(velocity: Vec2, surfaceNormal: NormalizedVec2): Vec2 {
    // No need for: if (surfaceNormal.length() !== 1) throw ...
    // The type system guarantees surfaceNormal is normalized!
    const dot = velocity.x * surfaceNormal.x + velocity.y * surfaceNormal.y;
    return {
        x: velocity.x - 2 * dot * surfaceNormal.x,
        y: velocity.y - 2 * dot * surfaceNormal.y
    };
}

// Usage:
const rawVector = { x: 10, y: 5 };
// calculateReflection(rawVector, rawVector); // ❌ Compile Error: Vec2 is not assignable to NormalizedVec2

const normal = toNormalizedVec2(rawVector); // Validated once
const reflection = calculateReflection(rawVector, normal); // ✅ Compiles cleanly
```

### B. Proof Tokens for Rendering Lifecycle Guarantees

Use **Proof Tokens** to make sure rendering commands can **never** be executed outside an active frame pass or an initialized context.

```typescript
// Proof Token: Represents proof that a render frame is active
class ActiveFrameToken {
    // Private constructor prevents arbitrary instantiation
    private constructor(
        public readonly timestamp: number,
        public readonly dt: number
    ) {}

    static createInternal(timestamp: number, dt: number): ActiveFrameToken {
        return new ActiveFrameToken(timestamp, dt);
    }
}

// Canvas Component / Renderer
class Canvas2DRenderer {
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        if (!context) throw new Error('2D Context not supported');
        this.ctx = context;
    }

    // Draw calls demand the ActiveFrameToken as proof of lifecycle execution
    drawCircle(token: ActiveFrameToken, center: Vec2, radius: number, color: string): void {
        // Guaranteed to be executing inside a valid active frame
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// App Loop issuing tokens
class AppRunner {
    private renderer: Canvas2DRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this.renderer = new Canvas2DRenderer(canvas);
    }

    renderFrame(time: number, dt: number) {
        // 1. Create the proof token at the lifecycle boundary
        const frameToken = ActiveFrameToken.createInternal(time, dt);

        // 2. Pass token to render calls
        this.renderer.drawCircle(frameToken, { x: 100, y: 100 }, 20, 'red');
    }
}
```

---

## 3. Single Level of Abstraction Principle (SLAP)

Every function body must operate strictly at **one abstraction level**. Never mix low-level array manipulation or Canvas API calls inside high-level scene management.

### ❌ Mixed Abstraction Levels

```typescript
class Scene {
    entities: Array<{ pos: Vec2; color: string }> = [];
    ctx!: CanvasRenderingContext2D;

    // Mixes scene management, array loops, string lowercasing, and canvas drawing!
    renderFilteredEntities(filterName: string) {
        const lowerFilter = filterName.toLowerCase(); // Low-level string op

        for (let i = 0; i < this.entities.length; i++) {
            // Raw loop
            if (lowerFilter === 'red' && this.entities[i].color === '#ff0000') {
                this.ctx.beginPath(); // Low-level canvas API
                this.ctx.arc(this.entities[i].pos.x, this.entities[i].pos.y, 10, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}
```

### ✅ Stacked Abstraction Layers

```typescript
// Low-Level Abstraction: Reusable Canvas primitive
function drawCirclePrimitive(
    ctx: CanvasRenderingContext2D,
    pos: Vec2,
    radius: number,
    color: string
): void {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Mid-Level Abstraction: Pure entity filtering
function filterEntitiesByColor<T extends { color: string }>(
    entities: readonly T[],
    targetColor: string
): T[] {
    return entities.filter((e) => e.color.toLowerCase() === targetColor.toLowerCase());
}

// High-Level Abstraction: Clean orchestration staying at one abstraction level
class ParticleSceneComponent {
    private entities: ParticleState[] = [];

    renderPass(
        token: ActiveFrameToken,
        renderer: Canvas2DRenderer,
        activeColorFilter: string
    ): void {
        const visibleEntities = filterEntitiesByColor(this.entities, activeColorFilter);

        for (const entity of visibleEntities) {
            renderer.drawCircle(token, entity.position, 10, activeColorFilter);
        }
    }
}
```

---

## Quick Reference Checklist

1. **Are my math functions honest?** If a function calculates physics, transformations, or geometry, ensure it takes all parameters explicitly and returns new data without modifying global state.
2. **Can invalid states compile?** Replace bare numbers/vectors with `Branded Types` (`NormalizedVec2`, `PositiveNumber`, `RadianAngle`).
3. **Can functions be called out of order?** Require a `ProofToken` (e.g. `ActiveFrameToken`, `BoundTextureToken`) in function signatures to prove preconditions were met.
4. **Is a function doing too much?** If you see raw nested loops or mixed DOM/Canvas API calls inside logic functions, break them into single-level helper functions.
