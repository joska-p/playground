# @repo/image-to-particles

> An image disintegrates into thousands of particles that tumble from the top of the canvas, drift under gravity, and spring back to their origin — turning a photograph into a moment of organized collapse and recovery.
> Current Status: 🟢 Stable

This README acts as the local concept spec — focusing on the "why", the mathematical inspirations, and the design decisions. API inventory is automatically handled by TypeDoc.

---

## 🎯 Intention & Concept

`@repo/image-to-particles` is a React component that converts any uploaded image into a physics-driven particle system. Each visible pixel becomes an independent particle with its own color, size, and velocity. On load, particles scatter above the canvas, fall under gravity with staggered timing, and upon reaching their target row, spring back to their original position with damped harmonic oscillation.

The experience explores the tension between destruction and restoration. Rather than falling simultaneously, each pixel starts with a random staggered delay (`currentDelay += random * 5`), creating a wave-like collapse. When particles land, a spring force (`RETURN_FORCE = 0.05`) and velocity damping (`DAMPING = 0.95`) cause a subtle, organic wobble as they settle into their precise origin coordinates.

To handle high-resolution imagery smoothly, the system enforces a `MAX_PARTICLES` cap (5,000). When an image exceeds this bound, an adaptive sampling rate (`ceil(sqrt(visiblePixels / MAX_PARTICLES))`) selects every Nth pixel. Additionally, each particle carries a slight color variation (±10 per RGB channel) to give the reassembled image a living, grainy texture rather than a sterile digital reproduction.

## 🥷 Brainstorming, Inspirations & Credits

- **Visual Inspo:** Pixel dispersion effects, digital disintegration art, and particle rain simulations.
- **Math / Papers:** Hooke's Law for spring restitution forces and Euler integration for gravity and velocity updates.
- **Borrowed Code & Algorithms:** Adaptive grid pixel sampling and staggered delay wave animations.

## ⚠️ Patterns & Gotchas

- **Accidental Aesthetics (Spring Wobble):** The overshoot and wobble during particle landing were originally unintended physics overcorrections, but they became the defining kinetic signature of the animation.
- **Axis-Specific Landing Rules:** The x-axis uses damped spring physics with a `POSITION_THRESHOLD` of 0.5 pixels for smooth settling, while the y-axis transition from `falling` to `landed` is strictly clamped at `originY` to suppress vertical oscillation.
- **Performance Bounding:** Raw image resolution is automatically downsampled via adaptive pixel sampling to prevent frame drops, keeping particle counts safely bounded at or below `MAX_PARTICLES`.

## 📚 References

- [Frank's Laboratory](https://www.youtube.com/@Frankslaboratory)

---

_Part of the [Creative Playground](https://joska-p.github.io/playground). Technical API reference generated at `/docs/api/image-to-particles/`._
