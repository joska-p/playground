---
name: coding-style
description: Use when editing, refactoring, or creating TypeScript/React code to follow code organization and convention rules.
---

# Coding style — the approach

The way I like to write code: clean, minimal, and structured so the concept is visible.
Treat this as technique, not a rulebook — bend it when a codebase's own conventions
demand otherwise.

## Naming is the specification knowledge KNOWLEDGE

- A name carries the whole concept. If you need to read the body to understand the
  name, rename it.
- If the name alone does not make the code obvious, treat it as a smell and investigate.
  (either the name is wrong, or the abstraction is wrong).
- Self-documenting names: Match reality, not history (ProgramCpu → SurfaceCpuHybrid).
- Domain taxonomy as folder structure: Group by category (cpu/, gpu/), suffix by variant (*Declarative, *Hybrid).
- Single abstraction layer: Don't mix domain concepts with low-level mechanics in the same identifier.

## Clean code

- One responsibility per file; a module is a name plus its single idea.
- Cut bloat. If a feature exists only "to be shown" and nobody reads its output, delete
  it. Examples should be the minimum that demonstrates the concept.
- Extract shared logic the moment a second user appears (one `drawSceneCpu` for every
  CPU cell), but never build an abstraction ahead of a real second use. Duplicate over
  abstract when in doubt.
- No comments unless they explain _why_ (a non-obvious decision, a constraint, a pitfall).
- Never describe _what_ the code does — the name and types already do that.
- Comments must help reading, never interrupt the flow.
- Prefer the smallest declarative mechanism that works: a documented `onFrame`/`onRuntime`
  callback beats refs, manual loops, and `subscribe` noise.
- When a brief leaves open decisions, pick one, say which and why — don't stall.

## Structure for understanding

- Layer abstraction: data → shared helpers → components, each level depending only on
  the one below. A reader should hold the whole shape in their head.
- Same picture, several implementations → show them side by side, not scattered.
- Simplify as you go: anything that is complexity for its own sake gets removed.

## Communication

- Explain at the abstraction level the reader is thinking in, zoom in only when asked.
- Lead with the decision, then the why. Mention what you deliberately did _not_ do.
- Be concise. Summarize after the work, don't narrate while doing it.

## Respect the codebase

- Match existing conventions (imports, exports, formatting, lint). The repo's own
  `AGENTS.md` and library conventions come first.
- Do not change frozen APIs or contracts. If there's a genuine gap, stop and flag it
  instead of shipping a workaround.

## Verify before done

- Run the repo's check commands (typecheck, lint, build/tests) and fix what you
  introduced. Never declare done on intent.
