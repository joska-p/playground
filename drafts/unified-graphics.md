# One Graphics Lib — a thinking document

_A draft to step back and decide what we actually want, before any code._

We have two graphics libraries in this repo. They overlap. They don't really
compete. They both draw pixels on a canvas and they both make us happy in
different ways, and the fact that they feel like "the same thing twice" has
been nagging at me. This document is not a spec. It is me trying to name the
real difference between them, to see whether "one lib that does everything" is
a beautiful idea or a trap, and to figure out what the new lib would *be* if
we built it.

> **Status:** questions answered, decisions captured (see
> [6. Decisions](#6-decisions) and [10. Checklist](#10-checklist)). The open
> questions that remain are real forks I want to sit with, not defaults to
> sweep under the rug.

---

## 1. The problem statement

```
@repo/graphics     → I write a shader, it runs, I'm having fun in minutes.
@repo/pixelate2d   → I draw shapes, it works on CPU or GPU, I feel powerful.
```

Both are "a way to put things on a canvas." Both have a render loop, a camera,
coordinate transforms, a React layer. And yet when I sit down to make
something, I know which one to reach for without thinking — which means they
are *not* the same thing. The friction is that the shared scaffolding makes
them *look* like the same thing, so the difference stays invisible, unnamed,
and un-decided.

The goal of one new lib is not to "combine the two." It's to find the single
idea that both are actually instances of — and then build around *that*.

---

## 2. The two souls (what each one actually is)

### The first one: **the shader is the unit of expression**

With `@repo/graphics`, you never describe *objects*. You describe the whole
screen as a function: *given a pixel and a time, here is its color.* A
fullscreen quad, a fragment program, a handful of uniforms. That's the entire
model.

Why it's fun: **adding a uniform is a one-line act.** You want a slider to move
the blob? Add `u_offset`, wire it, done. The pipeline is clean and the gap
between *idea* and *pixels* is tiny, so you play. The cost: you have to think
like a shader author. There is no "shape," no "text," no "scene" — everything
is math on the GPU, and if you want text you're rasterizing it into a texture
yourself.

### The second one: **the draw call is the unit of expression**

With `@repo/pixelate2d`, you describe a scene the way you'd describe it to a
painter: *draw a circle here, a rectangle there, some text, a path.* The
renderer — Canvas2D or a batched WebGL2 engine — figures out the pixels. The
magic trick is that CPU and GPU are just two engines behind one interface, so
your scene is portable for free. Camera, input, and the loop are all
first-class, p5-flavored conveniences.

Why it's useful: you build *things* quickly, in world coordinates, and you
don't care how they get drawn. The cost: you're limited to the menu of built-in
primitives. The GPU driver is a fixed little renderer; there is no way to say
"and for this thing, let me write the pixel math myself."

---

## 3. Naming the real distinction

I think it's this:

|                      | `@repo/graphics`               | `@repo/pixelate2d`              |
| -------------------- | ------------------------------ | ------------------------------- |
| Asks                | *What does the screen look like?* | *What should I draw?*          |
| Answers with        | a function (GLSL)              | a list of draw calls            |
| Mode                | descriptive / functional       | imperative / constructive       |
| Backend             | GPU only (WebGL2)              | CPU + GPU (portable)            |
| The joy             | freedom of expression          | speed of construction           |
| The cost            | you become the renderer        | the renderer is fixed           |

The distinction is not "shader lib vs drawing lib." It's **describing a picture
vs instructing a painter.** One treats the canvas as an output to be computed;
the other treats it as a surface to be painted on. Those are genuinely
different relationships to the pixels — and I don't think either is "better."

This is why a naive merge fails: you can't bolt "draw calls" onto a shader
toolkit and get something coherent, any more than you can bolt "write GLSL"
onto an immediate-mode painter. You get two unrelated modes wearing one
nameplate. The shared loop, camera, and transforms make the merge *look*
natural, but those are the *scaffolding*, not the *soul*.

---

## 4. The scaffolding (what actually feels duplicated)

Everything below is "the same problem solved twice" — and it's all the *easy,
safe, boring* stuff that no one wants to redo:

- the render loop / rAF lifecycle
- canvas lifecycle: resize, DPR, context loss
- the pan/zoom camera (and the coordinate transforms under it)
- the React integration pattern (canvas in React, no re-render churn)

If we build one lib, this is the part we build **once, one way, and share**.
It's also the part that, honestly, neither library's identity depends on. Two
libs diverging here is pure waste; one lib converging here is pure win.

---

## 5. The idea that might unify them

Here's the hunch I keep circling. Both libraries are instances of the same
deeper thing:

> **A "program" that decides what a region of the screen looks like.**

- In `@repo/graphics`, you write the program by hand, in GLSL. It's a fragment
  program over the whole screen.
- In `@repo/pixelate2d`, the program is *composed* — a list of built-in
  programs (`drawCircle` is just "a program that fills this circle with this
  color"). You assemble the screen out of ready-made pieces.

So a shader is not the opposite of a draw call. **A draw call is a tiny
pre-written shader, and a shader is a draw call you wrote yourself.** The
difference is only *where the program comes from* — your fingers, or the
library's box of built-ins.

If that's true, then the new lib has a single mental model:

> The screen is made of **programs**. Some programs are yours (fragment
> shaders — the freedom). Some are built-ins (circles, rects, text, paths —
> the convenience). Everything else is shared infrastructure: one loop, one
> camera, one canvas lifecycle, one React story.

That framing turns the "merge" from bolting two modes together into *one
coherent thing with two levels of authorship*:

```
Level 1 — assemble:  pick built-in programs, give them positions, done.
Level 2 — author:    write your own program for anything the box lacks.
Level 3 — describe:  the whole screen is a program (your own fullscreen pass).
```

Same canvas, same camera, same loop, same uniform story at every level. You
start at level 1, and when you hit a wall you drop to level 2 or 3 without
changing libraries or learning a second mental model — you just get more
control.

### The pipeline branches at the top — CPU or GPU

There's a second shape underneath the "programs" idea, and answering the
questions made it visible: **the pipeline's first decision is *which engine*,
and it is a real fork, not a detail.**

- The CPU path and the GPU path are **different beasts**. Prefer duplicated,
  honest code to a forced abstraction that tries to make them the same — a
  "one API that does both" is exactly the god-interface we don't want.
- The GPU path is where the shader story, the uniform story, and the
  "screen as a function" freedom live.
- The CPU path is nearly a **separate, simple feature**: it needs the frame
  loop and the pan/zoom/mouse handling — and honestly, maybe not much else.
  Drawing in a CPU context might not even need a framework.

So the lib's real shape is less "one program model" and more **one front door
that immediately branches**:

```
        one front door (loop, canvas, coords, React)
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
     CPU branch              GPU branch
   (frame loop, pan/zoom,   (frame loop, pan/zoom,
   mouse, simple draws —    shaders, uniforms,
   maybe barely a framework) fullscreen passes)
```

The "programs" idea is the *story* that lets the two branches feel related;
the **branching** is the architecture that keeps them honest and duplication-
friendly.

---

## 6. Decisions

These are settled — not because they're obviously right, but because they were
explicitly chosen, and now the rest can hang off them.

### D1 — CPU is a choice, not a fallback

CPU/GPU is the **first branching of the pipeline**. CPU support is a first-class
feature with equal standing — it is *not* a degraded fallback mode. There are
**no god components or functions that do both**; each branch owns its
implementation. If that means duplicating code, we duplicate — a non-sensical
abstraction is worse than honest duplication.

### D2 — Two clear expression layers on one shared foundation

The "programs" idea confirms D1: assembly (draw calls) and authorship (shaders)
are two layers, and the CPU/GPU fork runs straight through them. The shared
foundation — loop, camera, canvas lifecycle, transforms, React — is built
exactly once. The layers are allowed to feel different, because they are.

### D3 — The lib's real job: kill coordinate-mapping pain

The thing that actually hurts day to day is **mapping between coordinate
spaces**: panning, zooming, the mouse position relative to the canvas, screen
vs world vs UV. That pain is the #1 enemy of "fun quickly." The measure of the
lib is: *you never think about coordinate math again.* Pan, zoom, and
mouse-relative-to-canvas must be built-in and just work, in both branches.

### D4 — The audience is one person: me

This is a personal creative-coding tool, not a product. The mental reference
points: **p5 is the drawing tool, three.js is how I used to render shaders.**
This lib is meant to be *both*, with the drawing immediacy of p5 and the shader
freedom of three.js — without their baggage. Design for exactly one person
(myself), which means I get to make honest, opinionated choices and never
carry compatibility debt for an imaginary audience.

### D5 — One package now, split organically later

The two layers need to **share a story** — same naming, same coordinate
conventions, same uniform philosophy, cross-linked. Physically, **one package**
is more convenient at the beginning; the codebase will organically take the
right shape (maybe a core / math / react split, like pixelate2d did) when it
actually earns it. Don't split up front.

---

## 7. What the new lib must keep (and what it must drop)

**Keep from the shader side (the freedom):**
- uniforms are cheap — a one-line act, no ceremony
- a clean pipeline you can inspect and feed by hand
- zero-abbreviation, self-documenting naming
- the joy: fragment authoring that stays fast to iterate

**Keep from the drawing side (the construction):**
- drawing immediacy — from idea to pixels with no ceremony (the p5 feeling)
- a real camera as a first-class model, with world→screen math that *just
  works* (this is D3)
- an input poll store (p5-flavored but allocation-light)
- no React re-render churn; React owns DOM, the loop owns frames

**Drop from both (the friction, per the graphics audit):**
- the invisible mandatory provider / hidden prerequisite
- two different "view" types that almost match
- the magic coordinate transform nobody can explain in one sentence
- middle-button-only panning; mount-only initial view; split mouse handling
- duplicate scaffold (one loop, one camera, one resize story — D2)

---

## 8. North star — what "it feels like" (not code)

One front door. One loop. One camera. One coordinate system that never makes
you think.

- I want a circle on screen → one line, and it runs — CPU or GPU, my choice,
  both first-class.
- I want it to wobble → I write a small program for just that circle, without
  learning a second mental model or a second library.
- I want everything to be a shader → one fullscreen pass, same canvas, same
  uniforms, same loop. Nothing re-invented.
- Pan, zoom, and the mouse position relative to the canvas **just work**,
  everywhere, both branches (D3).
- I never reimplement resize, DPR, context loss, or the frame loop again,
  anywhere, ever.

The test of success: **when I hit a limit of the built-ins, I don't change
tools.** I just go down one level — and I never wrestle with coordinates to get
there.

---

## 9. Current lean

The decisions above paint a fairly concrete picture:

- **The CPU branch is almost a separate, simple feature.** Frame loop +
  zoom/pan/mouse handling is most of what it needs; the drawing tools on CPU
  might not even be worth framing — plain Canvas2D calls may be the honest
  answer. Don't over-build it.
- **The GPU branch is where the shader + uniform story lives**, and it carries
  the playful, "screen as a function" energy. This is the branch that earns the
  framework.
- **Duplication is a feature here, not a smell.** CPU and GPU are different;
  share the *coordinate and loop scaffolding* (the parts that are genuinely the
  same), duplicate everything else, and never invent a leaky abstraction to
  paper over the difference.
- **One package** that reads as one coherent story (D5), with the CPU branch
  deliberately small.

Two things still need to be felt out, not decided from the armchair: how much
of a "framework" the CPU drawing layer deserves, and what the built-in shape
menu looks like. Both are better answered by using it than by specing it.

---

## 10. Decision checklist

**Decided:**
- [x] **CPU is a first-class choice**, the first branch of the pipeline —
      not a fallback. No god components doing both (D1).
- [x] **One lib to rule them all** — a single package, one shared story (D5).
- [x] **Two expression layers** on one shared foundation (D2).
- [x] **The core pain to kill is coordinate mapping** — pan, zoom,
      mouse-relative-to-canvas (D3).
- [x] **Audience = me.** p5 for drawing, three.js for shaders; this lib is both
      (D4).
- [x] **Duplicate over abstract** — CPU and GPU are different branches; prefer
      honest duplication to non-sensical abstractions.
- [x] **CPU branch starts simple** — nearly a complete separate feature: frame
      loop + zoom/pan/mouse, and maybe barely a framework at all.

**Still open (sit with, then answer):**
- [ ] Does the CPU drawing layer deserve any framework at all, or is it plain
      Canvas2D calls plus the loop/coords?
- [ ] Built-in shapes for the assembly layer — what must exist on day one?
- [ ] Is the uniform story the same ergonomics at every level (a circle's
      params and a shader's uniforms), or does each branch keep its own?
- [ ] What does the "one front door" API actually look like when it branches —
      given CPU and GPU are different, where do they converge and where do they
      diverge in the API?

---

*Working note in `/drafts`. Meant to be rewritten, argued with, and eventually
either executed or abandoned with a clear head.*
