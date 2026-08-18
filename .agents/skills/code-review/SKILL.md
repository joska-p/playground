---
name: code-review
description: "Review changes along two axes — Standards (coding conventions?) and Spec (requirements?). Runs both in parallel sub-agents."
disable-model-invocation: true
---

Two-axis review of the diff between `HEAD` and a fixed point the user supplies:

- **Standards** — does the code conform to this repo's documented conventions?
- **Spec** — does the code faithfully implement the originating issue / spec?

Both axes run as **parallel sub-agents** so they don't pollute each other's context, then this skill aggregates their findings.

## Process

### 1. Pin the fixed point

Whatever the user said — a commit SHA, branch name, tag, `main`, `HEAD~5`, etc. If they didn't specify one, ask for it.

Capture the diff command once: `git diff <fixed-point>...HEAD` (three-dot, merge-base). Also note commits via `git log <fixed-point>..HEAD --oneline`.

Before going further, confirm the fixed point resolves (`git rev-parse <fixed-point>`) and the diff is non-empty.

### 2. Identify the spec source

Look for the originating spec, in this order:

1. Issue references in commit messages (`#123`, `Closes #45`).
2. A path the user passed as argument.
3. A spec file under `docs/`, `specs/`, or `.scratch/` matching the branch name or feature.
4. If nothing found, ask the user. If there isn't one, the **Spec** sub-agent skips and reports "no spec available".

### 3. Identify the standards sources

Read the conventions docs: `apps/playground/src/content/docs/conventions/overview.md` and the linked thematic files.

On top of the documented conventions, the Standards axis carries the **smell baseline** — a fixed set of Fowler code smells (_Refactoring_, ch.3) that applies even when docs say nothing. Two rules bind it:

- **The repo overrides.** A documented convention always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic, never a hard violation.

Each smell reads *what it is* → *how to fix*; match it against the diff:

- **Mysterious Name** — name doesn't reveal what it does. → rename.
- **Duplicated Code** — same logic shape in multiple hunks/files. → extract.
- **Feature Envy** — method reaches into another object's data more than its own. → move it.
- **Data Clumps** — same few fields keep travelling together. → bundle into one type.
- **Primitive Obsession** — primitive standing in for a domain concept. → give it its own type.
- **Repeated Switches** — same `switch`/`if`-cascade recurs across the change. → replace with polymorphism or a shared map.
- **Shotgun Surgery** — one logical change forces scattered edits. → gather into one module.
- **Divergent Change** — one file edited for several unrelated reasons. → split.
- **Speculative Generality** — abstraction added for needs the spec doesn't have. → delete it.
- **Message Chains** — long `a.b().c().d()` navigation. → hide behind one method.
- **Middle Man** — mostly just delegates. → cut it, call the real target.
- **Refused Bequest** — ignores most of what it inherits. → use composition.

### 4. Spawn both sub-agents in parallel

**Standards sub-agent prompt** — include:

- The full diff command and commit list.
- The conventions docs contents, **plus the smell baseline** pasted in full.
- Brief: "Report — per file/hunk — (a) every place the diff violates a documented convention: cite the file + rule; (b) any baseline smell: name it and quote the hunk. Distinguish hard violations from judgement calls. Skip anything tooling enforces. Under 400 words."

**Spec sub-agent prompt** — include:

- The diff command and commit list.
- The path or fetched contents of the spec.
- Brief: "Report: (a) requirements the spec asked for that are missing; (b) behaviour not asked for (scope creep); (c) requirements that look implemented but are wrong. Quote the spec line for each finding. Under 400 words."

If the spec is missing, skip the Spec sub-agent.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec` headings, verbatim or lightly cleaned. Do **not** merge or rerank — the axes are deliberately separate.

End with a one-line summary: total findings per axis, and the worst issue within each axis (if any). Don't pick a single winner across axes.

## Why two axes

A change can pass one and fail the other:

- Code that follows every standard but implements the wrong thing → **Standards pass, Spec fail.**
- Code that does exactly what was asked but breaks conventions → **Spec pass, Standards fail.**
