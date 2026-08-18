---
name: writing-for-agents
description: 'Reference for writing documents agents consume — skills, AGENTS.md, pointers. Use when creating or editing these.'
disable-model-invocation: true
---

# Writing for Agents

Reference for writing any document an agent consumes — a skill, an `AGENTS.md`, a doc reached by a pointer. The packaging differs; the writing does not.

## Context pointers

A **context pointer** is a reference held in the agent's context that names out-of-context material and encodes the condition for reaching it. A skill's description is one; a line in `AGENTS.md` naming a doc is the same object.

A pointer does two jobs — state what the material is, and list the **branches** that should trigger reaching it. Every word of an always-loaded pointer costs on every turn:

- **Front-load the leading word** — the pointer does its triggering work there.
- **One trigger per branch.** Synonyms that rename one branch are redundancy; collapse.
- **Cut identity the body already carries.**

## The two loads

- **Context load** — cost of always-loaded material on the agent's window: tokens spent whether or not it fires.
- **Cognitive load** — cost on the human: which documents exist and when to reach for each. The human is the index.

## Information hierarchy

1. **In-file step** — what the agent does, in order.
2. **In-file reference** — consulted on demand.
3. **Disclosed reference** — pushed behind a context pointer, loaded only when the pointer fires.

**Progressive disclosure** moves material down the ladder so the top stays legible. **Co-location** keeps a concept's definition, rules, and caveats under one heading.

## Leading words

A **leading word** is a compact concept from pretraining that the agent thinks with while running the document. Repeated as a token, never as a sentence, it accumulates a distributed definition and anchors behaviour in few tokens.

- "fast, deterministic, low-overhead" → _tight_ (a _tight_ loop).
- "a loop you believe in" → _red_ — binary observable state.

**Negation** is the failure mode: steering by prohibition drags the forbidden into context. Prompt the **positive** — state the target behaviour.

## Pruning

- Keep each meaning in a **single source of truth**.
- The **environment** is a source of truth — `package.json` scripts, config, directory layout. Don't cache what the agent can find by looking.
- Check every line for **relevance**. Shorter docs are easier to keep relevant.
- Hunt **no-ops** sentence by sentence: an instruction the model already obeys by default pays load to say nothing. Delete the whole sentence rather than trim words.
